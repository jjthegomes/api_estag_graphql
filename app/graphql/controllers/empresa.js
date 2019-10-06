import bcrypt from "bcryptjs";
import Empresa from "../../models/empresa";
import Vaga from "../../models/vaga";
import Usuario from "../../models/usuario";

import { transformEmpresa, transformVaga } from "./merge";

module.exports = {
  empresas: async () => {
    try {
      const empresas = await Empresa.find();
      return empresas.map(empresa => {
        return transformEmpresa(empresa);
      });
    } catch (error) {
      throw error;
    }
  },

  empresaById: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");

    try {
      const empresa = await Empresa.findOne({
        usuario: req.usuarioId
      }).populate("usuario");
      return transformEmpresa(empresa);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  criarEmpresa: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");

    try {
      const existingUser = await Usuario.findById(req.usuarioId);

      if (!existingUser) throw new Error("Usuário não existe.");

      const existingEmpresa = await Empresa.findOne({
        cnpj: args.empresaInput.cnpj,
        usuario: req.usuarioId
      });

      if (existingEmpresa) throw new Error("Empresa já existe.");

      const empresa = new Empresa({
        ...args.empresaInput,
        usuario: req.usuarioId
      });
      const result = await empresa.save();
      return transformEmpresa(result);
    } catch (error) {
      console.log(error);

      throw error;
    }
  },

  editarEmpresa: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");

    try {
      const existingUser = await Usuario.findById(req.usuarioId);

      if (!existingUser) throw new Error("Usuário não existe.");

      const existingEmpresa = await Empresa.findOne({
        email: args.empresaInput.email
      });

      if (!existingEmpresa) throw new Error("Empresa não existe.");

      const empresa = await Empresa.findOneAndUpdate(
        { usuario: req.usuarioId },
        { ...args.empresaInput },
        { new: true }
      );

      return transformEmpresa(empresa);
    } catch (error) {
      throw error;
    }
  },

  deletarEmpresa: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");
    try {
      const existingUser = await Usuario.findById(req.usuarioId);

      if (!existingUser) throw new Error("Usuário não existe.");

      const empresa = await Empresa.findOne({ usuario: req.usuarioId });

      if (!empresa) throw new Error("Empresa não existe");

      const vagas = await Vaga.find({ _id: { $in: empresa.vagas } });
      await vagas.map(async vaga => {
        await Vaga.deleteOne({ _id: vaga._id });
      });

      await Empresa.deleteOne({ _id: empresa._id });
      await Usuario.deleteOne({ _id: req.usuarioId });

      return transformEmpresa(empresa);
    } catch (error) {
      throw error;
    }
  }
};
