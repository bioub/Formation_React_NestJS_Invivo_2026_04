import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';

describe('TodoController', () => {
  let controller: TodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
    //   providers: [{
    //     provide: TodoService,
    //   useValue: {
    //     getTodos: jest.fn(),
    //     getTodoById: jest.fn(),
    //     createTodo: jest.fn(),
    //     updateTodo: jest.fn(),
    //     deleteTodo: jest.fn(),
    //   },
    // }],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
