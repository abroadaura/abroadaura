import React from "react";
import { assets } from "../../assets/assets";
import {MoveRight} from "lucide-react"
import { useNavigate } from "react-router-dom";

function Landing_section() {

  const navigate = useNavigate();

  return (
    <section className="w-full text-gray-900 py-10 md:px-5">
    <div className="text-center md:hidden">
      <span className="px-4 py-2 mt-7 md:mt-0 lg:mt-0 rounded-full bg-[#0441b4] text-white font-semibold text-xs sm:text-sm shadow-sm animate-bounce self-center lg:self-start">Trusted by 1000+ students</span>
    </div>
      <div className=" mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-4 lg:px-16 md:gap-10 gap-6">
        
        {/* Left Section */}
        <div className="lg:w-1/2 text-center lg:text-left space-y-6 ">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-[#0441b4]">
            Your Global Education Journey Starts Here
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            From guidance to admission — your journey abroad begins here. 
            Get personal mentorship, expert consultation, and step-by-step 
            assistance to make your study-abroad dream a reality.
          </p>

<div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
  <button
    onClick={() => navigate("/Consultation-form")}
    className="
      w-full lg:w-auto
      px-6 py-3
      bg-[#0441b4] border border-[#0441b4]
      text-white rounded-xl font-medium shadow-md
      hover:bg-[#0441b4] hover:scale-105
      transition-all
    "
  >
    Book Free Consultation
  </button>

  <button
    onClick={() => navigate("/about")}
    className="
      w-full lg:w-auto
      px-6 py-3
      border border-[#0441b4]
      text-[#0441b4] rounded-xl font-medium
      hover:bg-blue-50 hover:scale-105
      transition-all
      flex items-center justify-center gap-1.5
    "
  >
    <span>Know More</span>
    <MoveRight />
  </button>
</div>

        </div>

        {/* Right Section */}
        <div className="lg:w-3/4 flex justify-center">
          <img
            src={assets.place}
            alt="Study Abroad"
            className="object-contain"
          />
        </div>

      </div>
    </section>
  );
}

export default Landing_section;
