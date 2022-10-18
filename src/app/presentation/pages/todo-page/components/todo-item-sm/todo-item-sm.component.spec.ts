import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDoEntity } from 'src/app/domain/entities/todo-entity/todo.entity';

import { TodoItemSmComponent } from './todo-item-sm.component';
import { todoStatus } from '../../../../../domain/entities/interfaces/todo.interface';
import { By } from '@angular/platform-browser';

describe('TodoItemSmComponent', () => {
  let component: TodoItemSmComponent;
  let fixture: ComponentFixture<TodoItemSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoItemSmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoItemSmComponent);
    component = fixture.componentInstance;
    component.todo = new ToDoEntity('title', '', '', todoStatus.inProgress,  0, 'todoId');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check that todo entity was passed in @Input', () => {
    const titleSpan = fixture.debugElement.query(By.css('[data-title-span-test]')).nativeElement;

    expect(titleSpan.textContent).toBe('title');
  });
});
