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
var ReportsProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
let ReportsProcessor = ReportsProcessor_1 = class ReportsProcessor extends bullmq_1.WorkerHost {
    constructor() {
        super(...arguments);
        this.logger = new (require('@nestjs/common').Logger)(ReportsProcessor_1.name);
    }
    async process(job) {
        if (job.name === 'generate-report') {
            await new Promise((r) => setTimeout(r, 3000));
            return { ok: true, taskId: job.data.taskId, at: new Date().toISOString() };
        }
        return null;
    }
    onActive(job) {
        var _a;
        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.log(`[reports] active ${job.id} ${job.name}`);
    }
    onCompleted(job, result) {
        var _a;
        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.log(`[reports] completed ${job.id}`, result);
    }
    onFailed(job, err) {
        var _a;
        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.error(`[reports] failed ${job.id}`, err.message);
    }
};
exports.ReportsProcessor = ReportsProcessor;
__decorate([
    (0, bullmq_1.OnWorkerEvent)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_2.Job]),
    __metadata("design:returntype", void 0)
], ReportsProcessor.prototype, "onActive", null);
__decorate([
    (0, bullmq_1.OnWorkerEvent)('completed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_2.Job, Object]),
    __metadata("design:returntype", void 0)
], ReportsProcessor.prototype, "onCompleted", null);
__decorate([
    (0, bullmq_1.OnWorkerEvent)('failed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bullmq_2.Job, Error]),
    __metadata("design:returntype", void 0)
], ReportsProcessor.prototype, "onFailed", null);
exports.ReportsProcessor = ReportsProcessor = ReportsProcessor_1 = __decorate([
    (0, bullmq_1.Processor)('reports')
], ReportsProcessor);
//# sourceMappingURL=reports.processor.js.map