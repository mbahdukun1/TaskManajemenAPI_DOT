"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let IntegrationsService = class IntegrationsService {
    async getPublicTodos(userId) {
        const res = await axios_1.default.get(`https://jsonplaceholder.typicode.com/todos`, {
            params: { userId }
        });
        return res.data;
    }
};
exports.IntegrationsService = IntegrationsService;
exports.IntegrationsService = IntegrationsService = __decorate([
    (0, common_1.Injectable)()
], IntegrationsService);
//# sourceMappingURL=integrations.service.js.map