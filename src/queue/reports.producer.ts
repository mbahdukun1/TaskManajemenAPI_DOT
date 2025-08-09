import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class ReportsProducer {
  constructor(@InjectQueue('reports') private readonly queue: Queue) {}

  async enqueueGenerateReport(payload: { taskId: string }) {
    return this.queue.add('generate-report', payload, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 },
      removeOnComplete: 50,
      removeOnFail: 100,
    });
  }
}
