import { NextResponse } from "next/server";
import { connectDB } from "../../../connect/db";
import Invitation from "../../../connect/invitationModel";
import Workspace from "../../../connect/workspaceModel";
import { User } from "../../../connect/userModel";
import Notification from "../../../connect/notificationModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/authOptions";

export async function POST(req, { params }) {
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

    // Find invitation
    const invitation = await Invitation.findById(id);
    if (!invitation) {
      return NextResponse.json(
        { success: false, error: "Invitation not found" },
        { status: 404 }
      );
    }

    // Check if invitation is for this user
    if (invitation.email !== session.user.email) {
      return NextResponse.json(
        { success: false, error: "This invitation is not for you" },
        { status: 403 }
      );
    }

    // Check if expired
    if (new Date() > invitation.expiresAt) {
      return NextResponse.json(
        { success: false, error: "This invitation has expired" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found. Please ensure you have an account." },
        { status: 404 }
      );
    }

    // Find workspace
    const workspace = await Workspace.findById(invitation.workspace);
    if (!workspace) {
      return NextResponse.json(
        { success: false, error: "Workspace not found" },
        { status: 404 }
      );
    }

    // Add user to workspace if not already a member
    const userIdString = user._id.toString();
    const isMember = workspace.members.some(
      (memberId) => memberId.toString() === userIdString
    );

    if (!isMember) {
      workspace.members.push(user._id);
      await workspace.save();
    }

    // Update invitation status
    invitation.status = "accepted";
    await invitation.save();

    const Notification = (await import("../../../connect/notificationModel")).default;
await Notification.create({
  userId: invitation.invitedBy,
  type: "invitation_accepted",
  message: `${user.name || user.email} accepted your invitation to join ${workspace.name}`,
  link: `/workspace?id=${workspace._id}`,
  metadata: {
    workspaceId: workspace._id,
    invitationId: invitation._id,
    actorId: user._id,
  },
});


    return NextResponse.json({
      success: true,
      message: "Successfully joined workspace!",
      workspaceId: workspace._id,
    });
  } catch (error) {
    console.error("Accept invitation error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}