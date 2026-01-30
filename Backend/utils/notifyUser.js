import Notification from "../models/Notification.js";

export const notifyUser = async ({
  userId,
  title,
  message,
  type = "system",
  link = "",
}) => {
  if (!userId) return;

  return await Notification.create({
    userId,
    title,
    message,
    type,
    link,
  });
};
