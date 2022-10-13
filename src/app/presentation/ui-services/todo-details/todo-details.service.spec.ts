import { TestBed } from '@angular/core/testing';
import { todoStatus } from 'src/app/domain/entities/interfaces/todo.interface';
import { ToDoEntity } from 'src/app/domain/entities/todo-entity/todo.entity';

import { TodoDetailsService } from './todo-details.service';

describe('TodoDetailsService', () => {
  let service: TodoDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoDetailsService
      ]
    });
    service = TestBed.inject(TodoDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('todoItem should set and get correct some value with type of ToDoEntity', () => {
    const todoEntity: ToDoEntity = new ToDoEntity('title', 'desc', 'https://url', todoStatus.inProgress, 'todoId');
    service.todoItem = todoEntity;
    expect(service.todoItem).toEqual(todoEntity);
  });
});
