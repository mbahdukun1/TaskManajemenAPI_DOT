import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from './src/users/user.entity';
import { Task } from './src/tasks/task.entity';
import { AuditLog } from './src/audit/audit-log.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Task, AuditLog],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: false,
});
