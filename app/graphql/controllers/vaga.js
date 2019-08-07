import Vaga from "../../models/vaga";
import Empresa from "../../models/empresa";
import { transformVaga } from "./merge";

const ID = "5d4a1639bb4a5536d0d81713";

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

  createVaga: async args => {
    const vaga = new Vaga({
      titulo: args.vagaInput.titulo,
      requisitos: args.vagaInput.requisitos,
      jornada: +args.vagaInput.jornada,
      tipo: args.vagaInput.tipo,
      empresa: ID
    });
    let vagas;
    try {
      const result = await vaga.save();
      vagas = transformVaga(result);
      const empresa = await Empresa.findById(ID);

      if (!empresa) throw new Error("Empresa not exists.");

      empresa.vagas.push(vaga);
      await empresa.save();
      return vagas;
    } catch (error) {
      throw error;
    }
  }
};
