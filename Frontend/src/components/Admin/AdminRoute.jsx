import { Navigate } from "react-router-dom";
import { auth } from "../../firebase/config";

const AdminRoute = ({ children }) => {
  const user = auth.currentUser;
  const adminId = import.meta.env.VITE_API_ADMIN_EMAIL


  if (!user) {
    return <Navigate to="/pannel/admin-login" />;
  }

  if (user.email !== adminId) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
