import { todoStatus } from 'src/app/domain/entities/interfaces/todo.interface';
import { ToDoEntity } from '../../todo-entity/todo.entity';
import { ToDoFactory } from './todo.factory';

describe('Check ToDoFactory', () => {
  let toDoFactory: ToDoFactory;

  beforeEach(() => {
    toDoFactory = new ToDoFactory();
  });

  it('should be created', () => {

    expect(toDoFactory).toBeTruthy();
  });

  it ('create method make an instance of the ToDoEntity', () => {
    let createTodo: ToDoEntity = toDoFactory.create({
        title: 'title',
        description: 'description',
        imageUrl: 'https://imgurl',
        status: todoStatus.inWaitingList
    });

    expect(createTodo).toBeInstanceOf(ToDoEntity);
  });
});