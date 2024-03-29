import Cliente from "../../models/cliente";
import Usuario from "../../models/usuario";
import Candidatura from "../../models/candidatura";

import { transformCliente } from "./merge";

module.exports = {
  clientes: async req => {
    if (!req.isAuth) throw new Error("Unauthenticated");
    try {
      const clientes = await Cliente.find();
      return clientes.map(cliente => {
        return transformCliente(cliente);
      });
    } catch (error) {
      throw error;
    }
  },

  clienteById: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");

    try {
      const cliente = await Cliente.findOne({ usuario: req.usuarioId });
      return transformCliente(cliente);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  criarCliente: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");

    try {
      const existingUser = await Usuario.findById(req.usuarioId);

      if (!existingUser) throw new Error("Usuário não existe.");

      const existingCliente = await Cliente.findOne({
        usuario: req.usuarioId
      });

      if (existingCliente) throw new Error("Cliente já existe.");

      const cliente = new Cliente({
        ...args.clienteInput,
        usuario: req.usuarioId
      });
      const result = await cliente.save();
      return transformCliente(result);
    } catch (error) {
      throw error;
    }
  },

  editarCliente: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");

    try {
      const existingUser = await Usuario.findById(req.usuarioId);

      if (!existingUser) throw new Error("Usuário não existe.");

      const cliente = await Cliente.findOneAndUpdate(
        { usuario: req.usuarioId },
        { ...args.clienteInput },
        { new: true }
      );

      return transformCliente(cliente);
    } catch (error) {
      throw error;
    }
  },

  deletarCliente: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");
    try {
      if (!existingUser) throw new Error("Usuário não existe.");

      const cliente = await Cliente.findOne({ usuario: req.usuarioId });

      if (!cliente) throw new Error("Cliente não existe");

      const candidaturas = await Candidatura.find({
        _id: { $in: cliente.candidaturas }
      });

      await candidaturas.map(async candidatura => {
        await Candidatura.deleteOne({ _id: candidatura._id });
      });

      await Cliente.deleteOne({ _id: cliente._id });
      await Usuario.deleteOne({ _id: req.usuarioId });

      return transformCliente(cliente);
    } catch (error) {
      throw error;
    }
  }
};
