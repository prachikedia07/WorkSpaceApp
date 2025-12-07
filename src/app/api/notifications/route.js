// import { NextResponse } from "next/server";
// import { connectDB } from "../connect/db";
// import Invitation from "../connect/invitationModel";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/authOptions";

// export async function GET(req) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.email) {
//       return NextResponse.json(
//         { success: false, error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     await connectDB();

//     // Get pending invitations for this user's email
//     const invitations = await Invitation.find({
//       email: session.user.email,
//       status: "pending",
//       expiresAt: { $gt: new Date() }, // Not expired
//     })
//       .populate("workspace", "name")
//       .populate("invitedBy", "name email")
//       .sort({ createdAt: -1 })
//       .limit(20);

//     const notifications = invitations.map((inv) => ({
//       _id: inv._id,
//       type: "invitation",
//       message: `${inv.invitedBy?.name || inv.invitedBy?.email || "Someone"} invited you to join "${inv.workspace?.name || "a workspace"}"`,
//       createdAt: inv.createdAt,
//       read: false,
//       status: inv.status,
//       workspaceId: inv.workspace?._id,
//     }));

//     return NextResponse.json({ success: true, data: notifications });
//   } catch (error) {
//     console.error("Get notifications error:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { connectDB } from "../connect/db";
import Invitation from "../connect/invitationModel";
import Notification from "../connect/notificationModel";
import { User } from "../connect/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    // Get current user
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ success: true, data: [] });
    }

    // Get pending invitations for this user's email
    const invitations = await Invitation.find({
      email: session.user.email,
      status: "pending",
      expiresAt: { $gt: new Date() },
    })
      .populate("workspace", "name")
      .populate("invitedBy", "name email")
      .sort({ createdAt: -1 })
      .limit(10);

    // Get other notifications for this user
    const otherNotifications = await Notification.find({
      userId: user._id,
    })
      .populate("metadata.actorId", "name email")
      .sort({ createdAt: -1 })
      .limit(20);

    // Combine and format notifications
    const invitationNotifs = invitations.map((inv) => ({
      _id: inv._id,
      type: "invitation",
      message: `${inv.invitedBy?.name || inv.invitedBy?.email || "Someone"} invited you to join "${inv.workspace?.name || "a workspace"}"`,
      createdAt: inv.createdAt,
      read: false,
      status: inv.status,
      workspaceId: inv.workspace?._id,
    }));

    const regularNotifs = otherNotifications.map((notif) => ({
      _id: notif._id,
      type: notif.type,
      message: notif.message,
      createdAt: notif.createdAt,
      read: notif.read,
      link: notif.link,
    }));

    // Merge and sort by date
    const allNotifications = [...invitationNotifs, ...regularNotifs].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return NextResponse.json({ success: true, data: allNotifications });
  } catch (error) {
    console.error("Get notifications error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Mark notification as read
export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await req.json();

    await Notification.findByIdAndUpdate(id, { read: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mark as read error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}