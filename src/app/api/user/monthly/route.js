// src/app/api/user/monthly/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { connectDB } from "../../connect/db";
import Transaction from "../../connect/transactionModel";
import * as UserModule from "../../connect/userModel"; // robust import for named/default exports
import mongoose from "mongoose";

const User = UserModule.default || UserModule.User || UserModule;

function lastNMonthLabels(n) {
  const labels = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    labels.push(d.toLocaleString("default", { month: "short" }));
  }
  return labels;
}

export async function GET(req) {
  try {
    // check session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email && !session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // parse query param ?months=6
    const url = new URL(req.url);
    const monthsParam = Number(url.searchParams.get("months") || "6");
    const months = Number.isInteger(monthsParam) && monthsParam > 0 ? monthsParam : 6;

    // connect DB
    await connectDB();

    if (!Transaction || typeof Transaction.aggregate !== "function") {
      console.error("Transaction model not loaded:", Transaction);
      return NextResponse.json({ error: "Transaction model not loaded on server" }, { status: 500 });
    }

    // Determine session info
    const sessionUserId = session.user?.id || null;
    const sessionEmail = session.user?.email || null;

    // Resolve the actual MongoDB user _id (ObjectId) if possible:
    // 1) If sessionUserId already looks like an ObjectId, use it.
    // 2) Else, look up the user by email in the Users collection (if available).
    let resolvedUserObjectId = null;
    try {
      if (sessionUserId && mongoose.Types.ObjectId.isValid(sessionUserId)) {
        resolvedUserObjectId = new mongoose.Types.ObjectId(sessionUserId);
      } else if (sessionEmail && User && typeof User.findOne === "function") {
        const dbUser = await User.findOne({ email: sessionEmail }).lean();
        // console.log("monthly debug (lookupUser):", { sessionEmail, foundUser: !!dbUser, dbUserId: dbUser?._id });
        if (dbUser && dbUser._id) resolvedUserObjectId = dbUser._id;
      } else {
        // console.log("monthly debug (lookupUser): user model missing or findOne not a function", {
        //   sessionEmail,
        //   userModuleHasFindOne: !!(User && typeof User.findOne === "function"),
        // });
      }
    } catch (e) {
      console.warn("monthly: error looking up user by email:", e);
    }

    // If neither resolvedUserObjectId nor sessionEmail exist, bail
    if (!resolvedUserObjectId && !sessionEmail) {
      return NextResponse.json({ error: "No user id/email in session" }, { status: 400 });
    }

    // Aggregation pipeline: group by month-year and sum incomes/expenses
    const now = new Date();
    const fromDate = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);

    // Build user match:
    // - prefer matching by resolvedUserObjectId (ObjectId),
    // - also allow matching by sessionEmail (in case transactions saved email instead)
    let userMatch;
    if (resolvedUserObjectId) {
      userMatch = {
        $or: [{ userId: resolvedUserObjectId }, { userEmail: sessionEmail }],
      };
    } else {
      userMatch = { userEmail: sessionEmail };
    }

    // Date match: accept docs where either `date` or `createdAt` is within the window
    const dateMatch = {
      $or: [{ date: { $gte: fromDate } }, { createdAt: { $gte: fromDate } }],
    };

    const matchStage = { $and: [dateMatch, userMatch] };

    // // DEBUG: log the user lookup & matchStage so you can inspect why nothing matched
    // try {
    //   const debugDocs = await Transaction.find(matchStage).limit(5).lean();
    //   console.log("monthly debug (matchStage):", { matchStage, debugCount: debugDocs.length });
    //   if (debugDocs.length > 0) console.log("monthly debug sample:", debugDocs);
    // } catch (e) {
    //   console.warn("monthly debug: sample find failed:", e);
    // }

    const pipeline = [
  { $match: matchStage },
  {
    $addFields: {
      year: { $year: { $ifNull: ["$date", "$createdAt"] } },
      month: { $month: { $ifNull: ["$date", "$createdAt"] } }
    }
  },
  {
    $group: {
      _id: { year: "$year", month: "$month" },
      // sum incomes where type === "income" (use absolute value defensively)
      revenue: {
        $sum: {
          $cond: [
            { $eq: ["$type", "income"] },
            { $abs: "$amount" },
            0
          ]
        }
      },
      // sum expenses where type === "expense" (use absolute value defensively)
      expenses: {
        $sum: {
          $cond: [
            { $eq: ["$type", "expense"] },
            { $abs: "$amount" },
            0
          ]
        }
      }
    }
  },
  { $sort: { "_id.year": 1, "_id.month": 1 } }
];


    const agg = await Transaction.aggregate(pipeline).allowDiskUse(true);

    const resultsMap = new Map();
for (const r of agg) {
  const m = r._id.month; // 1-12
  const y = r._id.year;
  const key = `${y}-${String(m).padStart(2, "0")}`;
  resultsMap.set(key, {
    revenue: Number(r.revenue || 0),      // already positive by aggregation
    expenses: Number(r.expenses || 0),    // already positive by aggregation
    year: y,
    month: m,
  });
}


    const out = [];
    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const found = resultsMap.get(key) || { revenue: 0, expenses: 0 };
      out.push({
        month: d.toLocaleString("default", { month: "short" }),
        year: d.getFullYear(),
        revenue: Number(found.revenue || 0),
        expenses: Number(found.expenses || 0),
      });
    }

    return NextResponse.json({ chartData: out });
  } catch (err) {
    // console.error("monthly route error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
