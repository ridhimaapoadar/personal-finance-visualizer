export const categories = [
  'Food',
  'Transportation',
  'Entertainment',
  'Housing',
  'Utilities',
  'Healthcare',
  'Shopping',
  'Education',
  'Personal',
  'Other'
] as const;

export type Category = typeof categories[number];


export type TransactionData = {
  _id?: string;
  amount: number;
  date: Date | string;
  description: string;
  category: Category;
};

export type BudgetData = {
  _id?: string;
  category: Category;
  limit: number;
  month: number;
  year: number;
};


export async function fetchTransactions(): Promise<TransactionData[]> {
  const res = await fetch('/api/transactions');
  const { data } = await res.json();
  return data;
}

export async function fetchBudgets(): Promise<BudgetData[]> {
  const res = await fetch('/api/budgets');
  const { data } = await res.json();
  return data;
}

export async function createTransaction(transaction: TransactionData): Promise<TransactionData> {
  const res = await fetch('/api/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });
  
  const { data } = await res.json();
  return data;
}

export async function updateTransaction(id: string, transaction: TransactionData): Promise<TransactionData> {
  const res = await fetch(`/api/transactions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transaction),
  });
  
  const { data } = await res.json();
  return data;
}

export async function deleteTransaction(id: string): Promise<void> {
  await fetch(`/api/transactions/${id}`, {
    method: 'DELETE',
  });
}

export async function createBudget(budget: BudgetData): Promise<BudgetData> {
  const res = await fetch('/api/budgets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(budget),
  });
  
  const { data } = await res.json();
  return data;
}

export async function updateBudget(id: string, budget: BudgetData): Promise<BudgetData> {
  const res = await fetch(`/api/budgets/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(budget),
  });
  
  const { data } = await res.json();
  return data;
}

export async function deleteBudget(id: string): Promise<void> {
  await fetch(`/api/budgets/${id}`, {
    method: 'DELETE',
  });
}