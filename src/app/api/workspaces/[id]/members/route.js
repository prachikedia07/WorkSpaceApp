// import { connectDB } from "@/app/api/connect/db";               // use named import if your file exports named
// import Workspace from "@/app/api/connect/workspaceModel";      // default export expected
// import User from "@/app/api/connect/userModel";                // adjust if your userModel exports named/un-named
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // adjust path if authOptions lives elsewhere

// export async function GET(req, { params }) {
//   try {
//     await connectDB();

//     const session = await getServerSession(authOptions);
//     if (!session) return new Response(JSON.stringify({ success: false, error: "Not authenticated" }), { status: 401 });

//     // resolve currentUserId (try session.user.id then email lookup)
//     let currentUserId = session.user?.id || null;
//     if (!currentUserId && session.user?.email) {
//       const u = await User.findOne({ email: session.user.email.toLowerCase().trim() }).select("_id").lean();
//       if (u) currentUserId = String(u._id);
//     }
//     if (!currentUserId) return new Response(JSON.stringify({ success: false, error: "User not found" }), { status: 401 });

//     const workspace = await Workspace.findById(params.id).lean();
//     if (!workspace) return new Response(JSON.stringify({ success: false, error: "Workspace not found" }), { status: 404 });

//     const members = (workspace.members || []).map((m) => String(m));
//     if (!members.includes(String(currentUserId)) && String(workspace.owner) !== String(currentUserId)) {
//       return new Response(JSON.stringify({ success: false, error: "Not a member" }), { status: 403 });
//     }

//     // return full user objects for members
//     const users = await User.find({ _id: { $in: workspace.members } }).select("name email image").lean();
//     return new Response(JSON.stringify({ success: true, data: users }), { status: 200 });
//   } catch (err) {
//     console.error("GET /api/workspaces/[id]/members error:", err);
//     return new Response(JSON.stringify({ success: false, error: "Server error" }), { status: 500 });
//   }
// }

// src/app/api/workspaces/[id]/members/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/app/api/connect/db";          // <- named import
import Workspace from "@/app/api/connect/workspaceModel";
import { User } from "@/app/api/connect/userModel";        // or default if you export default

export async function GET(req, { params }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ success: false, error: "Missing workspace id" }, { status: 400 });

    await connectDB(); // ensure DB connected

    const workspace = await Workspace.findById(id).populate("members", "name email image");
    if (!workspace) {
      return NextResponse.json({ success: false, error: "Workspace not found" }, { status: 404 });
    }

    // return members array (populated)
    return NextResponse.json({ success: true, data: workspace.members }, { status: 200 });
  } catch (err) {
    console.error("GET /api/workspaces/[id]/members error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
