import { Injectable } from '@angular/core';
import { IFactory } from '../../interfaces/factory.interface';
import { IToDo } from '../../interfaces/todo.interface';
import { ToDoEntity } from '../../todo-entity/todo.entity';

@Injectable({
    providedIn: 'root'
})

export class ToDoFactory implements IFactory<IToDo, ToDoEntity> {
    public create(argument: IToDo): ToDoEntity {
        return  new ToDoEntity(argument.title, argument.description, argument.imageUrl, argument.status);
    }
}