import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DishesController } from './dishes/dishes.controller';

@Module({
  imports: [],
  controllers: [AppController, DishesController],
  providers: [],
})
export class AppModule {}
