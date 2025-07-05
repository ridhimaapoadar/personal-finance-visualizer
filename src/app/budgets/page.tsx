"use client";

import { useEffect, useState } from "react";
import { BudgetData, TransactionData, fetchBudgets, fetchTransactions } from "@/lib/clientHelpers";
import { BudgetForm } from "@/components/budgets/BudgetForm";
import { BudgetList } from "@/components/budgets/BudgetList";
import { BudgetSummary } from "@/components/budgets/BudgetSummary";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<BudgetData[]>([]);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<BudgetData | undefined>(
    undefined
  );

  const loadBudgets = async () => {
    const data = await fetchBudgets();
    setBudgets(data);
  };

  const loadTransactions = async () => {
    const data = await fetchTransactions();
    setTransactions(data);
  };

  useEffect(() => {
    loadBudgets();
    loadTransactions();
  }, []);

  const handleFormSubmit = async (values: any) => {
    const method = editingBudget ? "PUT" : "POST";
    const url = editingBudget
      ? `/api/budgets/${editingBudget._id}`
      : "/api/budgets";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      loadBudgets();
      setIsDialogOpen(false);
      setEditingBudget(undefined);
    } else {
      const errorData = await res.json();
      alert(errorData.error || "An error occurred");
    }
  };

  const handleEdit = (budget: BudgetData) => {
    setEditingBudget(budget);
    setIsDialogOpen(true);
  };

  const handleDelete = async (budgetId: string) => {
    const res = await fetch(`/api/budgets/${budgetId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      loadBudgets();
    }
  };

  return (
    <main className="container mx-auto p-4">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Budgets</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingBudget(undefined)}>
                  Add Budget
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingBudget ? "Edit Budget" : "Add Budget"}
                  </DialogTitle>
                </DialogHeader>
                <BudgetForm
                  onSubmit={handleFormSubmit}
                  initialData={editingBudget}
                />
              </DialogContent>
            </Dialog>
          </div>

          <BudgetList
            budgets={budgets}
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Budget Summary</h2>
          <BudgetSummary budgets={budgets} transactions={transactions} />
        </div>
      </div>
    </main>
  );
}