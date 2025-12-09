import { Router } from "express";
import multer from "multer";

import {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPostBySlug
} from "../controllers/postController.js";

import auth from "../middleware/auth.js";

const router = Router();

const upload = multer({ dest: "uploads/" });

// public
router.get("/", getPosts);
router.get("/:slug", getPostBySlug);

// protected
router.post("/create",auth, upload.single("coverImage"), createPost);
router.put("/:id",auth, upload.single("coverImage"), updatePost);
router.delete("/:id",auth, deletePost);

export default router;
