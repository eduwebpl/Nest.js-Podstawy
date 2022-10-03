import { OmitType } from '@nestjs/mapped-types';
import { UpdateIngredientDto } from './update-ingredient.dto';

export class CreateIngredientDto extends OmitType(UpdateIngredientDto, [
  'id',
] as const) {}
