import { Injectable } from '@angular/core';
import { ToDoEntity } from '../../../domain/entities/todo.entity';

@Injectable({
  providedIn: 'root'
})
export class TodoDetailsService {

  constructor() { }

  todoItem?: ToDoEntity;

  setTodoItem(todo?: ToDoEntity) {
    this.todoItem = todo;
  }
}
