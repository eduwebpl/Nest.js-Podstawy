import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    user: Pick<CreateUserDto, 'email' | 'password'>,
  ): Promise<User> {
    return this.userService.create(user);
  }

  async login({ email, password }: LoginUserDto): Promise<User> {
    const user = await this.userService.findOneBy({ email });
    if (!user) {
      throw new BadRequestException(`User does not exist.`);
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new BadRequestException(`Wrong password.`);
    }

    return user;
  }

  async validateUser(userId): Promise<User> {
    return this.userService.findOneBy({ id: userId });
  }

  generateToken(payload) {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: `${this.configService.get<string>(
        'JWT_EXPIRATION_REFRESH_SECRET',
      )}s`,
      secret: this.configService.get<string>('JWT_REFRESH_SECRET_TOKEN'),
    });

    return [accessToken, refreshToken];
  }

  async tokenIsActive(token: string, hash: string): Promise<boolean> {
    const tokenIsActive = await bcrypt.compare(token, hash || '');

    if (!tokenIsActive) {
      throw new ForbiddenException();
    }

    return true;
  }

  async setAuthToken(
    res,
    payload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = this.generateToken(payload);

    await this.userService.update({
      id: payload.user_id,
      refreshToken: bcrypt.hashSync(refreshToken, 8),
    });

    res
      .cookie('access_token', accessToken, {
        httpOnly: true,
        domain: this.configService.get('DOMAIN'),
        expires: new Date(
          Date.now() + this.configService.get('JWT_EXPIRATION_SECRET') * 1000,
        ),
      })
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        domain: this.configService.get('DOMAIN'),
        expires: new Date(
          Date.now() +
            this.configService.get('JWT_EXPIRATION_REFRESH_SECRET') * 1000,
        ),
      });

    return { accessToken, refreshToken };
  }

  async clearAuthTokens(res, user_id) {
    await this.userService.update({
      id: user_id,
      refreshToken: null,
    });

    res
      .clearCookie('access_token', {
        domain: this.configService.get('DOMAIN'),
        httpOnly: true,
      })
      .clearCookie('refresh_token', {
        domain: this.configService.get('DOMAIN'),
        httpOnly: true,
      });
  }
}
