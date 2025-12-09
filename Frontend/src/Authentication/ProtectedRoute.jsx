import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;


// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();
//   const location = useLocation();

//   if (!user)
//     return <Navigate to="/login" state={{ from: location.pathname }} replace />;

//   return children;
// };

// export default ProtectedRoute;
