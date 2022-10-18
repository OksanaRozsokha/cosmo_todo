import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from 'src/app/domain/servicies/todo-service/todo.service';
import { ToDoEntity } from 'src/app/domain/entities/todo-entity/todo.entity';
import { TodoDetailsService } from '../../../../ui-services/todo-details/todo-details.service';
import { PopupCommunicationsService } from '../../../../ui-services/popup/popup-communications.service';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { todoStatus } from 'src/app/domain/entities/interfaces/todo.interface';

@Component({
  selector: 'app-todo-board',
  template: `
    <section class="cosmo-board" >
      <div class="container grid-row grid-row--space-between-h" cdkDropListGroup>

        <div class="grid-row__item-3">
          <h4 class="cosmo-column-title">In Waiting List</h4>
          <ng-container *ngIf="todoList$ | async as todoList">
            <div class="cosmo-todo-list" cdkDropList [id]="status.inWaitingList" [cdkDropListData]="(todoList | filterInWaitingList) | sortByIndex" (cdkDropListDropped)="onDropTodo($event)">
              <app-todo-item-sm cdkDrag [cdkDragData]="todo" [attr.data-todo-in-waiting-test]="i+1" *ngFor="let todo of (todoList | filterInWaitingList) | sortByIndex; let i = index" [todo]="todo"  (click)="onTodoClick(todo)" class="cosmo-todo-sm"></app-todo-item-sm>
            </div>
          </ng-container>
        </div>

        <div class="grid-row__item-3">
          <h4 class="cosmo-column-title">In Cosmo Progress</h4>
          <ng-container *ngIf="todoList$ | async as todoList">
            <div class="cosmo-todo-list" cdkDropList [id]="status.inProgress"  [cdkDropListData]="(todoList | filterInProgress)  | sortByIndex" (cdkDropListDropped)="onDropTodo($event)">
              <app-todo-item-sm cdkDrag [cdkDragData]="todo"  [attr.data-todo-in-progress-test]="i+1" *ngFor="let todo of (todoList | filterInProgress) | sortByIndex; let i = index" [todo]="todo" (click)="onTodoClick(todo)" class="cosmo-todo-sm"></app-todo-item-sm>
            </div>
          </ng-container>
        </div>

        <div class="grid-row__item-3">
          <h4 class="cosmo-column-title">Completed</h4>
          <ng-container *ngIf="todoList$ | async as todoList">
          <div class="cosmo-todo-list" cdkDropList [id]="status.completed"  [cdkDropListData]="(todoList | filterCompleted) | sortByIndex" (cdkDropListDropped)="onDropTodo($event)">
            <app-todo-item-sm cdkDrag [cdkDragData]="todo" y [attr.data-todo-completed-test]="i+1" *ngFor="let todo of (todoList | filterCompleted) | sortByIndex; let i = index" [todo]="todo" (click)="onTodoClick(todo)" class="cosmo-todo-sm"></app-todo-item-sm>
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
              ) { }

  todoList$!: Observable<ToDoEntity[]>
  status = {
    inWaitingList: todoStatus.inWaitingList,
    inProgress: todoStatus.inProgress,
    completed: todoStatus.completed,
  }


  ngOnInit(): void {
    this.todoList$ = this.todoService.getAllTodos$();
  }

  public onTodoClick(todo: ToDoEntity): void {
    this.todoDetailsService.todoItem = todo;
    this.popupServise.open();
  }

  public onDropTodo(event: CdkDragDrop<ToDoEntity[]>) {
    let droppedTodo: ToDoEntity = event.item.data;
    let prevContainer: CdkDropList<ToDoEntity[]> = event.previousContainer;
    let currContainer: CdkDropList<ToDoEntity[]> = event.container;
    let prevIndex: number = event.previousIndex;
    let currIndex: number = event.currentIndex;

    droppedTodo.status = currContainer.id as todoStatus;
    droppedTodo.indexByStatus = currIndex;

    this.todoService.updateTodo(droppedTodo).then(_ => {
      this._updateTodosIndexes(droppedTodo, prevContainer, currContainer, prevIndex, currIndex);
      if (prevContainer === currContainer) {
        moveItemInArray(currContainer.data, prevIndex, currIndex);
      } else {
        transferArrayItem(
          prevContainer.data,
          currContainer.data,
          prevIndex,
          currIndex,
        );
      }
    });
  }

  private _updateTodosIndexes(selectedTodo: ToDoEntity, prevContainer: CdkDropList<ToDoEntity[]>,
                              currContainer: CdkDropList<ToDoEntity[]>,
                              todoPrevIndex: number,
                              todoCurrIndex: number): void {
    this._updateTodosIndexesOfPrevContainer(selectedTodo, prevContainer, todoPrevIndex);
    this._updateTodosIndexesOfCurrContainer(selectedTodo, currContainer, todoCurrIndex);
  }

  private _updateTodosIndexesOfPrevContainer(selectedTodo: ToDoEntity, prevContainer: CdkDropList<ToDoEntity[]>, todoPrevIndex: number) {
    let nextAfterDraggedTodos: ToDoEntity[] = prevContainer.data.filter(todo => todo.indexByStatus >= todoPrevIndex && JSON.stringify(todo) !== JSON.stringify(selectedTodo));
    for (let i = 0; i < nextAfterDraggedTodos.length; i++) {
      let todo: ToDoEntity = nextAfterDraggedTodos[i];
      if (todo.indexByStatus > 0) {
        todo.indexByStatus -= 1;
      }
      this.todoService.updateTodo(todo);
    }
  }

  private _updateTodosIndexesOfCurrContainer(selectedTodo: ToDoEntity, currContainer: CdkDropList<ToDoEntity[]>, todoCurrIndex: number) {
    let nextAfterDroppedTodos: ToDoEntity[] = currContainer.data.filter(todo => todo.indexByStatus >= todoCurrIndex && JSON.stringify(todo) !== JSON.stringify(selectedTodo));
    for (let i = 0; i < nextAfterDroppedTodos.length; i++) {
      let todo: ToDoEntity = nextAfterDroppedTodos[i];
      todo.indexByStatus += 1;
      this.todoService.updateTodo(todo);
    }
  }
}


