import express from "express";
import Notification from "../models/Notification.js";
import User from "../models/User.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ success: false, message: "UserId missing" });
    }

    const user = await User.findOne({ uid: userId });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const notifications = await Notification.find({
      userId: user._id,
    })
      .sort({ createdAt: -1 })
      .limit(20);

    const unreadCount = await Notification.countDocuments({
      userId: user._id,
      isRead: false,
    });

    res.json({ success: true, notifications, unreadCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});



router.put("/read-all", async (req, res) => {
  const user = await User.findOne({ uid:req.query.userId });
  await Notification.updateMany(
    { userId: user._id, isRead: false },
    { isRead: true }
  );

  res.json({ success: true });
});


export default router;