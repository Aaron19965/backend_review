import { ApolloServer, gql } from "apollo-server";

// The GraphQL schema
const typeDefs = gql`
    type Query {
        fetchBoards: String
    }
    type Mutation {
        createBoard: String
    }
`;

// A map of functions which return data for the schema.
// express
// app.get('/', function (req, res) {
//     res.send('Hello World')
//   })

// apollo-server
const resolvers = {
    Query: {
        fetchBoards: () => {
            // 데이터베이스에서 데이터를 꺼내오는 로직 => 추후 입력

            return "조회에 성공하였습니다.";
        },
    },
    Mutation: {
        createBoard: () => {
            // 데이터베이스에 데이터를 등록하는 로직 => 추후입력

            return "등록에 성공하였습니다.";
        },
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
