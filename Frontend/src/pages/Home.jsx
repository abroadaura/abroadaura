import Landing from '../components/Home/Landing'
import ChatWidget from '../components/chat/ChatWidget'
import Footer from '../components/Home/Footer'
import Features from '../components/Home/Features'
import ConsultationForm from '../components/Home/ConsultationForm'
import Contact from '../components/Home/Contact'
import TestimonialSection from '../components/Home/Testimonial'
import Promotion from '../components/Home/Promotion'
import { db } from '../firebase/config'
import { ref, push } from "firebase/database";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
  const trackVisitor = async () => {
    try {
      // Get IP + location data
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();

      // Save to Firebase
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

  trackVisitor();
}, []);

  return (
    <div className=''>
        <Landing/>
        <Features/>
        <Promotion/>
        <ConsultationForm/>
        <Contact/>
        <TestimonialSection/>
    </div>
  )
}

export default Home