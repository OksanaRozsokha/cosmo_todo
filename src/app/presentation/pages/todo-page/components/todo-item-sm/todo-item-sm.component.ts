import { Component, Input, OnInit } from '@angular/core';
import { ToDoEntity } from 'src/app/domain/entities/todo.entity';

@Component({
  selector: 'app-todo-item-sm',
  template: `
    <div class="cosmo-todo-sm">
      <span class="cosmo-todo-sm__text text--secondary-color">{{ todo.title }}</span>
    </div>
  `,
  styleUrls: ['./todo-item-sm.component.scss']
})
export class TodoItemSmComponent implements OnInit {
  @Input() todo!: ToDoEntity;
  constructor() { }

  ngOnInit(): void {
  }

}
