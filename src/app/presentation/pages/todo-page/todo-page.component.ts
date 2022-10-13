import { Component } from '@angular/core';
import { PopupCommunicationsService } from '../../ui-services/popup/popup-communications.service';
import { TodoDetailsService } from '../../ui-services/todo-details/todo-details.service';

@Component({
  template: `
   <div class="cosmo-page">
      <app-header class="cosmo-header"></app-header>
      <app-todo-board></app-todo-board>
      <button class="cosmo-button text--extra-bold" (click)="onCreateTodo()">
        <app-icon [size]="20"  [icon]="iconName" [fill]="iconColor"></app-icon>
      </button>
      <app-todo-item [todo]="todoDetailsService.todoItem" *ngIf="popupService.isPopupVisible$ | async"></app-todo-item>
   </div>
  `,
  styleUrls: ['./todo-page.component.scss']
})

export class TodoPage {
  iconName: string = 'plus';
  iconColor: string = '#2a2438';

  constructor(
    public popupService: PopupCommunicationsService,
    public todoDetailsService: TodoDetailsService
    ) { }

  onCreateTodo(): void {
    this.todoDetailsService.todoItem = undefined;
    this.popupService.open();
  }
}
