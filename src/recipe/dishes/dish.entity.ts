import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany, ManyToOne,
} from 'typeorm';
import { Product } from '../products/product.entity';
import {User} from "../../user/user.entity";

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

  // One to Many
  @OneToMany(() => Product, (product: Product) => product.dish)
  products: Product[];

  @ManyToOne(() => User, (user: User) => user.dishes, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column({ type: 'boolean', default: false })
  isPublic: number;
}
// KISS (Keep It Simple Stupid)

// Dish ->> Product[]
