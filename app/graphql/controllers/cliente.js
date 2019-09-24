import Cliente from "../../models/cliente";
import Usuario from "../../models/usuario";
import Candidatura from "../../models/candidatura";

import { transformCliente } from "./merge";

module.exports = {
  clientes: async  req => {
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

  criarCliente: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");
    try {
      const existingUser = await Usuario.findById(req.usuarioId);

      if (!existingUser) throw new Error("Usuario does not exists.");

      const existingCliente = await Cliente.findOne({
        email: args.clienteInput.email
      });

      if (existingCliente) throw new Error("Cliente already exists.");

      const cliente = new Cliente({
        ...args.clienteInput,
        usuario: req.usuarioId,
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

      if (!existingUser) throw new Error("Usuario does not exists.");

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
      const cliente = await Cliente.findById(args.clienteId);

      if (!cliente) throw new Error("Cliente does not exists");

      const candidaturas = await Candidatura.find({
        _id: { $in: cliente.candidaturas }
      });

      await candidaturas.map(async candidatura => {
        await Candidatura.deleteOne({ _id: candidatura._id });
      });

      await Cliente.deleteOne({ _id: args.clienteId });
      await Usuario.deleteOne({ _id: req.usuarioId });

      return transformCliente(cliente);
    } catch (error) {
      throw error;
    }
  },
};
