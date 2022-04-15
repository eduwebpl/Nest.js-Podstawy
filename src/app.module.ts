import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RecipeModule } from './recipe/recipe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { envValidationSchema } from './config/envValidation.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    RecipeModule,
    TypeOrmModule.forRootAsync(databaseConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        `.env`,
        `.env.local`,
        `.env.${process.env.NODE_ENV}`,
        `.env.${process.env.NODE_ENV}.local`,
      ],
      validationSchema: envValidationSchema,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
