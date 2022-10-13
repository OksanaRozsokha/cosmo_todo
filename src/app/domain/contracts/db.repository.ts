import { Observable } from "rxjs";
import { ToDoEntity } from "../entities/todo-entity/todo.entity";
import { IToDo } from '../entities/interfaces/todo.interface';

export abstract class AbstractDBRepository {
    public abstract getAllTodos$(): Observable<ToDoEntity[]>;
    public abstract createTodo(todo: IToDo): Promise<void>;
    public abstract updateTodo(todo: ToDoEntity): Promise<void>;
    public abstract removeTodo(todoId: string): Promise<void>;
}