import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'development';
const dotenv_path = path.resolve(process.cwd(), `.env.${env}`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) {
  /* do nothing */
}

export class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      database: configService.get('DB_NAME'),
      port: parseInt(process.env.TYPEORM_PORT) || 5432,
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASSWORD'),
      host: process.env.DB_HOST || 'localhost',
      synchronize: false,
      migrationsRun: false,
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/database/migrations/**/*{.ts,.js}'],
      cli: { migrationsDir: 'src/database/migrations' },
    };
  }
}

export default TypeOrmConfig.getOrmConfig(new ConfigService());

export const databaseConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) =>
    TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
