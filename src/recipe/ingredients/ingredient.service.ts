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

  async create(ingredient: CreateIngredientDto): Promise<Ingredient> {
    // TODO: get userId from token
    const dish = await this.dishService.getOneById(ingredient.dishId);
    if (!dish) {
      throw new NotFoundException('Dish not found');
    }
    const product = await this.productService.getOneById(ingredient.productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.ingredientRepository.save(ingredient);
  }
}
