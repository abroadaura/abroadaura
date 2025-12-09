import Post from "../models/Post.js";
import slugify from "slugify";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createPost = async (req, res) => {
  try {
    const { title, excerpt, content, tags, published } = req.body;

    const slug = slugify(title, { lower: true, strict: true });

    const coverImageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const post = new Post({
      title,
      slug,
      excerpt,
      content,
      tags,
      published,
      coverImageUrl
    });

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const existing = await Post.findById(id);

    if (!existing) return res.status(404).json({ message: "Post not found" });

    const { title, excerpt, content, tags, published } = req.body;

    if (title) existing.slug = slugify(title, { lower: true, strict: true });

    if (req.file) {
      existing.coverImageUrl = `/uploads/${req.file.filename}`;
    }

    existing.title = title || existing.title;
    existing.excerpt = excerpt || existing.excerpt;
    existing.content = content || existing.content;
    existing.tags = tags ? tags.split(",").map((t) => t.trim()) : existing.tags;
    existing.published = published ?? existing.published;

    await existing.save();
    res.json(existing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Post not found" });

    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ published: true }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) return res.status(404).json({ message: "Not found" });

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
