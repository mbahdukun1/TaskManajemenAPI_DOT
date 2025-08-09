import { User } from '../users/user.entity';
import { TaskStatus } from './task-status.enum';
export declare class Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    assignee?: User;
    createdAt: Date;
    updatedAt: Date;
}
