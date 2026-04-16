import { Controller, Get, Post, Body, Delete, Param, HttpCode, NotFoundException } from '@nestjs/common';
import { OrderEntity } from './entity/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getOrders(): Promise<OrderEntity[]> {
    return this.orderService.getAll();
  }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    return this.orderService.create(createOrderDto);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string): Promise<OrderEntity> {
    const deleted = await this.orderService.delete(+id);

    if (!deleted) {
      throw new NotFoundException('Order not found');
    }

    return deleted;
  }
}
