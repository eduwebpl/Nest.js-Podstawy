import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
import { FilterQueryDto } from '../../common/dto/filter-query.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(product: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  async read(
    filters: FilterQueryDto<Product>,
  ): Promise<{ result: Product[]; total: number }> {
    const [result, total] = await this.productRepository.findAndCount({
      take: filters.limit,
      skip: filters.offset,
      order: { [filters.orderBy]: filters.order },
      where: [{ name: Like('%' + filters.query + '%') }],
    });

    return {
      result,
      total,
    };
  }

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
