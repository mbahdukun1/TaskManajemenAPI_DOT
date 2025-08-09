import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './task.entity';
import { User } from '../users/user.entity';
import { AuditLog } from '../audit/audit-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User, AuditLog])],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
