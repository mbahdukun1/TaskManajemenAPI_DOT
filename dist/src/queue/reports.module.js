"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsModule = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const reports_producer_1 = require("./reports.producer");
const reports_processor_1 = require("./reports.processor");
const reports_controller_1 = require("./reports.controller");
let ReportsModule = class ReportsModule {
};
exports.ReportsModule = ReportsModule;
exports.ReportsModule = ReportsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bullmq_1.BullModule.registerQueue({
                name: 'reports',
            }),
        ],
        providers: [reports_producer_1.ReportsProducer, reports_processor_1.ReportsProcessor],
        controllers: [reports_controller_1.ReportsController],
        exports: [reports_producer_1.ReportsProducer],
    })
], ReportsModule);
//# sourceMappingURL=reports.module.js.map