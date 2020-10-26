const { ApolloServer } = require("apollo-server");

// orm library which lets us connect to mongodb database
const mongoose = require("mongoose");
const { MONGODB } = require("./config.js");
const Post = require("./models/Post");
const typeDefs = require("./graphql/typeDefs");

// for each query/mutation, has its corresponding resolver
// processes some sort of logic, and returns the expected value
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
