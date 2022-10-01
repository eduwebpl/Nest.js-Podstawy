import { IsNumber, IsString, IsOptional } from 'class-validator';
import { User } from '../../../auth/user/user.entity';

export class UpdateDishDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber({}, { message: 'Servings must be a number' })
  @IsOptional()
  servings?: number;

  @IsString()
  @IsOptional()
  description?: string;
}
