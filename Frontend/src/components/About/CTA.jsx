import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="bg-linear-to-r from-blue-700 to-blue-500 text-white py-16 px-6 lg:px-20 w-full rounded-lg">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-col items-center justify-between gap-8">
        
        {/* Text Section */}
        <div className="text-center lg:text-left space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug">
            Ready to Begin Your Study-Abroad Journey?
          </h2>
          <p className="text-blue-100 text-lg ">
            Take the first step toward achieving your global education dreams with personalized guidance from our experts.
          </p>
        </div>

        {/* Button Section */}
        <div className="flex justify-center lg:justify-end">
          <Link
            to="/consultation-form"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 hover:bg-blue-50 transition-all duration-300"
          >
            Book Free Consultation <ArrowRight size={20} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default CTA;
