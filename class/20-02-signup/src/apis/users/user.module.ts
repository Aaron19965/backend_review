import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserResolver, UserService]
})
export class UserModule{}