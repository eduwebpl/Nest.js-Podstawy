import { IsNumber } from 'class-validator';

export class CreateIngredientDto {
  @IsNumber()
  amount: number;

  @IsNumber()
  productId: number;

  @IsNumber()
  dishId: number;
}
