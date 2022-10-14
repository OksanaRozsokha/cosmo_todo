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



describe('NewTodoComponent', () => {
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
  let todoEntity: ToDoEntity;

  async function _TestBedSetup() {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        {provide: TodoService, useValue: mockTodoService},
        {provide: PopupCommunicationsService, useValue: mockPopupService},
      ],
      declarations: [ TodoItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
  }

  describe('todo component with @Input() is defined with ToDoEntity', () => {
    beforeEach(async () => {
      await _TestBedSetup();
      todoEntity =  new ToDoEntity('title', 'desc', 'https://url', todoStatus.inWaitingList, 'todoId');
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

      const updatedTodo: ToDoEntity = new ToDoEntity('new value', todoEntity.description, todoEntity.imageUrl, todoEntity.status, todoEntity.id);
      expect(mockTodoService.updateTodo).toHaveBeenCalledWith(updatedTodo);
    });

    it('todo is removed on remove button click', () => {
      mockTodoService.removeTodo.and.returnValue(Promise.resolve());
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('[data-remove-button-test]')).nativeElement;
      button.click();
      expect(mockTodoService.removeTodo).toHaveBeenCalledWith(component.todo!.id!);
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

  });

  describe('todo component with @Input() is not defined', () => {
    beforeEach(async () => {
      await _TestBedSetup();
      component.todo = undefined;
      fixture.detectChanges();
    });

    it('todo @Input() is undefined and new todo is created on save button click', () => {
      mockTodoService.createToDo.and.returnValue(Promise.resolve());

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
        status: component.status
      };

      expect(mockTodoService.createToDo).toHaveBeenCalledWith(objToCreateTodo);
    });
  });
});


