import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { TaskStatus } from './task-status.enum';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'varchar', default: TaskStatus.OPEN })
  status!: TaskStatus;

  @ManyToOne(() => User, (u) => u.tasks, { eager: true, nullable: true })
  assignee?: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
