import { OmitType } from '@nestjs/mapped-types';
import { UpdateDishDto } from './update-dish.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDishDto {
  @IsString()
  name: string;

  @IsNumber({}, { message: 'Servings must be a number' })
  servings: number;

  @IsString()
  description: string;
}
