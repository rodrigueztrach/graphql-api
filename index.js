import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

dotenv.config();

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  app.use(morgan('dev'), cors(), express.json());
  app.use('/graphql', expressMiddleware(server));

  app.listen(4000, () => console.log('🚀 Servidor modularizado en puerto 4000'));
};

startServer();