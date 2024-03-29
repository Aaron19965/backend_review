import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly UserRepository: Repository<User>
    ){}
    
    async findOne({email}){
        return await this.UserRepository.findOne({email})
    }

    async create({email, hashedPassword: password, name, age}) {
        const user = await this.UserRepository.findOne({email})
        if(user) throw new ConflictException('이미 등록된 이메일 입니다')

        return await this.UserRepository.save({email, password, name, age})
    }
}

