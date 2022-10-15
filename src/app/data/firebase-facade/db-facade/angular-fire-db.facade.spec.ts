import { TestBed } from '@angular/core/testing';
import {  of } from 'rxjs';
import { AngularFireDataBasaFacade } from './angular-fire-db.facade';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ToDoEntity } from '../../../domain/entities/todo-entity/todo.entity';
import { AngularFireAuthFacade } from '../auth-facade/angular-fire-auth.facade';
import { todoStatus } from '../../../domain/entities/interfaces/todo.interface';
import { UserEntity } from '../../../domain/entities/user-entity/user.entity';

const todoEntity: ToDoEntity = new ToDoEntity('title', 'desc', 'https://url', todoStatus.inProgress, 'todoId');
const userEntity: UserEntity = new UserEntity('uid', 'Oksana Rozsokha', 'em@em', 'https://url', true);

export class AngularFireDatabaseMock {
    list(query: string) {
        return {
            valueChanges() {
                return of([todoEntity])
            },

            push(todo: ToDoEntity) {
                return {
                    key: 'todoId'
                }
            },

            update(key: string, todo: ToDoEntity) {
                return Promise.resolve();
            },

            remove(key: string) {
                return Promise.resolve();
            }
        }
    }
}

describe('check AngularFireDataBasaFacade', () => {
    let dbFacade: AngularFireDataBasaFacade;
    const mockauthFacade: jasmine.SpyObj<AngularFireAuthFacade> = jasmine.createSpyObj<AngularFireAuthFacade>('mockAuthFacade', ['getSignedInUser$']);
    let mockedDb: AngularFireDatabaseMock;

    beforeEach( () => {
        TestBed.configureTestingModule({
            providers: [
                AngularFireDataBasaFacade,
                { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock },
                {provide: AngularFireAuthFacade, useValue: mockauthFacade }
            ]
        });

        dbFacade = TestBed.inject(AngularFireDataBasaFacade);
    });

    it('should be created', () => {
        expect(dbFacade).toBeTruthy();
    });

    it('method getTodoListfromDB$ should return ToDoEntity[] in subscription', done => {
        mockauthFacade.getSignedInUser$.and.returnValue(of(userEntity));
        dbFacade.getTodoListfromDB$().subscribe(result => {
            expect(result).toEqual([todoEntity]);
            done();
        });
    });

    it('method getTodoListfromDB$ should return empty list in subscription', done => {
        mockauthFacade.getSignedInUser$.and.returnValue(of(null));

        dbFacade.getTodoListfromDB$().subscribe(result => {
            expect(result).toEqual([]);
            done();
        });
    });

    it('check createTodo method',  (done) => {
        mockauthFacade.getSignedInUser$.and.returnValue(of(userEntity));
        dbFacade.createTodo(todoEntity).then(result => {
            expect(result).toBe(undefined);
            done();
        });
    });

    it('check updateTodo method',  (done) => {
        mockauthFacade.getSignedInUser$.and.returnValue(of(userEntity));
        dbFacade.updateTodo(todoEntity).then(result => {
            expect(result).toBe(undefined);
            done();
        });
    });

    it('check removeTodo method',  (done) => {
        mockauthFacade.getSignedInUser$.and.returnValue(of(userEntity));
        dbFacade.removeTodo(todoEntity.id!).then(result => {
            expect(result).toBe(undefined);
            done();
        });
    });
});
