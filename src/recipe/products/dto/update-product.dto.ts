import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  unit: 'kg' | 'g' | 'tsp' | 'sp' | 'pinch' | 'ml' | 'l' | 'item';

  @IsNumber()
  amount: number;
}
