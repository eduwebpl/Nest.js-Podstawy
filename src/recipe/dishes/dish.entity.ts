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
import { Ingredient } from '../ingredients/ingredient.entity';

@Entity()
export class Dish extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  slug: string;

  @Column({ type: 'decimal' })
  servings: number;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  @ManyToOne(() => User, (user: User) => user.dishes, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'boolean', default: false })
  isPublic: boolean;

  @OneToMany(() => Ingredient, (ingredient: Ingredient) => ingredient.dish, {
    onDelete: 'CASCADE',
  })
  ingredients: Ingredient[];
}
