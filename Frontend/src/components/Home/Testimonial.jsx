import React from "react";
import { Star, Quote } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TestimonialSection = () => {
  const navigate = useNavigate();
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      country: "Canada",
      university: "University of Toronto",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",      rating: 4,
      text: "The guidance I received was exceptional! They helped me secure admission to my dream university with a scholarship. The entire process was smooth and stress-free.",
      course: "Masters in Computer Science"
    },
    {
      id: 2,
      name: "Rahul Verma",
      country: "USA",
      university: "New York University",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Outstanding support throughout my application journey. Their expertise in visa processing and document preparation made all the difference. Highly recommended!",
      course: "MBA"
    },
    {
      id: 3,
      name: "Anjali Patel",
      country: "USA",
      university: "University of California",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4,
      text: "From selecting the right course to accommodation assistance, they provided comprehensive support. I couldn't have asked for a better study abroad consultant.",
      course: "MSc in Data Science"
    }
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="py-20 bg-blue-50 px-2 lg:px-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            What Our <span className="text-[#0441b4]">Students</span> Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Hear from students who have successfully 
            transformed their study-abroad dreams into reality with our guidance.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative group"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#0441b4] rounded-full flex items-center justify-center">
                <Quote className="w-4 h-4 text-white" />
              </div>

              {/* Rating */}
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Student Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.course}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs font-medium text-[#0441b4]">
                      {testimonial.university}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{testimonial.country}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center flex-col">
            <div className="text-3xl font-bold text-[#0441b4] mb-2">100+</div>
            <div className="text-gray-600">Students Placed</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center flex-col">
            <div className="text-3xl font-bold text-[#0441b4] mb-2">7+</div>
            <div className="text-gray-600">Countries</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center flex-col">
            <div className="text-3xl font-bold text-[#0441b4] mb-2">95%</div>
            <div className="text-gray-600">Visa Success Rate</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-center flex-col">
            <div className="text-3xl font-bold text-[#0441b4] mb-2">₹5 Cr+</div>
            <div className="text-gray-600">Scholarships Secured</div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button onClick={()=>navigate('/Consultation-form')} className="bg-[#0441b4] hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl">
            Start Your Journey Today
          </button>
          <p className="text-gray-600 mt-4 text-sm">
            Join thousands of successful students who trusted us with their study abroad dreams
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;