import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../../models/usuario";
import Candidatura from "../../models/candidatura";
import { transformUsuario } from "./merge";

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
        senha: hashedPassword
      });
      const result = await usuario.save();
      return { ...result._doc, senha: null, _id: result.id };
    } catch (error) {
      throw error;
    }
  },

  login: async ({ email, senha }) => {
    try {
      const usuario = await Usuario.findOne({ email: email });
      if (!usuario) throw new Error("User does not exist!");

      const isEqual = await bcrypt.compare(senha, usuario.senha);

      if (!isEqual) throw new Error("Password does not exist!");

      const token = await jwt.sign(
        { usuarioId: usuario.id, email: usuario.email },
        process.env.AUTH_SECRET,
        { expiresIn: "1h" }
      );

      return {
        usuarioId: usuario.id,
        token: token,
        tokenExpiration: 1
      };
    } catch (error) {
      throw error;
    }
  },

  deletarUsuario: async args => {
    try {
      const usuario = await Usuario.findById(args.usuarioId);

      if (!usuario) throw new Error("Usuario does not exist");

      const candidaturas = await Candidatura.find({
        _id: { $in: usuario.candidaturas }
      });
      await candidaturas.map(async candidatura => {
        await Candidatura.deleteOne({ _id: candidatura._id });
      });

      await Usuario.deleteOne({ _id: args.usuarioId });
      return transformUsuario(usuario);
    } catch (error) {
      throw error;
    }
  }
};
