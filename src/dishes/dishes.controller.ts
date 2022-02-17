import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Dish } from './Dish';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

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
  createOne(@Body() dish: CreateDishDto) {
    const newDish: Dish = {
      id: this.trackId,
      ...dish,
    };
    this.dishes.push(newDish);
    return dish;
  }

  @Get()
  readAll() {
    return this.dishes;
  }

  @Put()
  updateOne(@Body() dish: UpdateDishDto) {
    const dishToUpdate = this.dishes.find(
      (d: Dish) => d.id === Number(dish.id),
    );
    if (!dishToUpdate) {
      throw new NotFoundException('Dish not found');
    } else {
      Object.assign(dishToUpdate, dish);
    }
    return dishToUpdate;
  }

  @Delete(':id')
  deleteOne(@Param('id') dishId: string) {
    const dishToRemove = this.dishes.find((d: Dish) => d.id === Number(dishId));
    if (!dishToRemove) {
      throw new NotFoundException(`Dish id: ${dishId} not found`);
    }
    this.dishes = this.dishes.filter((d: Dish) => d.id !== Number(dishId));
    return { dishId };
  }

  @Get('/exception')
  exampleException() {
    throw new HttpException('My super sample', HttpStatus.PAYLOAD_TOO_LARGE);
  }
}
