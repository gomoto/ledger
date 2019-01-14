import express = require('express');
import { ApolloServer, gql } from 'apollo-server-express';
import { config } from './config';
import fs = require('fs');
import path = require('path');
import bodyParser = require('body-parser');

// Resolvers
import {resolvers} from './resolvers';

// Schema
const schema = fs.readFileSync(path.resolve(__dirname, './schema.graphql'));
const typeDefs = gql`${schema}`;

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(bodyParser.json());
server.applyMiddleware({ app });

app.listen({ port: config.port }, () =>
  console.log(`🚀 Server ready at http://localhost:${config.port}${server.graphqlPath}`)
);
