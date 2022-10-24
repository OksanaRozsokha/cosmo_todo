import { Injectable } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { ToDoEntity } from '../../../domain/entities/todo-entity/todo.entity';
import { TodoService } from '../../../domain/servicies/todo-service/todo.service';
import { todoStatus } from '../../../domain/entities/interfaces/todo.interface';
@Injectable({
  providedIn: 'root'
})
export class TodoCommunicationsService {

  constructor(private todoServise: TodoService,
  ) {}


  public todoChangedStatus$: Subject<{prevStatus: todoStatus, prevTodoIndex: number, todo: ToDoEntity}> = new Subject<{prevStatus: todoStatus, prevTodoIndex: number, todo: ToDoEntity}>();
  public newTodoCtreated$: Subject<ToDoEntity> = new Subject<ToDoEntity>();
  public todoWasRemoved$: Subject<ToDoEntity> = new Subject<ToDoEntity>();

  private  _todoItem?: ToDoEntity;

  get todoItem(): ToDoEntity|undefined {
    return this._todoItem;
  }

  set todoItem(value: ToDoEntity|undefined) {
    this._todoItem = value;
  }

  public async getTodoListFilteredByStatus(status: todoStatus): Promise<ToDoEntity[]> {
    let todoList = await firstValueFrom(this.todoServise.getAllTodos$());
    return todoList.filter((todo: ToDoEntity) => todo.status === status);
  }

  public emitTodoChangedStatus(prevStatus: todoStatus,  prevTodoIndex: number, todo: ToDoEntity): void {
    this.todoChangedStatus$.next({prevStatus: prevStatus,  prevTodoIndex: prevTodoIndex, todo: todo});
  }

  public emitNewTodoCreated(todo: ToDoEntity): void {
    this.newTodoCtreated$.next(todo);
  }

  public emitTodoRemoved(todo: ToDoEntity): void {
    this.todoWasRemoved$.next(todo);
  }
}
