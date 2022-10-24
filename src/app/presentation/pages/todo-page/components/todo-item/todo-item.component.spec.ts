import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TodoService } from '../../../../../domain/servicies/todo-service/todo.service';
import { PopupCommunicationsService } from '../../../../ui-services/popup/popup-communications.service';
import { todoStatus } from 'src/app/domain/entities/interfaces/todo.interface';
import { ToDoEntity } from 'src/app/domain/entities/todo-entity/todo.entity';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IToDo } from '../../../../../domain/entities/interfaces/todo.interface';
import { TodoCommunicationsService } from '../../../../ui-services/todo-communications/todo-communications.service';

describe('TodoItem', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let mockTodoService: jasmine.SpyObj<TodoService> = jasmine.createSpyObj<TodoService>('mockTodoService', [
    'createToDo',
    'updateTodo',
    'removeTodo',
  ]);
  let mockPopupService: jasmine.SpyObj<PopupCommunicationsService> = jasmine.createSpyObj<PopupCommunicationsService>('mockPopupService', [
    'close'
  ]);
  let mockTodoCommunicationsService: jasmine.SpyObj<TodoCommunicationsService> = jasmine.createSpyObj<TodoCommunicationsService>('mockTodoCommunicationsService', ['getTodoListFilteredByStatus', 'emitNewTodoCreated', 'emitTodoChangedStatus', 'emitTodoRemoved' ])
  let todoEntity: ToDoEntity;

  async function _TestBedSetup() {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        {provide: TodoService, useValue: mockTodoService},
        {provide: PopupCommunicationsService, useValue: mockPopupService},
        {provide: TodoCommunicationsService, useValue: mockTodoCommunicationsService}
      ],
      declarations: [ TodoItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    mockPopupService.close.calls.reset();
    mockTodoCommunicationsService.getTodoListFilteredByStatus.and.returnValue(Promise.resolve([]))
  }

  describe('todo component with @Input() is defined with ToDoEntity', () => {
    beforeEach(async () => {
      await _TestBedSetup();
      todoEntity =  new ToDoEntity('title', 'desc', 'https://url', todoStatus.inWaitingList, 0, 'todoId');
      component.todo = todoEntity;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('update method was called on save button click', () => {
      mockTodoService.updateTodo.and.returnValue(Promise.resolve());
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('[data-input-test]'));
      input.nativeElement.value = 'new value';
      input.nativeElement.dispatchEvent(new Event('input', {bubbles:true}));
      fixture.detectChanges();

      const saveBtn = fixture.debugElement.query(By.css('[data-button-test]'));
      saveBtn.nativeElement.click();

      const updatedTodo: ToDoEntity = new ToDoEntity('new value', todoEntity.description, todoEntity.imageUrl, todoEntity.status, todoEntity.indexByStatus, todoEntity.id);
      expect(mockTodoService.updateTodo).toHaveBeenCalledWith(updatedTodo);
    });

    it('todo is removed on remove button click', (done) => {
      mockTodoService.removeTodo.and.returnValue(Promise.resolve());
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('[data-remove-button-test]')).nativeElement;
      button.click();

      mockTodoService.removeTodo(component.todo!.id!).then(_ => {
        expect(mockTodoCommunicationsService.emitTodoRemoved).toHaveBeenCalledWith(component.todo!);
        expect(mockPopupService.close).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('component fields are prefilled with todo entity fields', () => {
      expect(component.title).toBe(todoEntity.title);
      expect(component.description).toBe(todoEntity.description);
      expect(component.status).toBe(todoEntity.status);
      expect(component.imageUrl).toBe(todoEntity.imageUrl);
    });

    it('save button should be disabled when title is empty', () => {
      const saveBtn = fixture.debugElement.query(By.css('[data-button-test]'));
      const input = fixture.debugElement.query(By.css('[data-input-test]'));
      input.nativeElement.value = '';
      input.nativeElement.dispatchEvent(new Event('input', {bubbles:true}));

      expect(component.isSaveBtnDisable).toBeTrue();
      expect(saveBtn.attributes['disabled']).toBeDefined();
    });


    it('save button should be disabled when nothing is changed', () => {
      const saveBtn = fixture.debugElement.query(By.css('[data-button-test]'));
      component.onTodoChange();

      expect(component.isSaveBtnDisable).toBeTrue();
      expect((component as any)._checkIsBtnDisable()).toBeTrue()
      expect(saveBtn.attributes['disabled']).toBeDefined();
    });

    it('emitTodoChangedStatus(), close() methods of mocked services was called on _updateTodo() methode', (done) => {
      mockTodoService.updateTodo.and.returnValue(Promise.resolve())
      component.status = todoStatus.completed;
      fixture.detectChanges();
      const prevStatus = component.todo!.status;
      const prevTodoIndex = component.todo!.indexByStatus;
      component.onSave();

      mockTodoService.updateTodo(component.todo!).then(_ => {
        expect(mockTodoCommunicationsService.emitTodoChangedStatus).toHaveBeenCalledWith(prevStatus, prevTodoIndex, component.todo!);
        expect(mockPopupService.close).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('onStatusChange() method was called on changing value in status select', () => {
      const onStatusChangeSpy = spyOn(component, 'onStatusChange');
      const hostElement: HTMLElement = fixture.nativeElement;
      const select: HTMLSelectElement|null = hostElement.querySelector('[data-select-test]');
      select!.value = todoStatus.completed;
      select!.dispatchEvent(new Event('change'));
      fixture.detectChanges();

      expect(onStatusChangeSpy).toHaveBeenCalledTimes(1);
    })

    it('indexByStatus property is correct and onTodoChange method is called, on onStatusChange method', (done) => {
      const onTodoChangeSpy = spyOn(component, 'onTodoChange');
      onTodoChangeSpy.calls.reset();
      component.status = todoStatus.completed;
      fixture.detectChanges();

      component.onStatusChange().then(_ => {
        expect(component.indexByStatus).toBe(0);
        expect(onTodoChangeSpy).toHaveBeenCalledTimes(1);
        done();
      })
    })
  });

  describe('todo component with @Input() is not defined', () => {
    beforeEach(async () => {
      await _TestBedSetup();
      component.todo = undefined;
      fixture.detectChanges();
    });

    it('todo @Input() is undefined and new todo is created on save button click', () => {
      mockTodoService.createToDo.and.returnValue(Promise.resolve(todoEntity));

      const input = fixture.debugElement.query(By.css('[data-input-test]'));
      input.nativeElement.value = 'new value';
      input.nativeElement.dispatchEvent(new Event('input', {bubbles:true}));
      fixture.detectChanges();

      const saveBtn = fixture.debugElement.query(By.css('[data-button-test]'));
      saveBtn.nativeElement.click();

      const objToCreateTodo: IToDo = {
        title: component.title,
        description: component.description,
        imageUrl: component.imageUrl,
        status: component.status,
        indexByStatus: component.indexByStatus
      };

      expect(mockTodoService.createToDo).toHaveBeenCalledWith(objToCreateTodo);
    });

    it('emitNewTodoCreated() and close() methods of mocked services were called on onSave() method', (done) => {
      component.title = 'title1';
      fixture.detectChanges();
      const todo = new ToDoEntity(component.title, component.description, component.imageUrl, component.status, component.indexByStatus, 'id');
      mockTodoService.createToDo.and.returnValue(Promise.resolve(todo));
      component.onSave()

      mockTodoService.createToDo({
        title: component.title,
        description: component.description,
        imageUrl: component.imageUrl,
        status: component.status,
        indexByStatus: component.indexByStatus
      }).then(todoItem => {
        expect(mockTodoCommunicationsService.emitNewTodoCreated).toHaveBeenCalledWith(todoItem!);
        expect(mockPopupService.close).toHaveBeenCalledTimes(1);
        done();
      })
    });
  });
});
