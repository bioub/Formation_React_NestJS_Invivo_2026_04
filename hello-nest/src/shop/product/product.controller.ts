import {
  Controller,
  Delete,
  Get,
  Post,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { ProductDto } from './product-dto';

@Controller('product')
export class ProductController {
  /*
  - `getProducts` (GET /products)
  - `getProductsById` (GET /products/:id)
  - `createProduct` (POST /products)
  - `updateProduct` (PATCH /products/:id)
  - `deleteProduct` (DELETE /products/:id)
  */

  @Get()
  getProducts() {
    return 'getProducts';
  }

  @Get(':id')
  getProductsById(@Param('id') _id: string) {
    return 'getProductsById';
  }

  @Post()
  createProduct(@Body() _product: ProductDto) {
    return 'createProduct';
  }

  @Patch(':id')
  updateProduct(@Param('id') _id: string, @Body() _product: ProductDto) {
    return 'updateProduct';
  }

  @Delete(':id')
  deleteProduct(@Param('id') _id: string) {
    return 'deleteProduct';
  }
}
