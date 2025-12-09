import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { Loader } from "lucide-react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(user)
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {!loading ?
       children :
       <p className="flex justify-center items-center mt-20 gap-4"> <Loader size={20} className="animate-spin"/> Please wait</p>
       }
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
