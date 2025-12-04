// src/app/api/connect/workspaceModel.js
import mongoose from "mongoose";

const WorkspaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // array of user ids
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Workspace || mongoose.model("Workspace", WorkspaceSchema);
