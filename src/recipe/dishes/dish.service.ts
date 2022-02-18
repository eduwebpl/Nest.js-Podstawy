import { Injectable, NotFoundException } from '@nestjs/common';
import { Dish } from './Dish';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

@Injectable()
export class DishService {
  create(dish: CreateDishDto): Promise<Dish> {
    const newDish = new Dish();
    Object.assign(newDish, dish);
    return newDish.save();
  }

  read(): Promise<Dish[]> {
    return Dish.find();
  }

  async getOneById(id: number): Promise<Dish> {
    const dish = await Dish.findOne({ id });
    if (!dish) {
      throw new NotFoundException('Dish not found');
    }
    return dish;
  }

  async update(dish: UpdateDishDto): Promise<Dish> {
    const dishToUpdate = await this.getOneById(dish.id);
    Object.assign(dishToUpdate, dish);
    return dishToUpdate.save();
  }

  async delete(dishId: number): Promise<Dish> {
    const dishToRemove = await this.getOneById(dishId);
    return dishToRemove.remove();
  }
}
