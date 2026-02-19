type Summary = {
  revenue: number;
  spend: number;
  profit: number;
  roas: number;
  roi: number;
};

function money(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function num(n: number) {
  return n.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border p-4">
      <div className="text-xs text-white/70">{title}</div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
    </div>
  );
}

export function KpiCards({ summary }: { summary: Summary }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <Card title="Receita" value={money(summary.revenue)} />
      <Card title="Gasto" value={money(summary.spend)} />
      <Card title="Lucro" value={money(summary.profit)} />
      <Card title="ROAS" value={num(summary.roas)} />
      <Card title="ROI" value={num(summary.roi)} />
    </div>
  );
}
