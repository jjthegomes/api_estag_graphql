var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var VagaSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  }
});
var Model = mongoose.model("vaga", VagaSchema);
module.exports = Model;
