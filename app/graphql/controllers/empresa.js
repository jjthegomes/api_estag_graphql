import bcrypt from "bcryptjs";
import Empresa from "../../models/empresa";
import Vaga from "../../models/vaga";

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

  criarEmpresa: async args => {
    try {
      const existingEmpresa = await Empresa.findOne({
        email: args.empresaInput.email
      });

      if (existingEmpresa) throw new Error("Empresa already exists.");

      const hashedPassword = await bcrypt.hash(args.empresaInput.senha, 12);
      const empresa = new Empresa({
        ...args.empresaInput,
        senha: hashedPassword
      });
      const result = await empresa.save();
      return transformEmpresa(result);
    } catch (error) {
      console.log(error);

      throw error;
    }
  },

  deletarEmpresa: async args => {
    try {
      const empresa = await Empresa.findById(args.empresaId);

      if (!empresa) throw new Error("Empresa does not exists");

      const vagas = await Vaga.find({ _id: { $in: empresa.vagas } });
      await vagas.map(async vaga => {
        await Vaga.deleteOne({ _id: vaga._id });
      });

      await Empresa.deleteOne({ _id: args.empresaId });
      return transformEmpresa(empresa);
    } catch (error) {
      throw error;
    }
  },
};
