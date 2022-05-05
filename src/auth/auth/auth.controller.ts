import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from '../user/dto/login-user.dto';

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
    @Res({ passthrough: true }) res,
  ): Promise<User> {
    const user = await this.authService.register({ email, password });
    await this.authService.setAuthToken(res, {
      user_id: user.id,
    });

    return user;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() { email, password }: LoginUserDto,
    @Res({ passthrough: true }) res,
  ) {
    const user = await this.authService.login({ email, password });
    await this.authService.setAuthToken(res, {
      user_id: user.id,
    });

    return user;
  }

  @Get('logout')
  async logout(@Res() res) {
    await this.authService.clearAuthTokens(res);
    // TODO set refresh token as expired
    return res.json({
      message: 'Logged out',
    });
  }
}
