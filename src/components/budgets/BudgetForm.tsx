"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IBudget } from "@/models/Budget";
import { categories } from "@/lib/clientHelpers";

const formSchema = z.object({
  category: z.string().min(1, "Category is required"),
  limit: z.coerce
    .number()
    .min(0.01, "Budget limit must be greater than 0")
    .max(1000000, "Budget limit is too high"),
  month: z.coerce
    .number()
    .min(1, "Month must be between 1 and 12")
    .max(12, "Month must be between 1 and 12"),
  year: z.coerce
    .number()
    .min(2000, "Year must be 2000 or later")
    .max(2100, "Year must be 2100 or earlier"),
});

interface BudgetFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  initialData?: IBudget;
}

const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

export function BudgetForm({ onSubmit, initialData }: BudgetFormProps) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; 
  const currentYear = currentDate.getFullYear();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          category: initialData.category,
          limit: initialData.limit,
          month: initialData.month,
          year: initialData.year,
        }
      : {
          category: "Food & Dining",
          limit: 0,
          month: currentMonth,
          year: currentYear,
        },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="limit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget Limit ($)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter budget limit"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="month"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Month</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem
                      key={month.value}
                      value={month.value.toString()}
                    >
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter year"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {initialData ? "Update Budget" : "Add Budget"}
        </Button>
      </form>
    </Form>
  );
}