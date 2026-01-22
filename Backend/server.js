import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();



import path from "path";
import cors from "cors";
import authRoutes from './routes/auth.js'
import postRoutes from './routes/posts.js'

const app = express();
app.use(cors());
app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/mern_blog");

app.use("/api/auth", authRoutes);
app.use("/api/blogs", postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
