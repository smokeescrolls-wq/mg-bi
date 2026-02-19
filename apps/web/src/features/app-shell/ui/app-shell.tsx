import type { ReactNode } from "react";
import { Sidebar } from "../model/sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <div className="h-16 border-b bg-white flex items-center justify-between px-6">
            <div className="text-sm text-zinc-500">
              {/* breadcrumb simples por enquanto */}
              MG BI
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-zinc-600">Usuário</div>
              <div className="h-9 w-9 rounded-full bg-zinc-200" />
            </div>
          </div>

          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
