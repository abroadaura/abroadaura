import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import ChatWidget from "./components/chat/ChatWidget";
import Footer from "./components/Home/Footer";
import Contact from "./pages/contact";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminRoute from "./components/Admin/AdminRoute";
import ConsultationForm from "./components/Home/ConsultationForm";
import ScrollToTop from "./components/ScrollToTop";
import ContactAdminPanel from "./components/Admin/ContactAdminPanel";

const App = () => {
  return (
    <div className="App bg-white min-h-screen text-black">
    <ScrollToTop/>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Consultation-form" element={<ConsultationForm />} />

          <Route path="/login" element={<Login />} />
          <Route path="/pannel/admin-login" element={<AdminLogin />} />
          <Route path="/pannel/admin" element={<AdminRoute><AdminPanel /></AdminRoute>} />
          <Route path="/pannel/admin-contact" element={<AdminRoute><ContactAdminPanel /></AdminRoute>} />
        </Routes>
        <Footer />
        <ChatWidget />
      </AuthProvider>
    </div>
  );
};

export default App;
