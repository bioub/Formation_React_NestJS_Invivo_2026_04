import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { ProductEntity } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(@Query('search') search?: string): Promise<ProductEntity[]> {
    if (search) {
      return this.productService.search(search);
    }
    return this.productService.getAll();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<ProductEntity> {
    const product = await this.productService.getById(+id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productService.create(createProductDto);
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: CreateProductDto): Promise<ProductEntity> {
    const product = await this.productService.update(+id, updateProductDto);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<ProductEntity> {
    const product = await this.productService.delete(+id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
