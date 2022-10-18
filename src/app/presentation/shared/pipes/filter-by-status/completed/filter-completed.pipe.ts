import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { todoStatus } from 'src/app/domain/entities/interfaces/todo.interface';
import { ToDoEntity } from 'src/app/domain/entities/todo-entity/todo.entity';

@Injectable({
  providedIn: 'root'
})

@Pipe({
  name: 'filterCompleted'
})
export class FilterCompletedPipe implements PipeTransform {

  transform(todos: ToDoEntity[]): ToDoEntity[] {
    return todos.filter((todo: ToDoEntity) => todo.status === todoStatus.completed);
  }
}
