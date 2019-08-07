const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLList = require("graphql").GraphQLList;

const VagaModel = require("../model/vaga");
const vagaType = require("../model/vagaType").vagaType;

// Query
exports.VagaQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => {
    return {
      vagas: {
        type: new GraphQLList(vagaType),
        resolve: async () => {
          const vagas = await VagaModel.find();
          if (!vagas) {
            throw new Error("error while fetching data");
          }
          return vagas;
        }
      }
    };
  }
});
