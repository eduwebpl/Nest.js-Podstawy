import { Test, TestingModule } from '@nestjs/testing';
import { IngredientService } from './ingredient.service';
import { IngredientsController } from './ingredients.controller';

describe('IngredientsController', () => {
  let controller: IngredientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientsController],
      providers: [{ provide: IngredientService, useValue: {} }],
    }).compile();

    controller = module.get<IngredientsController>(IngredientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
