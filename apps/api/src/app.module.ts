import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { IngestionModule } from './ingestion/ingestion.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [DatabaseModule, IngestionModule, MetricsModule],
})
export class AppModule {}
