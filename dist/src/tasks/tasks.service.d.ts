import { DataSource, Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/user.entity';
export declare class TasksService {
    private dataSource;
    private repo;
    private users;
    private cache;
    constructor(dataSource: DataSource, repo: Repository<Task>, users: Repository<User>, cache: Cache);
    create(actorId: string, dto: CreateTaskDto): Promise<Task>;
    findAll(): Promise<Task[]>;
    findOne(id: string): Promise<Task>;
    update(actorId: string, id: string, dto: UpdateTaskDto): Promise<Task>;
    remove(actorId: string, id: string): Promise<{
        deleted: boolean;
    }>;
}
