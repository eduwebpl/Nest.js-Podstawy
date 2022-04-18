import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getOneById(id: number): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.dishes', 'dishes')
      .select(['user.id', 'user.email', 'dishes.name', 'dishes.id'])
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  hashPassword(password = '') {
    console.log(bcrypt.hashSync(password, 8));
    return bcrypt.hashSync(password, 8);
  }

  async create(user: CreateUserDto): Promise<User> {
    return this.userRepository.save({
      email: user.email.toLowerCase(),
      password: this.hashPassword(user.password),
    });
  }
}
