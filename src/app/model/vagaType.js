const GraphQLObjectType = require("graphql").GraphQLObjectType;
const GraphQLNonNull = require("graphql").GraphQLNonNull;
const GraphQLID = require("graphql").GraphQLID;
const GraphQLString = require("graphql").GraphQLString;

exports.vagaType = new GraphQLObjectType({
  name: "vaga",
  fields: () => {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID)
      },
      nome: { type: GraphQLString },
      descricao: { type: GraphQLString }
    };
  }
});
