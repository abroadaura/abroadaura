import mongoose from "mongoose";

const aiCreditSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // Firebase UID / Auth UID
      required: true,
      unique: true,
      index: true,
    },
    credits: {
      type: Number,
      default: 5,
    },
    lastReset: {
      type: String, // YYYY-MM-DD
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AICredit", aiCreditSchema);
