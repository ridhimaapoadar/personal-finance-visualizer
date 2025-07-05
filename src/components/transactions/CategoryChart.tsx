"use client";

import { TransactionData } from "@/lib/clientHelpers";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface CategoryChartProps {
  transactions: TransactionData[];
}

// Colors for different categories
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FF6B6B",
  "#6A0572",
  "#AB83A1",
  "#F15BB5",
];

export function CategoryChart({ transactions }: CategoryChartProps) {
  const categoryData = transactions.reduce((acc, transaction) => {
    const existingCategory = acc.find((item) => item.name === transaction.category);
    if (existingCategory) {
      existingCategory.value += transaction.amount;
    } else {
      acc.push({ name: transaction.category, value: transaction.amount });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  // Sort by value in descending order
  categoryData.sort((a, b) => b.value - a.value);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={categoryData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}