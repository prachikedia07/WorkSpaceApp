// // src/app/api/workspaces/[id]/route.js
// import { NextResponse } from "next/server";
// import { connectDB } from "@/app/api/connect/db";
// import WorkspaceModel from "@/app/api/connect/workspaceModel";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

// export async function GET(req, { params }) {
//   await connectDB();
//   const session = await getServerSession(authOptions);
//   if (!session) return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
//   const userId = session.user?.id;

//   const wsId = params?.id;
//   if (!wsId) return NextResponse.json({ success: false, error: "Workspace id required" }, { status: 400 });

//   try {
//     const ws = await WorkspaceModel.findById(wsId).populate("members", "name email image").lean();
//     if (!ws) return NextResponse.json({ success: false, error: "Workspace not found" }, { status: 404 });

//     const isAllowed = String(ws.owner) === String(userId) || (ws.members || []).map(String).includes(String(userId));
//     if (!isAllowed) return NextResponse.json({ success: false, error: "Not a member" }, { status: 403 });

//     return NextResponse.json({ success: true, data: ws });
//   } catch (err) {
//     console.error("GET /api/workspaces/:id error:", err);
//     return NextResponse.json({ success: false, error: "Failed to load workspace" }, { status: 500 });
//   }
// }

// // src/app/api/workspaces/[id]/route.js
// import connectDB from "@/app/api/connect/db";                  // your connectDB file path
// import Workspace from "@/app/api/connect/workspaceModel";     // your workspaceModel path
// import User from "@/app/api/connect/userModel";               // adjust filename if needed
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // or authOptions.js path

// export async function GET(req, { params }) {
//   try {
//     await connectDB();

//     // get session
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return new Response(JSON.stringify({ success: false, error: "Not authenticated" }), { status: 401 });
//     }

//     // resolve current user id (prefer session.user.id, fallback to email lookup)
//     let currentUserId = session.user?.id || null;
//     if (!currentUserId && session.user?.email) {
//       const userDoc = await User.findOne({ email: session.user.email.toLowerCase().trim() }).select("_id").lean();
//       if (userDoc) currentUserId = String(userDoc._id);
//     }

//     if (!currentUserId) {
//       return new Response(JSON.stringify({ success: false, error: "User not found" }), { status: 401 });
//     }

//     const workspace = await Workspace.findById(params.id).lean();
//     if (!workspace) return new Response(JSON.stringify({ success: false, error: "Workspace not found" }), { status: 404 });

//     // normalize ids and check membership
//     const members = (workspace.members || []).map((m) => String(m));
//     if (!members.includes(String(currentUserId)) && String(workspace.owner) !== String(currentUserId)) {
//       return new Response(JSON.stringify({ success: false, error: "Not a member" }), { status: 403 });
//     }

//     return new Response(JSON.stringify({ success: true, data: workspace }), { status: 200 });
//   } catch (err) {
//     console.error("GET /api/workspaces/[id] error:", err);
//     return new Response(JSON.stringify({ success: false, error: "Server error" }), { status: 500 });
//   }
// }


// src/app/api/workspaces/[id]/route.js
// CREATE THIS FILE - It's missing and causing the 500 error

import { NextResponse } from "next/server";
import { connectDB } from "@/app/api/connect/db";
import Workspace from "@/app/api/connect/workspaceModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ 
        success: false, 
        error: "Not authenticated" 
      }, { status: 401 });
    }

    const workspace = await Workspace.findById(params.id).lean();
    
    if (!workspace) {
      return NextResponse.json({ 
        success: false, 
        error: "Workspace not found" 
      }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      data: workspace 
    });
  } catch (err) {
    console.error("GET /api/workspaces/[id] error:", err);
    return NextResponse.json({ 
      success: false, 
      error: err.message 
    }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ 
        success: false, 
        error: "Not authenticated" 
      }, { status: 401 });
    }

    const workspace = await Workspace.findById(params.id);
    
    if (!workspace) {
      return NextResponse.json({ 
        success: false, 
        error: "Workspace not found" 
      }, { status: 404 });
    }

    // Only owner can update workspace
    const currentUser = await User.findOne({ email: session.user.email }).lean();
    if (!currentUser || String(workspace.owner) !== String(currentUser._id)) {
      return NextResponse.json({ 
        success: false, 
        error: "Only workspace owner can update" 
      }, { status: 403 });
    }

    const body = await req.json();
    
    if (body.name) workspace.name = body.name;
    
    await workspace.save();

    return NextResponse.json({ 
      success: true, 
      data: workspace 
    });
  } catch (err) {
    console.error("PATCH /api/workspaces/[id] error:", err);
    return NextResponse.json({ 
      success: false, 
      error: err.message 
    }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ 
        success: false, 
        error: "Not authenticated" 
      }, { status: 401 });
    }

    const workspace = await Workspace.findById(params.id);
    
    if (!workspace) {
      return NextResponse.json({ 
        success: false, 
        error: "Workspace not found" 
      }, { status: 404 });
    }

    // Only owner can delete workspace
    const currentUser = await User.findOne({ email: session.user.email }).lean();
    if (!currentUser || String(workspace.owner) !== String(currentUser._id)) {
      return NextResponse.json({ 
        success: false, 
        error: "Only workspace owner can delete" 
      }, { status: 403 });
    }

    await Workspace.findByIdAndDelete(params.id);

    return NextResponse.json({ 
      success: true, 
      message: "Workspace deleted" 
    });
  } catch (err) {
    console.error("DELETE /api/workspaces/[id] error:", err);
    return NextResponse.json({ 
      success: false, 
      error: err.message 
    }, { status: 500 });
  }
}