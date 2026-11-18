import { API_BASE_URL } from '../config';
// src/components/CategoryShowcase.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Dna, Brain, Shield } from 'lucide-react';

const CategoryShowcase = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_BASE_URL + 'api/categories.php')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setCategories(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching categories:', err);
        setLoading(false);
      });
  }, []);

  if (loading || categories.length === 0) return null;

  // Icon mapping fallback for category visual variety
  const getCategoryIcon = (catName) => {
    const name = catName.toLowerCase();
    if (name.includes("nad") || name.includes("mitochondria") || name.includes("energy")) {
      return <Dna className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#b89047]" />;
    }
    if (name.includes("sleep") || name.includes("circadian") || name.includes("neuro") || name.includes("brain")) {
      return <Brain className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#b89047]" />;
    }
    if (name.includes("dna") || name.includes("repair") || name.includes("shield")) {
      return <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#b89047]" />;
    }
    return <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#b89047]" />;
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-[#faf9f6] border-y border-[#0a192f]/5 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 space-y-2 px-4 sm:px-6">
          <span className="text-[#b89047] font-bold uppercase tracking-[0.25em] text-[9px] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> MOLECULAR TARGETS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0a192f] uppercase tracking-tight font-serif">
            Shop By Category
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xl mx-auto font-sans leading-relaxed">
            Select a clinical biomarker vector to filter our flagship range of longevity formulas.
          </p>
        </div>

        {/* Horizontal Sliding Carousel */}
        <div className="flex overflow-x-auto gap-3.5 sm:gap-5 md:gap-6 px-4 sm:px-6 pb-6 sm:pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((cat, i) => {
            const catImageUrl = cat.image_url 
              ? `${API_BASE_URL}admin/${cat.image_url}` 
              : "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=800";

            return (
              <a 
                key={cat.id || i}
                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group relative block overflow-hidden rounded-2xl md:rounded-[2rem] aspect-[4/5] bg-[#0a192f] border border-[#0a192f]/5 shadow-md hover:shadow-xl transition-all duration-500 flex-none w-[170px] sm:w-[210px] md:w-[240px] snap-start no-underline"
              >
                {/* Background Category Image */}
                <img 
                  src={catImageUrl} 
                  alt={cat.name}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=800";
                  }}
                  className="w-full h-full object-cover opacity-65 scale-105 group-hover:scale-110 transition-all duration-[1200ms] ease-out"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/50 to-transparent z-10"></div>

                {/* Card Top: Floating Icon */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[#b89047]/20 group-hover:border-[#b89047]/30 transition-all duration-300">
                  {getCategoryIcon(cat.name)}
                </div>

                {/* Card Bottom: Content Overlay */}
                <div className="absolute bottom-4 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 z-20 flex flex-col gap-1.5">
                  <div className="flex justify-between items-end">
                    <div className="space-y-0.5 min-w-0 pr-1.5">
                      <h3 className="text-xs sm:text-sm font-extrabold text-white font-serif uppercase tracking-wide leading-tight group-hover:text-[#b89047] transition-colors truncate">
                        {cat.name}
                      </h3>
                      <span className="text-[7.5px] sm:text-[8px] font-bold text-white/60 uppercase tracking-widest block font-sans">
                        Explore Formulas
                      </span>
                    </div>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#b89047] group-hover:border-[#b89047] group-hover:text-[#071324] transition-all duration-300 transform group-hover:translate-x-0.5">
                      <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </div>
                  </div>
                </div>

                {/* Subtle Internal Highlight Border */}
                <div className="absolute inset-0 border border-white/10 rounded-2xl md:rounded-[2rem] pointer-events-none z-30 transition-colors group-hover:border-[#b89047]/30"></div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
