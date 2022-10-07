import { Injectable } from '@angular/core';
import { AbstractDBRepository } from '../../contracts/db.repository';
import { Observable } from 'rxjs';
import { ToDoEntity } from '../../entities/todo.entity';
import { IToDo } from '../../entities/interfaces/todo.interface';

@Injectable({
  providedIn: 'root'
})

export class TodoService {
  constructor(private dbRepository: AbstractDBRepository) {}

  public getAllTodos$(): Observable<ToDoEntity[]|null> {
    return this.dbRepository.getAllTodos$();
  }

  public createToDo(todo: IToDo): void {
    return this.dbRepository.createTodo(todo);
  }

  public updateTodo(todo: ToDoEntity): void {
    return this.dbRepository.updateTodo(todo);
  }

  public removeTodo(todoId: string): void {
    return this.dbRepository.removeTodo(todoId);
  }
}
