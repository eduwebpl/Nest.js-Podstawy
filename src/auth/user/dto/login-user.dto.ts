import { OmitType, PickType } from '@nestjs/mapped-types';
import { UpdateUserDto } from './update-user.dto';
import { IsString } from 'class-validator';
import { Match } from '../../../decorators/match.decorator';

export class LoginUserDto extends PickType(UpdateUserDto, [
  'email',
  'password',
] as const) {}
