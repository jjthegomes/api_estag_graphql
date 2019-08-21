import Vaga from "../../models/vaga";
import Usuario from "../../models/usuario";
import Candidatura from "../../models/candidatura";
import { transformCandidatura, transformVaga } from "./merge";

module.exports = {
  candidaturas: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");

    try {
      const candidaturas = await Candidatura.find();
      return candidaturas.map(candidatura => {
        return transformCandidatura(candidatura);
      });
    } catch (error) {
      throw error;
    }
  },

  candidatarVaga: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");

    try {
      const user = await Usuario.findById(req.usuarioId);
      const fetchedVaga = await Vaga.findById(args.vagaId);

      if (!fetchedVaga) throw new Error("Vaga does not exists.");
      if (!user) throw new Error("User does not exists.");

      const candidatura = new Candidatura({
        usuario: user,
        vaga: fetchedVaga
      });

      const result = await candidatura.save();

      user.candidaturas.push(candidatura);

      await user.save();

      return transformCandidatura(result);
    } catch (error) {
      throw error;
    }
  },

  cancelarCandidatura: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");

    try {
      const candidatura = await Candidatura.findById(
        args.candidaturaId
      ).populate("vaga");

      await Usuario.findOneAndUpdate(
        { _id: candidatura.usuario },
        { $pull: { candidaturas: candidatura._id } },
        { new: true }
      );

      await Candidatura.deleteOne({ _id: args.candidaturaId });
      const vaga = transformVaga(candidatura.vaga);
      return vaga;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
};
