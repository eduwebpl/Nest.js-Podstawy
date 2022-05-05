import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { JwtAuthGuard } from '../../auth/auth/jwt.guard';

@Controller('dishes')
@UseInterceptors(ClassSerializerInterceptor)
export class DishesController {
  constructor(private readonly dishService: DishService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOne(@Req() req, @Body() dish: CreateDishDto) {
    return this.dishService.create({
      user: req.user,
      ...dish,
    });
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
  @UseGuards(JwtAuthGuard)
  updateOne(@Body() dish: UpdateDishDto) {
    return this.dishService.update(dish);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteOne(@Param('id', ParseIntPipe) dishId: number) {
    return this.dishService.delete(dishId);
  }
}
