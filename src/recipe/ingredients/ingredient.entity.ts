import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Product } from '../products/product.entity';
import { User } from '../../user/user.entity';
import { Dish } from '../dishes/dish.entity';

@Entity()
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal' })
  amount: number;

  @ManyToOne(() => Product, (product: Product) => product.ingredients, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => Dish, (dish: Dish) => dish.ingredients, {
    onDelete: 'CASCADE',
  })
  dish: Dish;
}
