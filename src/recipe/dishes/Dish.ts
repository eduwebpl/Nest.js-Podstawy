import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Product } from '../products/Product';

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
  products: Product[];
}
// KISS (Keep It Simple Stupid)

// Dish ->> Product[]
