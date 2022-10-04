import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './dishes/dish.entity';
import { DishService } from './dishes/dish.service';
import { DishesController } from './dishes/dishes.controller';
import { Product } from './products/product.entity';
import { ProductService } from './products/product.service';
import { ProductsController } from './products/products.controller';
import { IngredientsController } from './ingredients/ingredients.controller';
import { IngredientService } from './ingredients/ingredient.service';
import { Ingredient } from './ingredients/ingredient.entity';
import { IngredientRepository } from './ingredients/ingredient.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Dish, Ingredient]), AuthModule],
  controllers: [DishesController, ProductsController, IngredientsController],
  providers: [
    ProductService,
    DishService,
    IngredientService,
    IngredientRepository,
  ],
})
export class RecipeModule {}
