import { BaseEntity } from 'typeorm';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class FilterQueryDto<ENTITY extends BaseEntity> {
  @IsNumber()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  offset?: number;

  @IsString()
  @IsOptional()
  query?: string;

  @IsOptional()
  orderBy?: keyof ENTITY;

  @IsOptional()
  order?: 'ASC' | 'DESC';

  constructor(query, offset, limit, order, orderBy) {
    this.query = query;
    this.offset = Number(offset);
    this.limit = Number(limit);
    this.order = order;
    this.orderBy = orderBy;
  }
}
