import { NameAndID } from '../_models/name-and-id';
export class Task {
    id: number;
    name: string;
    description: string;
    assignee: NameAndID;
    creator: NameAndID;
    dueDate: any;
    status: Status;
    project: NameAndID;
    isExpired : boolean;
    isExpiring:boolean;
    oldStatus:Status;
}

export enum Status{
    ToDo,
    InProgress,
    InReview,
    QaToDo,
    QaInprogress,
    Done
}