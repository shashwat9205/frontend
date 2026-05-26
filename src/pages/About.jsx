// src/pages/About.jsx
import React from 'react';

const About = () => {
  return (
    <div>
      <div className="container mx-auto px-6 max-w-6xl py-12 md:py-16 text-center">
        <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Our Story</span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase mb-8">Performance Driven by Plants</h1>
        <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
          Pure Plant was born from a simple belief: that high-performance nutrition should be clean, sustainable, and powerful. We use the highest quality ingredients to ensure you get the results you deserve.
        </p>
      </div>

      {/* Visual Break */}
      <div className="h-[400px] w-full overflow-hidden">
        <img
          src=""
          alt="Gym"
          className="w-full h-full object-cover grayscale opacity-50"
        />
      </div>
    </div>
  );
};

export default About;
