// import { NextResponse } from "next/server";
// import { connectDB } from "../../../connect/db";
// import Invitation from "../../../connect/invitationModel";
// import { User } from "../../../connect/userModel";
// import Workspace from "../../../connect/workspaceModel";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../../auth/[...nextauth]/authOptions";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req, { params }) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.email) {
//       return NextResponse.json(
//         { success: false, error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     await connectDB();
//     const { id } = params;
//     const { email, message } = await req.json();

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json(
//         { success: false, error: "This user is already registered. Please use 'Add New Member' instead." },
//         { status: 400 }
//       );
//     }

//     // Check if workspace exists
//     const workspace = await Workspace.findById(id);
//     if (!workspace) {
//       return NextResponse.json(
//         { success: false, error: "Workspace not found" },
//         { status: 404 }
//       );
//     }

//     // Get current user
//     const currentUser = await User.findOne({ email: session.user.email });

//     // Check if invitation already exists
//     const existingInvite = await Invitation.findOne({
//       email,
//       workspace: id,
//       status: "pending",
//     });

//     if (existingInvite) {
//       return NextResponse.json(
//         { success: false, error: "An invitation has already been sent to this email" },
//         { status: 400 }
//       );
//     }

//     // Create invitation
//     const invitation = await Invitation.create({
//       email,
//       workspace: id,
//       invitedBy: currentUser._id,
//       message,
//       status: "pending",
//     });

//      console.log("✅ Invitation created:", invitation._id);

//     // Send email
//     try {
//       const inviterName = currentUser.name || currentUser.email;
//       const workspaceName = workspace.name;
//       const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
//       const inviteLink = `${appUrl}/register?invitation=${invitation.token}&email=${encodeURIComponent(email)}`;

//       console.log("📬 Sending email to:", email);

//       const { data, error } = await resend.emails.send({
//         from: "TaskManager <onboarding@resend.dev>",
//         to: email,
//         subject: `${inviterName} invited you to join ${workspaceName}!`,
//         html: `
//           <!DOCTYPE html>
//           <html>
//             <head>
//               <style>
//                 body {
//                   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//                   line-height: 1.6;
//                   color: #333;
//                   max-width: 600px;
//                   margin: 0 auto;
//                   padding: 20px;
//       }
//         .header {
//                   background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
//                   color: white;
//                   padding: 40px 20px;
//                   text-align: center;
//                   border-radius: 12px 12px 0 0;
//                 }
//                 .content {
//                   background: #f9fafb;
//                   padding: 40px 30px;
//                   border-radius: 0 0 12px 12px;
//                 }
//                   .button {
//                   display: inline-block;
//                   background: #14b8a6;
//                   color: white !important;
//                   padding: 14px 32px;
//                   text-decoration: none;
//                   border-radius: 8px;
//                   font-weight: 600;
//                   margin: 24px 0;
//                 }
//                 .message-box {
//                   background: white;
//                   border-left: 4px solid #14b8a6;
//                   padding: 20px;
//                   margin: 24px 0;
//                   border-radius: 6px;
//                 }
//                    </style>
//             </head>
//             <body>
//               <div class="header">
//                 <h1 style="margin: 0; font-size: 28px;">🎉 You've Been Invited!</h1>
//               </div>
//               <div class="content">
//                 <p style="font-size: 16px;">
//                   <strong>${inviterName}</strong> has invited you to collaborate on 
//                   <strong>${workspaceName}</strong>.
//                 </p>
                
//                 ${
//                   message
//                     ? `
//                   <div class="message-box">
//                     <p style="margin: 0; font-weight: 600;">Personal Message:</p>
//                     <p style="margin: 10px 0 0 0; font-style: italic;">"${message}"</p>
//                   </div>
//                 `
//                     : ""
//                 }
                
//                 <p>Click the button below to accept the invitation:</p>
                
//                 <div style="text-align: center;">
//                   <a href="${inviteLink}" class="button">Accept Invitation</a>
//                 </div>
                
//                 <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
//                   <strong>Already have an account?</strong><br>
//                   Simply log in to see this invitation in your notifications.
//                 </p>
//                 <p style="color: #ef4444; font-size: 14px;">
//                   ⏰ This invitation expires in 7 days.
//                 </p>
//               </div>
//             </body>
//           </html>
//         `,
//       });

//       if (error) {
//         console.error("❌ Email send failed:", error);
//       } else {
//         console.log("✅ Email sent successfully:", data);
//       }
//     } catch (emailError) {
//       console.error("❌ Email error:", emailError);
//       // Continue even if email fails
//     }

//     return NextResponse.json({
//       success: true,
//       data: invitation,
//       message: "Invitation sent! They will receive an email shortly.",
//     });
//   } catch (error) {
//     console.error("❌ Invite route error:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }          

import { NextResponse } from "next/server";
import { connectDB } from "../../../connect/db";
import Invitation from "../../../connect/invitationModel";
import { User } from "../../../connect/userModel";
import Workspace from "../../../connect/workspaceModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/authOptions";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      console.log("❌ No session");
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = params;
    const body = await req.json();
    const { email, message } = body;

    console.log("📧 Invite request:", { workspaceId: id, email, from: session.user.email });

    // Validate email
    if (!email || !email.includes("@")) {
      console.log("❌ Invalid email");
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ User already registered");
      return NextResponse.json(
        {
          success: false,
          error: "This user is already registered. Please use 'Add New Member' instead.",
        },
        { status: 400 }
      );
    }

    // Check if workspace exists
    const workspace = await Workspace.findById(id);
    if (!workspace) {
      console.log("❌ Workspace not found");
      return NextResponse.json(
        { success: false, error: "Workspace not found" },
        { status: 404 }
      );
    }

    // Get current user
    const currentUser = await User.findOne({ email: session.user.email });
    if (!currentUser) {
      console.log("❌ Current user not found");
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Check if invitation already exists
    const existingInvite = await Invitation.findOne({
      email,
      workspace: id,
      status: "pending",
    });

    if (existingInvite) {
      console.log("⚠️ Invitation already exists");
      return NextResponse.json(
        {
          success: false,
          error: "An invitation has already been sent to this email",
        },
        { status: 400 }
      );
    }

    // Create invitation
    const invitation = await Invitation.create({
      email,
      workspace: id,
      invitedBy: currentUser._id,
      message: message || "",
      status: "pending",
    });

    console.log("✅ Invitation created:", invitation._id);

    // Try to send email (optional - don't fail if this fails)
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      const inviterName = currentUser.name || currentUser.email;
      const workspaceName = workspace.name;
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const inviteLink = `${appUrl}/register?invitation=${invitation.token}`;

      await resend.emails.send({
        from: "TaskManager <onboarding@resend.dev>",
        to: email,
        subject: `${inviterName} invited you to ${workspaceName}`,
        html: `
          <h2>You've been invited!</h2>
          <p><strong>${inviterName}</strong> invited you to join <strong>${workspaceName}</strong></p>
          ${message ? `<p><em>"${message}"</em></p>` : ""}
          <p><a href="${inviteLink}" style="background:#14b8a6;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;display:inline-block;">Accept Invitation</a></p>
          <p style="color:#666;font-size:14px;">This invitation expires in 7 days.</p>
        `,
      });

      console.log("✅ Email sent to:", email);
    } catch (emailError) {
      console.error("⚠️ Email send failed (continuing anyway):", emailError.message);
    }

    return NextResponse.json({
      success: true,
      data: invitation,
      message: "Invitation sent successfully!",
    });
  } catch (error) {
    console.error("❌ Invite route error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}