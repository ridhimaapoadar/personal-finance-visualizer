"use client";

import { BudgetData, TransactionData } from "@/lib/clientHelpers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface BudgetListProps {
  budgets: BudgetData[];
  transactions: TransactionData[];
  onEdit: (budget: BudgetData) => void;
  onDelete: (budgetId: string) => void;
}

export function BudgetList({
  budgets,
  transactions,
  onEdit,
  onDelete,
}: BudgetListProps) {
  // Function to get month name from month number
  const getMonthName = (monthNumber: number) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("default", { month: "long" });
  };

  // Calculate spending for each budget
  const calculateSpending = (budget: BudgetData) => {
    const { category, month, year } = budget;
    
    // Filter transactions by category, month, and year
    const relevantTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transaction.category === category &&
        transactionDate.getMonth() + 1 === month &&
        transactionDate.getFullYear() === year
      );
    });
    
    // Sum the amounts
    const totalSpent = relevantTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    
    return totalSpent;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Month/Year</TableHead>
            <TableHead>Budget Limit</TableHead>
            <TableHead>Spent</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {budgets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No budgets found. Add a budget to get started.
              </TableCell>
            </TableRow>
          ) : (
            budgets.map((budget) => {
              const spent = calculateSpending(budget);
              const percentage = Math.min((spent / budget.limit) * 100, 100);
              const isOverBudget = spent > budget.limit;
              
              return (
                <TableRow key={budget._id}>
                  <TableCell>{budget.category}</TableCell>
                  <TableCell>
                    {getMonthName(budget.month)} {budget.year}
                  </TableCell>
                  <TableCell>${budget.limit.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={isOverBudget ? "text-red-500 font-medium" : ""}>
                      ${spent.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={percentage} 
                        className={`h-2 ${isOverBudget ? "bg-red-200" : "bg-gray-200"}`}
                      />
                      <span className="text-xs w-12">
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(budget)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onDelete(budget._id)}
                          className="text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}