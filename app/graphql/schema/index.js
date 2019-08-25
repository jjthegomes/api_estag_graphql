import { buildSchema } from "graphql";

module.exports = buildSchema(`
    type Usuario {
      _id: ID!,
      candidaturas: [Candidatura!]
      nome: String!
      email: String!
      senha: String
      tipo: String
      genero: String
      celular: String
      dataNascimento: String
      ativo: String
      fotoPerfil: String   
      token: String      
      createdAt: String!
      updatedAt: String!
    }
    
    type Vaga {
      _id: ID!
      titulo: String!
      requisitos: String!
      diferencial: String
      local: String
      tipo: String!
      escolaridade: String
      jornada: Float!
      beneficios: String
      publica: Boolean
      descricao: String
      numeroVagas: String
      link: String
      categoria: String
      cidade: String
      estado: String
      empresa: Empresa!
      createdAt: String!
      updatedAt: String!
    }
    
    type Empresa {
      _id: ID!
      nome: String!
      cnpj: String!
      email: String!
      senha: String!
      telefone: String
      sobre: String
      setor: String
      porte: String
      vagas: [Vaga!]
      createdAt: String!
      updatedAt: String!
    }

    type Candidatura {
      _id: ID!
      vaga: Vaga!
      usuario: Usuario!
      createdAt: String!
      updatedAt: String!
    }

    input EmpresaInput {
      nome: String!
      cnpj: String!
      email: String!
      senha: String!
      telefone: String
      sobre: String
      setor: String
      porte: String
    }

     input VagaInput {
      titulo: String!
      requisitos: String!
      tipo: String!
      jornada: Int!     
      diferencial: String
      local: String
      escolaridade: String
      beneficios: String
      publica: Boolean
      descricao: String
      numeroVagas: Int
      link: String
      categoria: String
      cidade: String
      estado: String
    }

    input UsuarioInput {
      nome: String!
      email: String!
      senha: String!
      tipo: String
      genero: String
      celular: String
      dataNascimento: String
      ativo: String
      fotoPerfil: String   
    }

    type AuthData {
      usuarioId: ID!
      token: String!
      tokenExpiration: Int!
    }

    type RootQuery {
      usuarios: [Usuario!]!
      empresas: [Empresa!]!
      vagas: [Vaga!]!
      candidaturas: [Candidatura]!
      login(email: String!, senha: String!): AuthData!
      usuarioById: Usuario!
    }

    type RootMutation {
      criarUsuario(usuarioInput: UsuarioInput): Usuario!
      editarUsuario(usuarioInput: UsuarioInput): Usuario!
      deletarUsuario(usuarioId: ID!): Usuario!

      criarEmpresa(empresaInput: EmpresaInput): Empresa!
      deletarEmpresa(empresaId: ID!): Empresa!

      criarVaga(vagaInput: VagaInput, empresaId: ID!): Vaga! 
      deletarVaga(vagaId: ID!): Vaga!

      candidatarVaga(vagaId: ID!): Candidatura!
      cancelarCandidatura(candidaturaId: ID!): Vaga!
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `);
