import { Injectable } from '@angular/core';
import { ToDoEntity } from '../../../domain/entities/todo-entity/todo.entity';

@Injectable({
  providedIn: 'root'
})
export class TodoDetailsService {

  constructor() { }

  _todoItem?: ToDoEntity;

  get todoItem(): ToDoEntity|undefined {
    return this._todoItem;
  }

  set todoItem(value: ToDoEntity|undefined) {
    this._todoItem = value;
  }
}
