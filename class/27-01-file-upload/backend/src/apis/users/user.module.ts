import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserResolver, UserService, JwtAccessStrategy]
})
export class UserModule{}

