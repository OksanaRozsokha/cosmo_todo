import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoBoardComponent } from './todo-board.component';
import { TodoService } from '../../../../../domain/servicies/todo-service/todo.service';
import { PopupCommunicationsService } from 'src/app/presentation/ui-services/popup/popup-communications.service';
import { of } from 'rxjs';
import { ToDoEntity } from 'src/app/domain/entities/todo-entity/todo.entity';
import { todoStatus } from 'src/app/domain/entities/interfaces/todo.interface';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TodoCommunicationsService } from '../../../../ui-services/todo-details/todo-communications.service';

describe('TodoBoardComponent', () => {
  let component: TodoBoardComponent;
  let fixture: ComponentFixture<TodoBoardComponent>;
  let mockTodoService: jasmine.SpyObj<TodoService>  = jasmine.createSpyObj<TodoService>('mockTodoService', ['getAllTodos$']);
  let mockPopupService: jasmine.SpyObj<PopupCommunicationsService> = jasmine.createSpyObj<PopupCommunicationsService>('mockPopupService', ['open']);
  let mockTodoCommunicationsService: jasmine.SpyObj<TodoCommunicationsService> = jasmine.createSpyObj<TodoCommunicationsService>('mockTodoCommunicationService', [], ['todoItem']);
  const todoEntity: ToDoEntity = new ToDoEntity('title', 'desc', 'https://url', todoStatus.inWaitingList, 0, 'todoId');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoBoardComponent ],
      providers: [
        {provide: TodoService, useValue: mockTodoService},
        {provide: PopupCommunicationsService, useValue: mockPopupService},
        {provide: TodoCommunicationsService, useValue: mockTodoCommunicationsService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoBoardComponent);
    component = fixture.componentInstance;
    mockTodoService.getAllTodos$.and.returnValue(of([todoEntity]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onTodoClick should be called on todo click', () => {
    const todoEl = fixture.debugElement.query(By.css('[data-todo-in-waiting-test="1"]'));
    todoEl.nativeElement.click();
    fixture.detectChanges();
    // @ts-ignore
    const mockTodoCommunicationsSet = Object.getOwnPropertyDescriptor(mockTodoCommunicationsService, 'todoItem')?.set;
    expect(mockTodoCommunicationsSet).toHaveBeenCalledWith(todoEntity);
    expect(mockPopupService.open).toHaveBeenCalledTimes(1);
  });
});
