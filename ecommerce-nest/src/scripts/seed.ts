import { fakerFR as faker } from '@faker-js/faker';
import { ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { EntityManager } from 'typeorm';

import { AppModule } from '../app.module';
import { CategoryEntity } from '../shop/entity/category.entity';
import { OrderEntity } from '../shop/entity/order.entity';
import { ProductEntity } from '../shop/entity/product.entity';
import { UserEntity } from '../user/entity/user.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: new ConsoleLogger({
      colors: false,
    }),
  });

  const entityManager = app.get(EntityManager);
  const categories: CategoryEntity[] = [];
  const products: ProductEntity[] = [];
  const users: UserEntity[] = [];
  const orders: OrderEntity[] = [];

  await entityManager.delete(OrderEntity, {});
  await entityManager.delete(ProductEntity, {});
  await entityManager.delete(CategoryEntity, {});
  await entityManager.delete(UserEntity, {});

  // Create 3 categories
  for (let i = 0; i < 3; i++) {
    const category = await entityManager.save(CategoryEntity, {
      name: faker.commerce.department(),
    });
    categories.push(category);
  }

  // Create 10 products
  for (let i = 0; i < 10; i++) {
    const product = await entityManager.save(ProductEntity, {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: Number.parseFloat(faker.commerce.price()),
      category: faker.helpers.arrayElement(categories),
    });
    products.push(product);
  }

  // Create 3 users
  for (let i = 0; i < 10; i++) {
    const user = await entityManager.save(UserEntity, {
      name: faker.commerce.productName(),
      email: faker.internet.email(),
      password: faker.internet.password(), // TODO: hash password
    });
    users.push(user);
  }

  // Create 5 orders
  for (let i = 0; i < 10; i++) {
    const order = await entityManager.save(OrderEntity, {
      date: faker.date.recent(),
      products: faker.helpers.shuffle(products).slice(0, faker.number.int({ min: 1, max: 5 })),
      user: faker.helpers.arrayElement(users),
    });
    orders.push(order);
  }

  await app.close();
}

bootstrap();
