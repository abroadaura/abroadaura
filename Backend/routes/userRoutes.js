import express from "express";
import User from "../models/User.js";
import { notifyUser } from "../utils/notifyUser.js";
import AICredit from "../models/AICredit.js";

const router = express.Router();

router.post("/create-or-get", async (req, res) => {
  try {
    const { uid, name, email, photoURL } = req.body;

    if (!uid) return res.status(400).json({ message: "UID missing" });

    let user = await User.findOne({ uid });

    if (!user) {
      user = await User.create({
        uid,
        name,
        email,
        photoURL,
        role: "student",
      });

      await notifyUser({
        userId: user._id,
        title: "Welcome 🎉",
        message: "Welcome to Abroad Aura! Start your journey with us.",
        type: "welcome",
      });

        const today = new Date().toISOString().split("T")[0];
      
        let creditDoc = await AICredit.findOne({ userId:uid });
      
        // 🆕 First-time user
        if (!creditDoc) {
          creditDoc = await AICredit.create({
            userId:uid,
            credits: 5,
            lastReset: today,
          });
      
          const user = await User.findOne({ uid});
      
          await notifyUser({
            userId: user._id,
            title: "AI Credits",
            message: "Congratulation 5 AI credits has been added into your account successfully.",
            type: "credit",
          });
      
          return { allowed: true, creditsLeft: 5 };
        }
    }


    res.json({ success: true, user });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
