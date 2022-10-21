import { TestBed } from '@angular/core/testing';
import { todoStatus } from 'src/app/domain/entities/interfaces/todo.interface';
import { ToDoEntity } from 'src/app/domain/entities/todo-entity/todo.entity';

import { TodoCommunicationsService } from './todo-communications.service';

describe('TodoCommunicationsService', () => {
  let service: TodoCommunicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoCommunicationsService
      ]
    });
    service = TestBed.inject(TodoCommunicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('todoItem should set and get correct some value with type of ToDoEntity', () => {
    const todoEntity: ToDoEntity = new ToDoEntity('title', 'desc', 'https://url', todoStatus.inProgress, 0, 'todoId');
    service.todoItem = todoEntity;
    expect(service.todoItem).toEqual(todoEntity);
  });
});
