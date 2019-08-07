import { buildSchema } from "graphql";

module.exports = buildSchema(`
    type Usuario {
      _id: ID!,
      nome: String!
      email: String!
      senha: String
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
    }

     input VagaInput {
      titulo: String!
      requisitos: String!
      tipo: String!
      jornada: String!
    }

    input UserInput {
      nome: String!
      email: String!
      senha: String!
    }

    type RootQuery {
      empresas: [Empresa!]!
      vagas: [Vaga!]!
      vagasEmpresa(_id: ID!): [Vaga!]!
      candidaturas: [Candidatura]!
    }

    type RootMutation {
      createUser(userInput: UserInput): Usuario
      createEmpresa(empresaInput: EmpresaInput): Empresa
      createVaga(vagaInput: VagaInput): Vaga      
      candidatarVaga(vagaId: ID!): Candidatura!
      cancelarCandidatura(candidaturaId: ID!): Vaga!
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `);
