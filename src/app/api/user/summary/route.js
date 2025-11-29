// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/route";
// import { connectDB } from "../../connect/db";
// import { User } from "../../connect/userModel";

// export async function GET() {
//   await connectDB();
//   const session = await getServerSession(authOptions);

//   if (!session?.user?.email) {
//     return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
//   }

//   const user = await User.findOne({ email: session.user.email });

//   if (!user) {
//     return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
//   }

//   const summary = {
//     totalRevenue: user.totalRevenue,
//     totalExpenses: user.totalExpenses,
//     projects: user.projects,
//     teamMembers: user.teamMembers,
//     plan: user.plan,
//   };

//   return new Response(JSON.stringify(summary), { status: 200 });
// }

import { connectDB } from "../../connect/db";
import { User } from "../../connect/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const summary = {
      name: user.name,
      email: user.email,
      plan: user.plan,
      totalRevenue: user.totalRevenue,
      projects: user.projects,
      teamMembers: user.teamMembers,
    };

    return new Response(JSON.stringify(summary), { status: 200 });
  } catch (err) {
    console.error("Error fetching user summary:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

