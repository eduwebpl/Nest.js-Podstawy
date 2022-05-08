import { Injectable, NotFoundException } from '@nestjs/common';
import { IngredientRepository } from './ingredient.repository';
import { Ingredient } from './ingredient.entity';
import { DishService } from '../dishes/dish.service';
import { ProductService } from '../products/product.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';

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
    userId: number,
    ingredient: CreateIngredientDto,
  ): Promise<Ingredient> {
    const dish = await this.dishService.getOneOf(userId, ingredient.dishId);
    const product = await this.productService.getOneById(ingredient.productId);
    return this.ingredientRepository.save({ ...ingredient, dish, product });
  }
}
