// src/components/AnnouncementBar.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnnouncementBar = () => {
  const [index, setIndex] = useState(0);
  const messages = [
    "✨ Free shipping on all protein orders over ₹999!",
    "🌿 100% Plant-Based & Lab Tested for Purity",
    "🚀 Brand 2 Collection - Coming Soon",
    "📦 Fast Pan-India Delivery within 3-5 Days"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="hidden md:flex bg-black text-white h-10 items-center justify-center overflow-hidden border-b border-white/10 relative">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-[10px] font-black uppercase tracking-[0.3em] absolute text-center px-6"
        >
          {messages[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default AnnouncementBar;