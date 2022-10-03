import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../../auth/auth/jwt.guard';
import { FilterBy } from '../../common/decorators/filter-by.decorator';
import { Product } from './product.entity';
import { FilterQueryDto } from '../../common/dto/filter-query.dto';
import { PaginateQueryDto } from '../../common/dto/paginate-query.dto';

@Controller('products')
export class ProductsController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createOne(@Body() product: CreateProductDto) {
    return this.productService.create(product);
  }

  @Get()
  readAll(
    @FilterBy<Product>()
    filters: FilterQueryDto<Product>,
  ) {
    return this.productService.read(filters);
  }

  @Get(':id')
  readOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getOneById(id);
  }

  @Put()
  updateOne(@Body() product: UpdateProductDto) {
    return this.productService.update(product);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) productId: number) {
    return this.productService.delete(productId);
  }
}
