"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b mb-4">
      <div className="container mx-auto py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold mr-8">Personal Finance Visualizer</h1>
          <div className="flex space-x-2">
            <Button
              variant={pathname === "/" ? "default" : "ghost"}
              asChild
            >
              <Link href="/">Dashboard</Link>
            </Button>
            <Button
              variant={pathname === "/budgets" ? "default" : "ghost"}
              asChild
            >
              <Link href="/budgets">Budgets</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}