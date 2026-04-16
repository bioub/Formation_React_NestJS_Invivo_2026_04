import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { CategoryController } from './category/category.controller';

@Module({
  controllers: [ProductController, CategoryController]
})
export class ShopModule {}
