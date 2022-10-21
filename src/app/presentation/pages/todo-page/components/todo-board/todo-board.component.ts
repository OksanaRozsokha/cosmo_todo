import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { TodoService } from 'src/app/domain/servicies/todo-service/todo.service';
import { ToDoEntity } from 'src/app/domain/entities/todo-entity/todo.entity';
import { TodoCommunicationsService } from '../../../../ui-services/todo-details/todo-communications.service';
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
            <div class="cosmo-todo-list" cdkDropList [id]="status.inWaitingList" [cdkDropListData]="todosInWaitingList | sortByIndex" (cdkDropListDropped)="onDropTodo($event)">
              <app-todo-item-sm cdkDrag [cdkDragData]="todo" [attr.data-todo-in-waiting-test]="i+1" *ngFor="let todo of todosInWaitingList | sortByIndex; let i = index" [todo]="todo"  (click)="onTodoClick(todo)" class="cosmo-todo-sm"></app-todo-item-sm>
            </div>
        </div>

        <div class="grid-row__item-3">
          <h4 class="cosmo-column-title">In Cosmo Progress</h4>
            <div class="cosmo-todo-list" cdkDropList [id]="status.inProgress"  [cdkDropListData]="todosInProgress | sortByIndex" (cdkDropListDropped)="onDropTodo($event)">
              <app-todo-item-sm cdkDrag [cdkDragData]="todo" [attr.data-todo-in-progress-test]="i+1" *ngFor="let todo of todosInProgress | sortByIndex; let i = index" [todo]="todo" (click)="onTodoClick(todo)" class="cosmo-todo-sm"></app-todo-item-sm>
            </div>
        </div>

        <div class="grid-row__item-3">
          <h4 class="cosmo-column-title">Completed</h4>
          <div class="cosmo-todo-list" cdkDropList [id]="status.completed"  [cdkDropListData]="todosCompleted | sortByIndex" (cdkDropListDropped)="onDropTodo($event)">
            <app-todo-item-sm cdkDrag [cdkDragData]="todo" [attr.data-todo-completed-test]="i+1" *ngFor="let todo of todosCompleted | sortByIndex; let i = index" [todo]="todo" (click)="onTodoClick(todo)" class="cosmo-todo-sm"></app-todo-item-sm>
          </div>
        </div>

      </div>

    </section>
  `,
  styleUrls: ['./todo-board.component.scss']
})

export class TodoBoardComponent implements OnInit {
  constructor(private todoService: TodoService,
              private popupServise: PopupCommunicationsService,
              private todoCommunicationsService: TodoCommunicationsService,
              ) { }

  todosInWaitingList!: ToDoEntity[];
  todosInProgress!: ToDoEntity[];
  todosCompleted!: ToDoEntity[];

  status = {
    inWaitingList: todoStatus.inWaitingList,
    inProgress: todoStatus.inProgress,
    completed: todoStatus.completed,
  }


  ngOnInit(): void {
    this.todoService.getAllTodos$().pipe(first()).subscribe((todos: ToDoEntity[]) => {
      this.todosInWaitingList = this._filterTodosByStatus(todos, todoStatus.inWaitingList);
      this.todosInProgress = this._filterTodosByStatus(todos, todoStatus.inProgress);
      this.todosCompleted = this._filterTodosByStatus(todos, todoStatus.completed);
    });

    this._onNewTodoCreated();
    this._onStatusChangeInsideTodo();
  }

  private _filterTodosByStatus(todos: ToDoEntity[],  status: todoStatus): ToDoEntity[] {
    if (!todos) return [];
    return todos.filter(todo => todo.status === status);
  }

  public onTodoClick(todo: ToDoEntity): void {
    this.todoCommunicationsService.todoItem = todo;
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

    prevContainer === currContainer ?
      moveItemInArray(currContainer.data, prevIndex, currIndex) :
      transferArrayItem(prevContainer.data, currContainer.data, prevIndex, currIndex);

    this.todoService.updateTodo(droppedTodo).then(_ => {
      this._updateTodosIndexes(droppedTodo, prevContainer, currContainer, prevIndex, currIndex);
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

  private  _onStatusChangeInsideTodo(): void {
    this.todoCommunicationsService.todoChangedStatus$.subscribe((data) => {
      this._updatePrevListOnStatusChange(data.prevStatus, data.prevTodoIndex, data.todo);
      this._updateCurrentListOnStatusChange(data.todo);
    });
  }

  private _updateCurrentListOnStatusChange(todo: ToDoEntity): void {
    switch(todo.status) {
      case todoStatus.inWaitingList:
        this.todosInWaitingList.push(todo);
        break;
      case todoStatus.inProgress:
        this.todosInProgress.push(todo);
        break;
      case todoStatus.completed:
        this.todosCompleted.push(todo);
        break;
    }
  }

  private async _updatePrevListOnStatusChange(prevStatus: todoStatus, prevTodoIndex: number, todo: ToDoEntity): Promise<void> {
    switch(prevStatus) {
      case todoStatus.inWaitingList:
        this._updatePrevListTodos(this.todosInWaitingList, prevStatus, prevTodoIndex, todo);
        break;
      case todoStatus.inProgress:
        this._updatePrevListTodos(this.todosInProgress, prevStatus, prevTodoIndex, todo);
        break;
      case todoStatus.completed:
        this._updatePrevListTodos(this.todosCompleted, prevStatus, prevTodoIndex, todo);
        break;
    }
  }

  private _updatePrevListTodos(prevList: ToDoEntity[], prevStatus: todoStatus, prevTodoIndex: number, todo: ToDoEntity): void {
    let todoIndexToRemove: number = prevList.findIndex((item: ToDoEntity) => item.id === todo.id);
    prevList.splice(todoIndexToRemove, 1);
    let nextAfterRemovedTodos: ToDoEntity[] = prevList.filter(todo => todo.indexByStatus > prevTodoIndex);

    for (let i = 0; i < nextAfterRemovedTodos.length; i++) {
      let todo: ToDoEntity = nextAfterRemovedTodos[i];
      if (todo.indexByStatus > 0) {
        todo.indexByStatus -= 1;
      }

      this.todoService.updateTodo(todo);
    }
  }

  private _onNewTodoCreated(): void {
    this.todoCommunicationsService.newTodoCtreated$.subscribe((todo: ToDoEntity) => {
      switch (todo.status) {
        case todoStatus.inWaitingList:
          this.todosInWaitingList.push(todo);
          break;
        case todoStatus.inProgress:
          this.todosInProgress.push(todo);
          break;
        case todoStatus.completed:
          this.todosCompleted.push(todo);
          break;
      }
    });
  }
}


