import { define } from 'typeorm-seeding';
import { Dish } from '../../../recipe/dishes/dish.entity';
import { Faker } from '@faker-js/faker';

define(Dish, (faker: Faker) => {
  const dish = new Dish();
  const productName = faker.commerce.productName();
  dish.name = productName;
  dish.slug = productName.replace(/ /g, '-').toLowerCase();
  dish.description = faker.lorem.paragraph();
  dish.servings = Math.floor(Math.random() * 10) + 1;
  dish.isPublic = [true, false][Math.floor(Math.random() * 2)];
  return dish;
});
