// // import { connectDB } from "@/app/api/connect/db";               // use named import if your file exports named
// // import Workspace from "@/app/api/connect/workspaceModel";      // default export expected
// // import User from "@/app/api/connect/userModel";                // adjust if your userModel exports named/un-named
// // import { getServerSession } from "next-auth";
// // import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // adjust path if authOptions lives elsewhere

// // export async function GET(req, { params }) {
// //   try {
// //     await connectDB();

// //     const session = await getServerSession(authOptions);
// //     if (!session) return new Response(JSON.stringify({ success: false, error: "Not authenticated" }), { status: 401 });

// //     // resolve currentUserId (try session.user.id then email lookup)
// //     let currentUserId = session.user?.id || null;
// //     if (!currentUserId && session.user?.email) {
// //       const u = await User.findOne({ email: session.user.email.toLowerCase().trim() }).select("_id").lean();
// //       if (u) currentUserId = String(u._id);
// //     }
// //     if (!currentUserId) return new Response(JSON.stringify({ success: false, error: "User not found" }), { status: 401 });

// //     const workspace = await Workspace.findById(params.id).lean();
// //     if (!workspace) return new Response(JSON.stringify({ success: false, error: "Workspace not found" }), { status: 404 });

// //     const members = (workspace.members || []).map((m) => String(m));
// //     if (!members.includes(String(currentUserId)) && String(workspace.owner) !== String(currentUserId)) {
// //       return new Response(JSON.stringify({ success: false, error: "Not a member" }), { status: 403 });
// //     }

// //     // return full user objects for members
// //     const users = await User.find({ _id: { $in: workspace.members } }).select("name email image").lean();
// //     return new Response(JSON.stringify({ success: true, data: users }), { status: 200 });
// //   } catch (err) {
// //     console.error("GET /api/workspaces/[id]/members error:", err);
// //     return new Response(JSON.stringify({ success: false, error: "Server error" }), { status: 500 });
// //   }
// // }

// // src/app/api/workspaces/[id]/members/route.js
// import { NextResponse } from "next/server";
// import { connectDB } from "@/app/api/connect/db";          // <- named import
// import Workspace from "@/app/api/connect/workspaceModel";
// import { User } from "@/app/api/connect/userModel";        // or default if you export default

// export async function GET(req, { params }) {
//   try {
//     const { id } = params;
//     if (!id) return NextResponse.json({ success: false, error: "Missing workspace id" }, { status: 400 });

//     await connectDB(); // ensure DB connected

//     const workspace = await Workspace.findById(id).populate("members", "name email image");
//     if (!workspace) {
//       return NextResponse.json({ success: false, error: "Workspace not found" }, { status: 404 });
//     }

//     // return members array (populated)
//     return NextResponse.json({ success: true, data: workspace.members }, { status: 200 });
//   } catch (err) {
//     console.error("GET /api/workspaces/[id]/members error:", err);
//     return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
//   }
// }

// src/app/api/workspaces/[id]/members/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/app/api/connect/db";
import Workspace from "@/app/api/connect/workspaceModel";
import { User } from "@/app/api/connect/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

function makeInitials(nameOrEmail = "") {
  if (!nameOrEmail) return "??";
  const parts = nameOrEmail.split(" ");
  if (parts.length === 1) {
    return (nameOrEmail.split("@")[0] || "").slice(0, 2).toUpperCase() || "??";
  }
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}

// export async function GET(req, { params }) {
//   try {
//     await connectDB();
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.email) return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });

//     const workspace = await Workspace.findById(params.id).lean();
//     if (!workspace) return NextResponse.json({ success: false, error: "Workspace not found" }, { status: 404 });

//     // fetch users referenced by workspace.members
//     const users = await User.find({ _id: { $in: workspace.members || [] } }).lean();

//     const members = (workspace.members || []).map((mId) => {
//       const u = users.find((u) => String(u._id) === String(mId));
//       if (!u) {
//         return { id: String(mId), name: "Unknown", email: "", initials: "??", isOwner: String(workspace.owner) === String(mId) };
//       }
//       return {
//         id: String(u._id),
//         name: u.name || u.email || "Unknown",
//         email: u.email || "",
//         initials: makeInitials(u.name || u.email),
//         isOwner: String(workspace.owner) === String(u._id),
//       };
//     });

//     return NextResponse.json({ success: true, data: members });
//   } catch (err) {
//     console.error("GET /members error:", err);
//     return NextResponse.json({ success: false, error: err.message }, { status: 500 });
//   }
// }

// src/app/api/workspaces/[id]/members/route.js
// REPLACE ONLY THE GET FUNCTION

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

    // ✅ CRITICAL FIX: Always include owner + members
    const allMemberIds = [
      workspace.owner,
      ...(workspace.members || [])
    ];

    // Remove duplicates
    const uniqueIds = [...new Set(allMemberIds.map(String))];

    // Fetch all users
    const users = await User.find({ 
      _id: { $in: uniqueIds } 
    }).lean();

    // Map to response format
    const members = uniqueIds.map((id) => {
      const u = users.find((user) => String(user._id) === String(id));
      
      if (!u) {
        return {
          id: String(id),
          name: "Unknown User",
          email: "",
          initials: "??",
          isOwner: String(workspace.owner) === String(id),
        };
      }

      const name = u.name || u.email || "Unknown";
      const initials = name
        .split(" ")
        .map((s) => s[0])
        .slice(0, 2)
        .join("")
        .toUpperCase() || "??";

      return {
        id: String(u._id),
        _id: String(u._id), // Include both for compatibility
        name: name,
        email: u.email || "",
        initials: initials,
        isOwner: String(workspace.owner) === String(u._id),
      };
    });

    return NextResponse.json({ 
      success: true, 
      data: members 
    });
  } catch (err) {
    console.error("GET /members error:", err);
    return NextResponse.json({ 
      success: false, 
      error: err.message 
    }, { status: 500 });
  }
}

// Keep POST and DELETE methods as they are

export async function POST(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });

    const body = await req.json();
    const email = (body.email || "").trim().toLowerCase();
    if (!email) return NextResponse.json({ success: false, error: "Email required" }, { status: 400 });

    const workspace = await Workspace.findById(params.id);
    if (!workspace) return NextResponse.json({ success: false, error: "Workspace not found" }, { status: 404 });

    const currentUser = await User.findOne({ email: session.user.email }).lean();
    if (!currentUser || String(workspace.owner) !== String(currentUser._id)) {
      return NextResponse.json({ success: false, error: "Only workspace owner can add members" }, { status: 403 });
    }

    const user = await User.findOne({ email }).lean();
    if (!user) return NextResponse.json({ success: false, error: "User with this email does not exist" }, { status: 404 });

    if ((workspace.members || []).some((m) => String(m) === String(user._id))) {
      return NextResponse.json({ success: false, error: "User already a member" }, { status: 409 });
    }

    workspace.members.push(user._id);
    await workspace.save();

    const member = {
      id: String(user._id),
      name: user.name || user.email,
      email: user.email,
      initials: makeInitials(user.name || user.email),
      isOwner: String(workspace.owner) === String(user._id),
    };

    return NextResponse.json({ success: true, member });
  } catch (err) {
    console.error("POST /members error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });

    const url = new URL(req.url);
    const memberId = url.searchParams.get("memberId");
    if (!memberId) return NextResponse.json({ success: false, error: "memberId required" }, { status: 400 });

    const workspace = await Workspace.findById(params.id);
    if (!workspace) return NextResponse.json({ success: false, error: "Workspace not found" }, { status: 404 });

    const currentUser = await User.findOne({ email: session.user.email }).lean();
    if (!currentUser || String(workspace.owner) !== String(currentUser._id)) {
      return NextResponse.json({ success: false, error: "Only workspace owner can remove members" }, { status: 403 });
    }

    workspace.members = (workspace.members || []).filter((m) => String(m) !== String(memberId));
    await workspace.save();

    return NextResponse.json({ success: true, message: "Member removed" });
  } catch (err) {
    console.error("DELETE /members error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
