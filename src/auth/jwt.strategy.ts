import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) throw new Error('JWT_SECRET must contain at least 32 characters');
    super({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), ignoreExpiration:false, secretOrKey:secret});
  }
  validate(payload: {sub:string,email:string}) {
    if (!payload.sub) throw new UnauthorizedException();
    return {userId:payload.sub,email:payload.email};
  }
}
