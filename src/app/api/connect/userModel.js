// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// },
//   { timestamps: true });

// export const User = mongoose.models.User || mongoose.model("User", userSchema);


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String, default: "" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    plan: { type: String, enum: ["Free", "Pro", "Enterprise"], default: "Free" },
    lastLogin: { type: Date },
    createdAt: { type: Date, default: Date.now },
    provider: { type: String, default: "credentials" },
    company: { type: String, default: "" },
    location: { type: String, default: "" },
    totalRevenue: { type: Number, default: 0 },
    totalExpenses: { type: Number, default: 0 },
    projects: { type: Number, default: 0 },
    teamMembers: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.User || mongoose.model("User", userSchema);
