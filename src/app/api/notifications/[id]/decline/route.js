import { NextResponse } from "next/server";
import { connectDB } from "../../../connect/db";
import Invitation from "../../../connect/invitationModel";
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

    const invitation = await Invitation.findById(id);
    if (!invitation) {
      return NextResponse.json(
        { success: false, error: "Invitation not found" },
        { status: 404 }
      );
    }

    if (invitation.email !== session.user.email) {
      return NextResponse.json(
        { success: false, error: "This invitation is not for you" },
        { status: 403 }
      );
    }

    invitation.status = "declined";
    await invitation.save();

    return NextResponse.json({
      success: true,
      message: "Invitation declined",
    });
  } catch (error) {
    console.error("Decline invitation error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}