// src/components/CategoryShowcase.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CategoryShowcase = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost/E-commerce/backend/api/categories.php')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          // Display all categories in a slider
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

  return (
    <section className="py-24 bg-white">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-3xl md:text-5xl font-black text-center uppercase tracking-tighter mb-16 italic">
          Shop Top Categories
        </h2>
        
        <div className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory hide-scrollbar">
          {categories.map((cat, i) => (
            <motion.div 
              key={cat.id || i}
              whileHover={{ y: -10 }}
              className="relative group cursor-pointer overflow-hidden rounded-3xl aspect-4/5 w-[85vw] md:w-[calc(33.333%-1.33rem)] shrink-0 snap-start"
            >
              {/* Background Image - Fallback to a placeholder if user hasn't uploaded one yet */}
              <img 
                src={cat.image_url ? `http://localhost/E-commerce/backend/admin/${cat.image_url}` : "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=800"} 
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-500"></div>

              {/* Floating Card */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] bg-white p-6 rounded-t-2xl shadow-2xl flex flex-col items-center gap-4 transition-all duration-500 group-hover:pb-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-black text-center">
                  {cat.name}
                </h3>
                <a 
                  href={`/shop?category=${encodeURIComponent(cat.name)}`}
                  className="bg-black text-white px-8 py-3 rounded-md font-black uppercase tracking-widest text-[9px] hover:bg-primary transition-all no-underline"
                >
                  Learn More
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
