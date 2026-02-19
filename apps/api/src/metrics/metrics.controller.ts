import { Controller, Get, Query } from '@nestjs/common';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metrics: MetricsService) {}

  @Get('kpi/summary')
  summary(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('orgId') orgId = 'dev-org',
    @Query('productId') productId = 'ALL',
  ) {
    return this.metrics.getSummary({ from, to, orgId, productId });
  }

  @Get('kpi/daily')
  daily(
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('orgId') orgId = 'dev-org',
    @Query('productId') productId = 'ALL',
  ) {
    return this.metrics.getDaily({ from, to, orgId, productId });
  }
}
