import { define } from 'typeorm-seeding';
import { User } from '../../../user/user.entity';
import { Faker } from '@faker-js/faker';

define(User, (faker: Faker) => {
  const user = new User();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  user.username = `${firstName} ${lastName}`;
  return user;
});
