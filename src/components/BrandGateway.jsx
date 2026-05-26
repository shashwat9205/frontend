// src/components/BrandGateway.jsx
import React from 'react';
import { motion } from 'framer-motion';

const BrandGateway = ({ activeBrand, onBrandChange, brand2Status }) => {
  return (
    <div className="bg-[#faf9f6] py-6 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full h-full">
      <div className="flex flex-col md:flex-row gap-8 h-full w-full overflow-hidden rounded-[2.5rem] shadow-xl">
        {/* Brand 1 Side */}
        <motion.div 
          whileHover={{ flex: 1.25 }}
          onClick={() => onBrandChange('Brand 1')}
          className={`relative flex-1 group cursor-pointer transition-all duration-700 ${activeBrand === 'Brand 1' ? 'flex-[1.25]' : 'flex-1 opacity-80 hover:opacity-100'}`}
        >
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
              alt="Brand 1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1b11] via-black/30 to-transparent"></div>
          </div>
          
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 sm:p-12 text-center gap-6">
            <h4 className="text-accent-gold font-bold uppercase tracking-wider text-[10px] font-sans">Collection 01</h4>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white leading-tight font-serif italic drop-shadow-md">
              PURE <br /> PERFORMANCE
            </h2>
            <div className="h-[2px] w-12 bg-accent-gold group-hover:w-24 transition-all duration-700"></div>
            <button className="bg-white text-stone-900 px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-[10px] opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-500 shadow-xl cursor-pointer">
              Explore Brand 1
            </button>
          </div>
        </motion.div>

        {/* Brand 2 Side */}
        <motion.div 
          whileHover={{ flex: 1.25 }}
          onClick={() => onBrandChange('Brand 2')}
          className={`relative flex-1 group cursor-pointer transition-all duration-700 ${activeBrand === 'Brand 2' ? 'flex-[1.25]' : 'flex-1 opacity-80 hover:opacity-100'}`}
        >
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1574680096145-d05b474e2158?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
              alt="Brand 2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1b11] via-black/30 to-transparent"></div>
          </div>
          
          <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 sm:p-12 text-center gap-6">
            <h4 className="text-accent-gold font-bold uppercase tracking-wider text-[10px] font-sans">Collection 02</h4>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white leading-tight font-serif italic drop-shadow-md">
              ULTIMATE <br /> RECOVERY
            </h2>
            <div className="h-[2px] w-12 bg-accent-gold group-hover:w-24 transition-all duration-700"></div>
            
            {brand2Status === 'coming_soon' ? (
              <div className="bg-[#1b4332]/80 backdrop-blur-md border border-accent-gold/25 px-6 py-2.5 rounded-full shadow-lg">
                <span className="text-accent-gold text-[9px] font-bold uppercase tracking-widest">Coming Soon</span>
              </div>
            ) : (
              <button className="bg-white text-stone-900 px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-[10px] opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-500 shadow-xl cursor-pointer">
                Explore Brand 2
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BrandGateway;
