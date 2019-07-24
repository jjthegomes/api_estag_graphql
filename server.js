const express = require("express");
const app = express();
const mongoose = require("mongoose");

// import graphql-express and VagaSchema
const graphqlExpress = require("express-graphql");
const vagaSchema = require("./src/app/model/vagaSchema").VagaSchema;

//connecting to mongodb
mongoose.connect("mongodb://localhost:27017/estagql", err => {
  if (err) throw err;
  console.log("connected to mongo");
});

app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), () => {
  console.log("Node app is running at localhost:" + app.get("port"));
});

app.use(
  "/estagql",
  graphqlExpress({
    schema: vagaSchema,
    rootValue: global,
    graphiql: true
  })
);
