import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateIngredientDto {
  @IsNumber()
  id: number;

  @IsNumber({}, { message: 'Amount must be a number' })
  amount: number;

  @IsNumber()
  productId: number;

  @IsNumber()
  dishId: number;
}
