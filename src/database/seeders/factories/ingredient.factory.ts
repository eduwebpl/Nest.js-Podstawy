import { define } from 'typeorm-seeding';
import { Ingredient } from '../../../recipe/ingredients/ingredient.entity';

define(Ingredient, () => {
  const ingredient = new Ingredient();
  ingredient.amount = Math.floor(Math.random() * 10) + 1;
  return ingredient;
});
