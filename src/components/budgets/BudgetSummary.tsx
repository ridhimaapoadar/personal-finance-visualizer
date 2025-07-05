"use client";

import { BudgetData, TransactionData } from "@/lib/clientHelpers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BudgetSummaryProps {
  budgets: BudgetData[];
  transactions: TransactionData[];
}

export function BudgetSummary({ budgets, transactions }: BudgetSummaryProps) {
  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
  const currentYear = currentDate.getFullYear();

  // Filter budgets for current month and year
  const currentBudgets = budgets.filter(
    (budget) => budget.month === currentMonth && budget.year === currentYear
  );

  // Calculate total budget and spending
  const totalBudget = currentBudgets.reduce(
    (total, budget) => total + budget.limit,
    0
  );

  // Calculate spending for current month by category
  const calculateCategorySpending = (category: string) => {
    return transactions
      .filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
          transaction.category === category &&
          transactionDate.getMonth() + 1 === currentMonth &&
          transactionDate.getFullYear() === currentYear
        );
      })
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  // Calculate total spending for current month
  const totalSpending = transactions
    .filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() + 1 === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    })
    .reduce((total, transaction) => total + transaction.amount, 0);

  // Calculate overall budget progress
  const overallPercentage = totalBudget > 0 ? (totalSpending / totalBudget) * 100 : 0;

  // Get month name
  const monthName = new Date(currentYear, currentMonth - 1).toLocaleString(
    "default",
    { month: "long" }
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Budget Overview</CardTitle>
          <CardDescription>
            {monthName} {currentYear}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Budget</span>
              <span className="font-medium">${totalBudget.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Spent</span>
              <span className="font-medium">${totalSpending.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Remaining</span>
              <span
                className={`font-medium ${totalBudget - totalSpending < 0 ? "text-red-500" : "text-green-500"}`}
              >
                ${(totalBudget - totalSpending).toFixed(2)}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{Math.min(overallPercentage, 100).toFixed(0)}%</span>
              </div>
              <Progress
                value={Math.min(overallPercentage, 100)}
                className={`h-2 ${overallPercentage > 100 ? "bg-red-200" : "bg-gray-200"}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {currentBudgets.length > 0 ? (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>Budget vs. Spending by Category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentBudgets.map((budget) => {
                const spent = calculateCategorySpending(budget.category);
                const percentage = (spent / budget.limit) * 100;
                return (
                  <div key={budget._id} className="space-y-2">
                    <div className="flex justify-between">
                      <span>{budget.category}</span>
                      <span>
                        ${spent.toFixed(2)} / ${budget.limit.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={Math.min(percentage, 100)}
                        className={`h-2 ${percentage > 100 ? "bg-red-200" : "bg-gray-200"}`}
                      />
                      <span className="text-xs w-12">
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6 text-center">
            <p>No budgets set for the current month.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add a budget to track your spending against your limits.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}