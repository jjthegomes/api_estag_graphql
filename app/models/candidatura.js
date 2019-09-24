import mongoose from "../../database";

const candidaturaSchema = new mongoose.Schema({
  vaga: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vaga"
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente"
  }
}, { timestamps: true }
);

module.exports = mongoose.model(
  "Candidatura",
  candidaturaSchema,
  "candidaturas"
);
