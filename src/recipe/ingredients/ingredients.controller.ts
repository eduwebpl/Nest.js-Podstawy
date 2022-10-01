import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { JwtAuthGuard } from '../../auth/auth/jwt.guard';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Controller('ingredients')
@UseGuards(JwtAuthGuard)
export class IngredientsController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get(':id')
  async findOne(@Req() req, @Param('id', new ParseIntPipe()) id: number) {
    return this.ingredientService.findOne(req.user.id, id);
  }

  @Post()
  createOne(@Req() req, @Body() ingredient: CreateIngredientDto) {
    return this.ingredientService.create(req.user.id, ingredient);
  }

  @Patch(':id')
  update(
    @Req() req,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() ingredient: UpdateIngredientDto,
  ) {
    return this.ingredientService.update(req.user.id, id, ingredient);
  }
}
