// src/app/api/transactions/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "../connect/db";
import { User } from "../connect/userModel";
import { Transaction } from "../connect/transactionModel";
// adjust import path if your authOptions file is in a different relative folder
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "5", 10);

    const txns = await Transaction.find({ userId: user._id })
      .sort({ date: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ transactions: txns }, { status: 200 });
  } catch (err) {
    console.error("GET /api/transactions error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const body = await req.json();
    // expected body: { amount, type: 'income'|'expense', category?, description?, date?, project? }
    let { amount, type, category, description, date, project } = body;

    // validation: amount must be numeric
    const parsed = Number(amount);
    if (isNaN(parsed)) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // normalization: always store positive amount and enforce type value
    const amountAbs = Math.abs(parsed);
    type = type === "expense" ? "expense" : "income"; // default to income if invalid

    const txn = await Transaction.create({
      userId: user._id,
      amount: amountAbs,
      type,
      category: category || "General",
      description: description || "",
      date: date ? new Date(date) : new Date(),
      project: project || "",
    });

    // update user's totals defensively (use positive amounts)
    try {
      if (type === "income") {
        user.totalRevenue = (user.totalRevenue || 0) + amountAbs;
      } else {
        user.totalExpenses = (user.totalExpenses || 0) + amountAbs;
      }
      await user.save();
    } catch (e) {
      // don't fail the request if user update fails, but log it
      console.warn("Failed to update user totals:", e);
    }

    return NextResponse.json({ transaction: txn }, { status: 201 });
  } catch (err) {
    console.error("POST /api/transactions error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
