import { ApolloServer, gql } from "apollo-server";

// The GraphQL schema
const typeDefs = gql`
    type BoardReturn {
        number: Int
        writer: String
        title: String
        contents: String
    }
    type Query {
        # fetchBoards: BoardReturn => 객체 한개를 의미
        fetchBoards: [BoardReturn] # => 배열 안의 객체를 의미
    }
    type Mutation {
        createBoard: String
    }
`;

// apollo-server
const resolvers = {
    Query: {
        fetchBoards: () => {
            // 데이터베이스에서 데이터를 꺼내오는 로직 => 추후 입력

            return [
                { number: 1, writer: "철수", title: "제목1", contents: "내용1" },
                { number: 2, writer: "영희", title: "제목2", contents: "내용2" },
                { number: 3, writer: "훈이", title: "제목3", contents: "내용3" },
                { number: 4, writer: "맹구", title: "제목4", contents: "내용4" },
            ];
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

// apollo-server
server.listen(3000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});

