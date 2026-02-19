"use client";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Point = {
  date: string;
  revenue: number;
  spend: number;
  profit: number;
};

export function KpiChart({ data }: { data: Point[] }) {
  return (
    <div className="h-72 w-full rounded-xl border p-4">
      <div className="mb-3 text-sm font-medium">Últimos dias</div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" />
          <Line type="monotone" dataKey="spend" />
          <Line type="monotone" dataKey="profit" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
