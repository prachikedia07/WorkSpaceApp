// import { connectDB } from "@/app/api/connect/db";
// import { User } from "@/app/api/connect/userModel";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"; // we will export this helper
// import bcrypt from "bcryptjs";

// export async function PATCH(req) {
//   try {
//     // protect with next-auth session
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.email) {
//       return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
//     }

//     const data = await req.json();
//     await connectDB();

//     const updates = {};
//     if (data.name) updates.name = data.name;
//     if (data.company) updates.company = data.company;
//     if (data.plan) updates.plan = data.plan;
//     if (typeof data.image === "string") updates.image = data.image;
//     if (data.location) updates.location = data.location;

//     // if password change requested
//     if (data.password) {
//       const hashed = await bcrypt.hash(data.password, 10);
//       updates.password = hashed;
//     }

//     const updated = await User.findOneAndUpdate({ email: session.user.email }, { $set: updates }, { new: true });

//     if (!updated) {
//       return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
//     }

//     // remove password before returning
//     const safeUser = updated.toObject();
//     delete safeUser.password;

//     return new Response(JSON.stringify({ user: safeUser }), { status: 200 });
//   } catch (err) {
//     console.error("profile update err", err);
//     return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
//   }
// }

//src/app/api/user/update/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectDB } from "../../connect/db";
import { User } from "../../connect/userModel";

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();

    // Validate allowed fields
    const allowedFields = [
      "totalRevenue",
      "totalExpenses",
      "projects",
      "teamMembers",
      "plan",
      "company",
      "location",
    ];

    const updates = {};
    for (const key of allowedFields) {
      if (key in body) updates[key] = body[key];
    }

    // Update DB
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        plan: updatedUser.plan,
        totalRevenue: updatedUser.totalRevenue,
        totalExpenses: updatedUser.totalExpenses,
        projects: updatedUser.projects,
        teamMembers: updatedUser.teamMembers,
        company: updatedUser.company,
        location: updatedUser.location,
      },
    });
  } catch (err) {
    console.error("Error updating user:", err);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
