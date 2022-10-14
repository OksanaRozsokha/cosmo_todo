import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from 'src/app/domain/servicies/todo-service/todo.service';
import { ToDoEntity } from 'src/app/domain/entities/todo-entity/todo.entity';
import { TodoDetailsService } from '../../../../ui-services/todo-details/todo-details.service';
import { PopupCommunicationsService } from '../../../../ui-services/popup/popup-communications.service';

@Component({
  selector: 'app-todo-board',
  template: `
    <section class="cosmo-board">
      <div class="container grid-row grid-row--space-between-h">
        <div class="grid-row__item-3">
          <h4 class="cosmo-column-title">In Waiting List</h4>
          <ng-container *ngIf="todoList$ | async as todoList">
            <app-todo-item-sm [attr.data-todo-in-waiting-test]="i+1" *ngFor="let todo of todoList | filterInWaitingList; let i = index" [todo]="todo"  (click)="onTodoClick(todo)" class="cosmo-todo-sm"></app-todo-item-sm>
          </ng-container>

        </div>
        <div class="grid-row__item-3">
          <h4 class="cosmo-column-title">In Progress</h4>
          <ng-container *ngIf="todoList$ | async as todoList">
            <app-todo-item-sm [attr.data-todo-in-progress-test]="i+1" *ngFor="let todo of todoList | filterInProgress; let i = index" [todo]="todo" (click)="onTodoClick(todo)" class="cosmo-todo-sm"></app-todo-item-sm>
          </ng-container>
        </div>
        <div class="grid-row__item-3">
          <h4 class="cosmo-column-title">Completed</h4>
          <ng-container *ngIf="todoList$ | async as todoList">
            <app-todo-item-sm [attr.data-todo-done-test]="i+1" *ngFor="let todo of todoList | filterDone; let i = index" [todo]="todo" (click)="onTodoClick(todo)" class="cosmo-todo-sm"></app-todo-item-sm>
          </ng-container>
        </div>
      </div>

    </section>
  `,
  styleUrls: ['./todo-board.component.scss']
})
export class TodoBoardComponent implements OnInit {
  constructor(private todoService: TodoService,
              private popupServise: PopupCommunicationsService,
              private todoDetailsService: TodoDetailsService) { }

  todoList$!: Observable<ToDoEntity[]>

  ngOnInit(): void {
    this.todoList$ = this.todoService.getAllTodos$();
  }

  onTodoClick(todo: ToDoEntity): void {
    this.todoDetailsService.todoItem = todo;
    console.log(this.todoDetailsService.todoItem);
    this.popupServise.open();
  }
}
