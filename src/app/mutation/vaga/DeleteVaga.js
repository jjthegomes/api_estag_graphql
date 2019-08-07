const GraphQLNonNull = require("graphql").GraphQLNonNull;
const GraphQLString = require("graphql").GraphQLString;

const vagaType = require("../../model/vagaType");
const vagaModel = require("../../model/vaga");

exports.removeVaga = {
  type: vagaType.vagaType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (root, args) => {
    const removedVaga = await vagaModel.findByIdAndRemove(args.id);
    if (!removedVaga) {
      throw new Error("error");
    }
    return removedVaga;
  }
};
