import { SortByIndexPipe } from './sort-by-index.pipe';
import { ToDoEntity } from '../../../../domain/entities/todo-entity/todo.entity';

describe('SortByIndexPipe', () => {
  const pipe = new SortByIndexPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('return empty array, if entry list is undefined', () => {
    let todoEntityList!: ToDoEntity[];
    const result = pipe.transform(todoEntityList);
    expect(result).toEqual([]);
  });
});
