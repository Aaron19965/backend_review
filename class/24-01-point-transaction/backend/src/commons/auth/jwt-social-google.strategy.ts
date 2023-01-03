import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(){
        super({
            clientID: process.env.OAUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
            scope: ['email', 'profile']
        })
    }

    validate(accessToken, refreshToken, profile){
        console.log(accessToken)
        console.log(refreshToken)
        console.log(profile)
        return{
            email: profile.emails[0].value,
            password: '1234',
            name: profile.displayName,
            age: 0
        }
    }
}

