import { z } from "zod";

export const KpiSummarySchema = z.object({
  from: z.string(),
  to: z.string(),
  revenue: z.number(),
  spend: z.number(),
  profit: z.number(),
  roas: z.number(),
  roi: z.number(),
});

export const KpiDailyRowSchema = z.object({
  date: z.string(),
  revenue: z.number(),
  spend: z.number(),
  profit: z.number(),
  roas: z.number(),
  roi: z.number(),
});

export const KpiDailyResponseSchema = z.object({
  from: z.string(),
  to: z.string(),
  rows: z.array(KpiDailyRowSchema),
});
