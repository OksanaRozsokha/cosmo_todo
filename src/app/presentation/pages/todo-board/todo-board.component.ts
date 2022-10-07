import { Component, OnInit } from '@angular/core';
import { ToDoEntity } from 'src/app/domain/entities/todo.entity';

@Component({
  template: `
    <p>
      todo-board works!
    </p>
  `,
  styleUrls: ['./todo-board.component.scss']
})

export class TodoBoardPage implements OnInit {

  constructor() {}

  ngOnInit(): void {
    let todo = new ToDoEntity( 2,'____','description', '', 9898);
  }
}
