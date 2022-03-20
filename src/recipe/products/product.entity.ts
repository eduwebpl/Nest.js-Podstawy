import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Dish } from '../dishes/dish.entity';
import { Ingredient } from '../ingredients/ingredient.entity';

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

  @OneToMany(() => Ingredient, (ingredient: Ingredient) => ingredient.product)
  ingredients: Ingredient[];
}
