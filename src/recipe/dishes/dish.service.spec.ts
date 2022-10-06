import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import { UserService } from '../../auth/user/user.service';
import { Dish } from './dish.entity';
import { DishService } from './dish.service';

describe('DishService', () => {
  let service: DishService;
  let dishRepository: Repository<Dish>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DishService,
        {
          provide: getRepositoryToken(Dish),
          useValue: {
            createQueryBuilder: jest.fn().mockReturnValue({
              where: () => ({ getMany: () => [] }),
            }),
          },
        },
        { provide: UserService, useValue: {} },
      ],
    }).compile();

    service = module.get<DishService>(DishService);
    dishRepository = module.get(getRepositoryToken(Dish));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('slugs', () => {
    it('should generate proper slug from given Dish name when NO Dish[] from findSlugs returned', async () => {
      const toSlug = 'french Fries with Vinegar';
      // jest.spyOn(service, 'findSlugs').mockReturnValue(Promise.resolve([]));

      const sluggedResult = await service.generateSlug(toSlug);

      expect(sluggedResult).toBe('french-fries-with-vinegar');
    });

    it('should add -3 to slug when 3 x Dish from findSlugs Dish[] returned', async () => {
      const toSlug = 'french Fries with    salt';
      jest.mocked(dishRepository.createQueryBuilder).mockReturnValue({
        where: () => ({
          getMany: async () => [new Dish(), new Dish(), new Dish()],
        }),
      } as undefined as SelectQueryBuilder<Dish>);

      const sluggedResult = await service.generateSlug(toSlug);

      expect(sluggedResult).toBe('french-fries-with-salt-3');
    });
  });
});
