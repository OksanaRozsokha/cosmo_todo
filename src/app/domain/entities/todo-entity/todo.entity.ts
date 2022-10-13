import { IToDo, todoStatus } from '../interfaces/todo.interface';
export class ToDoEntity implements IToDo {
    constructor(
        public title: string,
        public description: string,
        public imageUrl: string,
        public status: todoStatus,
        public id: string|null = null
    ) {}
}