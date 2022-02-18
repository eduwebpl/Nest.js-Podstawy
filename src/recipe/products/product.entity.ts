import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Dish } from '../dishes/dish.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  unit: 'kg' | 'g' | 'tsp' | 'sp' | 'pinch' | 'ml' | 'l' | 'item';

  @Column({ type: 'decimal' })
  amount: number;

  @ManyToOne(() => Dish, (dish: Dish) => dish.products, {
    onDelete: 'CASCADE',
  })
  dish: Dish;
}
