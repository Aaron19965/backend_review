import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BoardService } from "./board.service";
import { CreateBoardInput } from "./dto/createBoard.input";
import { Board } from "./entities/board.entity";
import { Cache } from 'cache-manager'

@Resolver()
export class BoardResolver {
    constructor(
        private readonly boardService: BoardService,
    
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
      ) {}

    @Query(() => [Board]) // import가 @nestjs/graphql인지 꼭 확인해주기
    fetchBoards() {
        return this.boardService.findAll()
    }

    @Mutation(() => String)
    async createBoard(
        @Args({ name: 'writer', nullable: true }) writer: string,
        @Args('title') title: string,
        @Args('contents') contents: string,
        @Args('createBoardInput') createBoardInput: CreateBoardInput
    ) {
        // 1. 캐시에 등록하는 연습
        await this.cacheManager.set('aaa', createBoardInput, {ttl: 0});

        // 2. 캐시에서 조회하는 연습
        const myCache = await this.cacheManager.get('aaa')
        console.log(myCache)

        return 'Cache Test'
        // return this.boardService.create({writer, title, contents, createBoardInput})
    }
}

