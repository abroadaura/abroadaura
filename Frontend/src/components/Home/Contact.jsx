import React from "react";
import { assets } from "../../assets/assets";
import { Mail, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  return (
    <div>
          <div className="text-center mt-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-3">
          Feel Free to<span className="text-[#0441b4]"> Connect</span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
           if you need any help regarding Abroad aura programs cotact us.
        </p>
      </div>
        <div className='flex bg-[#0441b4] rounded-lg md:px-14 my-20 md:mt-30 md:mx-20 mx-6 '>
          {/* left */}
          <div className="w-full md:w-2/3 space-y-6 px-6 md:px-10 lg:px-15 py-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-50">
            Contact Us
          </h2>
          <p className="text-gray-50 text-sm">
            Have questions or need help starting your study-abroad journey?  
            Reach out to our expert counselors — we’re here to guide you every step of the way.
          </p>

          <div className="space-y-4 text-gray-50">
            <div className="flex items-center gap-3">
              <Mail className="text-gray-50 w-5 h-5" />
              <p className="text-base">
                Email: <span className="font-medium">abroadaurasupport@gmail.com</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-gray-50 w-5 h-5" />
              <p className="text-base">
                Phone: <span className="font-medium">+91 7459857756</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-gray-50 w-5 h-5" />
              <p className="text-base">
                Location: <span className="font-medium">Delhi, India</span>
              </p>
            </div>
          </div>

          <div className="pt-4">
            <button onClick={()=>navigate('/Consultation-form')} className="text-[#0441b4] bg-white px-6 py-3 rounded-full font-medium shadow-md hover:bg-blue-100 transition-all duration-300 cursor-pointer">
              Book Free Consultation
            </button>
          </div>
        </div>
    
            {/* right */}
            <div className='hidden md:block md:w-1/3 lg:w-[370px] relative'>
                <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.girl} alt="" />
            </div>
        </div>
    </div>
  );
};

export default Contact;
