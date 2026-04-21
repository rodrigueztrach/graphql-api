export const typeDefs = `#graphql
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