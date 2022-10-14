import { Injectable } from '@angular/core';
import { AbstractDBRepository } from '../../contracts/db.repository';
import { Observable } from 'rxjs';
import { ToDoEntity } from '../../entities/todo-entity/todo.entity';
import { IToDo } from '../../entities/interfaces/todo.interface';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  constructor(private dbRepository: AbstractDBRepository) {}

  public getAllTodos$(): Observable<ToDoEntity[]> {
    return this.dbRepository.getAllTodos$();
  }

  public createToDo(todo: IToDo): Promise<void> {
    return this.dbRepository.createTodo(todo);
  }

  public updateTodo(todo: ToDoEntity): Promise<void> {
    return this.dbRepository.updateTodo(todo);
  }

  public removeTodo(todoId: string): Promise<void> {
    return this.dbRepository.removeTodo(todoId);
  }
}
