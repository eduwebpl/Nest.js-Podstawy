import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginateQueryDto {
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit: number;

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  offset: number;
}
