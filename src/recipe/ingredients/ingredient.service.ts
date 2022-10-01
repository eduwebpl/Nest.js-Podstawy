import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IngredientRepository } from './ingredient.repository';
import { Ingredient } from './ingredient.entity';
import { DishService } from '../dishes/dish.service';
import { ProductService } from '../products/product.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Injectable()
export class IngredientService {
  constructor(
    private readonly ingredientRepository: IngredientRepository,
    private readonly dishService: DishService,
    private readonly productService: ProductService,
  ) {}

  async findOne(userId: number, id: number): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findOne(id, {
      relations: ['dish', 'product'],
    });
    if (
      !ingredient ||
      (ingredient.dish.userId !== userId && !ingredient.dish.isPublic)
    ) {
      throw new NotFoundException(`Ingredient with id ${id} not found`);
    }
    return ingredient;
  }

  async create(
    userId: number,
    ingredient: CreateIngredientDto,
  ): Promise<Ingredient> {
    const dish = await this.dishService.getOneById(userId, ingredient.dishId);
    if (!dish) {
      throw new NotFoundException('Dish not found');
    }
    const product = await this.productService.getOneById(ingredient.productId);
    return this.ingredientRepository.save({ ...ingredient, dish, product });
  }

  async update(
    userId: number,
    id: number,
    ingredient: UpdateIngredientDto,
  ): Promise<Ingredient> {
    const ingredientToUpdate = await this.findOne(userId, id);

    if (!ingredientToUpdate) {
      throw new NotFoundException(`Ingredient with id ${id} not found`);
    }

    if (ingredientToUpdate.dish.userId !== userId) {
      throw new ForbiddenException(
        'You are not allowed to update this ingredient',
      );
    }

    console.log(typeof ingredient.amount);

    await this.ingredientRepository.update(id, {
      ...ingredient,
    });

    return this.findOne(userId, id);
  }
}
