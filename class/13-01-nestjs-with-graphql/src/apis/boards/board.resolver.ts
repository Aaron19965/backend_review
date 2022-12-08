import { Query, Resolver } from "@nestjs/graphql";
import { BoardService } from "./board.service";

@Resolver()
export class BoardResolver {
    constructor(private readonly boardService: BoardService) {}

    @Query(() => String) // import가 @nestjs/graphql인지 꼭 확인해주기
    getHello() {
        return this.boardService.aaa()
    }

}
