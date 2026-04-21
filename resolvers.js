import { pool } from './db.js';

export const resolvers = {
  Query: {
    proyectos: async () => {
      try {
        const [rows] = await pool.query('SELECT * FROM proyectos');
        return rows;
      } catch (error) {
        throw new Error("Error fetching projects from database");
      }
    },
  },
  Mutation: {
    crearProyecto: async (_, { nombre, descripcion }) => {
      // VALIDACIÓN SIMPLE
      if (nombre.length < 3) {
        throw new Error("El nombre debe tener al menos 3 caracteres.");
      }

      try {
        const [result] = await pool.query(
          'INSERT INTO proyectos (nombre, descripcion) VALUES (?, ?)',
          [nombre, descripcion]
        );
        return { id: result.insertId, nombre, descripcion };
      } catch (error) {
        throw new Error("Could not save the project. Please try again later.");
      }
    },
  },
};