// // src/app/api/tasks/route.js
// import { NextResponse } from "next/server";
// import * as dbModule from "@/app/api/connect/db"; // import the module (works whether export is default or named)
// import Task from "@/app/api/connect/taskModel";

// /**
//  * Resolve the connect function from the db module. This handles different export styles:
//  * - export default connectDB
//  * - export const connectDB = ...
//  * - export function connect() { ... }
//  */
// const connectDB =
//   (dbModule && (dbModule.default || dbModule.connectDB || dbModule.connect)) ||
//   null;

// async function ensureDbConnected() {
//   if (!connectDB) {
//     // If we couldn't find any connect function, throw a clear error
//     throw new Error(
//       "Database connect function not found. Expected default export or named export 'connectDB' or 'connect' from '@/app/api/connect/db'."
//     );
//   }
//   // call the connect function (it may manage singletons internally)
//   await connectDB();
// }

// export async function GET(req) {
//   try {
//     await ensureDbConnected();
//     const { searchParams } = new URL(req.url);
//     const workspaceId = searchParams.get("workspaceId");

//     const filter = {};
//     if (workspaceId) filter.workspaceId = workspaceId;

//     const tasks = await Task.find(filter).sort({ createdAt: -1 }).lean();
//     return NextResponse.json({ success: true, data: tasks });
//   } catch (err) {
//     console.error("GET /api/tasks error:", err);
//     return NextResponse.json({ success: false, error: err.message }, { status: 500 });
//   }
// }

// export async function POST(req) {
//   try {
//     await ensureDbConnected();
//     const body = await req.json();

//     // Basic validation
//     if (!body || !body.title) {
//       return NextResponse.json({ success: false, error: "Missing title" }, { status: 400 });
//     }

//     const created = await Task.create(body);
//     return NextResponse.json({ success: true, data: created }, { status: 201 });
//   } catch (err) {
//     console.error("POST /api/tasks error:", err);
//     return NextResponse.json({ success: false, error: err.message }, { status: 500 });
//   }
// }

// export async function PATCH(req) {
//   try {
//     await ensureDbConnected();
//     const { id, updates } = await req.json();

//     if (!id) return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });

//     const updated = await Task.findByIdAndUpdate(id, updates, { new: true });
//     return NextResponse.json({ success: true, data: updated });
//   } catch (err) {
//     console.error("PATCH /api/tasks error:", err);
//     return NextResponse.json({ success: false, error: err.message }, { status: 500 });
//   }
// }

// export async function DELETE(req) {
//   try {
//     await ensureDbConnected();
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");
//     if (!id) return NextResponse.json({ success: false, error: "Missing id" }, { status: 400 });

//     await Task.findByIdAndDelete(id);
//     return NextResponse.json({ success: true, message: "Deleted" });
//   } catch (err) {
//     console.error("DELETE /api/tasks error:", err);
//     return NextResponse.json({ success: false, error: err.message }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";
// import { connectDB } from "@/app/api/connect/db";
// import Task from "@/app/api/connect/taskModel";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

// export async function GET(req) {
//   await connectDB();

//   const session = await getServerSession(authOptions);
//   if (!session) return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });

//   const { searchParams } = new URL(req.url);
//   const status = searchParams.get("status");
//   const priority = searchParams.get("priority");
//   const assignee = searchParams.get("assignee");
//   const q = searchParams.get("q");

//   const filter = { createdBy: session.user.id };

//   if (status) filter.status = status;
//   if (priority) filter.priority = priority;
//   if (assignee) filter.assignees = assignee;
//   if (q) filter.title = { $regex: q, $options: "i" };

//   const tasks = await Task.find(filter).lean();

//   return NextResponse.json({ success: true, data: tasks });
// }

// export async function POST(req) {
//   await connectDB();
//   const session = await getServerSession(authOptions);
//   if (!session) return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });

//   const body = await req.json();

//   const newTask = await Task.create({
//     title: body.title,
//     description: body.description || "",
//     priority: body.priority || "medium",
//     dueDate: body.dueDate || null,
//     status: body.status || "todo",
//     tags: [],
//     assignees: [],
//     createdBy: session.user.id,
//   });

//   return NextResponse.json({ success: true, data: newTask });
// }

// export async function PATCH(req) {
//   await connectDB();
//   const session = await getServerSession(authOptions);
//   if (!session) return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });

//   const { id, updates } = await req.json();

//   const updated = await Task.findOneAndUpdate(
//     { _id: id, createdBy: session.user.id },
//     { $set: updates },
//     { new: true }
//   );

//   if (!updated) {
//     return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
//   }

//   return NextResponse.json({ success: true, data: updated });
// }

// export async function DELETE(req) {
//   await connectDB();
//   const session = await getServerSession(authOptions);
//   if (!session) return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });

//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");

//   await Task.deleteOne({ _id: id, createdBy: session.user.id });

//   return NextResponse.json({ success: true });
// }


// src/app/api/tasks/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/app/api/connect/db";
import Task from "@/app/api/connect/taskModel";
import Workspace from "@/app/api/connect/workspaceModel";
import { User } from "@/app/api/connect/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

async function isWorkspaceMember(session, workspaceId) {
  if (!workspaceId) return false;
  
  const user = await User.findOne({ email: session.user.email }).lean();
  if (!user) return false;

  const workspace = await Workspace.findById(workspaceId).lean();
  if (!workspace) return false;

  const userId = String(user._id);
  const isOwner = String(workspace.owner) === userId;
  const isMember = (workspace.members || []).some(m => String(m) === userId);

  return isOwner || isMember;
}

export async function GET(req) {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get("workspaceId");
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const assignee = searchParams.get("assignee");
  const q = searchParams.get("q");

  if (!workspaceId) {
    return NextResponse.json({ 
      success: false, 
      error: "workspaceId required" 
    }, { status: 400 });
  }

  // Check membership
  const allowed = await isWorkspaceMember(session, workspaceId);
  if (!allowed) {
    return NextResponse.json({ 
      success: false, 
      error: "Not a workspace member" 
    }, { status: 403 });
  }

  // Build filter
  const filter = { workspaceId };
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (assignee) filter.assignees = assignee;
  if (q) filter.title = { $regex: q, $options: "i" };

  const tasks = await Task.find(filter).sort({ createdAt: -1 }).lean();

  return NextResponse.json({ success: true, data: tasks });
}

export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();
  const { workspaceId } = body;

  if (!workspaceId) {
    return NextResponse.json({ 
      success: false, 
      error: "workspaceId required" 
    }, { status: 400 });
  }

  const allowed = await isWorkspaceMember(session, workspaceId);
  if (!allowed) {
    return NextResponse.json({ 
      success: false, 
      error: "Not a workspace member" 
    }, { status: 403 });
  }

  const user = await User.findOne({ email: session.user.email }).lean();

  const newTask = await Task.create({
    title: body.title,
    description: body.description || "",
    priority: body.priority || "medium",
    dueDate: body.dueDate || null,
    status: body.status || "todo",
    tags: body.tags || [],
    assignees: body.assignees || [],
    createdBy: user._id,
    workspaceId: workspaceId,
  });

  return NextResponse.json({ success: true, data: newTask });
}

export async function PATCH(req) {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
  }

  const { id, updates } = await req.json();
  if (!id) {
    return NextResponse.json({ success: false, error: "Task id required" }, { status: 400 });
  }

  const task = await Task.findById(id).lean();
  if (!task) {
    return NextResponse.json({ success: false, error: "Task not found" }, { status: 404 });
  }

  const allowed = await isWorkspaceMember(session, task.workspaceId);
  if (!allowed) {
    return NextResponse.json({ 
      success: false, 
      error: "Not a workspace member" 
    }, { status: 403 });
  }

  const updated = await Task.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true }
  ).lean();

  // After successfully updating task assignees
if (updates.assignees && updates.assignees.length > 0) {
  try {
    const Notification = (await import("../connect/notificationModel")).default;
    const Task = (await import("../connect/taskModel")).default;
    const { User } = await import("../connect/userModel");
    
    const task = await Task.findById(id);
    const currentUser = await User.findOne({ email: session.user.email });
    
    // Create notification for each assignee
    for (const assigneeId of updates.assignees) {
      // Don't notify yourself
      if (assigneeId.toString() === currentUser._id.toString()) continue;
      
      await Notification.create({
        userId: assigneeId,
        type: "task_assigned",
        message: `${currentUser.name || currentUser.email} assigned you to "${task.title}"`,
        link: `/workspace?task=${task._id}`,
        metadata: {
          taskId: task._id,
          actorId: currentUser._id,
        },
      });
    }
    
    console.log("✅ Task assignment notifications created");
  } catch (err) {
    console.error("⚠️ Failed to create task notifications:", err);
  }
}

  return NextResponse.json({ success: true, data: updated });
}

export async function DELETE(req) {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  
  if (!id) {
    return NextResponse.json({ success: false, error: "Task id required" }, { status: 400 });
  }

  const task = await Task.findById(id).lean();
  if (!task) {
    return NextResponse.json({ success: false, error: "Task not found" }, { status: 404 });
  }

  const allowed = await isWorkspaceMember(session, task.workspaceId);
  if (!allowed) {
    return NextResponse.json({ 
      success: false, 
      error: "Not a workspace member" 
    }, { status: 403 });
  }

  await Task.deleteOne({ _id: id });

  return NextResponse.json({ success: true });
}