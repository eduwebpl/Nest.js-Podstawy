import { Faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';

import { Dish } from '../../recipe/dishes/dish.entity';

define(Dish, (faker: Faker) => {
  const dish = new Dish();
  dish.name = faker.commerce.productName();
  dish.slug = faker.commerce.productName().replace(/ /g, '-').toLowerCase();
  dish.description = faker.lorem.paragraph();
  dish.servings = Math.floor(Math.random() * 10) + 1;
  dish.isPublic = [true, false][Math.floor(Math.random() * 2)];
  return dish;
});
