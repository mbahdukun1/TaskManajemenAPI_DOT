"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./task.entity");
const user_entity_1 = require("../users/user.entity");
const audit_log_entity_1 = require("../audit/audit-log.entity");
let TasksService = class TasksService {
    constructor(dataSource, repo, users, cache) {
        this.dataSource = dataSource;
        this.repo = repo;
        this.users = users;
        this.cache = cache;
    }
    async create(actorId, dto) {
        return this.dataSource.transaction(async (manager) => {
            const task = manager.create(task_entity_1.Task, {
                title: dto.title,
                description: dto.description,
                status: dto.status || 'OPEN',
            });
            if (dto.assigneeId) {
                const assignee = await manager.findOne(user_entity_1.User, { where: { id: dto.assigneeId } });
                if (assignee)
                    task.assignee = assignee;
            }
            const saved = await manager.save(task);
            const log = manager.create(audit_log_entity_1.AuditLog, {
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
        const cached = await this.cache.get('tasks:all');
        if (cached)
            return cached;
        const tasks = await this.repo.find({ relations: ['assignee'] });
        await this.cache.set('tasks:all', tasks, 10000);
        return tasks;
    }
    async findOne(id) {
        const task = await this.repo.findOne({ where: { id }, relations: ['assignee'] });
        if (!task)
            throw new common_1.NotFoundException('Task not found');
        return task;
    }
    async update(actorId, id, dto) {
        return this.dataSource.transaction(async (manager) => {
            const task = await manager.findOne(task_entity_1.Task, { where: { id }, relations: ['assignee'] });
            if (!task)
                throw new common_1.NotFoundException('Task not found');
            if (dto.title !== undefined)
                task.title = dto.title;
            if (dto.description !== undefined)
                task.description = dto.description;
            if (dto.status !== undefined)
                task.status = dto.status;
            if (dto.assigneeId !== undefined) {
                const assignee = await manager.findOne(user_entity_1.User, { where: { id: dto.assigneeId } });
                task.assignee = assignee || null;
            }
            const saved = await manager.save(task);
            const log = manager.create(audit_log_entity_1.AuditLog, {
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
    async remove(actorId, id) {
        return this.dataSource.transaction(async (manager) => {
            const task = await manager.findOne(task_entity_1.Task, { where: { id } });
            if (!task)
                throw new common_1.NotFoundException('Task not found');
            await manager.remove(task);
            const log = manager.create(audit_log_entity_1.AuditLog, {
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
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository,
        typeorm_2.Repository, Object])
], TasksService);
//# sourceMappingURL=tasks.service.js.map