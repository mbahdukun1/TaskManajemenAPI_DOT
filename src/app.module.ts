import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';
import { LoggerModule } from 'nestjs-pino';
import { BullModule } from '@nestjs/bullmq';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './users/user.entity';
import { Task } from './tasks/task.entity';
import { AuditLog } from './audit/audit-log.entity';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { ReportsModule } from './queue/reports.module';

function buildRedisConn() {
  if (process.env.REDIS_URL && process.env.REDIS_URL.trim() !== '') {
    return { url: process.env.REDIS_URL };
  }
  return {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || undefined,
  };
}

@Module({
  imports: [
    
    ConfigModule.forRoot({ isGlobal: true }),

    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            singleLine: false,
          },
        },
  
      },
    }),

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [User, Task, AuditLog],
        synchronize: false,
        logging: false,
      }),
    }),

    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          ...(buildRedisConn() as any),
          ttl: 10_000, 
        }),
      }),
    }),

    BullModule.forRoot({
      connection: buildRedisConn() as any,
    }),

    UsersModule,
    AuthModule,
    TasksModule,
    IntegrationsModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
