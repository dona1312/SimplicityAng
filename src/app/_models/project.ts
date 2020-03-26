import { User } from '../_models/user';
import { NameAndID } from './name-and-id';
export class Project {
    id: number;
    name: string;
    fromDate: Date;
    toDate: Date;
    assignedUsers: NameAndID[];
    assignedUsersAsString: string;
}