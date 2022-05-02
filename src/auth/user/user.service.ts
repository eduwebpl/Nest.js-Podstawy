import * as bcrypt from 'bcryptjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(condition) {
    return this.userRepository.findOne(condition);
  }

  async create(user: Pick<CreateUserDto, 'email' | 'password'>): Promise<User> {
    return this.userRepository.save({
      email: user.email.trim().toLowerCase(),
      password: this.hashPassword(user.password),
    });
  }

  async update(id, props: Partial<UpdateUserDto>) {
    const user = await this.userRepository.preload({
      id,
      ...props,
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }

    return this.userRepository.save(user);
  }

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 8);
  }
}
