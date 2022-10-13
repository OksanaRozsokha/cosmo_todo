import { TestBed } from '@angular/core/testing';
import { AbstractAuthRepository } from '../../../domain/contracts/auth.repository';
import { AngularFireAuthFacade } from '../../firebase-facade/auth-facade/angular-fire-auth.facade';
import { of } from 'rxjs';
import { AbstractDBRepository } from '../../../domain/contracts/db.repository';
import { DBRepository } from './db.repository';
import { AngularFireDataBasaFacade } from '../../firebase-facade/db-facade/angular-fire-db.facade';
import { ToDoFactory } from '../../../domain/entities/factories/todo-factory/todo.factory';
import { ToDoEntity } from '../../../domain/entities/todo-entity/todo.entity';
import { todoStatus } from 'src/app/domain/entities/interfaces/todo.interface';

const todoEntity: ToDoEntity = new ToDoEntity('title', 'desc', 'https://url', todoStatus.inProgress, 'todoId');

describe('check AuthRepository', () => {
   let dbRepository: AbstractDBRepository;
   let mockDBFacade: jasmine.SpyObj<AngularFireDataBasaFacade> = jasmine.createSpyObj<AngularFireDataBasaFacade>('mockDBFacade', ['getTodoListfromDB$', 'createTodo', 'updateTodo', 'removeTodo']);
   let mockTodoFactory: jasmine.SpyObj<ToDoFactory> = jasmine.createSpyObj<ToDoFactory>('mockTodoFactory', ['create']);

    beforeEach( () => {
        TestBed.configureTestingModule({
            providers: [
                DBRepository,
                { provide: AngularFireDataBasaFacade, useValue: mockDBFacade },
                { provide: ToDoFactory, useValue: mockTodoFactory }
            ]
        });

        dbRepository = TestBed.inject(DBRepository);
    });

    it('should be created', () => {
        expect(dbRepository).toBeTruthy();
    });

    it('getTodoListfromDB$ should return list of todo entities in subscription', done => {
        mockDBFacade.getTodoListfromDB$.and.returnValue(of([todoEntity]));
        dbRepository.getAllTodos$().subscribe(result => {
            expect(result).toEqual([todoEntity]);
            done();
        });
    });

    it('createTodo method was called', () => {
        let mockedMethod = mockDBFacade.createTodo;
        mockedMethod.calls.reset();
        dbRepository.createTodo(todoEntity);
        expect(mockedMethod).toHaveBeenCalledTimes(1);
    });


    it('updateTodo method was called', () => {
        let mockedMethod = mockDBFacade.updateTodo;
        mockedMethod.calls.reset();
        dbRepository.updateTodo(todoEntity);
        expect(mockedMethod).toHaveBeenCalledTimes(1);
    });

    it('removeTodo method was called', () => {
        let mockedMethod = mockDBFacade.removeTodo;
        mockedMethod.calls.reset();
        dbRepository.removeTodo(todoEntity.id!);
        expect(mockedMethod).toHaveBeenCalledTimes(1);
    });

});
