"use server";

import "server-only";
import { env } from "@/shared/config/env.server";

export async function triggerRedtrackSync() {
  const res = await fetch(`${env.API_URL}/ingestion/sync/redtrack`, {
    method: "POST",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`sync failed (${res.status})`);
  }

  return res.json() as Promise<{ queued: boolean }>;
}
