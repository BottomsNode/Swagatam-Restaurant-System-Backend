import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const jwtSecret = process.env.JWT_SECRET;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: `${jwtSecret}`,
        });
    }

    async validate(payload: any) {
        console.log('JWT Strategy Validate:', payload);
        return { id: payload.sub, email: payload.email };
    }
}