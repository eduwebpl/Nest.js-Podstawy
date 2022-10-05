import { Test, TestingModule } from '@nestjs/testing';
import { DishService } from './dish.service';
import { DishesController } from './dishes.controller';

describe('DishesController', () => {
  let controller: DishesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DishesController],
      providers: [{ provide: DishService, useValue: {} }],
    }).compile();

    controller = module.get<DishesController>(DishesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
