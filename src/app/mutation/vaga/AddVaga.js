const GraphQLNonNull = require("graphql").GraphQLNonNull;
const GraphQLString = require("graphql").GraphQLString;

const vagaType = require("../../model/vagaType");
const vagaModel = require("../../model/vaga");

exports.addVaga = {
  type: vagaType.vagaType,
  /* define the arguments that we should pass to the mutation
   here we require both vaga name and the description name 
   the id will be generated automatically 
*/
  args: {
    nome: {
      type: new GraphQLNonNull(GraphQLString)
    },
    descricao: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (root, args) => {
    //under the resolve method we get our arguments

    const uModel = new vagaModel(args);
    const newVaga = await uModel.save();
    if (!newVaga) {
      throw new Error("error");
    }
    return newVaga;
  }
};
