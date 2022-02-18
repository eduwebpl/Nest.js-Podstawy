import { OmitType } from '@nestjs/mapped-types';
import { UpdateDishDto } from './update-dish.dto';

export class CreateDishDto extends OmitType(UpdateDishDto, ['id'] as const) {}
