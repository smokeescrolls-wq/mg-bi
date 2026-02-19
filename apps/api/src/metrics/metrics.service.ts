import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function toNumber(v: Prisma.Decimal | number | null | undefined) {
  if (v == null) return 0;
  if (typeof v === 'number') return v;
  return Number(v.toString());
}

@Injectable()
export class MetricsService {
  constructor(private readonly prisma: PrismaService) {}

  private normalizeRange(from?: string, to?: string) {
    const end = to ? new Date(`${to}T23:59:59.999Z`) : new Date();
    const start = from ? new Date(`${from}T00:00:00.000Z`) : new Date(end);
    if (!from) start.setUTCDate(end.getUTCDate() - 29);
    return { start, end };
  }

  async getSummary(input: {
    from?: string;
    to?: string;
    orgId: string;
    productId: string;
  }) {
    const { start, end } = this.normalizeRange(input.from, input.to);

    const rows = await this.prisma.factKpiDaily.findMany({
      where: {
        orgId: input.orgId,
        productId: input.productId,
        date: { gte: start, lte: end },
      },
      select: { revenue: true, spend: true, profit: true },
    });

    const revenue = rows.reduce((a, r) => a + toNumber(r.revenue), 0);
    const spend = rows.reduce((a, r) => a + toNumber(r.spend), 0);
    const profit = rows.reduce((a, r) => a + toNumber(r.profit), 0);

    const roas = spend > 0 ? revenue / spend : 0;
    const roi = spend > 0 ? profit / spend : 0;

    return {
      from: isoDate(start),
      to: isoDate(end),
      revenue,
      spend,
      profit,
      roas,
      roi,
    };
  }

  async getDaily(input: {
    from?: string;
    to?: string;
    orgId: string;
    productId: string;
  }) {
    const { start, end } = this.normalizeRange(input.from, input.to);

    const rows = await this.prisma.factKpiDaily.findMany({
      where: {
        orgId: input.orgId,
        productId: input.productId,
        date: { gte: start, lte: end },
      },
      orderBy: { date: 'asc' },
      select: {
        date: true,
        revenue: true,
        spend: true,
        profit: true,
        roas: true,
        roi: true,
      },
    });

    return {
      from: isoDate(start),
      to: isoDate(end),
      rows: rows.map((r) => ({
        date: isoDate(r.date),
        revenue: toNumber(r.revenue),
        spend: toNumber(r.spend),
        profit: toNumber(r.profit),
        roas: toNumber(r.roas),
        roi: toNumber(r.roi),
      })),
    };
  }
}
