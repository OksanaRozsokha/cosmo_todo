import { IToDo } from './interfaces/todo.interface';

export class ToDoEntity implements IToDo {
    constructor(
        public index: number,
        public title: string,
        public description: string,
        public imageUrl: string,
        public completionDate: number,
        public id: string|null = null
    ) {}
}