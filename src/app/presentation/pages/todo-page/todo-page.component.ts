import { Component } from '@angular/core';
import { PopupCommunicationsService } from '../../ui-services/popup/popup-communications.service';
import { TodoCommunicationsService } from '../../ui-services/todo-communications/todo-communications.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  template: `
   <div class="cosmo-page">
      <app-header class="cosmo-header"></app-header>
      <app-todo-board></app-todo-board>
      <button data-btn-test class="cosmo-button text--extra-bold" (click)="onCreateTodo()">
        <app-icon [size]="20"  [icon]="iconName" [fill]="iconColor"></app-icon>
      </button>
      <app-todo-item [@inOutAnimation] [todo]="todoCommunicationsService.todoItem" *ngIf="popupService.isPopupVisible$ | async"></app-todo-item>
   </div>
  `,
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: '100vh', opacity: 0 }),
            animate('.2s ease-out',
                    style({ height: 100, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: '100vh', opacity: 1 }),
            animate('.2s ease-in',
                    style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ],
  styleUrls: ['./todo-page.component.scss']
})

export class TodoPage {
  iconName: string = 'plus';
  iconColor: string = '#2a2438';

  constructor(
    public popupService: PopupCommunicationsService,
    public todoCommunicationsService: TodoCommunicationsService
    ) { }

  onCreateTodo(): void {
    this.todoCommunicationsService.todoItem = undefined;
    this.popupService.open();
  }
}
