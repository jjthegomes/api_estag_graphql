import Usuario from "../../models/usuario";
import Empresa from "../../models/empresa";
import Vaga from "../../models/vaga";

import { dateToString } from "../../helpers/date";

const usuario = async userId => {
  try {
    const usuario = await Usuario.findById(userId);
    return {
      ...usuario._doc,
      _id: usuario.id,
      candidaturas: candidaturas.bind(this, usuario.candidaturas)
    };
  } catch (error) {
    throw error;
  }
};

const candidaturas = async candidaturaIds => {
  try {
    const candidaturas = await Vaga.find({ _id: { $in: candidaturaIds } });
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
    empresa: empresa.bind(this, vaga.empresa)
  };
};
