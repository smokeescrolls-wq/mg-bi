import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../database/prisma.service';
import { Platform, Prisma } from '@mg/db';

@Processor('ingestion')
export class IngestionProcessor extends WorkerHost {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async process(job: Job) {
    if (job.name !== 'sync:redtrack') return;

    const orgId: string = (job.data?.orgId as string) ?? 'dev-org';
    const externalId = `demo-${Date.now()}`;

    // 1) RAW EVENT (imutável)
    await this.prisma.rawEvent.create({
      data: {
        orgId,
        platform: Platform.REDTRACK,
        externalId,
        occurredAt: new Date(),
        payloadJson: { hello: 'redtrack', at: new Date().toISOString() },
      },
    });

    // 2) KPI DAILY (demo)
    const now = new Date();
    const dateOnly = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

    const revenue = new Prisma.Decimal(1000);
    const spend = new Prisma.Decimal(300);
    const profit = revenue.minus(spend);

    const roas = spend.equals(0) ? new Prisma.Decimal(0) : revenue.div(spend);
    const roi = spend.equals(0) ? new Prisma.Decimal(0) : profit.div(spend);

    // IMPORTANTE: productId null NÃO garante unicidade no Postgres (NULL não é único).
    // Então usamos um sentinel fixo para o agregado "geral".
    const productId = 'ALL';

    await this.prisma.factKpiDaily.upsert({
      where: {
        orgId_date_productId: { orgId, date: dateOnly, productId },
      },
      update: {
        revenue: { increment: revenue },
        spend: { increment: spend },
        profit: { increment: profit },
        roas,
        roi,
      },
      create: {
        orgId,
        date: dateOnly,
        productId,
        revenue,
        spend,
        profit,
        roas,
        roi,
        cpa: new Prisma.Decimal(0),
      },
    });

    return { ok: true, externalId };
  }
}
