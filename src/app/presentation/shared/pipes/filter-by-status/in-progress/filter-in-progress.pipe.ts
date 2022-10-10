import { Pipe, PipeTransform } from '@angular/core';
import { todoStatus } from 'src/app/domain/entities/interfaces/todo.interface';
import { ToDoEntity } from 'src/app/domain/entities/todo.entity';

@Pipe({
  name: 'filterInProgress'
})
export class FilterInProgressPipe implements PipeTransform {

  transform(todos: ToDoEntity[]|null): ToDoEntity[] {
    if (todos == null) return [];
    return todos.filter((todo: ToDoEntity) => todo.status === todoStatus.inProgress);
  }

}