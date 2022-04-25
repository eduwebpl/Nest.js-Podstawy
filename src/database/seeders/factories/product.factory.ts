import { define } from 'typeorm-seeding';
import { Product, UnitType } from '../../../recipe/products/product.entity';
import { Faker } from '@faker-js/faker';

const units: UnitType[] = ['kg', 'g', 'tsp', 'sp', 'pinch', 'ml', 'l', 'item'];

define(Product, (faker: Faker) => {
  const product = new Product();
  product.name = faker.commerce.product();
  product.unit = units[Math.floor(Math.random() * units.length)];
  return product;
});
