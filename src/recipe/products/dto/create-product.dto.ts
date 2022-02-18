import { OmitType } from '@nestjs/mapped-types';
import { UpdateProductDto } from './update-product.dto';

export class CreateProductDto extends OmitType(UpdateProductDto, [
  'id',
] as const) {}
