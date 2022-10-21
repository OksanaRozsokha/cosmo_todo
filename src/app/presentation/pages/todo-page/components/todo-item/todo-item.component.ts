import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from 'src/app/domain/servicies/todo-service/todo.service';
import { todoStatus } from '../../../../../domain/entities/interfaces/todo.interface';
import { ToDoEntity } from '../../../../../domain/entities/todo-entity/todo.entity';
import { PopupCommunicationsService } from '../../../../ui-services/popup/popup-communications.service';
import { TodoCommunicationsService } from '../../../../ui-services/todo-details/todo-communications.service';

@Component({
  selector: 'app-todo-item',
  template: `
    <app-popup>
        <div class="cosmo-left-section grid-row__item grid-row__item--lg grid-row__item--full-width-on-sm">
            <label class="cosmo-field-block">
              <h3 class="cosmo-field-block__title text--secondary-color">Enter your title:*</h3>
              <input data-input-test [(ngModel)]="title" (input)="onTodoChange()" class="cosmo-field-block__input" placeholder="My title here..." type="text">
            </label>

            <label class="cosmo-field-block">
              <h3 class="cosmo-field-block__title text--secondary-color">Leave a note:</h3>
              <textarea data-textarea-test [(ngModel)]="description" (input)="onTodoChange()" class="cosmo-field-block__textarea" placeholder="My description here..."></textarea>
            </label>

            <!--TO DO: add image uploading here -->
            <div class="cosmo-field-block cosmo-field-block--width cosmo-field-block--inline">
              <button data-button-test [disabled]="isSaveBtnDisable" class="cosmo-button" (click)="onSave()">Save</button>
              <button data-remove-button-test *ngIf="todo" class="cosmo-button cosmo-button--negative" (click)="removeTodo()">Delete</button>
            </div>

        </div>

        <div class="cosmo-right-section grid-row__item grid-row__item--sm grid-row__item--full-width-on-sm">
        <label class="cosmo-field-block">
          <h3 class="cosmo-field-block__title">Choose status:</h3>

          <select data-select-test [(ngModel)]="status" (change)="onStatusChange()" class="cosmo-field-block__select">
            <option [value]="todoStatusObj.inWaitingList">In waiting list</option>
            <option [value]="todoStatusObj.inProgress">In cosmo progress</option>
            <option [value]="todoStatusObj.completed">Completed</option>
          </select>
        </label>
        </div>
    </app-popup>
  `,
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo?: ToDoEntity;

  isSaveBtnDisable: boolean = true;

  todoStatusObj = {
    inWaitingList: todoStatus.inWaitingList,
    inProgress: todoStatus.inProgress,
    completed: todoStatus.completed
  }

  title!: string;
  description!: string;
  status!: todoStatus;
  imageUrl!: string;
  indexByStatus!: number;

  constructor(
              private todoServise: TodoService,
              private popupServise: PopupCommunicationsService,
              private todoCommunicationsService: TodoCommunicationsService,
            ) { }

  async ngOnInit(): Promise<void> {
    await this._setComponentFields();
  }

  private _createTodo(): void {
    this.todoServise.createToDo({
      title: this.title,
      description: this.description,
      imageUrl: this.imageUrl,
      status: this.status,
      indexByStatus: this.indexByStatus
    }).then((todo: ToDoEntity|null) => {
      if (todo) this.todoCommunicationsService.emitNewTodoCreated(todo);
      this.popupServise.close();
    });
  }

  private _updateTodo(): void {
    const prevTodoStatus = this.todo!.status;
    const prevTodoIndex = this.todo!.indexByStatus;

    this.todo!.title = this.title;
    this.todo!.description = this.description;
    this.todo!.imageUrl = this.imageUrl;
    this.todo!.status = this.status;
    this.todo!.indexByStatus = this.indexByStatus;

    this.todoServise.updateTodo(this.todo!).then(_ => {
      if (prevTodoStatus !== this.status) this.todoCommunicationsService.emitTodoChangedStatus(prevTodoStatus, prevTodoIndex, this.todo!);
      this.popupServise.close();
    });
  }

  public removeTodo(): void {
    this.todoServise.removeTodo(this.todo!.id!).then(_ => {
      this.popupServise.close();
    });
  }

  public onSave(): void {
    !!this.todo ? this._updateTodo() : this._createTodo();
  }

  private _checkIsBtnDisable(): boolean {
    if (this.title.length === 0) return true;
    if (!this.todo) return false;

    return !!this.todo && this.title === this.todo!.title &&
      this.description === this.todo.description &&
      this.status === this.todo.status &&
      this.imageUrl === this.todo.imageUrl;
  }

  public onTodoChange(): void {
    this.isSaveBtnDisable = this._checkIsBtnDisable();
  }

  public async onStatusChange(): Promise<void> {
    if (!(!!this.todo && (this.todo.status === this.status))) {
      this.indexByStatus = (await this.todoCommunicationsService.getTodoListFilteredByStatus(this.status)).length;
    }

    this.onTodoChange();
  }

  private async _setComponentFields(): Promise<void> {
    this.title = !!this.todo ? this.todo.title : '';
    this.description = !!this.todo ? this.todo.description : '';
    this.status = !!this.todo ? this.todo.status : this.todoStatusObj.inWaitingList;
    this.imageUrl = !!this.todo ? this.todo.imageUrl : '';
    this.indexByStatus = !!this.todo ? this.todo.indexByStatus : (await this.todoCommunicationsService.getTodoListFilteredByStatus(todoStatus.inWaitingList)).length;
  }
 }
