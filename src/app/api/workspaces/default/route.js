// // src/app/api/workspaces/default/route.js
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
// import { connectDB } from "@/app/api/connect/db";
// import Workspace from "@/app/api/connect/workspaceModel";

// export async function GET() {
//   await connectDB();

//   const session = await getServerSession(authOptions);
//   if (!session?.user?.id && !session?.user?.email) {
//     return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
//   }

//   const userId = session.user.id || session.user.email; // we resolve to ObjectId in workspace route if needed

//   // find workspace owned by user — note we query owner field (not ownerId)
//   let ws = await Workspace.findOne({ owner: userId });

//   if (!ws) {
//     ws = await Workspace.create({
//       name: session?.user?.name ? `${session.user.name}'s Workspace` : "My Workspace",
//       owner: userId,
//       members: [userId],
//     });
//   }

//   return NextResponse.json({ success: true, data: ws });
// }

// src/app/api/workspaces/default/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/app/api/connect/db";
import Workspace from "@/app/api/connect/workspaceModel";
import { User } from "@/app/api/connect/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ 
        success: false, 
        error: "Not authenticated" 
      }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: "User not found" 
      }, { status: 404 });
    }

    const userId = user._id;

    // Check if user has a workspace where they're the owner
    let workspace = await Workspace.findOne({ owner: userId });

    if (!workspace) {
      // Create new workspace with owner as first member
      workspace = await Workspace.create({
        name: "My Workspace",
        owner: userId,
        members: [userId], // ✅ CRITICAL: Add owner to members array
      });
      
      console.log(`Created default workspace for user ${user.email}`);
    } else {
      // ✅ FIX: If workspace exists but owner not in members, add them
      if (!workspace.members.some(m => String(m) === String(userId))) {
        workspace.members.push(userId);
        await workspace.save();
        console.log(`Added owner to members array for workspace ${workspace._id}`);
      }
    }

    return NextResponse.json({ 
      success: true, 
      data: workspace 
    });
  } catch (err) {
    console.error("GET /api/workspaces/default error:", err);
    return NextResponse.json({ 
      success: false, 
      error: err.message 
    }, { status: 500 });
  }
}