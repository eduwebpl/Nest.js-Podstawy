import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(
    @Body() { email, password }: CreateUserDto,
    @Res() res,
  ): Promise<User> {
    const user = await this.authService.register({ email, password });
    const token = this.jwtService.sign({ user_id: user.id });

    return res
      .cookie('access_token', token, {
        httpOnly: true,
        domain: this.configService.get('DOMAIN'),
        expires: new Date(
          Date.now() + this.configService.get('JWT_EXPIRATION_SECRET') * 1000,
        ),
      })
      .json(user);
  }
}
