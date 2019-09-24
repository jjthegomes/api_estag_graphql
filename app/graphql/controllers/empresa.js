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

  criarEmpresa: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");

    try {
      const existingUser = await Usuario.findById(req.usuarioId);
      if (!existingUser) throw new Error("Usuario does not exists.");

      const existingEmpresa = await Empresa.findOne({
        email: args.empresaInput.email
      });

      if (existingEmpresa) throw new Error("Empresa already exists.");

      const hashedPassword = await bcrypt.hash(args.empresaInput.senha, 12);
      const empresa = new Empresa({
        ...args.empresaInput,
        senha: hashedPassword,
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

      if (!existingUser) throw new Error("Usuario does not exists.");

      const existingEmpresa = await Empresa.findOne({
        email: args.empresaInput.email
      });

      if (existingEmpresa) throw new Error("Empresa already exists.");

      const empresa = await Empresa.findOneAndUpdate(
        { usuario: req.usuarioIdd },
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
      const empresa = await Empresa.findById(args.empresaId);

      if (!empresa) throw new Error("Empresa does not exists");

      const vagas = await Vaga.find({ _id: { $in: empresa.vagas } });
      await vagas.map(async vaga => {
        await Vaga.deleteOne({ _id: vaga._id });
      });

      await Empresa.deleteOne({ _id: args.empresaId });
      await Usuario.deleteOne({ _id: req.usuarioId });

      return transformEmpresa(empresa);
    } catch (error) {
      throw error;
    }
  },
};
