import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from 'src/app/domain/servicies/todo-service/todo.service';
import { ToDoEntity } from 'src/app/domain/entities/todo-entity/todo.entity';
import { TodoDetailsService } from '../../../../ui-services/todo-details/todo-details.service';
import { PopupCommunicationsService } from '../../../../ui-services/popup/popup-communications.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { todoStatus } from 'src/app/domain/entities/interfaces/todo.interface';

@Component({
  selector: 'app-todo-board',
  template: `
    <section class="cosmo-board" >
      <div class="container grid-row grid-row--space-between-h" cdkDropListGroup>

        <div class="grid-row__item-3">
          <h4 class="cosmo-column-title">In Waiting List</h4>
          <ng-container *ngIf="todoList$ | async as todoList">
            <div class="cosmo-todo-list" cdkDropList id="inWaitingList" [cdkDropListData]="todoList | filterInWaitingList" (cdkDropListDropped)="drop($event)">
              <app-todo-item-sm cdkDrag [cdkDragData]="todo" [attr.data-todo-in-waiting-test]="i+1" *ngFor="let todo of todoList | filterInWaitingList; let i = index" [todo]="todo"  (click)="onTodoClick(todo)" class="cosmo-todo-sm"></app-todo-item-sm>
            </div>
          </ng-container>
        </div>

        <div class="grid-row__item-3">
          <h4 class="cosmo-column-title">In Cosmo Progress</h4>
          <ng-container *ngIf="todoList$ | async as todoList">
            <div class="cosmo-todo-list" cdkDropList id="inProgress"  [cdkDropListData]="todoList | filterInProgress" (cdkDropListDropped)="drop($event)">
              <app-todo-item-sm cdkDrag [cdkDragData]="todo"  [attr.data-todo-in-progress-test]="i+1" *ngFor="let todo of todoList | filterInProgress; let i = index" [todo]="todo" (click)="onTodoClick(todo)" class="cosmo-todo-sm"></app-todo-item-sm>
            </div>
          </ng-container>
        </div>

        <div class="grid-row__item-3">
          <h4 class="cosmo-column-title">Completed</h4>
          <ng-container *ngIf="todoList$ | async as todoList">
          <div class="cosmo-todo-list" cdkDropList id="Completed"  [cdkDropListData]="todoList | filterCompleted" (cdkDropListDropped)="drop($event)">
            <app-todo-item-sm cdkDrag [cdkDragData]="todo" y [attr.data-todo-completed-test]="i+1" *ngFor="let todo of todoList | filterCompleted; let i = index" [todo]="todo" (click)="onTodoClick(todo)" class="cosmo-todo-sm"></app-todo-item-sm>
          </div>
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
    this.popupServise.open();
  }

  drop(event: CdkDragDrop<ToDoEntity[]>) {
    console.log(event);
    let todoItem: ToDoEntity = event.item.data;
    switch (event.container.id) {
      case 'inWaitingList':
        todoItem.status = todoStatus.inWaitingList;
      break;

      case 'inProgress':
        todoItem.status = todoStatus.inProgress;
      break;

      case 'Completed':
        todoItem.status = todoStatus.completed;
      break;
    }

    this.todoService.updateTodo(event.item.data).then(_ => {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    });
  }


}


