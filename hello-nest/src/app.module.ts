import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './todo/todo.controller';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [ShopModule],
  controllers: [AppController, TodoController],
  providers: [AppService],
})
export class AppModule {}
