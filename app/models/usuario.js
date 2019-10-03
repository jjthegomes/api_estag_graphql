import mongoose from "../../database";
import bcrypt from "bcryptjs";

const UsuarioSchema = new mongoose.Schema(
  {
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
      required: true
    },
    tipo: {
      type: String,
      required: false
    },
    genero: {
      type: String,
      enum: ["Masculino", "Feminino", "Outro"],
      default: "Outro",
      required: true
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
    },
    trocaEmail: {
      emailTrocado: {
        type: String,
        required: false,
        lowercase: true
      },
      tokenConfirmacao: {
        type: String,
        required: false
      },
      tokenRecuperacao: {
        type: String,
        required: false
      },
      dataExpiracao: {
        type: Date,
        required: false
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("usuario", UsuarioSchema, "usuarios");
