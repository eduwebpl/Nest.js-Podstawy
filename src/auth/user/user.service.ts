import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOneBy(condition) {
    return this.userRepository.findOne(condition);
  }

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
    return bcrypt.hashSync(password, 8);
  }

  async create(user: Pick<CreateUserDto, 'email' | 'password'>): Promise<User> {
    return this.userRepository.save({
      email: user.email.toLowerCase(),
      password: this.hashPassword(user.password),
    });
  }

  async update(user: Partial<UpdateUserDto>): Promise<User> {
    const userToUpdate = await this.userRepository.findOne({
      where: { id: user.id },
    });
    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.save({
      ...userToUpdate,
      ...user,
    });
  }

  async delete(id: number): Promise<{ success: boolean }> {
    const userToDelete = await this.userRepository.findOne(id);
    if (!userToDelete) {
      throw new NotFoundException('User not found');
    }
    const { affected } = await this.userRepository.update(id, {
      email: v4(),
      password: v4(),
    });
    return affected ? { success: true } : { success: false };
  }
}
