import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './dishes/Dish';
import { DishService } from './dishes/dish.service';
import { DishesController } from './dishes/dishes.controller';
import { Product } from './products/Product';
import { ProductService } from './products/product.service';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Dish])],
  controllers: [DishesController, ProductsController],
  providers: [ProductService, DishService],
})
export class RecipeModule {}
