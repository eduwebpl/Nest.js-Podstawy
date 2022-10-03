import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { JwtAuthGuard } from '../../auth/auth/jwt.guard';

@Controller('ingredients')
@UseGuards(JwtAuthGuard)
export class IngredientsController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Req() req, @Param('id', new ParseIntPipe()) id: number) {
    return this.ingredientService.findOne(id, req.user.id);
  }

  @Post()
  createOne(@Req() req, @Body() ingredient: CreateIngredientDto) {
    return this.ingredientService.create(req.user.id, ingredient);
  }
}
