import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { ref, push } from "firebase/database";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, X } from "lucide-react";

const ConsultationForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    course: "",
  });

  // ✅ Auto fill email when user logs in
  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: user.email,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ If user not logged in → redirect to login
    if (!user) {
      localStorage.setItem("pendingConsultationForm", JSON.stringify(formData));
      navigate("/login");
      return;
    }

    try {
      await push(ref(db, "consultations"), {
        ...formData,
        email: user.email, // ✅ Always replace with logged in email
        createdAt: Date.now(),
      });

      // alert("Form submitted! We’ll contact you within 2 business days.");
      setShowPopup(true);

      setFormData({
        name: "",
        email: user.email, // keep email after submit if logged in
        phone: "",
        country: "",
        course: "",
      });
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // ✅ Restore form after login
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem("pendingConsultationForm");
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData({
          ...parsed,
          email: user.email,
        });
        localStorage.removeItem("pendingConsultationForm");
      }
    }
  }, [user]);

  return (
    <section className="w-full bg-blue-50 py-20 px-6 lg:px-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Book Your <span className="text-[#0441b4]">Free Consultation</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Take the first step towards your international education dream
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 text-left">
          Schedule a Mentorship Session
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>

            {/* ✅ Email Field Auto Behavior */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={!!user} // ✅ lock when logged in
                className={`w-full border rounded-md px-4 py-2 ${
                  user ? "bg-gray-100 cursor-not-allowed" : "border-gray-300"
                }`}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Target Country *
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Intended Course
            </label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#0441b4] hover:bg-blue-800 text-white font-medium px-8 py-3 rounded-full shadow-md"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center animate-fadeIn">
            <div className="flex flex-col justify-center items-center">
              <div className="relative mb-3">
                <div className="relative w-15 h-15 mx-auto bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <BadgeCheck size={36} className="text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-[#0441b4] mb-3">
                🎉 Thank You!
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Your request has been submitted. Our team will contact you within
              2 business days.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-[#0441b4] hover:bg-blue-800 text-white px-6 py-2 rounded-full font-medium cursor-pointer"
            >
              Close
            </button>
            <p className="pt-4 text-gray-500 text-xs">
              Please check your<span className=" text-blue-400"> email </span>
              for further process.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ConsultationForm;
