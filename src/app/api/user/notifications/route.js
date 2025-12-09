// src/app/api/user/notifications/route.js
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
    const payload = await req.json(); // e.g., { type: "email", category: "projectUpdates", value: true }
    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

    // handle structured payloads (simple merge)
    if (payload.type === "email" && payload.category) {
      user.notifications = user.notifications || {};
      user.notifications.email = user.notifications.email || {};
      user.notifications.email[payload.category] = !!payload.value;
    } else if (payload.type === "push") {
      user.notifications = user.notifications || {};
      user.notifications.push = user.notifications.push || {};
      if (payload.category) {
        user.notifications.push[payload.category] = !!payload.value;
      } else {
        // toggle push enabled
        user.notifications.push.enabled = !!payload.value;
      }
    } else if (typeof payload === "object") {
      // fallback: replace notifications object
      user.notifications = { ...(user.notifications || {}), ...payload };
    }

    await user.save();
    return NextResponse.json({ success: true, notifications: user.notifications }, { status: 200 });
  } catch (err) {
    console.error("PUT /api/user/notifications error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
