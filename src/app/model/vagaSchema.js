const GraphQLSchema = require("graphql").GraphQLSchema;
const GraphQLObjectType = require("graphql").GraphQLObjectType;

const query = require("../controller/vagaQuery").VagaQuery;
const mutation = require("../mutation/vaga/VagaMutation");

exports.VagaSchema = new GraphQLSchema({
  query: query,
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: mutation
  })
});
