import { IsNumber, IsOptional } from 'class-validator';

export class UpdateIngredientDto {
  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsNumber()
  @IsOptional()
  productId?: number;

  @IsNumber()
  @IsOptional()
  dishId?: number;
}
