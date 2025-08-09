import { ReportsProducer } from './reports.producer';
export declare class ReportsController {
    private readonly producer;
    constructor(producer: ReportsProducer);
    enqueue(body: {
        taskId: string;
    }): Promise<import("bullmq").Job<any, any, string>> | {
        status: boolean;
        message: string;
    };
}
