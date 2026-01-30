import Landing from '../components/Home/Landing'
import Features from '../components/Home/Features'
import ConsultationForm from '../components/Home/ConsultationForm'
import Contact from '../components/Home/Contact'
import TestimonialSection from '../components/Home/Testimonial'
import Promotion from '../components/Home/Promotion'
import { db } from '../firebase/config'
import { ref, push } from "firebase/database";
import { useEffect } from "react";
import UniversityFinder from '../components/Tools/UniversityFinder'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
  const trackVisitor = async () => {
    try {
      // Get IP + location data
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();

      // Save to Firebase
      // if(data.ip == "103.16.29.158") return;
      await push(ref(db, "visitors"), {
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country_name,
        timestamp: Date.now(),
      });
    } catch (err) {
      console.error("IP tracking failed", err);
    }
  };

  // trackVisitor();
}, []);

  return (
    <div className="">
      <Landing />
      <Features />
      <Promotion />
      <ConsultationForm />
      <Contact />
      <div className="bg-blue-50 pt-12 pb-5 px-4 md:px-6">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-3">
            Free tools on<span className="text-[#0441b4]"> Abroad Aura</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Check university requirements of top universities
          </p>
        </div>
        <UniversityFinder value={6}/>
        <div className='flex md:justify-end items-center justify-center md:mx-6 mt-5'>
          <button
            onClick={() => navigate("/tools")}
            className=" flex items-center justify-center p-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all"
          >
            <p>View All</p> <ChevronRight />
          </button>
        </div>
      </div>
      {/* <EligibilityChecker/> */}
      {/* <TestimonialSection/> */}
    </div>
  );
}

export default Home