"use client";

import { TransactionData } from "@/lib/clientHelpers";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface MonthlyChartProps {
  transactions: TransactionData[];
}

export function MonthlyChart({ transactions }: MonthlyChartProps) {
  const data = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
    const existingMonth = acc.find((item) => item.name === month);
    if (existingMonth) {
      existingMonth.total += transaction.amount;
    } else {
      acc.push({ name: month, total: transaction.amount });
    }
    return acc;
  }, [] as { name: string; total: number }[]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}