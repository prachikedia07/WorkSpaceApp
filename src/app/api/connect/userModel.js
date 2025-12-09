// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// },
//   { timestamps: true });

// export const User = mongoose.models.User || mongoose.model("User", userSchema);

//src/app/api/connect/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },

    // Profile fields
    firstName: { type: String },
    lastName: { type: String },
    bio: { type: String, maxlength: 500 },
    role: { type: String, default: "Team Member" },
    avatar: { type: String }, // URL to avatar image
    
    // Account settings
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String },

    // Preferences
    preferences: {
      language: { type: String, default: "en" },
      timezone: { type: String, default: "UTC-5" },
      theme: { type: String, default: "light" },
      accentColor: { type: String, default: "teal" },
      fontSize: { type: String, default: "medium" },
    },
    
    // Notification settings
    notifications: {
      email: {
        projectUpdates: { type: Boolean, default: true },
        teamActivity: { type: Boolean, default: true },
        financialReports: { type: Boolean, default: false },
        marketing: { type: Boolean, default: false },
      },
      push: {
        enabled: { type: Boolean, default: true },
        taskReminders: { type: Boolean, default: true },
      },
    },

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
export default User;