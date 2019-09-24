import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../../models/usuario";
import Cliente from "../../models/cliente";
import Empresa from "../../models/empresa";

import { transformUsuario, transformCliente, transformEmpresa, validateDate } from "./merge";

module.exports = {
  usuarios: async args => {
    try {
      const usuarios = await Usuario.find();
      return usuarios.map(usuario => {
        return transformUsuario(usuario);
      });
    } catch (error) {
      throw error;
    }
  },

  editarUsuario: async args => {
    try {
      const existingUser = await Usuario.findOne({
        email: args.usuarioInput.email
      });

      if (!existingUser) throw new Error("Usuario does not exists.");

      const hashedPassword = await bcrypt.hash(args.usuarioInput.senha, 12);

      const usuario = await Usuario.findOneAndUpdate(
        { _id: existingUser._id },
        {
          ...args.usuarioInput,
          senha: hashedPassword
        },
        { new: true }
      );

      return transformUsuario(usuario);
    } catch (error) {
      throw error;
    }
  },

  criarUsuario: async args => {
    try {
      const existingUser = await Usuario.findOne({
        email: args.usuarioInput.email
      });

      if (existingUser) throw new Error("Usuario exists already.");

      const hashedPassword = await bcrypt.hash(args.usuarioInput.senha, 12);
      const usuario = new Usuario({
        ...args.usuarioInput,
        dataNascimento: validateDate(args.usuarioInput.dataNascimento),
        senha: hashedPassword
      });
      const result = await usuario.save();

      const token = await jwt.sign(
        { usuarioId: usuario.id, email: usuario.email },
        process.env.AUTH_SECRET,
        { expiresIn: "72h" }
      );

      return { ...result._doc, senha: null, _id: result.id, token };
    } catch (error) {
      throw error;
    }
  },

  login: async ({ email, senha }) => {
    try {
      const usuario = await Usuario.findOne({ email: email });
      if (!usuario) throw new Error("User does not exist!");

      const isEqual = await bcrypt.compare(senha, usuario.senha);

      if (!isEqual) throw new Error("Password incorrect!");

      let empresa = null;
      let cliente = null;

      if (usuario.tipo == 'empresa') {
        empresa = await Empresa.findOne({ usuario: usuario._id });
        if (!empresa) throw new Error("Empresa does not exists!");
        empresa = transformEmpresa(empresa);

      } else {
        cliente = await Cliente.findOne({ usuario: usuario._id });
        if (!cliente) throw new Error("Empresa does not exists!");
        cliente = transformCliente(cliente);
      }

      const token = await jwt.sign(
        { usuarioId: usuario.id, email: usuario.email },
        process.env.AUTH_SECRET,
        { expiresIn: "72h" }
      );

      return {
        usuario: transformUsuario(usuario),
        cliente: cliente,
        empresa: empresa,
        token: token,
        tokenExpiration: 72
      };
    } catch (error) {
      throw error;
    }
  },

  deletarUsuario: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");

    try {
      const usuario = await Usuario.findById(req.usuarioId);

      if (!usuario) throw new Error("Usuario does not exist");

      await Usuario.deleteOne({ _id: req.usuarioId });
      return transformUsuario(usuario);
    } catch (error) {
      throw error;
    }
  }
};
