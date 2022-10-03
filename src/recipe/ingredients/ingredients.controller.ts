import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.ingredientService.findOne(id);
  }

  @Post()
  createOne(@Body() ingredient: CreateIngredientDto) {
    return this.ingredientService.create(ingredient);
  }
}
