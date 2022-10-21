import { Component, Input } from '@angular/core';
import { ToDoEntity } from 'src/app/domain/entities/todo-entity/todo.entity';

@Component({
  selector: 'app-todo-item-sm',
  template: `
    <div class="cosmo-todo-sm">
      <span data-title-span-test class="cosmo-todo-sm__text text--secondary-color">{{ todo.title }}</span>
    </div>
  `,
  styleUrls: ['./todo-item-sm.component.scss']
})
export class TodoItemSmComponent {
  @Input() todo!: ToDoEntity;
}
