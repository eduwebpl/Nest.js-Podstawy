import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(user: Pick<CreateUserDto, 'email' | 'password'>): Promise<User> {
    return this.userRepository.save({
      email: user.email.trim().toLowerCase(),
      password: this.hashPassword(user.password),
    });
  }

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 8);
  }
}
