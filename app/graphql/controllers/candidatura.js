import Vaga from "../../models/vaga";
import Cliente from "../../models/cliente";
import Usuario from "../../models/usuario";
import Candidatura from "../../models/candidatura";
import { transformCandidatura, transformVaga, transformCliente } from "./merge";

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

    let shouldUpdate = true;
    try {
      const user = await Usuario.findById(req.usuarioId);
      if (!user) throw new Error("Usuário não existe.");

      if (user.tipo == "empresa") throw new Error("Unauthorized");

      const cliente = await Cliente.findOne({
        usuario: req.usuarioId
      }).populate("candidaturas");
      const fetchedVaga = await Vaga.findById(args.vagaId);

      if (!fetchedVaga) throw new Error("Vaga não existe.");
      if (!cliente) throw new Error("Cliente não existe.");

      cliente.candidaturas.map(candidatura => {
        if (candidatura.vaga == args.vagaId) {
          shouldUpdate = false;
        }
      });

      if (shouldUpdate) {
        const candidatura = new Candidatura({
          cliente: cliente,
          vaga: fetchedVaga
        });

        const result = await candidatura.save();

        await Cliente.findOneAndUpdate(
          { _id: cliente._id },
          { $addToSet: { candidaturas: candidatura } },
          { new: true }
        );

        return transformCandidatura(result);
      } else {
        const result = await Candidatura.findOne({ vaga: args.vagaId });
        return transformCandidatura(result);
      }
    } catch (error) {
      throw error;
    }
  },

  cancelarCandidatura: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");

    try {
      const candidatura = await Candidatura.findById(args.candidaturaId);

      if (!candidatura) throw new Error("Candidatura não encontrada");

      await Cliente.findOneAndUpdate(
        { _id: candidatura.cliente },
        { $pull: { candidaturas: candidatura._id } },
        { new: true }
      );

      await Candidatura.deleteOne({ _id: args.candidaturaId });

      const vaga = await Vaga.findById(candidatura.vaga);
      return transformVaga(vaga);
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
};
