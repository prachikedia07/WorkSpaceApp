// src/app/api/connect/transactionModel.js
import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    // use ObjectId so existing docs that reference users by _id continue to work
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // transaction fields
    amount: { type: Number, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    category: { type: String, default: "General" },
    description: { type: String, default: "" },
    date: { type: Date, default: Date.now },
    project: { type: String, default: "" },
  },
  { timestamps: true }
);

// hot-reload safe model creation
const Transaction =
  mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);

// export as default and named so both import styles work across your app
export default Transaction;
export { Transaction };
