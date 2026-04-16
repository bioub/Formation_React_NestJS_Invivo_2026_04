import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entity/category.entity';
import { OrderEntity } from './entity/order.entity';
import { ProductEntity } from './entity/product.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, CategoryEntity, OrderEntity])],
  controllers: [ProductController, CategoryController, OrderController],
  providers: [ProductService, OrderService, CategoryService],
  exports: [OrderService],
})
export class ShopModule {}
