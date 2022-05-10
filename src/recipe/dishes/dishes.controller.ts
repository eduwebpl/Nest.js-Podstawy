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
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../../auth/auth/jwt.guard';
import { PaginateQueryDto } from '../../common/dto/paginate-query.dto';
import { IngredientService } from '../ingredients/ingredient.service';

@Controller('dishes')
@UseInterceptors(ClassSerializerInterceptor)
export class DishesController {
  constructor(
    private readonly dishService: DishService,
    private readonly ingredientService: IngredientService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createOne(@Req() req, @Body() dish: CreateDishDto) {
    return this.dishService.create(req.user.id, dish);
  }

  @Get()
  readAll(@Req() req, @Query() { limit = 10, offset = 0 }: PaginateQueryDto) {
    return this.dishService.read(limit, offset);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  readOne(@Req() req, @Param('id', ParseIntPipe) dishId: number) {
    return this.dishService.getOneById(dishId, req.user.id);
  }

  @Get(':id/ingredients')
  @UseGuards(JwtAuthGuard)
  readIngredients(@Req() req, @Param('id', ParseIntPipe) dishId: number) {
    return this.ingredientService.findBy({ dishId }, req.user.id);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  updateOne(@Req() req, @Body() dish: UpdateDishDto) {
    return this.dishService.update(dish, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteOne(@Req() req, @Param('id', ParseIntPipe) dishId: number) {
    return this.dishService.delete(dishId, req.user.id);
  }

  @Get('/exception')
  exampleException() {
    throw new HttpException('My super sample', HttpStatus.PAYLOAD_TOO_LARGE);
  }
}
