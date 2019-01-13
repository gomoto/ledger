import express = require('express');
import { ApolloServer, gql } from 'apollo-server-express';
import { config } from './config';
import fs = require('fs');
import path = require('path');

// Schema
const schema = fs.readFileSync(path.resolve(__dirname, './schema.graphql'));
const typeDefs = gql`${schema}`;

// Provide resolver functions for your schema fields
const resolvers = {
  // Query: {
  //   hello: () => 'Hello world!',
  // },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: config.port }, () =>
  console.log(`🚀 Server ready at http://localhost:${config.port}${server.graphqlPath}`)
);
