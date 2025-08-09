import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReportsProducer } from './reports.producer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Reports Queue')
@ApiBearerAuth()
@Controller('reports')
@UseGuards(AuthGuard('jwt'))
export class ReportsController {
  constructor(private readonly producer: ReportsProducer) {}

  @Post('enqueue')
  enqueue(@Body() body: { taskId: string }) {

    if (!body?.taskId) {
      return { status: false, message: 'taskId is required' };
    }
    return this.producer.enqueueGenerateReport({ taskId: body.taskId });
  }
}
