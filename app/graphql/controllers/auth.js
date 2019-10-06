import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../../models/usuario";
import Cliente from "../../models/cliente";
import Empresa from "../../models/empresa";

import {
  transformUsuario,
  transformCliente,
  transformEmpresa,
  validateDate
} from "./merge";

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

      if (!existingUser) throw new Error("Usuário não existe.");

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

      if (existingUser) throw new Error("Email já cadastrado.");

      const hashedPassword = await bcrypt.hash(args.usuarioInput.senha, 12);
      const usuario = new Usuario({
        ...args.usuarioInput,
        dataNascimento: validateDate(args.usuarioInput.dataNascimento),
        senha: hashedPassword
      });
      const result = await usuario.save();

      const token = await jwt.sign(
        { id: usuario.id },
        process.env.AUTH_SECRET,
        { expiresIn: 1296000 }
      );

      const dataExpiracao = new Date();
      dataExpiracao.setHours(dataExpiracao.getHours() + 1);

      await Usuario.findByIdAndUpdate(usuario.id, {
        $set: {
          confirmacaoCadastro: { token, dataExpiracao }
        }
      });

      return { ...result._doc, senha: null, _id: result.id, token };
    } catch (error) {
      throw error;
    }
  },

  login: async ({ email, senha }) => {
    try {
      const usuario = await Usuario.findOne({ email: email });
      if (!usuario) throw new Error("E-mail ou senha inválidos!");

      const isEqual = await bcrypt.compare(senha, usuario.senha);

      if (!isEqual) throw new Error("E-mail ou senha inválidos!");

      let empresa = null;
      let cliente = null;

      if (usuario.tipo == "empresa") {
        empresa = await Empresa.findOne({ usuario: usuario._id });
        if (!empresa) throw new Error("Empresa não existe!");
        empresa = transformEmpresa(empresa);
      } else {
        cliente = await Cliente.findOne({ usuario: usuario._id });
        if (!cliente) throw new Error("Cliente não existe!");
        cliente = transformCliente(cliente);
      }

      const token = await jwt.sign(
        { id: usuario.id },
        process.env.AUTH_SECRET,
        { expiresIn: 1296000 }
      );

      return {
        usuario: transformUsuario(usuario),
        cliente: cliente,
        empresa: empresa,
        token: token,
        tokenExpiration: 1296000
      };
    } catch (error) {
      throw error;
    }
  },

  deletarUsuario: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");

    try {
      const usuario = await Usuario.findById(req.usuarioId);

      if (!usuario) throw new Error("Usuario não existe");

      await Usuario.deleteOne({ _id: req.usuarioId });
      return transformUsuario(usuario);
    } catch (error) {
      throw error;
    }
  }
};
