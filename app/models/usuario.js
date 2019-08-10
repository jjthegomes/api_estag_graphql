import mongoose from "../../database";
import bcrypt from "bcryptjs";

const UsuarioSchema = new mongoose.Schema(
  {
    candidaturas: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candidatura"
      }
    ],
    nome: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    senha: {
      type: String,
      required: true,
      select: false
    },
    tipo: {
      type: String,
      required: false
    },
    genero: {
      type: String,
      required: false
    },
    celular: {
      type: String,
      required: false
    },
    dataNascimento: {
      type: String,
      required: false
    },
    ativo: {
      type: Boolean,
      default: false
    },
    fotoPerfil: {
      type: String,
      required: false
    },
    recuperacaoSenha: {
      token: {
        type: String,
        required: false
      },
      dataExpiracao: {
        type: Date,
        required: false
      }
    },
    confirmacaoCadastro: {
      token: {
        type: String,
        required: false
      },
      dataExpiracao: {
        type: Date,
        required: false
      }
    }
  }, { timestamps: true }
);

module.exports = mongoose.model("Usuario", UsuarioSchema, "usuarios");
