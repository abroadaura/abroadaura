import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuth } from "../firebase/config";
import { useLocation, useNavigate } from "react-router-dom";
import { Sparkles, BookOpen } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axios from "axios"

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const {user} = useAuth()


  const baseUrl = import.meta.env.VITE_BACKEND_URL;

    if(user){
     navigate(location.state?.from || "/");
  }

  async function login() {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleAuth);

      await axios.post(`${baseUrl}/api/users/create-or-get`, {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      });

      setLoading(false);
      navigate(location.state?.from || "/");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  const features = [
    { icon: <BookOpen size={20} />, text: "Personalized Learning Paths" },
    { icon: <Sparkles size={20} />, text: "Smart Progress Tracking" },
  ];

  return (
    <div className=" py-32 md:py-20 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      
      {/* Container */}
      <div className="w-full max-w-5xl   bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/40 overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* Left Feature Side */}
        <div className="hidden lg:flex flex-col justify-between bg-[#0441b4] p-10 text-white relative">
          <div className="absolute inset-0 bg-black/10" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6 rounded-full">
              <img src="https://res.cloudinary.com/dvrfowc4a/image/upload/v1769857410/logo4_ew3okh.png" className="w-12 h-12 rounded-xl" />
              <h1 className="text-2xl font-bold ">Abroad Aura</h1>
            </div>

            <h2 className="text-3xl font-bold leading-snug">
              Start Your <br /> Learning Journey
            </h2>
          </div>

          <div className="relative z-10 space-y-5 mt-10">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-105 transition">
                  {f.icon}
                </div>
                <p className="text-lg">{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Login Side */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">

          {/* Mobile header */}

          <div className="md:hidden flex items-center justify-center">
            <img src="https://res.cloudinary.com/dvrfowc4a/image/upload/v1769857410/logo4_ew3okh.png" className="w-25" alt="" />
          </div>

          {/* Login box */}
          <div className="max-w-md mx-auto w-full ">

            <h2 className="text-lg md:text-3xl font-bold text-center mb-2">Welcome Back</h2>
            <p className="text-gray-500 text-center mb-10 text-sm">
              Continue with Google to get started
            </p>

            <button
              onClick={login}
              disabled={loading}
              className="
                w-full flex items-center justify-center gap-4 py-4 px-6
                border border-blue-200 rounded-2xl bg-blue-100
                hover:shadow-xl transition-all duration-300
                active:scale-95
                disabled:opacity-60
              "
            >
              <img src="https://res.cloudinary.com/dvrfowc4a/image/upload/v1769857862/pngwing.com_d32aom.png" className="w-6 h-6" />

              {loading ? (
                <span className="flex items-center gap-2 text-sm font-medium">
                  <span className="w-5 h-5 border-2 border-[#0441b4] border-t-transparent rounded-full animate-spin" />
                  Signing you in...
                </span>
              ) : (
                <span className="font-semibold text-gray-700 text-sm sm:text-base">
                  Continue with Google
                </span>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl flex items-center gap-4 animate-pulse">
            <div className="w-8 h-8 border-4 border-[#0441b4] border-t-transparent rounded-full animate-spin" />
            <div>
              <p className="font-semibold text-gray-900 text-sm sm:text-base">Logging you in...</p>
              <p className="text-gray-500 text-xs sm:text-sm">Please wait a moment</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
