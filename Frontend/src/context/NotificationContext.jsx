import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchNotifications = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const res = await axios.get(`${baseUrl}/api/notifications`, {
        params: { userId: user?.uid },
      });

      setNotifications(res?.data?.notifications);
      setUnreadCount(res?.data?.unreadCount);
      setError(null);
    } catch (err) {
      setError("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;

    await axios.put(
      `${baseUrl}/api/notifications/read-all`,
      {},
      { params: { userId: user?.uid } }
    );

    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        error,
        fetchNotifications,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
