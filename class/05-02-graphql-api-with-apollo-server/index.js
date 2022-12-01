import { ApolloServer, gql } from "apollo-server";

// The GraphQL schema
const typeDefs = gql`
    type Query {
        "A simple type for getting started!"
        hello: String
    }
`;

// A map of functions which return data for the schema.
// express
// app.get('/', function (req, res) {
//     res.send('Hello Wordld')
//   })

// apollo-server
const resolvers = {
    Query: {
        hello: () => "world",
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// express
// app.listen(3000)

// apollo-server
server.listen(3000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
