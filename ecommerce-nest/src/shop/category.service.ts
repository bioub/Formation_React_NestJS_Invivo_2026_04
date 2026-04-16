import { Injectable } from '@nestjs/common';

import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEntity } from './entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAll() {
    return this.categoryRepository.find();
  }

  async getById(id: number): Promise<CategoryEntity | null> {
    return this.categoryRepository.findOneBy({ id });
  }

  async create(category: CreateCategoryDto) {
    return this.categoryRepository.save(category);
  }

  async delete(id: number): Promise<CategoryEntity | null> {
    const deleted = await this.categoryRepository.findOneBy({
      id,
    });

    if (!deleted) {
      return null;
    }

    await this.categoryRepository.remove(deleted);

    return deleted;
  }
}
