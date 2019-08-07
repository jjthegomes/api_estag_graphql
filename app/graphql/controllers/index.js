import authResolver from "./auth";
import candidaturaResolver from "./candidatura";
import empresaResolver from "./empresa";
import vagaResolver from "./vaga";

export default {
  ...authResolver,
  ...candidaturaResolver,
  ...empresaResolver,
  ...vagaResolver
};
