import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Product } from '../products/product.entity';

@Entity()
export class Dish extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'decimal' })
  servings: number;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  // One to Many
  @OneToMany(() => Product, (product: Product) => product.dish)
  products: Product[];
}
// KISS (Keep It Simple Stupid)

// Dish ->> Product[]
