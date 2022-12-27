import { UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UserService } from "../users/user.service";
import { AuthService } from "./auth.service";
import * as bcrypt from 'bcrypt'

@Resolver()
export class AuthResolver{
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ){}

    @Mutation(() => String)
    async loginUser(
        @Args('email') email: string,
        @Args('password') password: string
    ){
        // 1. 로그인(이메일이 일치하는 유저를 DB에서 찾기)
        const user = await this.userService.findOne({email})

        // 2. 일치하는 유저가 없으면 에러 던지기
        if(!user) throw new UnprocessableEntityException('해당 이메일이 존재하지 않습니다.')

        // 3. 일치하는 유저는 있지만, 비밀번호가 틀린 경우 에러 던지기
        const isAuth = await bcrypt.compare(password, user.password)
        if(!isAuth) throw new UnprocessableEntityException('비밀번호가 일치하지 않습니다.')

        // 4. 유저와 비밀번호가 일치한다면 accessToken(=JWT) 만들어서 브라우저에 전달
        return this.authService.getAccessToken({user})
    }
}

