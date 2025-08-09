import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
export declare class ReportsProcessor extends WorkerHost {
    private readonly logger;
    process(job: Job<any, any, string>): Promise<any>;
    onActive(job: Job): void;
    onCompleted(job: Job, result: any): void;
    onFailed(job: Job, err: Error): void;
}
