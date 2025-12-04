// src/app/api/workspaces/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/app/api/connect/db";
import Workspace from "@/app/api/connect/workspaceModel";
import User from "@/app/api/connect/userModel";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import mongoose from "mongoose";

export async function GET(req) {
  await connectDB();

  try {
    // 1) Try getServerSession
    let session = null;
    try {
      session = await getServerSession(authOptions);
    } catch (err) {
      session = null;
      console.warn("getServerSession threw:", err && err.message ? err.message : err);
    }

    // 2) Fallback to getToken if session missing
    let token = null;
    if (!session) {
      try {
        token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      } catch (err) {
        console.warn("getToken threw:", err && err.message ? err.message : err);
      }
    }

    // 3) Derive identifier (could be id or email)
    const raw = session?.user?.id || token?.sub || session?.user?.email || token?.email;
    if (!raw) {
      console.error("No session/token user info found.");
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }

    // 4) Resolve to a user ObjectId safely
    let userObjectId = null;

    if (typeof raw === "string" && mongoose.Types.ObjectId.isValid(raw)) {
      // raw already looks like an ObjectId
      userObjectId = raw;
    } else {
      // raw is not an ObjectId — treat it as email (or lookup by email)
      const emailToLookup = (typeof raw === "string" && raw.includes("@")) ? raw : session?.user?.email;
      if (!emailToLookup) {
        console.error("Cannot resolve user: neither valid ObjectId nor email present:", raw);
        return NextResponse.json({ success: false, error: "Not authenticated (no email)" }, { status: 401 });
      }

      // Find user by email only (do NOT query _id with an email string)
      let userDoc = await User.findOne({ email: emailToLookup }).lean();

      // If not found, create a minimal user doc (optional; you can change to error instead)
      if (!userDoc) {
        console.log("User not found by email — creating user record for:", emailToLookup);
        const created = await User.create({
          name: session?.user?.name || "",
          email: emailToLookup,
          image: session?.user?.image || "",
        });
        userDoc = created.toObject();
      }

      userObjectId = String(userDoc._id);
    }

    // 5) Now query workspaces safely with the resolved ObjectId
    const workspaces = await Workspace.find({
      $or: [{ owner: userObjectId }, { members: userObjectId }],
    }).lean();

    // 6) Ensure at least one workspace exists (create default if none)
    if (!workspaces || workspaces.length === 0) {
      const defaultName = session?.user?.name ? `${session.user.name}'s Workspace` : "My Workspace";
      const created = await Workspace.create({
        name: defaultName,
        owner: userObjectId,
        members: [userObjectId],
      });
      return NextResponse.json({ success: true, data: [created.toObject()] });
    }

    return NextResponse.json({ success: true, data: workspaces });
  } catch (err) {
    console.error("GET /api/workspaces unexpected error:", err && (err.stack || err.message) ? (err.stack || err.message) : err);
    return NextResponse.json({ success: false, error: "Failed to load workspace", details: err?.message || String(err) }, { status: 500 });
  }
}
