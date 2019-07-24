const GraphQLNonNull = require("graphql").GraphQLNonNull;
const GraphQLString = require("graphql").GraphQLString;

const vagaType = require("../../model/vagaType");
const vagaModel = require("../../model/vaga");

exports.updateVaga = {
  type: vagaType.vagaType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    nome: {
      type: new GraphQLNonNull(GraphQLString)
    },
    descricao: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (root, args) => {
    const UpdatedVaga = await vagaModel.findByIdAndUpdate(args.id, args);
    if (!UpdatedVaga) {
      throw new Error("Error");
    }
    return UpdatedVaga;
  }
};
