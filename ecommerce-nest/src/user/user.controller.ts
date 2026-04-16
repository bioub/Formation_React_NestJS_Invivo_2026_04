import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
  Logger,
} from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { OrderEntity } from '../shop/entity/order.entity';
import { OrderService } from '../shop/order.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private readonly orderService: OrderService,
  ) {}

  @Get()
  async getProducts(): Promise<UserEntity[]> {
    this.logger.debug('getProducts');
    return this.userService.getAll();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<UserEntity> {
    const product = await this.userService.getById(+id);

    if (!product) {
      throw new NotFoundException('User not found');
    }

    return product;
  }

  @Post()
  async createProduct(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() updateUserDto: CreateUserDto): Promise<UserEntity> {
    const product = await this.userService.update(+id, updateUserDto);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<UserEntity> {
    const product = await this.userService.delete(+id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  @Get(':id/orders')
  async getOrdersByUser(@Param('id') id: string): Promise<OrderEntity[]> {
    const user = await this.userService.getById(+id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.orderService.getByUser(user);
  }
}
