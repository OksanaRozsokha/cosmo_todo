import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from 'src/app/domain/servicies/todo-service/todo.service';
import { ToDoEntity } from 'src/app/domain/entities/todo-entity/todo.entity';
import { TodoDetailsService } from '../../../../ui-services/todo-details/todo-details.service';
import { PopupCommunicationsService } from '../../../../ui-services/popup/popup-communications.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { todoStatus } from 'src/app/domain/entities/interfaces/todo.interface';
import { SortByIndexPipe } from '../../../../shared/pipes/sort-by-index/sort-by-index.pipe';
import { FilterCompletedPipe } from 'src/app/presentation/shared/pipes/filter-by-status/completed/filter-completed.pipe';
import { FilterInProgressPipe } from 'src/app/presentation/shared/pipes/filter-by-status/in-progress/filter-in-progress.pipe';
import { FilterInWaitingListPipe } from '../../../../shared/pipes/filter-by-status/waiting-list/filter-in-waiting-list.pipe';

@Component({
  selector: 'app-todo-board',
  template: `
    <section class="cosmo-board" >
      <div class="container grid-row grid-row--space-between-h" cdkDropListGroup>

        <div class="grid-row__item-3">
          <h4 class="cosmo-column-title">In Waiting List</h4>
          <ng-container *ngIf="todoList$ | async as todoList">
            <div class="cosmo-todo-list" cdkDropList id="inWaitingList" [cdkDropListData]="todoList | filterInWaitingList | sortByIndex" (cdkDropListDropped)="drop($event)">
              <app-todo-item-sm cdkDrag [cdkDragData]="todo" [attr.data-todo-in-waiting-test]="i+1" *ngFor="let todo of todoList | filterInWaitingList | sortByIndex; let i = index" [todo]="todo"  (click)="onTodoClick(todo)" class="cosmo-todo-sm"></app-todo-item-sm>
            </div>
          </ng-container>
        </div>

        <div class="grid-row__item-3">
          <h4 class="cosmo-column-title">In Cosmo Progress</h4>
          <ng-container *ngIf="todoList$ | async as todoList">
            <div class="cosmo-todo-list" cdkDropList id="inProgress"  [cdkDropListData]="todoList | filterInProgress  | sortByIndex" (cdkDropListDropped)="drop($event)">
              <app-todo-item-sm cdkDrag [cdkDragData]="todo"  [attr.data-todo-in-progress-test]="i+1" *ngFor="let todo of todoList | filterInProgress | sortByIndex; let i = index" [todo]="todo" (click)="onTodoClick(todo)" class="cosmo-todo-sm"></app-todo-item-sm>
            </div>
          </ng-container>
        </div>

        <div class="grid-row__item-3">
          <h4 class="cosmo-column-title">Completed</h4>
          <ng-container *ngIf="todoList$ | async as todoList">
          <div class="cosmo-todo-list" cdkDropList id="Completed"  [cdkDropListData]="todoList | filterCompleted | sortByIndex" (cdkDropListDropped)="drop($event)">
            <app-todo-item-sm cdkDrag [cdkDragData]="todo" y [attr.data-todo-completed-test]="i+1" *ngFor="let todo of todoList | filterCompleted | sortByIndex; let i = index" [todo]="todo" (click)="onTodoClick(todo)" class="cosmo-todo-sm"></app-todo-item-sm>
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
              private todoDetailsService: TodoDetailsService,
              // private sortByIndexPipe: SortByIndexPipe,

              ) { }

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


