import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import graphqlHttp from "express-graphql";

import GraphQlSchema from "./app/graphql/schema";
import GraphQlResolvers from "./app/graphql/controllers";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
    credentials: true
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  "/graphql",
  graphqlHttp({
    schema: GraphQlSchema,
    rootValue: GraphQlResolvers,
    graphiql: true
  })
);

app.listen(port, () => {
  console.log(`Node app is running at localhost: ${port}`);
});
