import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String },
    coverImageUrl: { type: String },
    content: { type: String, required: true },
    tags: [{ type: String }],
    published: { type: Boolean, default: true },
    author: { type: String, default: "Admin" }
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
