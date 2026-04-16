import { Injectable } from '@nestjs/common';

import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ id });
  }

  async create(product: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.save(product);
  }

  async update(id: number, product: CreateUserDto): Promise<UserEntity | null> {
    const updated = await this.userRepository.findOneBy({ id });

    if (!updated) {
      return null;
    }

    await this.userRepository.update(id, product);

    return updated;
  }

  async delete(id: number): Promise<UserEntity | null> {
    const deleted = await this.userRepository.findOneBy({ id });

    if (!deleted) {
      return null;
    }

    await this.userRepository.remove(deleted);
    return deleted;
  }
}
