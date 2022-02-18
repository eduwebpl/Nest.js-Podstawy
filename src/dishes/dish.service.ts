import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductService } from '../products/product.service';
import { Dish } from './Dish';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

@Injectable()
export class DishService {
  private trackId = 1;
  private dishes: Dish[] = [
    {
      id: this.trackId++,
      name: 'Overnight Oats',
      servings: 2,
      description: 'Yummy breakfast',
      products: [],
    },
  ];

  constructor(private productService: ProductService) {}

  create(dish: CreateDishDto): Dish {
    const newDish: Dish = {
      id: this.trackId++,
      products: [],
      ...dish,
    };
    this.dishes.push(newDish);
    return newDish;
  }

  read(): readonly Dish[] {
    return this.dishes.map((d: Dish) => {
      return {
        ...d,
        products: this.productService.getAllForDishId(d.id),
      };
    });
  }

  getOneById(id: number) {
    const dish = this.dishes.find((d: Dish) => d.id === id);
    if (!dish) {
      throw new NotFoundException('Dish not found');
    }
    return {
      ...dish,
      products: this.productService.getAllForDishId(id),
    };
  }

  update(dish: UpdateDishDto): Dish {
    const dishToUpdate = this.getOneById(dish.id);
    Object.assign(dishToUpdate, dish);
    return dishToUpdate;
  }

  delete(dishId: number): { dishId: number } {
    this.getOneById(dishId);
    this.dishes = this.dishes.filter((d: Dish) => d.id !== Number(dishId));
    return { dishId };
  }
}
