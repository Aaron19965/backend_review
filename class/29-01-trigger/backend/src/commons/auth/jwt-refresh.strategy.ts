import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh'){
    constructor(){
        super({
            jwtFromRequest: (req) => {
                const cookie = req.headers.cookie;
                const refreshToken = cookie.replace('refreshToken=', '')
                return refreshToken
            },
            secretOrKey: process.env.JWT_REFRESH_KEY
        })
    }

    validate(payload) {
        console.log(payload) // { email: c@c.com, sub: qkwefuasdij-012093sd }
        return {
            email: payload.email,
            id: payload.sub
        }

    }
}

