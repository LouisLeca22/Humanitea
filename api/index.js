
import express from 'express';
import { readFile } from 'fs/promises';
import { PrismaClient } from "@prisma/client";
import authRoute from "./auth.js"
import uploadRoute from "./multer.js"
import cookieParser from "cookie-parser";
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './resolvers.js';
import { context } from './context.js';
import dotenv from "dotenv"
dotenv.config()

export const prisma = new PrismaClient()

const app = express();
app.use(express.json(), cookieParser());


app.use('/auth', authRoute);
app.use("/upload", uploadRoute)

const typeDefs = await readFile('./schema.graphql', 'utf-8');

const apolloServer = new ApolloServer({ typeDefs, resolvers, context });
await apolloServer.start();
apolloServer.applyMiddleware({ app, path: '/graphql' });


app.listen({ port: process.env.PORT }, () => {
    console.log(`Server running on port ${process.env.PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${process.env.PORT}/graphql`);
  });