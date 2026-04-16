import { de } from '@faker-js/faker/.';
import { Test, TestingModule } from '@nestjs/testing';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let productController: ProductController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getAll() {
              return Promise.resolve([
                {
                  id: 1,
                  name: 'Product 1',
                  description: 'Description 1',
                  price: 100,
                },
              ]);
            },
          },
        },
      ],
    }).compile();

    productController = app.get<ProductController>(ProductController);
  });

  describe('getProducts', () => {
    it('should return a list of product without search', async () => {
      const result = await productController.getProducts();
      expect(result).toEqual([{ description: 'Description 1', id: 1, name: 'Product 1', price: 100 }]);
    });
    // it('should return a list of product with search', () => {
    // });
  });
});
