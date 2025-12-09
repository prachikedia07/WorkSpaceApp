// src/app/api/notifications/[id]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "../../connect/db";
import Notification from "../../connect/notificationModel";
import Invitation from "../../connect/invitationModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = params;

    // Try to delete as regular notification first
    let deleted = await Notification.findByIdAndDelete(id);

    // If not found, try as invitation
    if (!deleted) {
      deleted = await Invitation.findByIdAndDelete(id);
    }

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Notification not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete notification error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}