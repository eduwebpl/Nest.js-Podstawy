import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../recipe/products/product.entity';
import { Dish } from '../recipe/dishes/dish.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  username: string;

  @OneToMany(() => Dish, (dish: Dish) => dish.user)
  dishes: Dish[];
}
