import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from '../dishes/dish.entity';
import { Repository } from 'typeorm';
// import { Ingredient } from './ingredient.entity';

@Injectable()
export class IngredientService {
  constructor() {} // private ingredientRepository: Repository<Ingredient>, // @InjectRepository(Ingredient)
}
