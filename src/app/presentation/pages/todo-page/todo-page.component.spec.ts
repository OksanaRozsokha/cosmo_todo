import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupCommunicationsService } from '../../ui-services/popup/popup-communications.service';

import { TodoPage } from './todo-page.component';
import { TodoCommunicationsService } from '../../ui-services/todo-details/todo-communications.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TodoComponent', () => {
  let component: TodoPage;
  let fixture: ComponentFixture<TodoPage>;
  let mockPopupService: jasmine.SpyObj<PopupCommunicationsService> = jasmine.createSpyObj<PopupCommunicationsService>('mockPopupService', ['open']);
  let mockTodoCommunicationsService: jasmine.SpyObj<TodoCommunicationsService> = jasmine.createSpyObj<TodoCommunicationsService>('mockTodoCommunicationsService', [], ['todoItem']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoPage ],
      providers: [
        {provide: PopupCommunicationsService, useValue: mockPopupService},
        {provide: TodoCommunicationsService, useValue: mockTodoCommunicationsService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onCreateTodo() called on button click', () => {
    const button = fixture.debugElement.query(By.css('[data-btn-test]'));
    button.nativeElement.click();
    expect(mockTodoCommunicationsService.todoItem).toBeUndefined();
    expect(mockPopupService.open).toHaveBeenCalledTimes(1);
  })
});
