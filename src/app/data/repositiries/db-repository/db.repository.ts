import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AbstractDBRepository } from "src/app/domain/contracts/db.repository";
import { ToDoEntity } from "src/app/domain/entities/todo-entity/todo.entity";
import { AngularFireDataBasaFacade } from '../../firebase-facade/db-facade/angular-fire-db.facade';
import { IToDo } from '../../../domain/entities/interfaces/todo.interface';
import { ToDoFactory } from '../../../domain/entities/factories/todo-factory/todo.factory';

@Injectable({
    providedIn: 'root'
})

export class DBRepository implements AbstractDBRepository {
    constructor(
        private dbFacade: AngularFireDataBasaFacade,
        private todoFactory: ToDoFactory
    ) {}

    public getAllTodos$(): Observable<ToDoEntity[]> {
        return this.dbFacade.getTodoListfromDB$()
    }

    public createTodo(todo: IToDo): Promise<ToDoEntity|null> {
        let toDoEntity: ToDoEntity = this.todoFactory.create(todo)
        return this.dbFacade.createTodo(toDoEntity);
    }

    public updateTodo(todo: ToDoEntity): Promise<void> {
        return this.dbFacade.updateTodo(todo);
    }

    public removeTodo(todoId: string): Promise<void> {
        return this.dbFacade.removeTodo(todoId);
    }
}