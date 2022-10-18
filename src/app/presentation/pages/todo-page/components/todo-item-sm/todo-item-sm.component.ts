import { Component, Input } from '@angular/core';
import { ToDoEntity } from 'src/app/domain/entities/todo-entity/todo.entity';

@Component({
  selector: 'app-todo-item-sm',
  template: `
    <div class="cosmo-todo-sm">
      <p class="cosmo-todo-sm__text text--secondary-color">{{ todo.indexByStatus }}</p>
      <p data-title-span-test class="cosmo-todo-sm__text text--secondary-color">{{ todo.title }}</p>
    </div>
  `,
  styleUrls: ['./todo-item-sm.component.scss']
})
export class TodoItemSmComponent {
  @Input() todo!: ToDoEntity;
}
