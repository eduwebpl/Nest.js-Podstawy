import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientRepository } from './ingredient.repository';
import { Ingredient } from './ingredient.entity';
import { CreateIngredientDto } from './dto/create-dish.dto';
import { ProductService } from '../products/product.service';
import { DishService } from '../dishes/dish.service';

@Injectable()
export class IngredientService {
  constructor(
    private readonly ingredientRepository: IngredientRepository,
    private readonly dishService: DishService,
    private readonly productService: ProductService,
  ) {}

  async findOne(id: number): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findById(id);
    if (!ingredient) {
      throw new NotFoundException(`Ingredient with id ${id} not found`);
    }
    return ingredient;
  }

  async create(
    ingredient: CreateIngredientDto & { userId: number },
  ): Promise<Ingredient> {
    const dish = await this.dishService.getOneOf(
      ingredient.dishId,
      ingredient.userId,
    );
    const product = await this.productService.getOneById(ingredient.productId);

    return this.ingredientRepository.save({
      dish,
      product,
      ...ingredient,
    });
  }
}
