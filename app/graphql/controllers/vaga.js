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

  vagaById: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");

    try {
      const vaga = await Vaga.findOne({ _id: args.id });
      return transformVaga(vaga);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  criarVaga: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");

    try {
      const empresa = await Empresa.findOne({ usuario: req.usuarioId });

      if (!empresa) throw new Error("Nenhuma empresa encontrada.");

      const vaga = new Vaga({
        ...args.vagaInput,
        jornada: +args.vagaInput.jornada,
        empresa: empresa
      });

      const result = await vaga.save();

      await Empresa.findOneAndUpdate(
        { _id: empresa._id },
        { $push: { vagas: vaga._id } },
        { new: true }
      );

      // empresa.vagas.push(vaga);
      // await empresa.save();
      return transformVaga(result);
    } catch (error) {
      throw error;
    }
  },

  editarVaga: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");

    try {
      const empresa = await Empresa.findOne({ usuario: req.usuarioId });

      if (!empresa) throw new Error("Nenhuma empresa encontrada.");

      const vaga = await Vaga.findOneAndUpdate(
        { _id: args.id },
        { $set: { ...args.vagaInput } },
        { new: true }
      );

      return transformVaga(vaga);
    } catch (error) {
      throw error;
    }
  },

  deletarVaga: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");
    try {
      const vaga = await Vaga.findOneAndDelete({ _id: args.id });
      if (!vaga) throw new Error("Vaga não existe");

      return transformVaga(vaga);
    } catch (error) {
      throw error;
    }
  }
};
