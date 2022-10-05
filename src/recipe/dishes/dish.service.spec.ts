import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../../auth/user/user.service';
import { Dish } from './dish.entity';
import { DishService } from './dish.service';

describe('DishService', () => {
  let service: DishService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DishService,
        { provide: getRepositoryToken(Dish), useValue: {} },
        { provide: UserService, useValue: {} },
      ],
    }).compile();

    service = module.get<DishService>(DishService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
