import { Pipe, PipeTransform } from '@angular/core';
import { todoStatus } from 'src/app/domain/entities/interfaces/todo.interface';
import { ToDoEntity } from 'src/app/domain/entities/todo-entity/todo.entity';

@Pipe({
  name: 'filterDone'
})
export class FilterDonePipe implements PipeTransform {

  transform(todos: ToDoEntity[]): ToDoEntity[] {
    return todos.filter((todo: ToDoEntity) => todo.status === todoStatus.completed);
  }
}
