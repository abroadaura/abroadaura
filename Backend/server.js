import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import sopRoutes from "./routes/sopRoutes.js";
import profileRoutes from "./routes/ProfileRoutes.js";
import resumeAnalyzer from "./routes/ResumeAnalyzer.js"
import userRoutes from "./routes/userRoutes.js"
import notificationRoutes from "./routes/notificationRoutes.js"
import AICredit from "./models/AICredit.js";
import User from "./models/User.js";
import { notifyUser } from "./utils/notifyUser.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
      origin: [
      "http://localhost:5173",
      "https://abroadaura.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

app.use("/api/sop", sopRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/resume", resumeAnalyzer);

app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("SOP Analyzer API running");
});

app.get("/api/credits", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ success: false, message: "UserId missing" });
    }


    const today = new Date().toISOString().split("T")[0];

    const creditDoc = await AICredit.findOne({ userId });

      // 🔁 Reset daily
      if (creditDoc.lastReset !== today) {
        creditDoc.credits = 5;
        creditDoc.lastReset = today;
        await creditDoc.save();
    
        const user = await User.findOne({ uid:userId });
    
        await notifyUser({
          userId: user._id,
          title: "Credits renewed",
          message: "Your AI credit has been updated successfully.",
          type: "credit",
        });
    
      }

    if (!creditDoc) {
      return res.json({ success: true, credits: 0 });
    }

    res.json({
      success: true,
      creditsLeft: creditDoc.credits,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT)

// app.listen(PORT, () =>
//   console.log(`Server running on port ${PORT}`)
// );
