import { Controller, Post } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Controller('ingestion')
export class IngestionController {
  constructor(@InjectQueue('ingestion') private readonly q: Queue) {}

  @Post('sync/redtrack')
  async syncRedtrack() {
    await this.q.add('sync:redtrack', { orgId: 'dev-org' }, { removeOnComplete: true, removeOnFail: 100 });
    return { queued: true };
  }
}
