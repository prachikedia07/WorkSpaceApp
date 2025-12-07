// // src/app/api/connect/notificationModel.js
// import mongoose from "mongoose";

// const NotificationSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   type: { 
//     type: String, 
//     enum: ["task_assigned", "task_completed", "member_added", "comment_added"],
//     required: true 
//   },
//   title: { type: String, required: true },
//   message: { type: String, required: true },
//   taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
//   workspaceId: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace" },
//   read: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.Notification || 
//   mongoose.model("Notification", NotificationSchema);

import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  type: {
    type: String,
    enum: [
      "invitation_sent",
      "invitation_accepted", 
      "invitation_declined",
      "task_assigned",
      "task_completed",
      "task_updated",
      "member_added",
      "member_removed",
    ],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  link: {
    type: String, // URL to navigate to
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    workspaceId: mongoose.Schema.Types.ObjectId,
    taskId: mongoose.Schema.Types.ObjectId,
    invitationId: mongoose.Schema.Types.ObjectId,
    actorId: mongoose.Schema.Types.ObjectId, // Who did the action
  },
});

export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);