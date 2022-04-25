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

export type UnitType =
  | 'kg'
  | 'g'
  | 'tsp'
  | 'sp'
  | 'pinch'
  | 'ml'
  | 'l'
  | 'item';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  unit: UnitType;

  @OneToMany(() => Ingredient, (ingredient: Ingredient) => ingredient.product, {
    onDelete: 'CASCADE',
  })
  ingredients: Ingredient[];
}
