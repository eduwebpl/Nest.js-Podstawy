import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './Product';

@Injectable()
export class ProductService {
  private trackId = 1;
  private products: Product[] = [];

  create(product: CreateProductDto): Product {
    const newProduct: Product = {
      id: this.trackId++,
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  read(): readonly Product[] {
    return this.products;
  }

  getOneById(productId: number): Product {
    const product = this.products.find((p: Product) => p.id === productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  update(product: UpdateProductDto): Product {
    const productToUpdate = this.getOneById(product.id);
    Object.assign(productToUpdate, product);
    return productToUpdate;
  }

  delete(productId: number): { productId: number } {
    this.getOneById(productId);
    this.products = this.products.filter((p: Product) => p.id !== productId);
    return { productId };
  }
}
