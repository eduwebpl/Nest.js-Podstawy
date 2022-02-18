import { Module } from '@nestjs/common';
import { DishService } from './dishes/dish.service';
import { DishesController } from './dishes/dishes.controller';
import { ProductService } from './products/product.service';
import { ProductsController } from './products/products.controller';

@Module({
  controllers: [DishesController, ProductsController],
  providers: [ProductService, DishService],
})
export class RecipeModule {}
