// Importamos el servidor Apollo y la forma sencilla para arrancarlo
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// type Videojuego -> definimos como van a ser los objetos videojuego dando a cada campo el nombre y el tipo de este. Si tenemos ! indica que el campo no puede ser null.
// type Query -> definimos lo que se puede leer. Videojuegos devuelve una lista con los juegos y videojuego devuelve unicamente el juego que pidamos
// type Mutation -> definimos lo que se puede modificar. Tenemos una operacion que recibe como parametros titulo y plataforma y devuelve el juego creado.
const typeDefs = `#graphql
    type Videojuego {
        id: ID!
        titulo: String!
        plataforma: String!
        anio: Int
        completado: Boolean!
    }

    type Query {
        videojuegos: [Videojuego!]!
        videojuego(id: ID!): Videojuego
    }

    type Mutation {
        anadirVideojuego(titulo: String!, plataforma: String!): Videojuego!
    }
`;

// Una lista con videojuegos guardados para hacer las pruebas.
const videojuegos = [
    { id: '1', titulo: 'Hollow Knight', plataforma: 'PC', anio: 2017, completado: true},
    { id: '2', titulo: 'Aion 2', plataforma: 'PC', anio: 2026, completado: false},
    { id: '3', titulo: 'Baldurs Gate 3', plataforma: 'PC', anio: null, completado: true}
];

// Resolvers
const resolvers = {
    // Resolvers Query -> Tienen el mismo nombre que en schema. Tiene las funciones para la busqueda y devolucion de los objetos 
    Query: {
        // La primera devuelve la lista completa
        videojuegos: () => videojuegos,
        // La segunda recorre la lista para buscar el primer elemento que cumpla la condicion. Si no encuentra ninguno es un undefined que GraphQL convierte en null.
        videojuego: (parent, args) => videojuegos.find((v) => v.id === args.id),
    },
    // Resolvers Mutation -> Define como vamos a añadir juegos mediante una operacion que recibe argumentos. Crea el objeto y lo añade a la lista de videojuegos. Por ultimo lo devuelve para mostrarlo al cliente.
    Mutation: {
        anadirVideojuego: (parent, args) => {
            const nuevo = {
                id: String(videojuegos.length + 1),
                titulo: args.titulo,
                plataforma: args.plataforma,
                completado: false,
            };
            videojuegos.push(nuevo);
            return nuevo;
        },
    },
};

// Creamos el servidor y lo ponemos a escuchar en el puerto 4000
const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
console.log(`Servidor listo en ${url}`);