// src/app/api/workspaces/default/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectDB } from "@/app/api/connect/db";
import Workspace from "@/app/api/connect/workspaceModel";

export async function GET() {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id && !session?.user?.email) {
    return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
  }

  const userId = session.user.id || session.user.email; // we resolve to ObjectId in workspace route if needed

  // find workspace owned by user — note we query owner field (not ownerId)
  let ws = await Workspace.findOne({ owner: userId });

  if (!ws) {
    ws = await Workspace.create({
      name: session?.user?.name ? `${session.user.name}'s Workspace` : "My Workspace",
      owner: userId,
      members: [userId],
    });
  }

  return NextResponse.json({ success: true, data: ws });
}
