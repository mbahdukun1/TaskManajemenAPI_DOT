import { TaskStatus } from '../task-status.enum';
export declare class UpdateTaskDto {
    title?: string;
    description?: string;
    status?: TaskStatus;
    assigneeId?: string;
}
