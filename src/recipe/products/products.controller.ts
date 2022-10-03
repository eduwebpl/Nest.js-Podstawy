import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductsController {
  private productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  @Post()
  createOne(@Body() product: CreateProductDto) {
    return this.productService.create(product);
  }

  @Get()
  readAll() {
    return this.productService.read();
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
