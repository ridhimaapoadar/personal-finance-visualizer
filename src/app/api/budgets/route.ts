import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Budget, { IBudget } from "@/models/Budget";

export async function GET() {
  try {
    await dbConnect();
    const budgets = await Budget.find({}).sort({ year: -1, month: -1 });
    return NextResponse.json({ data: budgets }, { status: 200 });
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return NextResponse.json(
      { error: "Failed to fetch budgets" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();

    // Check if a budget for this category, month, and year already exists
    const existingBudget = await Budget.findOne({
      category: body.category,
      month: body.month,
      year: body.year,
    });

    if (existingBudget) {
      return NextResponse.json(
        { error: "Budget for this category, month, and year already exists" },
        { status: 400 }
      );
    }

    const budget = await Budget.create(body);
    return NextResponse.json({ data: budget }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating budget:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create budget" },
      { status: 500 }
    );
  }
}