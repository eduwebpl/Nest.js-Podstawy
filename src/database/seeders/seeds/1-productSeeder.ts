import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Product } from '../../../recipe/products/product.entity';
import { initializeSeeds } from '../initailizeSeeds';

initializeSeeds();

export default class productSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Product)().createMany(15);
  }
}
