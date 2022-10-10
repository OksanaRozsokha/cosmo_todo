import { Injectable } from '@angular/core';
import { IFactory } from '../interfaces/factory.interface';
import { IToDo } from '../interfaces/todo.interface';
import { ToDoEntity } from '../todo.entity';

@Injectable({
    providedIn: 'root'
})

export class ToDoFactory implements IFactory<IToDo, ToDoEntity> {
    private _index: number = 0;

    public create(argument: IToDo): ToDoEntity {
        this._index++;
        return  new ToDoEntity( this._index, argument.title, argument.description, argument.imageUrl, argument.status);
    }
}