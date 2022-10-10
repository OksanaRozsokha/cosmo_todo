export enum todoStatus {
    inWaitingList = "IN_WAITING_LIST",
    inProgress = "IN_PROGRESS",
    completed = "COMPLETED",
}

export interface IToDo {
    title: string;
    description: string;
    imageUrl: string;
    status: todoStatus;
}