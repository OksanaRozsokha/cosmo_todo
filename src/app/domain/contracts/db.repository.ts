import { Observable } from "rxjs";
import { ToDoEntity } from "../entities/todo.entity";
import { IToDo } from '../entities/interfaces/todo.interface';

export abstract class AbstractDBRepository {
    public abstract getAllTodos$(): Observable<ToDoEntity[]|null>;
    public abstract createTodo(todo: IToDo): void;
    public abstract updateTodo(todo: ToDoEntity): void;
    public abstract removeTodo(todoId: string): void;
}