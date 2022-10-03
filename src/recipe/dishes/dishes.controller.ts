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
import { JwtAuthGuard } from '../../auth/auth/jwt.guard';
import { IngredientService } from '../ingredients/ingredient.service';

@Controller('dishes')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export class DishesController {
  constructor(
    private readonly dishService: DishService,
    private readonly ingredientService: IngredientService,
  ) {}

  @Post()
  createOne(@Req() req, @Body() dish: CreateDishDto) {
    return this.dishService.create(req.user.id, dish);
  }

  @Get()
  readAll(@Req() req, @FilterBy<Dish>() filters: FilterQueryDto<Dish>) {
    return this.dishService.read(req.user.id, filters);
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
    return this.dishService.update(dish.id, req.user.id);
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
