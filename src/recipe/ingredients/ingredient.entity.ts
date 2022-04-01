import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';
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

  @Column({ type: 'int' })
  productId: number;

  @Column({ type: 'int' })
  dishId: number;
}
