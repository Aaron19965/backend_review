import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BoardService } from "./board.service";
import { CreateBoardInput } from "./dto/createBoard.input";
import { Board } from "./entities/board.entity";

@Resolver()
export class BoardResolver {
    constructor(private readonly boardService: BoardService) {}

    @Query(() => [Board]) // import가 @nestjs/graphql인지 꼭 확인해주기
    fetchBoards() {
        return this.boardService.findAll()
    }

    @Mutation(() => String)
    createBoard(
        @Args('writer') writer: string,
        @Args('title') title: string,
        @Args('contents') contents: string,
        @Args('createBoardInput') createBoardInput: CreateBoardInput
    ) {
        return this.boardService.create({writer, title, contents, createBoardInput})
    }
}

