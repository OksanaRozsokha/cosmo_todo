import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemSmComponent } from './todo-item-sm.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
