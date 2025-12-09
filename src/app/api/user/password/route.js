// src/app/api/user/password/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectDB } from "@/app/api/connect/db";
import User from "@/app/api/connect/userModel";
import bcrypt from "bcryptjs";

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();
    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ success: false, error: "New password too short" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

    // If user has no password (OAuth-only), disallow (or allow set/reset based on your flow)
    if (!user.password) {
      return NextResponse.json({ success: false, error: "No local password set for this account" }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(currentPassword || "", user.password || "");
    if (!isMatch) {
      return NextResponse.json({ success: false, error: "Current password is incorrect" }, { status: 401 });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return NextResponse.json({ success: true, message: "Password updated" }, { status: 200 });
  } catch (err) {
    console.error("PUT /api/user/password error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
