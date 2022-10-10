import { Pipe, PipeTransform } from '@angular/core';
import { todoStatus } from 'src/app/domain/entities/interfaces/todo.interface';
import { ToDoEntity } from 'src/app/domain/entities/todo.entity';

@Pipe({
  name: 'filterDone'
})
export class FilterDonePipe implements PipeTransform {

  transform(todos: ToDoEntity[]|null): ToDoEntity[] {
    if (todos == null) return [];
    return todos.filter((todo: ToDoEntity) => todo.status === todoStatus.completed);
  }
}
