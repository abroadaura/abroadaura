import express from "express";
import { analyzeSOP } from "../controllers/sopController.js";

const router = express.Router();

router.post("/analyze", analyzeSOP);

export default router;
