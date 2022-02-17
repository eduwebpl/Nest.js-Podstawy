import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DishesController } from './dishes/dishes.controller';
import { ProductsController } from './products/products.controller';

@Module({
  imports: [],
  controllers: [AppController, DishesController, ProductsController],
  providers: [],
})
export class AppModule {}
