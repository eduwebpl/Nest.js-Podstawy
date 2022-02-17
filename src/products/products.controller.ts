import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './Product';

@Controller('products')
export class ProductsController {
  trackId = 1;
  products: Product[] = [];

  @Post()
  createOne(@Body() product: CreateProductDto) {
    const newProduct: Product = {
      id: this.trackId++,
      ...product,
    };
    this.products.push(newProduct);
    return product;
  }

  @Get()
  readAll() {
    return this.products;
  }

  @Put()
  updateOne(@Body() product: UpdateProductDto) {
    const productToUpdate = this.products.find(
      (p: Product) => p.id === Number(p.id),
    );
    if (!productToUpdate) {
      throw new NotFoundException('Product not found');
    } else {
      Object.assign(productToUpdate, product);
    }
    return productToUpdate;
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) productId: number) {
    const productToRemove = this.products.find(
      (d: Product) => d.id === productId,
    );
    if (!productToRemove) {
      throw new NotFoundException(`Product id: ${productId} not found`);
    }
    this.products = this.products.filter((p: Product) => p.id !== productId);
    return { productId };
  }
}
