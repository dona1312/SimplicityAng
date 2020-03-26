import { Project } from '../_models/project';
import { NameAndID } from './name-and-id';
export class User {
    id: number;
    username: string;
    name: string;
    projects: Project [] = [];
    address: string;
    role: NameAndID;
}