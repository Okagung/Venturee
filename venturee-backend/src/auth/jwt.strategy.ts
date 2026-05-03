import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'RAHASIA_NEGARA_BALI_2026', // Harus sama dengan yang di AuthModule
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}