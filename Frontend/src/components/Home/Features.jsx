import React from "react";
import { features } from "../../utils/utils";

const Features = () => {
  return (
    <section className="w-full bg-blue-50 py-16 px-6 lg:px-20 text-gray-900">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-3">
          Why Choose <span className="text-[#0441b4]"> Abroad Aura</span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          Comprehensive support at every step of your international <br /> education journey
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col"
          >
            {/* Icon */}
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 mb-5 text-3xl">
              <item.logo/>
            </div>

            {/* Heading */}
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {item.heading}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
