import { Test, TestingModule } from '@nestjs/testing';
import { DishService } from '../dishes/dish.service';
import { ProductService } from '../products/product.service';
import { IngredientRepository } from './ingredient.repository';
import { IngredientService } from './ingredient.service';

describe('IngredientService', () => {
  let service: IngredientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngredientService,
        { provide: IngredientRepository, useValue: {} },
        { provide: DishService, useValue: {} },
        { provide: ProductService, useValue: {} },
      ],
    }).compile();

    service = module.get<IngredientService>(IngredientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
