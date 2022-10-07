import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AbstractDBRepository } from "src/app/domain/contracts/db.repository";
import { ToDoEntity } from "src/app/domain/entities/todo.entity";
import { AngularFireDataBasaFacade } from '../firebase-facade/angular-fire-db.facade';
import { IToDo } from '../../domain/entities/interfaces/todo.interface';
import { ToDoFactory } from '../../domain/entities/factories/todo.factory';

@Injectable({
    providedIn: 'root'
})

export class DBRepository implements AbstractDBRepository {
    constructor(
        private dbFacade: AngularFireDataBasaFacade,
        private todoFactory: ToDoFactory
    ) {}

    public getAllTodos$(): Observable<ToDoEntity[] | null> {
        return this.dbFacade.getTodoListfromDB$()
    }

    public createTodo(todo: IToDo): void {
        let toDoEntity: ToDoEntity = this.todoFactory.create(todo)
        return this.dbFacade.createTodo(toDoEntity);
    }

    public updateTodo(todo: ToDoEntity): void {
        return this.dbFacade.updateTodo(todo);
    }

    public removeTodo(todoId: string): void {
        return this.dbFacade.removeTodo(todoId);
    }
}