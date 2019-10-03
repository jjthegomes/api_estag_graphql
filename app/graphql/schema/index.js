import { buildSchema } from "graphql";

module.exports = buildSchema(`
    type Cliente {
      _id: ID!
      usuario: Usuario!
      candidaturas: [Candidatura!]
      telefone: String
      formacaoAcademica: String
      formacaoProfissional: String
      habilidades: String
      experiencia: String
      endereco: Endereco
      redeSocial: RedeSocial
      createdAt: String!
      updatedAt: String!
    }

    type RedeSocial {
      lattes: String
      facebook: String
      linkedin: String
    }

     type Endereco {  
      cep: String
      logradouro: String
      bairro: String
      cidade: String
      numero: String
      uf: String
      complemento: String
    }

    type Usuario {
      _id: ID! 
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
      nome: String!
      requisitos: String!
      diferencial: String
      local: String
      tipo: String!
      modalidade: String!
      escolaridade: String
      jornada: Float!
      beneficios: String
      publica: Boolean
      descricao: String
      numeroVagas: String
      link: String
      area: String
      cidade: String
      estado: String
      empresa: Empresa!
      dataInicio: String!
      dataFinal: String!
      createdAt: String!
      updatedAt: String!
    }
    
    type Empresa {
      _id: ID!
      usuario: Usuario!
      nome: String!
      cnpj: String!
      email: String!      
      telefone: String
      sobre: String
      setor: String
      vagas: [Vaga!]
      createdAt: String!
      updatedAt: String!
    }

    type Candidatura {
      _id: ID!
      vaga: Vaga!
      cliente: Cliente!
      createdAt: String!
      updatedAt: String!
    }

    input EmpresaInput {
      nome: String!
      cnpj: String!
      email: String!
      telefone: String
      sobre: String
      setor: String
    }

     input VagaInput {
      nome: String!
      requisitos: String!
      tipo: String!
      modalidade: String!
      jornada: Int!     
      diferencial: String
      local: String
      escolaridade: String
      beneficios: String
      publica: Boolean
      descricao: String
      numeroVagas: Int
      link: String
      area: String
      cidade: String
      estado: String
      dataInicio: String!
      dataFinal: String!
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

     input ClienteInput {      
      telefone: String
      formacaoAcademica: String
      formacaoProfissional: String
      habilidades: String
      experiencia: String
      endereco: EnderecoInput
      redeSocial: RedeSocialInput      
    }

    input RedeSocialInput {
      lattes: String
      facebook: String
      linkedin: String
    }

    input EnderecoInput {  
      cep: String
      logradouro: String
      bairro: String
      cidade: String
      numero: String
      uf: String
      complemento: String
    }

    type AuthData {      
      usuario: Usuario!
      cliente: Cliente
      empresa: Empresa
      token: String!
      tokenExpiration: Int!
    }

    type RootQuery {
      usuarios: [Usuario!]!
      empresas: [Empresa!]!
      vagas: [Vaga!]!
      clientes: [Cliente!]!
      candidaturas: [Candidatura]!
      login(email: String!, senha: String!): AuthData!
      vagaById(id: ID!): Vaga!
      clienteById: Cliente!
      empresaById: Empresa!
    }

    type RootMutation {
      criarUsuario(usuarioInput: UsuarioInput): Usuario!
      editarUsuario(usuarioInput: UsuarioInput): Usuario!
      deletarUsuario: Usuario!

      criarCliente(clienteInput: ClienteInput): Cliente!
      editarCliente(clienteInput: ClienteInput): Cliente!
      deletarCliente: Cliente!

      criarEmpresa(empresaInput: EmpresaInput): Empresa!
      editarEmpresa(empresaInput: EmpresaInput): Empresa!
      deletarEmpresa: Empresa!

      criarVaga(vagaInput: VagaInput): Vaga! 
      editarVaga(vagaInput: VagaInput!, id: ID): Vaga! 
      deletarVaga(id: ID!): Vaga!

      candidatarVaga(vagaId: ID!): Candidatura!
      cancelarCandidatura(candidaturaId: ID!): Vaga!
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `);
