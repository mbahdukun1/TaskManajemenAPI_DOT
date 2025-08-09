import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/user.entity';
import { AuditLog } from '../audit/audit-log.entity';

@Injectable()
export class TasksService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Task) private repo: Repository<Task>,
    @InjectRepository(User) private users: Repository<User>,
    @Inject(CACHE_MANAGER) private cache: Cache
  ) {}

  async create(actorId: string, dto: CreateTaskDto) {
    return this.dataSource.transaction(async (manager) => {
      const task = manager.create(Task, {
        title: dto.title,
        description: dto.description,
        status: dto.status || ('OPEN' as Task['status']),
      });
      if (dto.assigneeId) {
        const assignee = await manager.findOne(User, { where: { id: dto.assigneeId } });
        if (assignee) (task as any).assignee = assignee;
      }
      const saved = await manager.save(task);

      const log = manager.create(AuditLog, {
        actorId,
        action: 'TASK_CREATED',
        entityType: 'Task',
        entityId: saved.id,
      });
      await manager.save(log);
      await this.cache.del('tasks:all');
      return saved;
    });
  }

  async findAll() {
    const cached = await this.cache.get<Task[]>('tasks:all');
    if (cached) return cached;
    const tasks = await this.repo.find({ relations: ['assignee'] });
    await this.cache.set('tasks:all', tasks, 10000);
    return tasks;
  }

  async findOne(id: string) {
    const task = await this.repo.findOne({ where: { id }, relations: ['assignee'] });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(actorId: string, id: string, dto: UpdateTaskDto) {
    return this.dataSource.transaction(async (manager) => {
      const task = await manager.findOne(Task, { where: { id }, relations: ['assignee'] });
      if (!task) throw new NotFoundException('Task not found');
      if (dto.title !== undefined) task.title = dto.title;
      if (dto.description !== undefined) task.description = dto.description;
      if (dto.status !== undefined) (task as any).status = dto.status;
      if (dto.assigneeId !== undefined) {
        const assignee = await manager.findOne(User, { where: { id: dto.assigneeId } });
        (task as any).assignee = assignee || null;
      }
      const saved = await manager.save(task);
      const log = manager.create(AuditLog, {
        actorId,
        action: 'TASK_UPDATED',
        entityType: 'Task',
        entityId: saved.id,
      });
      await manager.save(log);
      await this.cache.del('tasks:all');
      return saved;
    });
  }

  async remove(actorId: string, id: string) {
    return this.dataSource.transaction(async (manager) => {
      const task = await manager.findOne(Task, { where: { id } });
      if (!task) throw new NotFoundException('Task not found');
      await manager.remove(task);
      const log = manager.create(AuditLog, {
        actorId,
        action: 'TASK_DELETED',
        entityType: 'Task',
        entityId: id,
      });
      await manager.save(log);
      await this.cache.del('tasks:all');
      return { deleted: true };
    });
  }
}
