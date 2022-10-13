import { ToDoEntity } from './todo.entity';
import { todoStatus } from 'src/app/domain/entities/interfaces/todo.interface';

describe('Check ToDoEntity', () => {
  let toDoEntity: ToDoEntity;

  beforeEach(() => {
    toDoEntity = new ToDoEntity('title', 'description', 'https://url', todoStatus.inWaitingList);
  });

  it('should be created', () => {
    expect(toDoEntity).toBeTruthy();
  });
});