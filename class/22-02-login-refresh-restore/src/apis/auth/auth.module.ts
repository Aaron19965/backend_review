import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';

@Module({
    imports: [
        JwtModule.register({}),
        TypeOrmModule.forFeature([User])
    ],
    providers: [AuthResolver, AuthService, UserService, JwtRefreshStrategy]
})
export class AuthModule{}

