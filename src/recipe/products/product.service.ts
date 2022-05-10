import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DishService } from '../dishes/dish.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(product: CreateProductDto): Promise<Product> {
    // const newProduct = new Product();
    // Object.assign(newProduct, product);
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  read(limit: number, offset: number): Promise<Product[]> {
    return this.productRepository.find({
      take: limit,
      skip: offset,
    });
  }

  // getAllForDishId(dishId: number): Product[] {
  //   return this.products.filter((p: Product) => p.dishId === dishId);
  // }

  async getOneById(productId: number): Promise<Product> {
    const product = await this.productRepository.findOne(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(product: UpdateProductDto) {
    await this.getOneById(product.id);
    return this.productRepository.update(product.id, product);
  }

  async delete(productId: number): Promise<Product> {
    const productToRemove = await this.getOneById(productId);
    return this.productRepository.remove(productToRemove);
  }
}
