import { API_BASE_URL } from '../config';
// src/components/CategoryShowcase.jsx
import React, { useState, useEffect } from 'react';
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
      return <Dna className="w-4 h-4 text-[#b89047]" />;
    }
    if (name.includes("sleep") || name.includes("circadian") || name.includes("neuro") || name.includes("brain")) {
      return <Brain className="w-4 h-4 text-[#b89047]" />;
    }
    if (name.includes("dna") || name.includes("repair") || name.includes("shield")) {
      return <Shield className="w-4 h-4 text-[#b89047]" />;
    }
    return <Sparkles className="w-4 h-4 text-[#b89047]" />;
  };

  return (
    <section className="py-20 bg-[#faf9f6] border-y border-[#0a192f]/5">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-2">
          <span className="text-[#b89047] font-bold uppercase tracking-[0.25em] text-[9px] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> MOLECULAR TARGETS
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#0a192f] uppercase tracking-tight font-serif">
            Shop By Category
          </h2>
          <p className="text-xs text-slate-500 font-medium max-w-xl mx-auto font-sans">
            Select a clinical biomarker vector to filter our flagship range of longevity formulas.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((cat, i) => {
            const catImageUrl = cat.image_url 
              ? `${API_BASE_URL}admin/${cat.image_url}` 
              : "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=800";

            return (
              <a 
                key={cat.id || i}
                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group relative block overflow-hidden rounded-[2.5rem] aspect-[4/5] bg-[#0a192f] border border-[#0a192f]/5 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Background Category Image */}
                <img 
                  src={catImageUrl} 
                  alt={cat.name}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=800";
                  }}
                  className="w-full h-full object-cover opacity-65 scale-102 group-hover:scale-108 transition-all duration-[1200ms] ease-out"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/45 to-transparent z-10"></div>

                {/* Card Top: Floating Icon */}
                <div className="absolute top-5 left-5 z-20 w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[#b89047]/20 group-hover:border-[#b89047]/30 transition-all duration-300">
                  {getCategoryIcon(cat.name)}
                </div>

                {/* Card Bottom: Content Overlay */}
                <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <h3 className="text-xs sm:text-base font-extrabold text-white font-serif uppercase tracking-wide leading-tight group-hover:text-[#b89047] transition-colors">
                        {cat.name}
                      </h3>
                      <span className="text-[8px] font-bold text-white/50 uppercase tracking-widest block">
                        Explore Formulas
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#b89047] group-hover:border-[#b89047] transition-all duration-300 transform group-hover:translate-x-0.5">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Subtle Internal Highlight Border */}
                <div className="absolute inset-0 border border-white/10 rounded-[2.5rem] pointer-events-none z-30 transition-colors group-hover:border-[#b89047]/30"></div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
