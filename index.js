import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4/index.js';
import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

dotenv.config();

// 1. Conexión a la Base de Datos
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test_db',
});

// 2. Definición de Esquema (GraphQL Schema)
const typeDefs = `#graphql
  type Proyecto {
    id: ID
    nombre: String
    descripcion: String
  }

  type Query {
    proyectos: [Proyecto]
  }

  type Mutation {
    crearProyecto(nombre: String!, descripcion: String): Proyecto
  }
`;

// 3. Lógica de los Datos (Resolvers)
const resolvers = {
  Query: {
    proyectos: async () => {
      const [rows] = await pool.query('SELECT * FROM proyectos');
      return rows;
    },
  },
  Mutation: {
    crearProyecto: async (_, { nombre, descripcion }) => {
      const [result] = await pool.query(
        'INSERT INTO proyectos (nombre, descripcion) VALUES (?, ?)',
        [nombre, descripcion]
      );
      return { id: result.insertId, nombre, descripcion };
    },
  },
};

// 4. Configuración del Servidor
const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

await server.start();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Ruta donde vivirá tu API
app.use('/graphql', expressMiddleware(server));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}/graphql`);
});