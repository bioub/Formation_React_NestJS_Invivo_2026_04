import { Controller, Body, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryDto } from './category-dto';

@Controller('category')
export class CategoryController {
  /*
    - `getCategories` (GET /categories)
  - `createCategory` (POST /categories)
  - `deleteCategory` (DELETE /categories/:id)
  */

  @Get()
  getCategories() {
    return 'getCategories';
  }

  @Post()
  createCategory(@Body() _category: CategoryDto) {
    return 'createCategory';
  }

  @Delete(':id')
  deleteCategory(@Param('id') _id: string) {
    return 'deleteCategory';
  }
}
