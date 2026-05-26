// src/components/BrandTeaser.jsx
import React from 'react';
import { motion } from 'framer-motion';

const BrandTeaser = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white text-black px-6 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="space-y-8 max-w-2xl"
      >
        <h4 className="text-primary font-black uppercase tracking-[0.4em] text-xs">A New Chapter</h4>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase">
          Brand 2 <br /> 
          <span className="text-gray-200">Coming Soon</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
          We are engineering something revolutionary. A new standard in plant-based performance nutrition is on the horizon.
        </p>
        
        <div className="pt-10">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL" 
              className="bg-gray-50 border-2 border-gray-100 px-8 py-5 rounded-2xl font-bold text-xs w-full sm:w-80 outline-none focus:border-primary transition-all"
            />
            <button className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary transition-all shadow-2xl">
              Notify Me
            </button>
          </div>
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-6">
            Join 5,000+ athletes waiting for the drop.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default BrandTeaser;
