import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const adminEmail = import.meta.env.VITE_API_ADMIN_EMAIL;

  // ⏳ Wait for Firebase to restore session
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-2xl flex items-center gap-4">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div>
            <p className="font-semibold text-gray-900">Setting up Analyzer</p>
            <p className="text-sm text-gray-600">This will take upto 30s</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/pannel/admin-login" replace />;
  }

  if (user.email !== adminEmail) {
    return <Navigate to="/" replace />;
  }

  return children;
};;

export default AdminRoute;
