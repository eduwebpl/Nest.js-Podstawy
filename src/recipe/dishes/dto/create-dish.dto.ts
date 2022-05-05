import { OmitType } from '@nestjs/mapped-types';
import { UpdateDishDto } from './update-dish.dto';
import { User } from '../../../auth/user/user.entity';
import { IsOptional } from 'class-validator';

export class CreateDishDto extends OmitType(UpdateDishDto, ['id'] as const) {
  @IsOptional()
  user?: User;
}
