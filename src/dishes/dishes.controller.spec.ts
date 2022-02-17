import { Test, TestingModule } from '@nestjs/testing';
import { DishesController } from './dishes.controller';

describe('DishesController', () => {
  let controller: DishesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DishesController],
    }).compile();

    controller = module.get<DishesController>(DishesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
