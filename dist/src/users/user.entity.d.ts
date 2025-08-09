import { Task } from '../tasks/task.entity';
export declare class User {
    id: string;
    email: string;
    passwordHash: string;
    role: 'ADMIN' | 'USER';
    tasks: Task[];
    createdAt: Date;
    updatedAt: Date;
}
