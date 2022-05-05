import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { JwtAuthGuard } from '../../auth/auth/jwt.guard';
import { CreateIngredientDto } from './dto/create-dish.dto';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.ingredientService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOne(@Req() req, @Body() ingredient: CreateIngredientDto) {
    return this.ingredientService.create({
      userId: req.user.id,
      ...ingredient,
    });
  }
}
