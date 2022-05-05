import { Injectable, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from './dish.entity';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import slugify from 'slugify';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish) private dishRepository: Repository<Dish>,
  ) {}

  async create(dish): Promise<Dish> {
    dish.slug = await this.generateSlug(dish.name);
    return this.dishRepository.save(dish);
  }

  read(): Promise<Dish[]> {
    return this.dishRepository.find({
      where: {
        isPublic: true,
      },
    });
  }

  async getOneById(id: number): Promise<Dish> {
    const dish = await this.dishRepository.findOne(id, {
      where: {
        isPublic: true,
      },
    });
    if (!dish) {
      throw new NotFoundException('Dish not found');
    }
    return dish;
  }

  async getOneOf(id: number, userId: number): Promise<Dish> {
    const dish = await this.dishRepository
      .createQueryBuilder('dish')
      .where('id = :id', { id })
      .where('"userId" = :userId', { userId })
      .getOne();

    if (!dish) {
      throw new NotFoundException('Dish not found');
    }
    return dish;
  }

  async update(dish: UpdateDishDto) {
    await this.getOneById(dish.id);
    return this.dishRepository.update(dish.id, dish);
  }

  async delete(dishId: number): Promise<Dish> {
    const dishToRemove = await this.getOneById(dishId);
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

    if (exists.length === 1) {
      return slug;
    }

    slug = slug + '-' + exists.length;

    return slug;
  }

  private async findSlugs(slug: string): Promise<Dish[]> {
    return await this.dishRepository
      .createQueryBuilder('dish')
      .where('slug like :slug', { slug: `${slug}%` })
      .getMany();
  }
}
