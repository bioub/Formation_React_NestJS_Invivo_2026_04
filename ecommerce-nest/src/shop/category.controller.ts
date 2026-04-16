import { Controller, Get, Post, Body, Delete, Param, NotFoundException } from '@nestjs/common';
import { CategoryEntity } from './entity/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { ProductEntity } from './entity/product.entity';
import { ApiResponse } from '@nestjs/swagger';
import { ProductService } from './product.service';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
  ) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Return all categories' })
  async getCategories(): Promise<CategoryEntity[]> {
    return this.categoryService.getAll();
  }

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.categoryService.create(createCategoryDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Return all categories' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async deleteCategory(@Param('id') id: string): Promise<CategoryEntity> {
    const deleted = await this.categoryService.delete(+id);

    if (!deleted) {
      throw new NotFoundException('Category not found');
    }

    return deleted;
  }

  @Get(':id/products')
  async getProductsByCategory(@Param('id') id: string): Promise<ProductEntity[]> {
    const category = await this.categoryService.getById(+id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.productService.getByCategory(category);
  }
}
