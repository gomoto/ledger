import express = require('express');
import { ApolloServer, gql } from 'apollo-server-express';
import { config } from './config';
import fs = require('fs');
import path = require('path');
import bodyParser = require('body-parser');
import cors = require('cors');

// Resolvers
import {resolvers} from './resolvers';
import { authenticationRequired } from './middleware/authentication-required';

// Schema
const schema = fs.readFileSync(path.resolve(__dirname, './schema.graphql'));
const typeDefs = gql`${schema}`;

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(cors());
app.use(authenticationRequired());
app.use(bodyParser.json());
server.applyMiddleware({ app });

app.listen({ port: config.port }, () =>
  console.log(`🚀 Server ready at http://localhost:${config.port}${server.graphqlPath}`)
);
