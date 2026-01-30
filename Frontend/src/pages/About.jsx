import React from "react";
import FAQ from "../components/About/FAQ";
import CTA from "../components/About/CTA";
import { assets } from "../assets/assets";
import { Mail, MapPin, Phone } from "lucide-react";

const About = () => {
  return (
    <section className="max-w-7xl mx-auto bg-white text-gray-900 py-20 px-6">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-black relative py-2">
          About <span className="text-[#0441b4]">Us</span>
        </h1>
        <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 mb-6"></div>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-lg">
          Empowering students to turn their study-abroad dreams into reality with expert guidance and care.
        </p>
      </div>

      {/* Image & Contact Section */}
      <div className="flex flex-col lg:flex-row gap-8 mb-20">
        {/* Left - Image */}
        <div className="w-full lg:w-1/2">
          <img 
            src={assets.university} 
            alt="University campus" 
            className="w-full h-80 lg:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right - Contact Info */}
        <div className="w-full lg:w-1/2  rounded-lg">
          <div className="space-y-6 px-6 md:px-10 lg:px-12 py-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Contact Us
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Have questions or need help starting your study-abroad journey?  
              Reach out to our expert counselors — we're here to guide you every step of the way.
            </p>

            <div className="space-y-4 text-gray-900">
              <div className="flex items-center gap-3">
                <Mail className="text-[#0441b4] w-5 h-5" />
                <p className="text-base">
                  Email: <span className="font-medium">abroadaurasupport@gmail.com</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-[#0441b4] w-5 h-5" />
                <p className="text-base">
                  Phone: <span className="font-medium">+91 7459857756</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-[#0441b4] w-5 h-5" />
                <p className="text-base">
                  Location: <span className="font-medium">Delhi, India</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission, Vision, Values */}
      <div className="mx-auto space-y-12 mb-20">
        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#0441b4]">
          <h2 className="text-2xl font-semibold text-[#0441b4] mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">
            To provide personalized, expert guidance that transforms the complex journey of studying abroad into a smooth, achievable path. 
            We believe every student deserves access to world-class education, and we're here to make that happen.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#0441b4]">
          <h2 className="text-2xl font-semibold text-[#0441b4] mb-4">
            Our Vision
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">
            To be the most trusted partner for students worldwide in their pursuit of international education, 
            creating a global community of successful scholars who make a positive impact on the world.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#0441b4]">
          <h2 className="text-2xl font-semibold text-[#0441b4] mb-4">
            Our Values
          </h2>
          <p className="text-gray-700 leading-relaxed text-base">
            We are committed to excellence, integrity, and personalized care. Every student's journey is unique, 
            and we treat each aspiration with the attention and dedication it deserves. Your success is our success.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mb-20">
        <CTA/>
      </div>

      {/* FAQ Section */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center text-black mb-12">
          Frequently Asked <span className="text-[#0441b4]">Questions</span> 
        </h2>
        <FAQ />
      </div>
    </section>
  );
};

export default About;