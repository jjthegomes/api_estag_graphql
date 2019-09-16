import Usuario from "../../models/usuario";
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
    usuario: usuario.bind(this, candidatura._doc.usuario),
    vaga: singleVaga.bind(this, candidatura._doc.vaga),
    createdAt: dateToString(candidatura._doc.createdAt),
    updatedAt: dateToString(candidatura._doc.updatedAt)
  };
};

export const transformVaga = vaga => {
  return {
    ...vaga._doc,
    _id: vaga.id,
    empresa: empresa.bind(this, vaga.empresa),
    dataInicio: validateDate(vaga._doc.dataInicio),
    dataFim: validateDate(vaga._doc.dataFim),
    updatedAt: dateToString(vaga._doc.updatedAt),
    createdAt: dateToString(vaga._doc.createdAt)
  };
};

export const transformUsuario = usuario => {
  return {
    ...usuario._doc,
    _id: usuario.id,
    candidaturas: candidaturas.bind(this, usuario.candidaturas)
  };
};

export const transformEmpresa = empresa => {
  return {
    ...empresa._doc,
    _id: empresa.id,
    vagas: vagas.bind(this, empresa.vagas)
  };
};
