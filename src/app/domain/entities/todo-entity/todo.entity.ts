import { IToDo, todoStatus } from '../interfaces/todo.interface';
export class ToDoEntity implements IToDo {
    constructor(
        public title: string,
        public description: string,
        public imageUrl: string,
        public status: todoStatus,
        public indexByStatus: number,
        public id: string|null = null,
    ) {}
}