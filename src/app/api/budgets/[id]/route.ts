import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Budget from "@/models/Budget";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = params;
    await dbConnect();

    const budget = await Budget.findById(id);
    if (!budget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }

    return NextResponse.json({ data: budget }, { status: 200 });
  } catch (error) {
    console.error("Error fetching budget:", error);
    return NextResponse.json(
      { error: "Failed to fetch budget" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const body = await request.json();
    await dbConnect();

    const existingBudget = await Budget.findOne({
      category: body.category,
      month: body.month,
      year: body.year,
      _id: { $ne: id },
    });

    if (existingBudget) {
      return NextResponse.json(
        { error: "Budget for this category, month, and year already exists" },
        { status: 400 }
      );
    }

    const updatedBudget = await Budget.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBudget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }

    return NextResponse.json({ data: updatedBudget }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating budget:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update budget" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = params;
    await dbConnect();

    const deletedBudget = await Budget.findByIdAndDelete(id);
    if (!deletedBudget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }

    return NextResponse.json({ data: {} }, { status: 200 });
  } catch (error) {
    console.error("Error deleting budget:", error);
    return NextResponse.json(
      { error: "Failed to delete budget" },
      { status: 500 }
    );
  }
}