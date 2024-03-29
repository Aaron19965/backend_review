import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'myGuard') {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // req.headers.Authorization...
            secretOrKey: process.env.JWT_ACCESS_KEY
        })
    }

    validate(payload){
        console.log(payload) // { email: c@c.com, sub: qkwefuasdij-012093sd }
        return {
            email: payload.email,
            id: payload.sub
        }

    }
}

