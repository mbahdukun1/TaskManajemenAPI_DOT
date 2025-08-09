"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const cache_manager_1 = require("@nestjs/cache-manager");
const cache_manager_ioredis_yet_1 = require("cache-manager-ioredis-yet");
const nestjs_pino_1 = require("nestjs-pino");
const bullmq_1 = require("@nestjs/bullmq");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_entity_1 = require("./users/user.entity");
const task_entity_1 = require("./tasks/task.entity");
const audit_log_entity_1 = require("./audit/audit-log.entity");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const tasks_module_1 = require("./tasks/tasks.module");
const integrations_module_1 = require("./integrations/integrations.module");
const reports_module_1 = require("./queue/reports.module");
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
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            nestjs_pino_1.LoggerModule.forRoot({
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
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: () => ({
                    type: 'postgres',
                    host: process.env.DB_HOST,
                    port: parseInt(process.env.DB_PORT || '5432', 10),
                    username: process.env.DB_USERNAME,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    entities: [user_entity_1.User, task_entity_1.Task, audit_log_entity_1.AuditLog],
                    synchronize: false,
                    logging: false,
                }),
            }),
            cache_manager_1.CacheModule.registerAsync({
                isGlobal: true,
                useFactory: async () => ({
                    store: await (0, cache_manager_ioredis_yet_1.redisStore)({
                        ...buildRedisConn(),
                        ttl: 10000,
                    }),
                }),
            }),
            bullmq_1.BullModule.forRoot({
                connection: buildRedisConn(),
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            tasks_module_1.TasksModule,
            integrations_module_1.IntegrationsModule,
            reports_module_1.ReportsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map