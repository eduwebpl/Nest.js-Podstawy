import { OmitType } from '@nestjs/mapped-types';
import { UpdateUserDto } from './update-user.dto';

export class CreateUserDto extends OmitType(UpdateUserDto, ['id'] as const) {}
