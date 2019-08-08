import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/estagql", {
  useNewUrlParser: true
});

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.Promise = global.Promise;

module.exports = mongoose;
