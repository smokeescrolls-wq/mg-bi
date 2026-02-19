"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { triggerRedtrackSync } from "../actions";

export function SyncButton() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      className="inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-white/5 disabled:opacity-60"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await triggerRedtrackSync();
          router.refresh(); // força o server component refetch
        })
      }
    >
      {pending ? "Sincronizando..." : "Sync RedTrack"}
    </button>
  );
}
