import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import * as bcrypt from 'bcrypt'

@Resolver()
export class UserResolver{
    constructor(
        private readonly userService: UserService
    ) {}

    @Query(() => User)
    async fetchUser(
        @Args('email') email: string
    ) {
        return await this.userService.findOne({email})
    }

    @Mutation(() => User)
    async createUser(
        @Args('email') email: string, 
        @Args('password') password: string,
        @Args('name') name: string,
        @Args('age') age: number
    ){
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)
        return this.userService.create({email, hashedPassword, name, age})
    }
}

