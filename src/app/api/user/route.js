// src/app/api/user/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }
    // return the session.user shape (id/email/name/image)
    return NextResponse.json({ success: true, data: session.user });
  } catch (err) {
    console.error("GET /api/user error:", err);
    return NextResponse.json({ success: false, error: "Failed to load user" }, { status: 500 });
  }
}
