// // src/app/api/user/profile/route.js
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
// import { connectDB } from "@/app/api/connect/db";
// import User from "@/app/api/connect/userModel";
// import bcrypt from "bcryptjs";

// /*
//   GET  => return full user profile (from DB)
//   PUT  => update profile fields: firstName, lastName, bio, role, avatar
//           avatar: if data URL (startsWith "data:"), saved to user.avatar directly.
//           (For production, replace with Cloudinary/S3 upload and save URL.)
// */

// export async function GET() {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.email) {
//       return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
//     }

//     await connectDB();
//     const user = await User.findOne({ email: session.user.email }).lean();
//     if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

//     // sanitize response if you want (remove password/twoFactorSecret)
//     delete user.password;
//     delete user.twoFactorSecret;

//     return NextResponse.json({ success: true, user }, { status: 200 });
//   } catch (err) {
//     console.error("GET /api/user/profile error:", err);
//     return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
//   }
// }

// export async function PUT(req) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.email) {
//       return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
//     }

//     const body = await req.json();
//     const { firstName, lastName, bio, role, avatar } = body;

//     await connectDB();
//     const user = await User.findOne({ email: session.user.email });
//     if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

//         if (typeof firstName === "string") user.firstName = firstName.trim();
//     if (typeof lastName === "string") user.lastName = lastName.trim();

// user.name = `${user.firstName || ""} ${user.lastName || ""}`.trim();


//     if (typeof bio === "string") user.bio = bio;
//     if (typeof role === "string") user.role = role;

//     // Build canonical full name and save it to `name` as well (so NextAuth session can use it)
//     const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
//     if (fullName) {
//       user.name = fullName;
//     }

//     // Avatar handling: Accept data URL (data:...;base64,...) OR a remote URL
//     if (avatar) {
//       if (typeof avatar === "string" && avatar.startsWith("data:")) {
//         if (avatar.length > 2_500_000) {
//           return NextResponse.json({ success: false, error: "Avatar too large" }, { status: 400 });
//         }
//         user.avatar = avatar;
//       } else if (typeof avatar === "string" && /^https?:\/\//.test(avatar)) {
//         user.avatar = avatar;
//       }
//     }

//     await user.save();

//     // prepare response without sensitive fields
//     const resUser = user.toObject();
//     delete resUser.password;
//     delete resUser.twoFactorSecret;

//     return NextResponse.json({ success: true, user: resUser }, { status: 200 });
//   } catch (err) {
//     console.error("PUT /api/user/profile error:", err);
//     return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
//   }
// }
// src/app/api/user/profile/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectDB } from "@/app/api/connect/db";
import User from "@/app/api/connect/userModel";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email }).lean();
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // Remove sensitive fields
    delete user.password;
    delete user.twoFactorSecret;

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (err) {
    console.error("GET /api/user/profile error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const { firstName, lastName, bio, role, avatar } = body;

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // Update basic fields
    if (typeof firstName === "string") user.firstName = firstName.trim();
    if (typeof lastName === "string") user.lastName = lastName.trim();
    if (typeof bio === "string") user.bio = bio;
    if (typeof role === "string") user.role = role;

    // Build full name
    user.name = `${user.firstName || ""} ${user.lastName || ""}`.trim();

    // IMPORTANT: Only accept remote URLs for avatar (never base64)
    if (avatar && typeof avatar === "string") {
      // Only allow http/https URLs (Cloudinary URLs)
      if (/^https?:\/\//.test(avatar)) {
        user.avatar = avatar;
      } else if (avatar.startsWith("data:")) {
        // Reject base64 - client should upload via /api/user/avatar first
        return NextResponse.json({ 
          success: false, 
          error: "Please upload avatar via the upload endpoint first" 
        }, { status: 400 });
      }
    }

    await user.save();

    // Prepare response
    const resUser = user.toObject();
    delete resUser.password;
    delete resUser.twoFactorSecret;

    return NextResponse.json({ success: true, user: resUser }, { status: 200 });
  } catch (err) {
    console.error("PUT /api/user/profile error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}