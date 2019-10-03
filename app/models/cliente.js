import mongoose from "../../database";
import bcrypt from "bcryptjs";

const ClienteSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usuario"
    },
    candidaturas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "candidatura"
      }
    ],
    endereco: {
      cep: { type: String, required: false },
      logradouro: { type: String, required: false },
      bairro: { type: String, required: false },
      cidade: { type: String, required: false },
      numero: { type: String, required: false },
      uf: { type: String, required: false },
      complemento: { type: String, required: false }
    },
    telefone: {
      type: String,
      required: false
    },
    formacaoAcademica: {
      type: String,
      required: false
    },
    formacaoProfissional: {
      type: String,
      required: false
    },
    habilidades: {
      type: String,
      required: false
    },
    experiencia: {
      type: String,
      required: false
    },
    redeSocial: {
      facebook: {
        type: String,
        required: false
      },
      linkedin: {
        type: String,
        required: false
      },
      lattes: {
        type: String,
        required: false
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("cliente", ClienteSchema, "clientes");
