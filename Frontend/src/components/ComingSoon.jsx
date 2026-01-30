import React, { useState, useEffect } from "react";
import { Mail, Clock, CheckCircle } from "lucide-react";
import { db } from "../firebase/config";
import { ref, push } from "firebase/database";

const ComingSoon = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) return;

    setIsSubmitting(true);

    try {
      await push(ref(db, "notifyMessages"), {
        email: formData.email,
        createdAt: Date.now(),
      });

      setIsSubmitted(true);
      setFormData({ email: "" });

      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("Firebase error:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const launchDate = new Date("2026-02-15T00:00:00");
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = launchDate - now;

      if (diff <= 0) return clearInterval(timer);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center px-4 md:py-10 m-1 md:m-5 rounded-2xl">
      <div className="text-center max-w-2xl w-full">

        <h1 className="text-3xl md:text-6xl font-extrabold">🚧 Coming Soon</h1>
        <p className="mt-2 opacity-90">Something amazing is on the way!</p>

        {/* Countdown */}
        <div className="flex justify-center gap-4 my-10 flex-wrap">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="bg-white/10 rounded-xl px-5 py-4 w-20 md:w-24">
              <p className="text-2xl md:text-3xl font-bold">{value}</p>
              <p className="text-xs opacity-80 capitalize">{label}</p>
            </div>
          ))}
        </div>

        {/* Email Form */}
        <form
          onSubmit={handleSubmit}
          className="relative bg-white/10 backdrop-blur-xl px-4 md:p-4 rounded-xl flex flex-row items-center gap-3"
        >
          {isSubmitted && (
            <div className="absolute inset-0 bg-white rounded-xl flex items-center justify-center z-10">
              <div className="text-center">
                <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-2" />
                <p className="text-gray-800 font-semibold">You’re on the list!</p>
              </div>
            </div>
          )}

          <Mail size={20} className="opacity-80" />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full bg-transparent outline-none placeholder-white/70"
            required
            disabled={isSubmitting}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-blue-600 font-semibold px-5 py-2 my-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Notify"}
          </button>
        </form>

        <p className="mt-8 text-white/80 text-sm flex justify-center items-center gap-2">
          <Clock size={14} /> We’re working hard to launch soon!
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
