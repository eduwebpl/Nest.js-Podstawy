import { IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
