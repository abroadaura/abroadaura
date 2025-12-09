import React from 'react'
import Landing from '../components/Home/Landing'
import ChatWidget from '../components/chat/ChatWidget'
import Footer from '../components/Home/Footer'
import Features from '../components/Home/Features'
import ConsultationForm from '../components/Home/ConsultationForm'
import Contact from '../components/Home/Contact'
import TestimonialSection from '../components/Home/Testimonial'
import Promotion from '../components/Home/Promotion'

const Home = () => {
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