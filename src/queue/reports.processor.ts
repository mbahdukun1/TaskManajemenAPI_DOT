import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('reports')
export class ReportsProcessor extends WorkerHost {
  private readonly logger = new (require('@nestjs/common').Logger)(ReportsProcessor.name);

  async process(job: Job<any, any, string>): Promise<any> {
    if (job.name === 'generate-report') {
  
      await new Promise((r) => setTimeout(r, 3000));
  
      return { ok: true, taskId: job.data.taskId, at: new Date().toISOString() };
    }
    return null;
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    this.logger?.log(`[reports] active ${job.id} ${job.name}`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job, result: any) {
    this.logger?.log(`[reports] completed ${job.id}`, result);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, err: Error) {
    this.logger?.error(`[reports] failed ${job.id}`, err.message);
  }
}
