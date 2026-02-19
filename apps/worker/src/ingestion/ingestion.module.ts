import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { DatabaseModule } from '../database/database.module';
import { IngestionProcessor } from './ingestion.processor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const url = new URL(cfg.get<string>('REDIS_URL')!);
        return { connection: { host: url.hostname, port: Number(url.port || 6379) } };
      },
    }),
    BullModule.registerQueue({ name: 'ingestion' }),
  ],
  providers: [IngestionProcessor],
})
export class IngestionModule {}
