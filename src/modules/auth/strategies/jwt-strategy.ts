import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'RFV545UVGBhyDR3453ngyugt6gt6ngvcRT4v',
        });
    }

    async validate(payload: any) {
        console.log('JWT Strategy Validate:', payload);
        return { id: payload.sub, email: payload.email };
    }
}