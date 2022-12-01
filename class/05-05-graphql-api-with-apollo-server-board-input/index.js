import { ApolloServer, gql } from "apollo-server";
import { checkValidationPhone, getToken, sendTokenToSMS } from "./phone.js";

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
    input CreateBoardInput {
        writer: String
        title: String
        contents: String
    }
    type Mutation {
        createBoard(createBoardInput: CreateBoardInput): String
        createTokenOfPhone(phone: String!): String
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
        createBoard: (_, args) => {
            // 데이터베이스에 데이터를 등록하는 로직 => 추후입력

            console.log("입력값들: ", args);
            console.log("입력값들2: ", args.createBoardInput);

            return "등록에 성공하였습니다.";
        },
        createTokenOfPhone: (_, args) => {
            // 1. 휴대폰번호 자릿수 맞는지 확인하기
            const isValidationPhone = checkValidationPhone(args.phone);
            if (isValidationPhone === true) {
                // 2. 핸드폰 토큰 6자리 만들기
                const token = getToken(6);

                // 3. 핸드폰번호에 토큰 전송하기
                sendTokenToSMS(args.phone, token);
            }
            return "인증번호를 전송했습니다.";
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
