import { Injectable } from '@nestjs/common';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/create-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  generateAccessToken(user_id) {
    return jwt.sign({ id: user_id }, this.configService.get('JWT_SECRET'), {
      expiresIn: 86400,
    });
  }

  async generateRefreshToken(user_id) {
    const refreshToken = jwt.sign(
      { id: user_id },
      this.configService.get('JWT_REFRESH_SECRET'),
    );

    await this.userService.update({ id: user_id, refreshToken });

    return refreshToken;
  }

  async register({ email, password }: CreateUserDto): Promise<{
    id: number;
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.userService.create({ email, password });
    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = await this.generateRefreshToken(user.id);

    return {
      id: user.id,
      accessToken,
      refreshToken,
    };
  }
}
