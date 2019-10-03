import Usuario from "../../models/usuario";
import Cliente from "../../models/cliente";
import Empresa from "../../models/empresa";
import Vaga from "../../models/vaga";
import Candidatura from "../../models/candidatura";
import { dateToString } from "../../helpers/date";

export const validateDate = date => {
  if (date) {
    return new Date(date).toISOString();
  }
  return new Date().toISOString();
};

const usuario = async userId => {
  try {
    const usuario = await Usuario.findById(userId);
    return {
      ...usuario._doc,
      _id: usuario.id,
      updatedAt: dateToString(usuario._doc.updatedAt),
      createdAt: dateToString(usuario._doc.createdAt)
      // candidaturas: candidaturas.bind(this, usuario.candidaturas)
    };
  } catch (error) {
    throw error;
  }
};

const cliente = async clienteId => {
  try {
    const cliente = await Cliente.findById(clienteId);
    return {
      ...cliente._doc,
      _id: cliente.id,
      updatedAt: dateToString(cliente._doc.updatedAt),
      createdAt: dateToString(cliente._doc.createdAt),
      usuario: usuario.bind(this, cliente.usuario),
      candidaturas: candidaturas.bind(this, cliente.candidaturas)
    };
  } catch (error) {
    throw error;
  }
};

const candidaturas = async candidaturaIds => {
  try {
    const candidaturas = await Candidatura.find({
      _id: { $in: candidaturaIds }
    });
    return candidaturas.map(candidatura => {
      return transformCandidatura(candidatura);
    });
  } catch (error) {
    throw error;
  }
};

const vagas = async vagaIds => {
  try {
    const vagas = await Vaga.find({ _id: { $in: vagaIds } });
    return vagas.map(vaga => {
      return transformVaga(vaga);
    });
  } catch (error) {
    throw error;
  }
};

const singleVaga = async vagaId => {
  try {
    const vaga = await Vaga.findById(vagaId);
    return transformVaga(vaga);
  } catch (error) {
    throw error;
  }
};

const empresa = async empresaId => {
  try {
    const empresa = await Empresa.findById(empresaId);
    return {
      ...empresa._doc,
      _id: empresa.id,
      vagas: vagas.bind(this, empresa.vagas),
      usuario: usuario.bind(this, empresa.usuario),
      createdAt: dateToString(empresa._doc.createdAt),
      updatedAt: dateToString(empresa._doc.updatedAt)
    };
  } catch (error) {
    throw error;
  }
};

export const transformCandidatura = candidatura => {
  return {
    ...candidatura._doc,
    _id: candidatura.id,
    cliente: cliente.bind(this, candidatura.cliente),
    vaga: singleVaga.bind(this, candidatura._doc.vaga),
    createdAt: dateToString(candidatura._doc.createdAt),
    updatedAt: dateToString(candidatura._doc.updatedAt)
  };
};

export const transformCliente = cliente => {
  return {
    ...cliente._doc,
    _id: cliente.id,
    usuario: usuario.bind(this, cliente.usuario),
    candidaturas: candidaturas.bind(this, cliente.candidaturas),
    updatedAt: dateToString(cliente._doc.updatedAt),
    createdAt: dateToString(cliente._doc.createdAt)
  };
};
export const transformVaga = vaga => {
  return {
    ...vaga._doc,
    _id: vaga.id,
    empresa: empresa.bind(this, vaga.empresa),
    dataInicio: validateDate(vaga._doc.dataInicio),
    dataFinal: validateDate(vaga._doc.dataFinal),
    updatedAt: dateToString(vaga._doc.updatedAt),
    createdAt: dateToString(vaga._doc.createdAt)
  };
};

export const transformUsuario = usuario => {
  return {
    ...usuario._doc,
    _id: usuario.id
  };
};

export const transformEmpresa = empresa => {
  return {
    ...empresa._doc,
    _id: empresa.id,
    vagas: vagas.bind(this, empresa.vagas)
  };
};
