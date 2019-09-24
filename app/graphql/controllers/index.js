import authResolver from "./auth";
import candidaturaResolver from "./candidatura";
import empresaResolver from "./empresa";
import vagaResolver from "./vaga";
import clienteResolver from './cliente';

export default {
  ...authResolver,
  ...candidaturaResolver,
  ...empresaResolver,
  ...vagaResolver,
  ...clienteResolver
};
