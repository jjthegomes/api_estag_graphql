import mongoose from "../../database";

const VagaSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true
    },
    requisitos: {
      type: String,
      required: true
    },
    diferencial: {
      type: String,
      required: false
    },
    local: {
      type: String,
      required: false
    },
    tipo: {
      type: String,
      enum: ["presencial", "home office"],
      default: "presencial",
      required: true
    },
    escolaridade: {
      type: String,
      required: false
    },
    jornada: {
      type: Number,
      required: true,
      default: 20
    },
    beneficios: {
      type: String,
      required: false
    },
    publica: {
      type: Boolean,
      required: false,
      default: true
    }, //boolean
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
    categoria: {
      type: String,
      required: false
    }, // ou area,
    cidade: {
      type: String,
      required: false
    },
    estado: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vaga", VagaSchema, "vagas");
