import mongoose from "../../database";

const VagaSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },
    requisitos: {
      type: String,
      required: true
    },
    jornada: {
      type: Number,
      required: true,
      default: 20
    },
    modalidade: {
      type: String,
      enum: ["presencial", "home office"],
      default: "presencial",
      required: true
    },
    tipo: {
      type: String,
      enum: ["estagio", "emprego"],
      default: "estagio",
      required: true
    },
    diferencial: {
      type: String,
      required: false
    },
    escolaridade: {
      type: String,
      required: false
    },
    local: {
      type: String,
      required: false
    },
    beneficios: {
      type: String,
      required: false
    },
    publica: {
      type: Boolean,
      required: false,
      default: true
    },
    empresa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "empresa"
    },
    descricao: {
      type: String,
      required: false
    },
    numeroVagas: {
      type: Number,
      required: false
    },
    link: {
      type: String,
      required: false,
      lowercase: true
    },
    area: {
      type: String,
      required: false
    },
    cidade: {
      type: String,
      required: false
    },
    estado: {
      type: String,
      required: false
    },
    dataInicio: {
      type: Date,
      required: true,
      default: new Date()
    },
    dataFinal: {
      type: Date,
      required: true,
      default: new Date()
    }
  },
  { timestamps: true }
);

const Vaga = mongoose.model("vaga", VagaSchema, "vagas");

module.exports = Vaga;
