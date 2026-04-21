import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

// Cargar variables de entorno
dotenv.config();

// 1. Conexión a la Base de Datos (MySQL)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
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
      try {
        const [rows] = await pool.query('SELECT * FROM proyectos');
        return rows;
      } catch (error) {
        console.error("Error en Query proyectos:", error);
        throw new Error("No se pudieron obtener los proyectos");
      }
    },
  },
  Mutation: {
    crearProyecto: async (_, { nombre, descripcion }) => {
      try {
        const [result] = await pool.query(
          'INSERT INTO proyectos (nombre, descripcion) VALUES (?, ?)',
          [nombre, descripcion]
        );
        return { id: result.insertId, nombre, descripcion };
      } catch (error) {
        console.error("Error en Mutation crearProyecto:", error);
        throw new Error("No se pudo crear el proyecto");
      }
    },
  },
};

// 4. Configuración del Servidor
const startServer = async () => {
  const app = express();
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers 
  });

  // Es fundamental esperar a que Apollo inicie
  await server.start();

  // Middlewares de Express
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.json());

  // Aplicar el middleware de Apollo en la ruta /graphql
  app.use('/graphql', expressMiddleware(server));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}/graphql`);
  });
};

// Ejecutar la función de inicio
startServer().catch(err => {
  console.error("Error al iniciar el servidor:", err);
});