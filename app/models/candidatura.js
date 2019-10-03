import mongoose from "../../database";

const candidaturaSchema = new mongoose.Schema(
  {
    vaga: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vaga"
    },
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cliente"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "candidatura",
  candidaturaSchema,
  "candidaturas"
);
