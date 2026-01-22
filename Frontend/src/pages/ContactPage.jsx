import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, MessageCircle, Globe, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { ref, push } from "firebase/database";


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await push(ref(db, "contactMessages"), {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      createdAt: Date.now(),
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);

  } catch (error) {
    console.error("Firebase error:", error);
    setIsSubmitting(false);
    alert("Failed to send message. Please try again.");
  }
};


  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      details: "support@abroadaura.com",
      subtext: "Typically replies within 48 hours",
      color: "from-[#0441b4] to-[#0441b4]",
      bgColor: "bg-gray-50"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Location",
      details: "Delhi, India",
      subtext: "Visit our campus anytime",
      color: "from-[#0441b4] to-[#0441b4]",
      bgColor: "bg-gray-50"
    },
  ];

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, label: "Instagram", color: "hover:bg-gradient-to-br from-pink-500 to-purple-600" },
    { icon: <Twitter className="w-5 h-5" />, label: "Twitter", color: "hover:bg-gradient-to-br from-sky-500 to-blue-600" },
    { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", color: "hover:bg-gradient-to-br from-blue-600 to-blue-700" },
    { icon: <Facebook className="w-5 h-5" />, label: "Facebook", color: "hover:bg-gradient-to-br from-blue-500 to-blue-600" },
  ];

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-4">
      {/* Floating decorative elements */}


      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-linear-to-r from-blue-100 to-indigo-100 rounded-2xl mb-4">
            <MessageCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Let's <span className="bg-[#0441b4] bg-clip-text text-transparent">Connect</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about studying abroad? Our team is here to help you navigate your international education journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className={`${item.bgColor} backdrop-blur-sm border border-white/50 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-linear-to-br ${item.color}`}>
                      <div className="text-white">{item.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      <p className="text-xs text-gray-500">{item.subtext}</p>
                    </div>
                  </div>
                  <p className="font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                    {item.details}
                  </p>
                </div>
              ))}
            </div>

            {/* FAQ Preview */}
            <div className="bg-linear-to-br from-white to-gray-50 backdrop-blur-sm border border-white/50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Frequently Asked
              </h3>
              <div className="space-y-4">
                {[
                  "What documents do I need for admission?",
                  "How long does the visa process take?",
                  "Do you offer scholarship programs?"
                ].map((question, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-200"
                  >
                    <p className="font-medium text-gray-800">{question}</p>
                  </div>
                ))}
              </div>
              <button onClick={()=>navigate('/about')} className="mt-6 text-blue-600 font-medium hover:text-blue-700 transition-colors">
                View all FAQs →
              </button>
            </div>

            {/* Social Links */}
            <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect with us</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`flex items-center justify-center p-3 rounded-xl bg-gray-100 text-gray-700 hover:text-white ${social.color} transition-all duration-300 transform hover:-translate-y-1`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Form Section message */}
          <div className="relative">
            {isSubmitted && (
              <div className="absolute inset-0 bg-linear-to-br from-green-50 to-emerald-50 rounded-3xl border border-emerald-200 flex items-center justify-center z-10 animate-in fade-in duration-500">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-linear-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            )}

            <div className="bg-white backdrop-blur-sm border border-white/50 rounded-3xl shadow-2xl overflow-hidden h-full">
              <div className="bg-[#0441b4] p-8 text-white">
                <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
                <p className="text-blue-100">Fill out the form below and we'll respond promptly</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/20 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/20 outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell us about your study abroad goals..."
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-3 focus:ring-blue-500/20 outline-none transition-all duration-300 resize-none bg-white/50 backdrop-blur-sm"
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>All fields are required</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSubmitting 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-[#0441b4] hover:to-blue-700'
                  } text-white hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "100+", label: "Students Helped" },
            { number: "7+", label: "Universities" },
            { number: "72h", label: "Avg Response" },
            { number: "95%", label: "Success Rate" }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl font-bold bg-[#0441b4] bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-gray-600 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;