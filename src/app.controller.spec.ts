import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getHello', () => {
    it('should return "Hello !"', () => {
      expect(appController.getHello()).toBe('Hello !');
    });
  });

  describe('createFruit', () => {
    it('should return proper fruit', () => {
      // Arrange
      const fruitDto = { name: 'Apple' };
      // Act
      const result = appController.createFruit(fruitDto);
      // Assert
      expect(result).toStrictEqual({ fruit: fruitDto });
    });
  });
});
