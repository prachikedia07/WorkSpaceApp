// // src/app/api/connect/taskModel.js
// import mongoose from "mongoose";

// const TaskSchema = new mongoose.Schema({
//   title: { type: String, required: true, trim: true },
//   description: { type: String, default: "" },

//   status: {
//     type: String,
//     enum: ["todo", "inprogress", "review", "completed"],
//     default: "todo",
//   },

//   priority: {
//     type: String,
//     enum: ["low", "medium", "high"],
//     default: "medium",
//   },

//   dueDate: { type: Date, default: null },

//   // workspace-specific tasks
//   workspaceId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Workspace",
//     default: null,
//   },

//   // assignees: store user ObjectId(s)
//   assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

//   tags: [{ type: String }],

//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     default: null,
//   },

//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// });

// TaskSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// TaskSchema.pre("findOneAndUpdate", function (next) {
//   this.set({ updatedAt: Date.now() });
//   next();
// });

// export default mongoose.models.Task || mongoose.model("Task", TaskSchema);


// src/app/api/connect/taskModel.js
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },

  status: {
    type: String,
    enum: ["todo", "inprogress", "review", "completed"],
    default: "todo",
  },

  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },

  dueDate: { type: Date, default: null },

  // workspace and relations
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    default: null,
  },

  // properly store assignees as ObjectId refs to User
  assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  tags: { type: [String], default: [] },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

TaskSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
