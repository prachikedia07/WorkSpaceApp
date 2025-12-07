// // src/app/api/workspaces/[id]/route.js
// // CREATE THIS FILE - It's missing and causing the 500 error

// import { NextResponse } from "next/server";
// import { connectDB } from "@/app/api/connect/db";
// import Workspace from "@/app/api/connect/workspaceModel";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

// export async function GET(req, { params }) {
//   try {
//     await connectDB();
//     const session = await getServerSession(authOptions);
    
//     if (!session?.user?.email) {
//       return NextResponse.json({ 
//         success: false, 
//         error: "Not authenticated" 
//       }, { status: 401 });
//     }

//     const workspace = await Workspace.findById(params.id).lean();
    
//     if (!workspace) {
//       return NextResponse.json({ 
//         success: false, 
//         error: "Workspace not found" 
//       }, { status: 404 });
//     }

//     return NextResponse.json({ 
//       success: true, 
//       data: workspace 
//     });
//   } catch (err) {
//     console.error("GET /api/workspaces/[id] error:", err);
//     return NextResponse.json({ 
//       success: false, 
//       error: err.message 
//     }, { status: 500 });
//   }
// }

// export async function PATCH(req, { params }) {
//   try {
//     await connectDB();
//     const session = await getServerSession(authOptions);
    
//     if (!session?.user?.email) {
//       return NextResponse.json({ 
//         success: false, 
//         error: "Not authenticated" 
//       }, { status: 401 });
//     }

//     const workspace = await Workspace.findById(params.id);
    
//     if (!workspace) {
//       return NextResponse.json({ 
//         success: false, 
//         error: "Workspace not found" 
//       }, { status: 404 });
//     }

//     // Only owner can update workspace
//     const currentUser = await User.findOne({ email: session.user.email }).lean();
//     if (!currentUser || String(workspace.owner) !== String(currentUser._id)) {
//       return NextResponse.json({ 
//         success: false, 
//         error: "Only workspace owner can update" 
//       }, { status: 403 });
//     }

//     const body = await req.json();
    
//     if (body.name) workspace.name = body.name;
    
//     await workspace.save();

//     return NextResponse.json({ 
//       success: true, 
//       data: workspace 
//     });
//   } catch (err) {
//     console.error("PATCH /api/workspaces/[id] error:", err);
//     return NextResponse.json({ 
//       success: false, 
//       error: err.message 
//     }, { status: 500 });
//   }
// }

// export async function DELETE(req, { params }) {
//   try {
//     await connectDB();
//     const session = await getServerSession(authOptions);
    
//     if (!session?.user?.email) {
//       return NextResponse.json({ 
//         success: false, 
//         error: "Not authenticated" 
//       }, { status: 401 });
//     }

//     const workspace = await Workspace.findById(params.id);
    
//     if (!workspace) {
//       return NextResponse.json({ 
//         success: false, 
//         error: "Workspace not found" 
//       }, { status: 404 });
//     }

//     // Only owner can delete workspace
//     const currentUser = await User.findOne({ email: session.user.email }).lean();
//     if (!currentUser || String(workspace.owner) !== String(currentUser._id)) {
//       return NextResponse.json({ 
//         success: false, 
//         error: "Only workspace owner can delete" 
//       }, { status: 403 });
//     }

//     await Workspace.findByIdAndDelete(params.id);

//     return NextResponse.json({ 
//       success: true, 
//       message: "Workspace deleted" 
//     });
//   } catch (err) {
//     console.error("DELETE /api/workspaces/[id] error:", err);
//     return NextResponse.json({ 
//       success: false, 
//       error: err.message 
//     }, { status: 500 });
//   }
// }

// src/app/api/workspaces/[id]/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/app/api/connect/db"; // named export
import Workspace from "@/app/api/connect/workspaceModel";
import { User } from "@/app/api/connect/userModel"; // make sure userModel exports User
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; // import from authOptions file

export async function GET(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }

    const workspace = await Workspace.findById(params.id).lean();
    if (!workspace) return NextResponse.json({ success: false, error: "Workspace not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: workspace });
  } catch (err) {
    console.error("GET /api/workspaces/[id] error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });

    const workspace = await Workspace.findById(params.id);
    if (!workspace) return NextResponse.json({ success: false, error: "Workspace not found" }, { status: 404 });

    // Only owner can update workspace
    const currentUser = await User.findOne({ email: session.user.email }).lean();
    if (!currentUser || String(workspace.owner) !== String(currentUser._id)) {
      return NextResponse.json({ success: false, error: "Only workspace owner can update" }, { status: 403 });
    }

    const body = await req.json();
    if (body.name) workspace.name = body.name;
    await workspace.save();

    return NextResponse.json({ success: true, data: workspace });
  } catch (err) {
    console.error("PATCH /api/workspaces/[id] error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });

    const workspace = await Workspace.findById(params.id);
    if (!workspace) return NextResponse.json({ success: false, error: "Workspace not found" }, { status: 404 });

    const currentUser = await User.findOne({ email: session.user.email }).lean();
    if (!currentUser || String(workspace.owner) !== String(currentUser._id)) {
      return NextResponse.json({ success: false, error: "Only workspace owner can delete" }, { status: 403 });
    }

    await Workspace.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: "Workspace deleted" });
  } catch (err) {
    console.error("DELETE /api/workspaces/[id] error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
