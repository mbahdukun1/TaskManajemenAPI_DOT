import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ReportsProducer } from './reports.producer';
import { ReportsProcessor } from './reports.processor';
import { ReportsController } from './reports.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'reports',
    }),
  ],
  providers: [ReportsProducer, ReportsProcessor],
  controllers: [ReportsController],
  exports: [ReportsProducer],
})
export class ReportsModule {}
