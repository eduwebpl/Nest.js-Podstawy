import { define } from 'typeorm-seeding';
import { User } from '../../../auth/user/user.entity';
import { Faker } from '@faker-js/faker';

define(User, (faker: Faker) => {
  const user = new User();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  return user;
});
