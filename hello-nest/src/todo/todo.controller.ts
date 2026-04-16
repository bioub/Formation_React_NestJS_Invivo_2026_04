import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

@Controller('todo')
export class TodoController {
  @Get()
  getTodos() {
    return ['Todo 1', 'Todo 2', 'Todo 3'];
  }

  @Get(':id')
  getTodo(@Param('id') id: string) {

    if (id === '1') {
      throw new NotFoundException('Todo not found');
    }

    return {
      id: id,
      title: `Todo ${id}`,
      completed: false,
    };
  }
}
