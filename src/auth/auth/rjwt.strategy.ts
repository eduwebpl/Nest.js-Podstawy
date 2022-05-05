import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    private readonly authService: AuthService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return req?.cookies?.['refresh_token'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_REFRESH_SECRET_TOKEN'),
    });
  }

  async validate(payload: { user_id: number }) {
    const user = await this.authService.validateUser(payload.user_id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
