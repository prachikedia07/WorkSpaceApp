// src/app/api/transactions/[id]/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "../../connect/db";
import { Transaction } from "../../connect/transactionModel";
import { User } from "../../connect/userModel";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import mongoose from "mongoose";

function normalizeId(id) {
  try {
    return new mongoose.Types.ObjectId(String(id));
  } catch (e) {
    return id;
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { id } = params;
    const body = await req.json();

    if (body.amount !== undefined && isNaN(Number(body.amount))) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const txn = await Transaction.findOne({ _id: normalizeId(id), userId: user._id });
    if (!txn) return NextResponse.json({ error: "Transaction not found" }, { status: 404 });

    // Apply updates
    if (body.amount !== undefined) txn.amount = Number(body.amount);
    if (body.type) txn.type = body.type;
    if (body.category !== undefined) txn.category = body.category;
    if (body.description !== undefined) txn.description = body.description;
    if (body.date) txn.date = new Date(body.date);
    if (body.project !== undefined) txn.project = body.project;
    if (body.status !== undefined) txn.status = body.status;

    await txn.save();

    // Recompute user totals
    const agg = await Transaction.aggregate([
      { $match: { userId: user._id } },
      { $group: { _id: "$type", total: { $sum: "$amount" } } },
    ]);

    let totalRevenue = 0, totalExpenses = 0;
    agg.forEach(a => { if (a._id === "income") totalRevenue = a.total; if (a._id === "expense") totalExpenses = a.total; });

    user.totalRevenue = totalRevenue;
    user.totalExpenses = totalExpenses;
    await user.save();

    return NextResponse.json({ transaction: txn }, { status: 200 });
  } catch (err) {
    console.error("PATCH /api/transactions/[id] error:", err);
    return NextResponse.json({ error: "Server error", message: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { id } = params;
    const txn = await Transaction.findOneAndDelete({ _id: normalizeId(id), userId: user._id });
    if (!txn) return NextResponse.json({ error: "Transaction not found" }, { status: 404 });

    // Recompute totals after deletion
    const agg = await Transaction.aggregate([
      { $match: { userId: user._id } },
      { $group: { _id: "$type", total: { $sum: "$amount" } } },
    ]);

    let totalRevenue = 0, totalExpenses = 0;
    agg.forEach(a => { if (a._id === "income") totalRevenue = a.total; if (a._id === "expense") totalExpenses = a.total; });

    user.totalRevenue = totalRevenue;
    user.totalExpenses = totalExpenses;
    await user.save();

    return NextResponse.json({ success: true, deletedId: txn._id }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/transactions/[id] error:", err);
    return NextResponse.json({ error: "Server error", message: err.message }, { status: 500 });
  }
}
