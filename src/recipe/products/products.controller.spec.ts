import { Test, TestingModule } from '@nestjs/testing';
import { FilterQueryDto } from '../../common/dto/filter-query.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductsController } from './products.controller';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            read() {},
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productService = module.get(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('readAll', () => {
    it('should give paginated product result and use the service .read', async () => {
      const filter = new FilterQueryDto<Product>();
      const product = new Product();
      Object.assign(product, { id: 1, name: 'Sample Product' });
      jest.spyOn(productService, 'read').mockImplementation(async () => ({
        result: [product],
        total: 1,
      }));

      const result = await controller.readAll(filter);

      expect(result).toEqual({
        result: [{ id: 1, name: 'Sample Product' }],
        total: 1,
      });
      expect(productService.read).toHaveBeenCalled();
    });

    it.todo('should have count method');
  });
});
