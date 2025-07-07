"use client";

import { TransactionData } from "@/lib/clientHelpers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardProps {
  transactions: TransactionData[];
}

export function Dashboard({ transactions }: DashboardProps) {
  const totalExpenses = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  const categoryBreakdown = transactions.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categoryBreakdown).sort(
    ([, amountA], [, amountB]) => amountB - amountA
  );

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Total Expenses Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Total Expenses</CardTitle>
          <CardDescription>Your overall spending</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
        </CardContent>
      </Card>

      {/* Category Breakdown Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Top Categories</CardTitle>
          <CardDescription>Where your money goes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sortedCategories.slice(0, 3).map(([category, amount]) => (
              <div key={category} className="flex justify-between">
                <span>{category}</span>
                <span className="font-medium">${amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest spending</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentTransactions.map((transaction) => (
              <div key={transaction._id} className="flex justify-between">
                <span className="truncate max-w-[150px]">
                  {transaction.description}
                </span>
                <span className="font-medium">
                  ${transaction.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}