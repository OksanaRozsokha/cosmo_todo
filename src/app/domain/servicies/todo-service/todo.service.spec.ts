import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AbstractDBRepository } from '../../../domain/contracts/db.repository';
import { ToDoEntity } from '../../../domain/entities/todo-entity/todo.entity';
import { todoStatus } from 'src/app/domain/entities/interfaces/todo.interface';
import { TodoService } from './todo.service';

const todoEntity: ToDoEntity = new ToDoEntity('title', 'desc', 'https://url', todoStatus.inProgress, 0, 'todoId');

describe('check AuthRepository', () => {
   let todoService: TodoService;
   let mockDBRepository: jasmine.SpyObj<AbstractDBRepository> = jasmine.createSpyObj<AbstractDBRepository>('mockDBRepository', ['getAllTodos$', 'createTodo', 'updateTodo', 'removeTodo']);

    beforeEach( () => {
        TestBed.configureTestingModule({
            providers: [
              TodoService,
                { provide: AbstractDBRepository, useValue: mockDBRepository },
            ]
        });

        todoService = TestBed.inject(TodoService);
    });

    it('should be created', () => {
        expect(todoService).toBeTruthy();
    });

    it('getAllTodos$ should return list of todo entities in subscription', done => {
      mockDBRepository.getAllTodos$.and.returnValue(of([todoEntity]));
        todoService.getAllTodos$().subscribe(result => {
            expect(result).toEqual([todoEntity]);
            done();
        });
    });

    it('createTodo method was called', () => {
        let mockedMethod = mockDBRepository.createTodo;
        mockedMethod.calls.reset();
        todoService.createToDo(todoEntity);
        expect(mockedMethod).toHaveBeenCalledTimes(1);
    });


    it('updateTodo method was called', () => {
        let mockedMethod = mockDBRepository.updateTodo;
        mockedMethod.calls.reset();
        todoService.updateTodo(todoEntity);
        expect(mockedMethod).toHaveBeenCalledTimes(1);
    });

    it('removeTodo method was called', () => {
        let mockedMethod = mockDBRepository.removeTodo;
        mockedMethod.calls.reset();
        todoService.removeTodo(todoEntity.id!);
        expect(mockedMethod).toHaveBeenCalledTimes(1);
    });

});
