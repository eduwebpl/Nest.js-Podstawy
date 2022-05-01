import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(
    user: Pick<CreateUserDto, 'email' | 'password'>,
  ): Promise<User> {
    return this.userService.create(user);
  }
}
