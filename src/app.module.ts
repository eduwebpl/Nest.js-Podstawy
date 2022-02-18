import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DishService } from './dishes/dish.service';
import { DishesController } from './dishes/dishes.controller';
import { ProductService } from './products/product.service';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [],
  controllers: [AppController, DishesController, ProductsController],
  providers: [ProductService, DishService],
})
export class AppModule {}
