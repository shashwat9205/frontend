import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&q=80&w=1600",
    badge: "Premium Quality",
    title: "100% Pure Plant Isolate",
    subtitle: "Fuel your muscles with 25g of clean, organic allergen-free protein. Zero bloating, complete amino acid profile.",
    ctaText: "Shop Vegan Protein",
    ctaLink: "/shop",
    accent: "border-accent-gold text-accent-gold"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1600",
    badge: "Limited Time Offer",
    title: "Unleash Peak Performance",
    subtitle: "Get 20% off all elite pre-workout & hydration blends. Use code ELITE20 at checkout.",
    ctaText: "Claim Discount",
    ctaLink: "/shop",
    accent: "border-[#52b788] text-[#52b788]"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1600",
    badge: "Expert Recommendation",
    title: "Vetted by Certified Doctors",
    subtitle: "Explore personalized supplementation advice and custom recommendations from certified sports doctors.",
    ctaText: "Meet Our Partners",
    ctaLink: "/shop",
    accent: "border-accent-gold text-accent-gold"
  }
];

export default function PromoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isHovered, setIsHovered] = useState(false);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.02
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    })
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (customDelay) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: customDelay,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  const nextSlide = React.useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const nextSlideRef = useRef(nextSlide);
  useEffect(() => {
    nextSlideRef.current = nextSlide;
  }, [nextSlide]);

  // Auto-play interval
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlideRef.current();
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextSlide();
    } else if (info.offset.x > swipeThreshold) {
      prevSlide();
    }
  };

  return (
    <div 
      className="relative w-full h-95 md:h-130 overflow-hidden bg-black select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 w-full h-full flex items-center cursor-grab active:cursor-grabbing"
        >
          {/* Background Image with Zoom Effect */}
          <div className="absolute inset-0 z-0">
            <img 
              src={slides[currentIndex].image} 
              alt={slides[currentIndex].title}
              className="w-full h-full object-cover scale-105"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          </div>

          {/* Slide Content Container */}
          <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 w-full">
            <div className="max-w-xl text-left space-y-4 md:space-y-6">
              
              {/* Badge */}
              <motion.div
                custom={0.1}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className={`inline-block px-3.5 py-1 rounded-full border text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-black/40 backdrop-blur-md ${slides[currentIndex].accent}`}
              >
                {slides[currentIndex].badge}
              </motion.div>

              {/* Title */}
              <motion.h2
                custom={0.2}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white font-serif leading-[1.1] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              >
                {slides[currentIndex].title}
              </motion.h2>

              {/* Description */}
              <motion.p
                custom={0.3}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="text-stone-300 text-xs md:text-base font-light leading-relaxed max-w-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              >
                {slides[currentIndex].subtitle}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                custom={0.4}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="pt-2 md:pt-4"
              >
                <a
                  href={slides[currentIndex].ctaLink}
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white hover:bg-accent-gold text-black font-black uppercase tracking-wider text-[9px] md:text-[10px] shadow-2xl transition-all duration-300 hover:shadow-accent-gold/25 cursor-pointer no-underline"
                >
                  {slides[currentIndex].ctaText}
                  <FaArrowRight className="text-[10px]" />
                </a>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-accent-gold hover:text-black border border-white/10 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
      >
        <FaChevronLeft className="text-xs md:text-sm" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-accent-gold hover:text-black border border-white/10 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
      >
        <FaChevronRight className="text-xs md:text-sm" />
      </button>

      {/* Progress Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              index === currentIndex 
                ? "w-7 bg-accent-gold" 
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}