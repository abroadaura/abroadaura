import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import ChatWidget from "./components/chat/ChatWidget";
import Footer from "./components/Home/Footer";
import ContactPage from "./pages/ContactPage";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminRoute from "./components/Admin/AdminRoute";
import ConsultationForm from "./components/Home/ConsultationForm";
import ScrollToTop from "./components/ScrollToTop";
import ContactAdminPanel from "./components/Admin/ContactAdminPanel";
import AdminVisitors from "./components/Admin/AdminVisitors";
import Tools from "./pages/Tools";
import RadiatorAI from "./pages/RadiatorAI";
import { NotificationProvider } from "./context/NotificationContext";
import ComingSoon from "./components/ComingSoon";
import ProtectedRoute from "./Authentication/ProtectedRoute";
import UserGroup from "./UserGroup";

const App = () => {
  return (
    <div className="App bg-white min-h-screen text-black">
          <ScrollToTop/>
      <AuthProvider>
      <NotificationProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/ai" element={<ProtectedRoute><RadiatorAI /></ProtectedRoute> } />
          <Route path="/Consultation-form" element={<ConsultationForm />} />

          {/* tools  */}
          <Route path="/tools" element={<Tools/>}/>
          <Route path="/blog" element={<ComingSoon/>}/>
          <Route path="/courses" element={<ComingSoon/>}/>
          <Route path="/resources" element={<ComingSoon/>}/>

          <Route path="/login" element={<Login />} />
          <Route path="/pannel/admin-login" element={<AdminLogin />} />
          <Route path="/pannel/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
          <Route path="/pannel/admin/contact" element={<AdminRoute><ContactAdminPanel /></AdminRoute>} />
          <Route path="/pannel/admin/visitors" element={<AdminRoute><AdminVisitors /></AdminRoute>} />
        </Routes>
        <Footer />
        <ChatWidget />
       </NotificationProvider>
      </AuthProvider>
    </div>
  );
};

export default App;


