"use client";

import { useEffect, useState } from "react";
import { TransactionData, fetchTransactions } from "@/lib/clientHelpers";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { TransactionList } from "@/components/transactions/TransactionList";
import { MonthlyChart } from "@/components/transactions/MonthlyChart";
import { CategoryChart } from "@/components/transactions/CategoryChart";
import { Dashboard } from "@/components/transactions/Dashboard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<TransactionData | undefined>(
    undefined
  );

  const loadTransactions = async () => {
    const data = await fetchTransactions();
    setTransactions(data);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleFormSubmit = async (values: any) => {
    const method = editingTransaction ? "PUT" : "POST";
    const url = editingTransaction
      ? `/api/transactions/${editingTransaction._id}`
      : "/api/transactions";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (res.ok) {
      loadTransactions();
      setIsDialogOpen(false);
      setEditingTransaction(undefined);
    }
  };

  const handleEdit = (transaction: TransactionData) => {
    setEditingTransaction(transaction);
    setIsDialogOpen(true);
  };

  const handleDelete = async (transactionId: string) => {
    const res = await fetch(`/api/transactions/${transactionId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      loadTransactions();
    }
  };

  return (
    <main className="container mx-auto p-4">
      {/* Dashboard Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <Dashboard transactions={transactions} />
      </section>
      
      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Transactions</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingTransaction(undefined)}>Add Transaction</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingTransaction ? "Edit Transaction" : "Add Transaction"}
                  </DialogTitle>
                </DialogHeader>
                <TransactionForm
                  onSubmit={handleFormSubmit}
                  initialData={editingTransaction}
                />
              </DialogContent>
            </Dialog>
          </div>
          <TransactionList
            transactions={transactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>
        
        <TabsContent value="charts" className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
            <MonthlyChart transactions={transactions} />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Expenses by Category</h2>
            <CategoryChart transactions={transactions} />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
