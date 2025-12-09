// src/app/api/user/preferences/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectDB } from "@/app/api/connect/db";
import User from "@/app/api/connect/userModel";

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }

    const payload = await req.json(); // expected { language, timezone, theme, ... }
    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

    user.preferences = { ...user.preferences?.toObject?.() ?? user.preferences ?? {}, ...payload };
    await user.save();

    return NextResponse.json({ success: true, preferences: user.preferences }, { status: 200 });
  } catch (err) {
    console.error("PUT /api/user/preferences error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
