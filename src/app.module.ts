import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [RecipeModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
