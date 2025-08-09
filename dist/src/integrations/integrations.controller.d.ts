import { IntegrationsService } from './integrations.service';
export declare class IntegrationsController {
    private readonly svc;
    constructor(svc: IntegrationsService);
    todos(userId?: number): Promise<any>;
}
