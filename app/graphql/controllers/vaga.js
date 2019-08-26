import Vaga from "../../models/vaga";
import Empresa from "../../models/empresa";
import { transformVaga } from "./merge";

module.exports = {
  vagas: async () => {
    try {
      const vagas = await Vaga.find();
      return vagas.map(vaga => {
        return transformVaga(vaga);
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  vagaById: async args => {
    try {
      const vaga = await Vaga.findOne({ _id: args.id });
      return transformVaga(vaga);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  criarVaga: async args => {
    const vaga = new Vaga({
      ...args.vagaInput,
      jornada: +args.vagaInput.jornada,
      empresa: args.empresaId
    });
    let vagas;
    try {
      const result = await vaga.save();
      vagas = transformVaga(result);
      const empresa = await Empresa.findById(args.empresaId);

      if (!empresa) throw new Error("Empresa not exists.");

      empresa.vagas.push(vaga);
      await empresa.save();
      return vagas;
    } catch (error) {
      throw error;
    }
  },

  deletarVaga: async args => {
    try {
      const vaga = await Vaga.findById(args.vagaId);

      if (!vaga) throw new Error("Vaga does not exists");

      await Vaga.deleteOne({ _id: args.vagaId });
      return transformVaga(vaga);
    } catch (error) {
      throw error;
    }
  }
};
