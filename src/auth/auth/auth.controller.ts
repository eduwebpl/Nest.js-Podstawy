import { Body, Controller, HttpException, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { CreateUserDto } from '../user/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() { email, password }: CreateUserDto, @Res() res) {
    const user = await this.authService.register({ email, password });

    console.log();
    return res
      .cookie('access_token', user.accessToken, {
        httpOnly: true,
        domain: this.configService.get('DOMAIN'),
        expires: new Date(
          Date.now() + this.configService.get('JWT_EXPIRATION_TIME') * 1000,
        ),
      })
      .json(user);
  }
}
