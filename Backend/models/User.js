import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true }, // Firebase UID
    name: String,
    email: String,
    photoURL: String,
    role: { type: String, default: "student" }, // you can change roles later
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
