import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bullmq';
import { IngestionController } from './ingestion.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const url = new URL(cfg.get<string>('REDIS_URL')!);
        return { connection: { host: url.hostname, port: Number(url.port || 6379) } };
      },
    }),
    BullModule.registerQueue({ name: 'ingestion' }),
  ],
  controllers: [IngestionController],
})
export class IngestionModule {}
