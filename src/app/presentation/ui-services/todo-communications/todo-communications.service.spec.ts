import { TestBed } from '@angular/core/testing';
import { todoStatus } from 'src/app/domain/entities/interfaces/todo.interface';
import { ToDoEntity } from 'src/app/domain/entities/todo-entity/todo.entity';

import { TodoCommunicationsService } from './todo-communications.service';
import { TodoService } from '../../../domain/servicies/todo-service/todo.service';
import { of } from 'rxjs';

describe('TodoCommunicationsService', () => {
  let service: TodoCommunicationsService;
  let mockTodoService: jasmine.SpyObj<TodoService> = jasmine.createSpyObj<TodoService>('mockTodoService', ['getAllTodos$'])
  const todoEntity1: ToDoEntity = new ToDoEntity('title', 'desc', 'https://url', todoStatus.inProgress, 0, 'todoId');
    const todoEntity2: ToDoEntity = new ToDoEntity('title', 'desc', 'https://url', todoStatus.completed, 0, 'todoId');
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoCommunicationsService,
        {provide: TodoService, useValue: mockTodoService}
      ]
    });
    service = TestBed.inject(TodoCommunicationsService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('todoItem should set and get correct some value with type of ToDoEntity', () => {
    const todoEntity: ToDoEntity = new ToDoEntity('title', 'desc', 'https://url', todoStatus.inProgress, 0, 'todoId');
    service.todoItem = todoEntity;
    expect(service.todoItem).toEqual(todoEntity);
  });

  it('getTodoListFilteredByStatus return todo entities with correct status', (done) => {

    mockTodoService.getAllTodos$.and.returnValue(of([todoEntity1, todoEntity2]));

    service.getTodoListFilteredByStatus(todoStatus.completed).then(result => {
      expect(result).toEqual([todoEntity2]);
      done();
    })
  });

  it('getTodoListFilteredByStatus return empty array', (done) => {
    mockTodoService.getAllTodos$.and.returnValue(of([]));
    service.getTodoListFilteredByStatus(todoStatus.completed).then(result => {
      expect(result).toEqual([]);
      done();
    })
  });

  it('emitTodoChangedStatus() method emits value correct', (done) => {
    service.todoChangedStatus$.subscribe(data => {
      expect(data).toEqual({
        prevStatus: todoStatus.inProgress,
        prevTodoIndex: 0,
        todo: todoEntity2
      });
      done();
    });

    service.emitTodoChangedStatus(todoStatus.inProgress, 0, todoEntity2);
  });

  it('emitNewTodoCreated() method emits value correct', (done) => {
    service.newTodoCtreated$.subscribe(todo => {
      expect(todo).toEqual(todoEntity1);
      done();
    });

    service.emitNewTodoCreated(todoEntity1);
  });

  it('emitTodoRemoved() method emits value correct', (done) => {
    service.todoWasRemoved$.subscribe(todo => {
      expect(todo).toEqual(todoEntity2);
      done();
    });

    service.emitTodoRemoved(todoEntity2);
  });
});
