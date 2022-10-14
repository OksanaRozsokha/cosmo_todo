import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoBoardComponent } from './todo-board.component';
import { TodoService } from '../../../../../domain/servicies/todo-service/todo.service';
import { PopupCommunicationsService } from 'src/app/presentation/ui-services/popup/popup-communications.service';
import { TodoDetailsService } from 'src/app/presentation/ui-services/todo-details/todo-details.service';
import { of } from 'rxjs';
import { ToDoEntity } from 'src/app/domain/entities/todo-entity/todo.entity';
import { todoStatus } from 'src/app/domain/entities/interfaces/todo.interface';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FilterInWaitingListPipe } from 'src/app/presentation/shared/pipes/filter-by-status/waiting-list/filter-in-waiting-list.pipe';
import { FilterInProgressPipe } from '../../../../shared/pipes/filter-by-status/in-progress/filter-in-progress.pipe';
import { FilterDonePipe } from '../../../../shared/pipes/filter-by-status/done/filter-done.pipe';

describe('TodoBoardComponent', () => {
  let component: TodoBoardComponent;
  let fixture: ComponentFixture<TodoBoardComponent>;
  let mockTodoService: jasmine.SpyObj<TodoService>  = jasmine.createSpyObj<TodoService>('mockTodoService', ['getAllTodos$']);
  let mockPopupService: jasmine.SpyObj<PopupCommunicationsService> = jasmine.createSpyObj<PopupCommunicationsService>('mockPopupService', ['open']);
  let mockTodoDetailsService: jasmine.SpyObj<TodoDetailsService> = jasmine.createSpyObj<TodoDetailsService>('mockTodoDetailsService', [], ['todoItem']);
  const todoEntity: ToDoEntity = new ToDoEntity('title', 'desc', 'https://url', todoStatus.inWaitingList, 'todoId');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoBoardComponent, FilterInWaitingListPipe, FilterInProgressPipe, FilterDonePipe ],
      providers: [
        {provide: TodoService, useValue: mockTodoService},
        {provide: PopupCommunicationsService, useValue: mockPopupService},
        {provide: TodoDetailsService, useValue: mockTodoDetailsService},
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
    const todoEl = fixture.debugElement.query(By.css('[data-todo-test="1"]'));
    todoEl.nativeElement.click();
    fixture.detectChanges();
    // @ts-ignore
    const mockTodoDetailsSet = Object.getOwnPropertyDescriptor(mockTodoDetailsService, 'todoItem')?.set;
    expect(mockTodoDetailsSet).toHaveBeenCalledWith(todoEntity);
    expect(mockPopupService.open).toHaveBeenCalledTimes(1);
  });
});
