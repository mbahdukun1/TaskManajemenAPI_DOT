import { Queue } from 'bullmq';
export declare class ReportsProducer {
    private readonly queue;
    constructor(queue: Queue);
    enqueueGenerateReport(payload: {
        taskId: string;
    }): Promise<import("bullmq").Job<any, any, string>>;
}
