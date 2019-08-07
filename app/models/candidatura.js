import mongoose from "../../database";

const candidaturaSchema = new mongoose.Schema(
  {
    vaga: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vaga"
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Candidatura",
  candidaturaSchema,
  "candidaturas"
);
