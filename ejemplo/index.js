// Importamos el servidor Apollo y la forma sencilla para arrancarlo
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// Schema: define qué se puede consultar y de qué tipo es cada dato
// Dice que hay una consulta "hola" que devuelve un String
const typeDefs = `#graphql
  type Query {
    hola: String
  }
`;

// Resolver: es la función que devuelve el dato de la consulta "hola"
const resolvers = {
  Query: {
    hola: () => "¡Hola mundo desde GraphQL!",
  },
};

// Creamos el servidor y lo ponemos a escuchar en el puerto 4000
const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });