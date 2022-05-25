import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { BaseEntity } from 'typeorm';
import { FilterQueryDto } from '../dto/filter-query.dto';

export const FilterBy = createParamDecorator(
  <ENTITY extends BaseEntity>(
    data: FilterQueryDto<ENTITY>,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest();
    const {
      query = data?.query ?? '',
      offset = data?.offset ?? 0,
      limit = data?.limit ?? 10,
      order = data?.order ?? 'DESC',
      orderBy = data?.orderBy ?? 'createdAt',
    } = request.query;
    return new FilterQueryDto(query, offset, limit, order, orderBy);
  },
);
