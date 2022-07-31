import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { UserService } from '../../auth/user/user.service';
import { FilterQueryDto } from '../../common/dto/filter-query.dto';
import { Dish } from './dish.entity';
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

  async read(
    userId: number,
    filters: FilterQueryDto<Dish>,
  ): Promise<{ result: Dish[]; total: number }> {
    const [result, total] = await this.dishRepository.findAndCount({
      take: filters.limit,
      skip: filters.offset,
      order: { [filters.orderBy]: filters.order },
      join: {
        alias: 'dish',
        leftJoinAndSelect: {
          ingredients: 'dish.ingredients',
          product: 'ingredients.product',
        },
      },
      where: [
        {
          name: Like('%' + filters.query + '%'),
          isPublic: true,
        },
        {
          name: Like('%' + filters.query + '%'),
          userId: userId,
        },
      ],
    });

    return {
      result,
      total,
    };
  }

  async getOneById(userId: number, id: number): Promise<Dish> {
    const dish = await this.dishRepository.findOne(id, {
      relations: ['user', 'ingredients', 'ingredients.product'],
      where: [{ userId }, { isPublic: true }],
    });
    if (!dish) {
      throw new NotFoundException('Dish not found');
    }
    return dish;
  }

  async update(userId: number, dish: UpdateDishDto) {
    const { id } = await this.getOneById(userId, dish.id);
    return this.dishRepository.update(id, dish);
  }

  async delete(userId, dishId: number): Promise<Dish> {
    const dishToRemove = await this.getOneById(userId, dishId);
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
