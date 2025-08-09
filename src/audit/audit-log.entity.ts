import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  actorId!: string;

  @Column()
  action!: string;

  @Column({ nullable: true })
  entityType?: string;

  @Column({ nullable: true })
  entityId?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
