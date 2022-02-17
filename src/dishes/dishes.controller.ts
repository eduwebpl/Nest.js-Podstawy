import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Dish } from './Dish';

@Controller('dishes')
export class DishesController {
  trackId = 1;
  dishes: Dish[] = [
    {
      id: this.trackId++,
      name: 'Overnight Oats',
      servings: 2,
      description: 'Yummy breakfast',
    },
  ];

  @Post()
  createOne(@Body() dish: Dish) {
    dish.id = this.trackId++;
    this.dishes.push(dish);
    return dish;
  }

  @Get()
  readAll() {
    return this.dishes;
  }

  @Put()
  updateOne(@Body() dish: Dish) {
    const dishToUpdate = this.dishes.find(
      (d: Dish) => d.id === Number(dish.id),
    );
    if (dishToUpdate) {
      Object.assign(dishToUpdate, dish);
    }
    return dishToUpdate;
  }

  @Delete(':id')
  deleteOne(@Param('id') dishId: string) {
    this.dishes = this.dishes.filter((d: Dish) => d.id !== Number(dishId));
    return { dishId };
  }
}
