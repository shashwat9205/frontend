// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function CylinderCarousel() {
  const cards = [
    { video: "/videos/video1.mp4", title: "Pure Energy" },
    { video: "/videos/video2.mp4", title: "Biohackerz Power" },
    { video: "/videos/video3.mp4", title: "Unleashed" },
    { video: "/videos/video4.mp4", title: "Focus" },
    { video: "/videos/video5.mp4", title: "Endurance" },
    { video: "/videos/video3.mp4", title: "Recovery" },
  ];

  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [radius, setRadius] = useState(380);
  const startX = useRef(0);
  const currentRot = useRef(0);

  // Dynamic Radius adjustment for responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 420) {
        setRadius(175);
      } else if (window.innerWidth < 640) {
        setRadius(205);
      } else if (window.innerWidth < 768) {
        setRadius(240);
      } else {
        setRadius(380);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-rotation
  useEffect(() => {
    if (isDragging || isHovered) return;
    const interval = setInterval(() => {
      setRotation((prev) => prev - (360 / cards.length));
    }, 2200);
    return () => clearInterval(interval);
  }, [isDragging, isHovered, cards.length]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.clientX || (e.touches && e.touches[0].clientX);
    currentRot.current = rotation;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const delta = clientX - startX.current;
    setRotation(currentRot.current + delta * 0.4);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const snapAngle = 360 / cards.length;
    const snappedRotation = Math.round(rotation / snapAngle) * snapAngle;
    setRotation(snappedRotation);
  };

  return (
    <div className="relative min-h-[460px] md:min-h-screen w-full overflow-hidden bg-[#071324] text-white flex flex-col items-center justify-center py-12 sm:py-16 md:py-24 border-y border-white/5">

      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,144,71,0.08),transparent_70%)]" />
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[48px_48px] sm:bg-size-[64px_64px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">

        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-10 space-y-2">
          <span className="text-[#b89047] font-bold uppercase tracking-[0.25em] text-[9px] flex items-center justify-center gap-1.5">
            CELLULAR ENERGY IN MOTION
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white uppercase tracking-tight font-serif">
            Biohackerz Protocols
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-md mx-auto font-sans leading-relaxed">
            Drag or swipe horizontally to cycle through our active cellular recovery engine.
          </p>
        </div>

        {/* 3D Scene Wrapper */}
        <div
          className="relative flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none h-[280px] sm:h-[340px] md:h-[500px] w-full"
          style={{
            perspective: "1100px",
            transformStyle: "preserve-3d"
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          {/* Rotating Cylinder Container */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${rotation}deg)`,
              transition: isDragging ? "none" : "transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
          >
            {cards.map((card, index) => {
              const angle = index * (360 / cards.length);
              const normalizedRotation = ((rotation % 360) + 360) % 360;
              const cardGlobalAngle = ((angle + normalizedRotation) % 360 + 360) % 360;

              const distanceFromFront = Math.min(cardGlobalAngle, 360 - cardGlobalAngle);
              const isFront = distanceFromFront < 30;

              return (
                <div
                  key={index}
                  onMouseEnter={() => { if (isFront) setIsHovered(true); }}
                  onMouseLeave={() => setIsHovered(false)}
                  className="absolute top-1/2 left-1/2 -mt-24 sm:-mt-32 md:-mt-40 -ml-16 sm:-ml-24 md:-ml-28 h-48 sm:h-64 md:h-80 w-32 sm:w-48 md:w-56 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
                  style={{
                    transition: isDragging ? "none" : "all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)",
                    transform: `rotateY(${angle}deg) translateZ(${radius}px) scale(${isFront ? 1.05 : 0.93})`,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    opacity: isFront ? 1 : Math.max(0.4, 1 - (distanceFromFront / 180)),
                    filter: isFront ? 'brightness(1) blur(0px)' : `brightness(${Math.max(0.45, 1 - (distanceFromFront / 110))}) blur(${distanceFromFront / 55}px)`,
                    boxShadow: isFront ? "0 10px 40px rgba(0,0,0,0.6), 0 20px 40px rgba(184,144,71,0.25)" : "0 5px 20px rgba(0,0,0,0.3)",
                    border: isFront ? "2px solid rgba(184,144,71,0.85)" : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <video
                    src={card.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover scale-105"
                    style={{ willChange: "transform" }}
                  />

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent transition-opacity duration-700 ${isFront ? 'opacity-100' : 'opacity-30'}`} />

                  {/* Card Content */}
                  <div className={`absolute bottom-3 sm:bottom-6 left-3 sm:left-5 right-3 sm:right-5 transition-all duration-700 transform ${isFront ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <div className={`h-1 bg-[#b89047] mb-1.5 sm:mb-2 rounded-full transition-all duration-700 delay-100 ${isFront ? 'w-6 sm:w-10' : 'w-2'}`}></div>
                    <h3 className="text-xs sm:text-base md:text-xl font-bold uppercase tracking-wider leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-serif">
                      {card.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
