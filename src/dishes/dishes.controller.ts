import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

@Controller('dishes')
export class DishesController {
  private dishService: DishService;

  constructor(dishService: DishService) {
    this.dishService = dishService;
  }

  @Post()
  createOne(@Body() dish: CreateDishDto) {
    return this.dishService.create(dish);
  }

  @Get()
  readAll() {
    return this.dishService.read();
  }

  @Get(':id')
  readOne(@Param('id', ParseIntPipe) dishId: number) {
    return this.dishService.getOneById(dishId);
  }

  @Put()
  updateOne(@Body() dish: UpdateDishDto) {
    return this.dishService.update(dish);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) dishId: number) {
    return this.dishService.delete(dishId);
  }

  @Get('/exception')
  exampleException() {
    throw new HttpException('My super sample', HttpStatus.PAYLOAD_TOO_LARGE);
  }
}
