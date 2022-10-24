import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoBoardComponent } from './todo-board.component';
import { TodoService } from '../../../../../domain/servicies/todo-service/todo.service';
import { PopupCommunicationsService } from 'src/app/presentation/ui-services/popup/popup-communications.service';
import { of } from 'rxjs';
import { ToDoEntity } from 'src/app/domain/entities/todo-entity/todo.entity';
import { todoStatus } from 'src/app/domain/entities/interfaces/todo.interface';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TodoCommunicationsService } from '../../../../ui-services/todo-communications/todo-communications.service';
import { SortByIndexPipe } from '../../../../shared/pipes/sort-by-index/sort-by-index.pipe';
import { CdkDragDrop, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { DragDropEventFactory } from './mock.cdk-drag-drop-event.factory';



describe('TodoBoardComponent', () => {
  let component: TodoBoardComponent;
  let fixture: ComponentFixture<TodoBoardComponent>;
  let mockTodoService: jasmine.SpyObj<TodoService>  = jasmine.createSpyObj<TodoService>('mockTodoService', ['getAllTodos$', 'updateTodo', ]);
  let mockPopupService: jasmine.SpyObj<PopupCommunicationsService> = jasmine.createSpyObj<PopupCommunicationsService>('mockPopupService', ['open']);
  let mockTodoCommunicationsService: jasmine.SpyObj<TodoCommunicationsService> = jasmine.createSpyObj<TodoCommunicationsService>('mockTodoCommunicationService', [], ['todoItem', 'newTodoCtreated$', 'todoChangedStatus$', 'todoWasRemoved$']);
  let todoEntity1: ToDoEntity;
  let todoEntity2: ToDoEntity;
  let todoEntity3: ToDoEntity;
  let todoEntity3ChangedStatus: ToDoEntity;
  let todoEntity4: ToDoEntity;
  let todoEntity5: ToDoEntity;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoBoardComponent, SortByIndexPipe ],
      providers: [
        {provide: TodoService, useValue: mockTodoService},
        {provide: PopupCommunicationsService, useValue: mockPopupService},
        {provide: TodoCommunicationsService, useValue: mockTodoCommunicationsService},
      ],
      imports: [DragDropModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
     todoEntity1 = new ToDoEntity('title', 'desc', 'https://url', todoStatus.inWaitingList, 0, 'todoId');
     todoEntity2 = new ToDoEntity('title2', 'desc', 'https://url', todoStatus.inWaitingList, 1, 'todoId2');
     todoEntity3 = new ToDoEntity('title3', 'desc', 'https://url', todoStatus.inProgress, 0, 'todoId3');
     todoEntity3ChangedStatus = new ToDoEntity('title3', 'desc', 'https://url', todoStatus.completed, 0, 'todoId3');
     todoEntity4 = new ToDoEntity('title4', 'desc', 'https://url', todoStatus.inProgress, 1, 'todoId4');
     todoEntity5 = new ToDoEntity('title5', 'desc', 'https://url', todoStatus.inProgress, 2, 'todoId5');

    fixture = TestBed.createComponent(TodoBoardComponent);
  });

  function setUpStubs() {
    return {
      getAllTodos$:  mockTodoService.getAllTodos$.and.returnValue(of([todoEntity1, todoEntity2, todoEntity3, todoEntity5])),
      // @ts-ignore
      newTodoCreated$: Object.getOwnPropertyDescriptor(mockTodoCommunicationsService, 'newTodoCtreated$')?.get.and.returnValue(of(todoEntity4)),
      // @ts-ignore
      todoWasRemoved$: Object.getOwnPropertyDescriptor(mockTodoCommunicationsService, 'todoWasRemoved$')?.get.and.returnValue(of(todoEntity5)),
      // @ts-ignore
      todoChangedStatus$: Object.getOwnPropertyDescriptor(mockTodoCommunicationsService, 'todoChangedStatus$')?.get.and.returnValue(of({prevStatus: todoEntity3.status,
        prevTodoIndex: todoEntity3.indexByStatus, todo: todoEntity3ChangedStatus})),
    }
  }

  describe('test behavior with mock stubs with statuses: newTodoCtreated$, todoWasRemoved$- inProgress, todoChangedStatus$ switch from inProgress to completed', () => {
    beforeEach(async () => {
      component = fixture.componentInstance;
      setUpStubs().getAllTodos$;
      setUpStubs().newTodoCreated$;
      setUpStubs().todoChangedStatus$;
      setUpStubs().todoWasRemoved$;
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
      expect(mockTodoCommunicationsSet).toHaveBeenCalledWith(todoEntity1);
      expect(mockPopupService.open).toHaveBeenCalledTimes(1);
    });

    it('check filtered todosLists,', () => {
      expect(component.todosInWaitingList).toEqual([todoEntity1, todoEntity2]);
      expect(component.todosInProgress).toEqual([todoEntity4]);
      expect(component.todosCompleted).toEqual([todoEntity3ChangedStatus]);
    })

    it('mocked methods are called inside onDropTodo() method, on triggering cdkDropListDropped (drad-drop item in same container) event', () => {
      mockTodoService.updateTodo.calls.reset();
      const mockCdkDragDrop: CdkDragDrop<ToDoEntity[]> = new DragDropEventFactory<ToDoEntity>().createInContainerEvent(todoStatus.inWaitingList, [todoEntity1, todoEntity2], 0, 1);
      const dropList = fixture.debugElement.queryAll(By.directive(CdkDropList<ToDoEntity[]>));
      mockTodoService.updateTodo.and.returnValue(Promise.resolve());
      dropList[0].triggerEventHandler('cdkDropListDropped', mockCdkDragDrop);
      fixture.detectChanges();
      expect(mockTodoService.updateTodo).toHaveBeenCalledTimes(1);
    });

    it('mocked methods are called inside onDropTodo() method, on triggering cdkDropListDropped (drag-drop between 2 containers)', () => {
      mockTodoService.updateTodo.calls.reset();
      const mockCdkDragDrop: CdkDragDrop<ToDoEntity[]> = new DragDropEventFactory<ToDoEntity>().createCrossContainerEvent({data: [todoEntity2, todoEntity1], id: todoStatus.inWaitingList, index: 0}, {data: [], id: todoStatus.inProgress, index: 1}, 1, 0);
      const dropList = fixture.debugElement.queryAll(By.directive(CdkDropList<ToDoEntity[]>));
      mockTodoService.updateTodo.and.returnValue(Promise.resolve());
      dropList[1].triggerEventHandler('cdkDropListDropped', mockCdkDragDrop);
      fixture.detectChanges();
      expect(mockTodoService.updateTodo).toHaveBeenCalledTimes(1);
    });

  });

  describe('test behavior with mock stubs with statuses: newTodoCtreated$, todoWasRemoved$- inWaiting, todoChangedStatus$ switch from inWaiting to inProgress', () => {
    beforeEach(async () => {
      component = fixture.componentInstance;
      todoEntity4.status = todoStatus.inWaitingList;
      todoEntity5.status = todoStatus.inWaitingList;
      todoEntity3.status = todoStatus.inWaitingList;
      todoEntity3ChangedStatus.status = todoStatus.inProgress;
      setUpStubs().getAllTodos$;
      setUpStubs().newTodoCreated$;
      setUpStubs().todoChangedStatus$;
      setUpStubs().todoWasRemoved$;
      fixture.detectChanges();
    });

    it('check filtered todosLists,', () => {

      expect(component.todosInWaitingList).toEqual([todoEntity1, todoEntity2, todoEntity4]);
      expect(component.todosInProgress).toEqual([todoEntity3ChangedStatus]);
      expect(component.todosCompleted).toEqual([]);
    });

  });

  describe('test behavior with mock stubs with statuses: newTodoCtreated$, todoWasRemoved$- completed, todoChangedStatus$ switch from completed to inWaiting', () => {
    beforeEach(async () => {
      component = fixture.componentInstance;
      todoEntity4.status = todoStatus.completed;
      todoEntity5.status = todoStatus.completed;
      todoEntity3.status = todoStatus.completed;
      todoEntity3ChangedStatus.status = todoStatus.inWaitingList;
      todoEntity3ChangedStatus.indexByStatus = 2;

      setUpStubs().getAllTodos$;
      setUpStubs().newTodoCreated$;
      setUpStubs().todoChangedStatus$;
      setUpStubs().todoWasRemoved$;
      fixture.detectChanges();
    });

    it('check filtered todosLists,', () => {
      expect(component.todosInWaitingList).toEqual([todoEntity1, todoEntity2, todoEntity3ChangedStatus]);
      expect(component.todosInProgress).toEqual([]);
      expect(component.todosCompleted).toEqual([todoEntity4]);
    });
  });
});



