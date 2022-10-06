import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async update(
    userId: number,
    dishId: number,
    data: UpdateDishDto,
  ): Promise<Dish> {
    const dish = await this.getOneById(userId, dishId);
    if (!dish.id) {
      throw new NotFoundException('Dish not found');
    }
    if (dish.userId !== userId) {
      throw new ForbiddenException('You cannot edit this dish');
    }

    await this.dishRepository.save({
      id: dish.id,
      ...data,
    });

    return this.getOneById(userId, dishId);
  }

  async delete(userId, dishId: number): Promise<{ success: boolean }> {
    const dishToRemove = await this.getOneById(userId, dishId);
    if (!dishToRemove.id) {
      throw new NotFoundException('Dish not found');
    }
    if (dishToRemove.userId !== userId) {
      throw new ForbiddenException('You cannot delete this dish');
    }
    const { affected } = await this.dishRepository.delete(dishId);
    return affected ? { success: true } : { success: false };
  }

  async generateSlug(name: string) {
    const slug = slugify(name, {
      replacement: '-',
      lower: true,
    });
    const exists = await this.findSlugs(slug);

    if (exists.length === 0) {
      return slug;
    }
    return `${slug}-${exists.length}`;
  }

  private async findSlugs(slug: string): Promise<Dish[]> {
    return await this.dishRepository
      .createQueryBuilder('dish')
      .where('slug LIKE :slug', { slug: `${slug}%` })
      .getMany();
  }
}
