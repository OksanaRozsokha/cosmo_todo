import { Component } from '@angular/core';
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
            <app-todo-item-sm *ngFor="let todo of todoList | filterInWaitingList" [todo]="todo" (click)="onTodoClick(todo)" class="cosmo-todo-sm"></app-todo-item-sm>
          </ng-container>

        </div>
        <div class="grid-row__item-3">
          <h4 class="cosmo-column-title">In Progress</h4>
          <ng-container *ngIf="todoList$ | async as todoList">
            <app-todo-item-sm *ngFor="let todo of todoList | filterInProgress" [todo]="todo" (click)="onTodoClick(todo)" class="cosmo-todo-sm"></app-todo-item-sm>
          </ng-container>
        </div>
        <div class="grid-row__item-3">
          <h4 class="cosmo-column-title">Completed</h4>
          <ng-container *ngIf="todoList$ | async as todoList">
            <app-todo-item-sm *ngFor="let todo of todoList | filterDone" [todo]="todo" (click)="onTodoClick(todo)" class="cosmo-todo-sm"></app-todo-item-sm>
          </ng-container>
        </div>
      </div>

    </section>
  `,
  styleUrls: ['./todo-board.component.scss']
})
export class TodoBoardComponent  {
  constructor(private todoService: TodoService,
              private popupServise: PopupCommunicationsService,
              private todoDetailsService: TodoDetailsService) { }
  todoList$?: Observable<ToDoEntity[] | null> = this.todoService.getAllTodos$();

  onTodoClick(todo: ToDoEntity): void {
    this.todoDetailsService.todoItem = todo;
    this.popupServise.open();
  }
}
