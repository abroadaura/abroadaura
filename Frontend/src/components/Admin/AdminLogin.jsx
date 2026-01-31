// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../firebase/config";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useAuth } from "../../context/AuthContext";

// const AdminLogin = () => {
//   const {user} = useAuth();
//   console.log(user)
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       await signInWithEmailAndPassword(
//         auth,
//         formData.email,
//         formData.password
//       );

//       // Mark user as admin locally
//       localStorage.setItem("admin", "true");

//       navigate("/pannel/admin");
//     } catch (err) {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

//         {error && (
//           <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
//         )}

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600 mb-2">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             required
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border rounded-lg px-4 py-2"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-600 mb-2">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             required
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full border rounded-lg px-4 py-2"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, AlertCircle, LogIn } from "lucide-react";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Mark user as admin locally
      localStorage.setItem("admin", "true");

      // Add slight delay for better UX
      setTimeout(() => {
        navigate("/pannel/admin");
      }, 500);
    } catch (err) {
      setError(
        err.code === "auth/invalid-credential" 
          ? "Invalid email or password" 
          : "Login failed. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 md:pt-25">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-gray-100 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold uppercase text-blue-700">
                Admin
              </h1>
              <p className="text-gray-500 mt-2">Secure administrator access</p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-900/30 border border-red-700 rounded-lg flex items-center gap-2 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-100 border border-gray-500 rounded-xl px-4 py-3 pl-11 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="admin@example.com"
                    disabled={isLoading}
                  />
                  <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-gray-100 border border-gray-500 rounded-xl px-4 py-3 pl-11 pr-11 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                  <Lock className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-gray-500 hover:text-gray-300 transition-colors"
                    tabIndex="-1"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-700 hover:from-blue-700 hover:to-purple-700 text-white py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer Note */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-center text-xs text-gray-400">
                Unauthorized access is prohibited.
              </p>
            </div>
          </div>
        </div>

        {/* Version/Info */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">v1.0.2 • Secure Admin Portal</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;