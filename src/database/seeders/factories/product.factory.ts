import { Faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

import { Product } from '../../../recipe/products/product.entity';

type Unit = 'kg' | 'g' | 'tsp' | 'sp' | 'pinch' | 'ml' | 'l' | 'item';
const units: Unit[] = ['kg', 'g', 'tsp', 'sp', 'pinch', 'ml', 'l', 'item'];

define(Product, (faker: Faker) => {
  const product = new Product();
  product.name = faker.commerce.product();
  product.unit = units[Math.floor(Math.random() * units.length)];
  return product;
});
