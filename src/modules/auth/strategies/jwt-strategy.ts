import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const jwtSecret = process.env.JWT_SECRET;

export interface JwtPayload {
  sub: number;
  email: string;
  role: string;
  permissions?: string[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${jwtSecret}`,
    });
  }

  validate(payload: JwtPayload) {
    console.log(
      'JWT Strategy Validate (PAYLOAD) >>>>>>>>>>>>>>>>>>>>>>>>>> :',
      payload,
    );
    return { id: payload.sub, email: payload.email };
  }
}
