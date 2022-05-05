import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dish } from '../../recipe/dishes/dish.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => Dish, (dish: Dish) => dish.user)
  dishes: Dish[];

  @Exclude()
  @Column({ type: 'varchar' })
  refreshToken: string;
}
