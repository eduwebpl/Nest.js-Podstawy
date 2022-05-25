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
import { AuthGuard } from '@nestjs/passport';
import { FilterQueryDto } from '../../common/dto/filter-query.dto';
import { Dish } from './dish.entity';
import { FilterBy } from '../../common/decorators/filter-by.decorator';

@Controller('dishes')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export class DishesController {
  private dishService: DishService;

  constructor(dishService: DishService) {
    this.dishService = dishService;
  }

  @Post()
  createOne(@Req() req, @Body() dish: CreateDishDto) {
    return this.dishService.create(req.user.id, dish);
  }

  @Get()
  readAll(@Req() req, @FilterBy<Dish>() filters: FilterQueryDto<Dish>) {
    return this.dishService.read(req.user.id, filters);
  }

  @Get(':id')
  readOne(@Req() req, @Param('id', ParseIntPipe) dishId: number) {
    return this.dishService.getOneById(req.user.id, dishId);
  }

  @Put()
  updateOne(@Req() req, @Body() dish: UpdateDishDto) {
    return this.dishService.update(req.user.id, dish);
  }

  @Delete(':id')
  deleteOne(@Req() req, @Param('id', ParseIntPipe) dishId: number) {
    return this.dishService.delete(req.user.id, dishId);
  }
}
