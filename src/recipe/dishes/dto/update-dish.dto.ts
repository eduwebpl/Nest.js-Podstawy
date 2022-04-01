import { IsNumber, IsString, IsOptional } from 'class-validator';
import { User } from '../../../user/user.entity';

export class UpdateDishDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber({}, { message: 'Servings must be a number' })
  servings: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  userId: number;
}
