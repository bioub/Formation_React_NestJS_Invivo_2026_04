import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { App } from 'supertest/types';

import { AppModule } from '../src/app.module';
import { ProductService } from '../src/shop/product.service';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/products (GET)', () => {
    const productService = app.get(ProductService);

    jest.spyOn(productService, 'getAll').mockResolvedValue([
      {
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        price: 100,
      },
    ]);

    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect([
        {
          id: 1,
          name: 'Product 1',
          description: 'Description 1',
          price: 100,
        },
      ]);
  });

  it('/products/1 (GET)', () => {
    const productService = app.get(ProductService);

    jest.spyOn(productService, 'getById').mockResolvedValue({
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
    });

    return request(app.getHttpServer())
      .get('/products/1')
      .expect(200)
      .expect({
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        price: 100,
      });
  });
});
