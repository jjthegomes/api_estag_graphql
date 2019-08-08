import Vaga from "../../models/vaga";
import Usuario from "../../models/usuario";
import Candidatura from "../../models/candidatura";
import { transformCandidatura, transformVaga } from "./merge";

module.exports = {
  candidaturas: async () => {
    try {
      const candidaturas = await Candidatura.find();
      return candidaturas.map(candidatura => {
        return transformCandidatura(candidatura);
      });
    } catch (error) {
      throw error;
    }
  },

  candidatarVaga: async args => {
    const fetchedVaga = await Vaga.findOne({ _id: args.vagaId });

    if (!fetchedVaga) throw new Error("Vaga not exists.");

    const candidatura = new Candidatura({
      usuario: args.usuarioId,
      vaga: fetchedVaga
    });
    const result = await candidatura.save();
    return transformCandidatura(result);
  },

  // candidatarVaga: async args => {
  //   const fetchedVaga = await Vaga.findOne({ _id: args.vagaId });
  //   const candidatura = new Candidatura({
  //     usuario: "5d4a1ea1f1d8162be41652f1",
  //     vaga: fetchedVaga
  //   });

  //   try {
  //     const result = await candidatura.save();

  //     const user = await Usuario.findById("5d4a1ea1f1d8162be41652f1");

  //     if (!user) throw new Error("User not exists.");

  //     user.candidaturas.push(candidatura);

  //     await user.save();

  //     return transformCandidatura(result);
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  cancelarCandidatura: async args => {
    try {
      const candidatura = await Candidatura.findById(
        args.candidaturaId
      ).populate("vaga");
      const vaga = transformVaga(candidatura.vaga);
      await Candidatura.deleteOne({ _id: args.candidaturaId });
      return vaga;
    } catch (error) {
      throw error;
    }
  }
};
