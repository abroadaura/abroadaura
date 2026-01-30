import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // uid:{type: String},

    title: { type: String, required: true },
    message: { type: String, required: true },

    type: {
      type: String,
      enum: ["credit", "test", "system", "welcome", "dashboard"],
      default: "system",
    },

    link: { type: String }, // optional redirect
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);
