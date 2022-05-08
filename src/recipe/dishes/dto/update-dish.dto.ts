import { IsNumber, IsString, IsOptional } from 'class-validator';
import { User } from '../../../auth/user/user.entity';

export class UpdateDishDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber({}, { message: 'Servings must be a number' })
  servings: number;

  @IsString()
  description?: string;
}
