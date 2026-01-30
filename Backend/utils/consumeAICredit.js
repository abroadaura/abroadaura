import AICredit from "../models/AICredit.js";
import User from "../models/User.js";
import { notifyUser } from "./notifyUser.js";

export const consumeAICredit = async (userId) => {


  // ⛔ No credits left
  if (creditDoc.credits <= 0) {
    const user = await User.findOne({ uid:userId });

    await notifyUser({
      userId: user._id,
      title: "No Credits left",
      message: "Your AI credit has been exhausted, wait for tomorrow.",
      type: "credit",
    });
    
    return { allowed: false, creditsLeft: 0 };
  }

  // ✅ Consume credit
  creditDoc.credits -= 1;
  await creditDoc.save();

  return { allowed: true, creditsLeft: creditDoc.credits };
};
