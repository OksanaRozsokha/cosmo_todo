import { Pipe, PipeTransform } from '@angular/core';
import { ToDoEntity } from 'src/app/domain/entities/todo-entity/todo.entity';

@Pipe({
  name: 'sortByIndex'
})
export class SortByIndexPipe implements PipeTransform {
  transform(todos: ToDoEntity[]): ToDoEntity[] {
    if (!todos) return [];
    return todos.sort((todo1, todo2) => todo1.indexByStatus - todo2.indexByStatus);
  }

}
