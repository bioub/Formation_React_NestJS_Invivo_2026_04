import { Injectable } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './entity/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async getAll() {
    return this.orderRepository.find({
      relations: ['products', 'user'],
    });
  }

  async getByUser(user: UserEntity) {
    return this.orderRepository.find({
      where: { user },
      relations: ['products', 'user'],
    });
  }

  async create(order: CreateOrderDto) {
    return this.orderRepository.save(order);
  }

  async delete(id: number): Promise<OrderEntity | null> {
    const deleted = await this.orderRepository.findOneBy({
      id,
    });

    if (!deleted) {
      return null;
    }

    await this.orderRepository.remove(deleted);

    return deleted;
  }
}
