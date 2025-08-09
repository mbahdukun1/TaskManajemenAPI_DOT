import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('integrations')
@UseGuards(AuthGuard('jwt'))
export class IntegrationsController {
  constructor(private readonly svc: IntegrationsService) {}

  @Get('todos')
  todos(@Query('userId') userId = 1) {
    return this.svc.getPublicTodos(Number(userId));
  }
}
