// src/app/api/user/avatar/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { connectDB } from "@/app/api/connect/db";
import User from "@/app/api/connect/userModel";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// export const config = { api: { bodyParser: false } };
export const runtime = "nodejs";


export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      console.error("avatar POST: not authenticated");
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 });
    }

    await connectDB();

    // parse multipart/form-data (Web Request's formData)
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) {
      console.error("avatar POST: no file field in formData");
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log(`avatar POST: received file, buffer ${buffer.length} bytes for user ${session.user.email}`);

    // upload with stream and log cloudinary result
    const uploadFromBuffer = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          {
            folder: "teamfinance/avatars",
            resource_type: "image",
            overwrite: true,
            use_filename: true,
            unique_filename: true,
          },
          (error, result) => {
            if (error) {
              console.error("cloudinary upload error:", error);
              return reject(error);
            }
            console.log("cloudinary upload result:", result && { public_id: result.public_id, secure_url: result.secure_url });
            resolve(result);
          }
        );
        stream.end(buffer);
      });

    let result;
    try {
      result = await uploadFromBuffer();
    } catch (uploadErr) {
      console.error("uploadFromBuffer failed:", uploadErr);
      return NextResponse.json({ success: false, error: "Cloudinary upload failed", details: String(uploadErr) }, { status: 500 });
    }

    // update user in DB
    try {
      const updated = await User.findOneAndUpdate(
        { email: session.user.email },
        { avatar: result.secure_url, name: (result.public_id ? undefined : undefined) }, // keep name unchanged here
        { new: true }
      ).lean();

      console.log("DB updated user avatar:", updated ? updated.email : "user-not-found");

      // remove sensitive fields
      if (updated) {
        delete updated.password;
        delete updated.twoFactorSecret;
      }

      return NextResponse.json({ success: true, url: result.secure_url, user: updated || null });
    } catch (dbErr) {
      console.error("DB update error after upload:", dbErr);
      return NextResponse.json({ success: false, error: "DB update failed", details: String(dbErr) }, { status: 500 });
    }
  } catch (err) {
    console.error("Avatar upload route top-level error:", err);
    return NextResponse.json({ success: false, error: "Upload failed", details: String(err) }, { status: 500 });
  }
}
