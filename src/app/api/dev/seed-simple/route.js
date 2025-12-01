import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { connectDB } from "../../connect/db";
import { User } from "../../connect/userModel";
import { Transaction } from "../../connect/transactionModel";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    // --------- SIMPLE DUMMY DATA ----------
    user.totalRevenue = 52000;
    user.totalExpenses = 31000;
    user.projects = 4;
    user.teamMembers = 7;

    await user.save();

    // remove old transactions for cleanliness
    await Transaction.deleteMany({ userId: user._id });

    const now = new Date();
    const sample = [];

    for (let i = 0; i < 12; i++) {
      sample.push({
        userId: user._id,
        amount: Math.floor(Math.random() * 8000) + 2000,
        type: i % 2 === 0 ? "income" : "expense",
        category: i % 2 === 0 ? "Sales" : "Office",
        description: "Sample entry",
        date: new Date(now.getFullYear(), now.getMonth() - (i % 6), 10),
        project: "Demo"
      });
    }

    await Transaction.insertMany(sample);

    return NextResponse.json({
      success: true,
      message: "Dummy data added successfully!",
      user: {
        email: user.email,
        totalRevenue: user.totalRevenue,
        totalExpenses: user.totalExpenses,
      }
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
