import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from './dish.entity';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { UserService } from '../../auth/user/user.service';
import slugify from 'slugify';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish) private dishRepository: Repository<Dish>,
    private readonly userService: UserService,
  ) {}

  async create(userId: number, dish: CreateDishDto): Promise<Dish> {
    const user = await this.userService.getOneById(userId);
    const slug = await this.generateSlug(dish.name);
    return this.dishRepository.save({
      ...dish,
      slug,
      user,
    });
  }

  read(limit: number, offset: number): Promise<Dish[]> {
    return this.dishRepository.find({
      where: { isPublic: true },
      take: limit,
      skip: offset,
    });
  }

  async getOneById(id: number, userId: number): Promise<Dish> {
    const dish = await this.dishRepository.findOne(id, {
      relations: ['user'],
    });
    if (!dish || (dish.isPublic === false && dish.user.id !== userId)) {
      throw new NotFoundException('Dish not found');
    }
    return dish;
  }

  async getOneOf(userId: number, id: number): Promise<Dish> {
    const dish = await this.dishRepository.findOne({
      id,
      userId,
    });
    if (!dish) {
      throw new NotFoundException('Dish not found');
    }
    return dish;
  }

  async update(dish: UpdateDishDto, userId: number) {
    await this.getOneById(dish.id, userId);
    return this.dishRepository.update(dish.id, dish);
  }

  async delete(dishId: number, userId: number): Promise<Dish> {
    const dishToRemove = await this.getOneById(dishId, userId);
    return this.dishRepository.remove(dishToRemove);
  }

  async generateSlug(name: string) {
    let slug = slugify(name, {
      replacement: '-',
      lower: true,
    });
    const exists = await this.findSlugs(slug);

    if (!exists || exists.length === 0) {
      return slug;
    }

    slug = slug + '-' + exists.length;
    return slug;
  }

  private async findSlugs(slug: string): Promise<Dish[]> {
    return await this.dishRepository
      .createQueryBuilder('dish')
      .where('slug LIKE :slug', { slug: `${slug}%` })
      .getMany();
  }
}
