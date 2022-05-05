import { IsNumber, IsString } from 'class-validator';

export class UpdateIngredientDto {
  @IsNumber()
  id: number;

  @IsNumber()
  amount: number;

  @IsNumber({})
  productId: number;

  @IsNumber({})
  dishId: number;
}
