import { TestBed } from '@angular/core/testing';

import { TodoDetailsService } from './todo-details.service';

describe('TodoDetailsService', () => {
  let service: TodoDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
