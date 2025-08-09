"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./src/users/user.entity");
const task_entity_1 = require("./src/tasks/task.entity");
const audit_log_entity_1 = require("./src/audit/audit-log.entity");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [user_entity_1.User, task_entity_1.Task, audit_log_entity_1.AuditLog],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    logging: false,
});
//# sourceMappingURL=typeorm.config.js.map