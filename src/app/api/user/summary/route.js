// src/app/api/user/summary/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "../../connect/db";
import { User } from "../../connect/userModel";
import { Transaction } from "../../connect/transactionModel";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import mongoose from "mongoose";

function lastNMonthsLabels(n) {
  const labels = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const m = d.toLocaleString("default", { month: "short" });
    labels.push({ key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`, label: m });
  }
  return labels;
}

export async function GET(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email }).lean();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // === SAFE: ensure we use an ObjectId instance ===
    let userObjectId;
    try {
      // if it's already an ObjectId, keep it; if it's a string, create a new ObjectId instance
      userObjectId =
        user._id && (user._id instanceof mongoose.Types.ObjectId)
          ? user._id
          : new mongoose.Types.ObjectId(user._id);
    } catch (e) {
      // fallback: use the _id as-is (aggregation may still work if it's ObjectId already)
      userObjectId = user._id;
    }

    // latest 5 transactions
    const recentTransactions = await Transaction.find({ userId: userObjectId })
      .sort({ date: -1 })
      .limit(5)
      .lean();

    // build last 6 months keys
    const months = lastNMonthsLabels(6);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5); // inclusive of current month + previous 5 months

    // Aggregate totals grouped by YYYY-MM (only for last 6 months)
    const agg = await Transaction.aggregate([
      {
        $match: {
          userId: typeof userObjectId === "object" ? userObjectId : mongoose.Types.ObjectId(String(userObjectId)),
          date: { $gte: new Date(sixMonthsAgo.getFullYear(), sixMonthsAgo.getMonth(), 1) },
        },
      },
      {
        $project: {
          yearMonth: { $dateToString: { format: "%Y-%m", date: "$date" } },
          amount: 1,
          type: 1,
        },
      },
      {
        $group: {
          _id: "$yearMonth",
          revenue: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
            },
          },
          expenses: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
            },
          },
        },
      },
    ]);

    // Map aggregation into months array with zeros for missing months
        // Map aggregation into months array with zeros for missing months
    const aggMap = {};
    (agg || []).forEach((a) => {
      aggMap[a._id] = { revenue: a.revenue || 0, expenses: a.expenses || 0 };
    });

    const chartData = months.map((m) => {
      const data = aggMap[m.key] || { revenue: 0, expenses: 0 };
      return {
        month: m.label,
        revenue: Number(data.revenue || 0),
        expenses: Number(data.expenses || 0),
      };
    });

    // Compute totals from the same chartData (ensures chart and top numbers match)
    const totalRevenue = chartData.reduce((s, item) => s + (Number(item.revenue) || 0), 0);
    const totalExpenses = chartData.reduce((s, item) => s + (Number(item.expenses) || 0), 0);

    const payload = {
      name: user.name || session.user.name || "User",
      email: user.email,
      plan: user.plan || "Free",
      totalRevenue,
      totalExpenses,
      projects: user.projects || 0,
      teamMembers: user.teamMembers || 0,
      recentTransactions,
      chartData,
    };

    return NextResponse.json(payload, { status: 200 });

  } catch (err) {
    console.error("GET /api/user/summary error:", err);
    // return a clean error message to client (avoid leaking stack in prod)
    return NextResponse.json({ error: "Server error", message: err.message }, { status: 500 });
  }
}
