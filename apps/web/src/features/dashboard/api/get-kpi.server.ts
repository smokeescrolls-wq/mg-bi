import "server-only";
import { env } from "@/shared/config/env.server";
import { KpiDailyResponseSchema, KpiSummarySchema } from "../model/kpi.schemas";

function qs(params: Record<string, string | undefined>) {
  const u = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v) u.set(k, v);
  return u.toString();
}

export async function getKpiSummary(input?: { from?: string; to?: string }) {
  const url = `${env.API_URL}/metrics/kpi/summary?${qs({
    from: input?.from,
    to: input?.to,
    orgId: "dev-org",
    productId: "ALL",
  })}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`summary failed (${res.status})`);
  return KpiSummarySchema.parse(await res.json());
}

export async function getKpiDaily(input?: { from?: string; to?: string }) {
  const url = `${env.API_URL}/metrics/kpi/daily?${qs({
    from: input?.from,
    to: input?.to,
    orgId: "dev-org",
    productId: "ALL",
  })}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`daily failed (${res.status})`);
  return KpiDailyResponseSchema.parse(await res.json());
}
