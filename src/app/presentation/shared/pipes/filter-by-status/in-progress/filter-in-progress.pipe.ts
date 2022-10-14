import { Pipe, PipeTransform } from '@angular/core';
import { todoStatus } from 'src/app/domain/entities/interfaces/todo.interface';
import { ToDoEntity } from 'src/app/domain/entities/todo-entity/todo.entity';

@Pipe({
  name: 'filterInProgress'
})
export class FilterInProgressPipe implements PipeTransform {

  transform(todos: ToDoEntity[]): ToDoEntity[] {
    return todos.filter((todo: ToDoEntity) => todo.status === todoStatus.inProgress);
  }

}
