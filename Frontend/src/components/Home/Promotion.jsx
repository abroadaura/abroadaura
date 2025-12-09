import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";

const Promotion = () => {
  const images = [
    assets.crousel1,
    assets.red,
  ];

  const [index, setIndex] = useState(0);

  // Auto Slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer); // cleanup
  }, [images.length]);

  return (
    <div className="relative w-full bg-blue-50 mx-auto overflow-hidden px-5 md:px-6 lg:px-20">
      
      {/* Images */}
      <img
        src={images[index]}
        alt="carousel"
        className="w-full h-full transition-all duration-700 rounded-lg"
      />

      {/* Circle Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 ">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 md:h-3 md:w-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === i ? "bg-white" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Promotion;
