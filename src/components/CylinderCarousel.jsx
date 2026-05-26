import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";

export default function CylinderCarousel() {
  const cards = [
    { video: "/videos/video1.mp4", title: "Pure Energy" },
    { video: "/videos/video2.mp4", title: "Plant Power" },
    { video: "/videos/video3.mp4", title: "Unleashed" },
    { video: "/videos/video4.mp4", title: "Focus" },
    { video: "/videos/video5.mp4", title: "Endurance" },
    { video: "/videos/video3.mp4", title: "Recovery" },
  ];

  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const startX = useRef(0);
  const currentRot = useRef(0);

  // Auto-rotation
  useEffect(() => {
    if (isDragging || isHovered) return;
    const interval = setInterval(() => {
      setRotation((prev) => prev - (360 / cards.length));
    }, 1800);
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
    // Sensitivity multiplier
    setRotation(currentRot.current + delta * 0.4);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Snap to nearest card
    const snapAngle = 360 / cards.length;
    const snappedRotation = Math.round(rotation / snapAngle) * snapAngle;
    setRotation(snappedRotation);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white flex items-center justify-center py-20">

      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[64px_64px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center -mt-24">



        {/* 3D Scene Wrapper */}
        <div
          className="relative flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none"
          style={{
            width: "100%",
            height: "500px",
            perspective: "1200px",
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
              // Calculate how close this card is to facing front (0 degrees relative to viewer)
              const normalizedRotation = ((rotation % 360) + 360) % 360;
              const cardGlobalAngle = ((angle + normalizedRotation) % 360 + 360) % 360;

              // 0 is front, 180 is back. Let's find absolute distance from 0 (or 360)
              const distanceFromFront = Math.min(cardGlobalAngle, 360 - cardGlobalAngle);
              const isFront = distanceFromFront < 30; // Within 30 degrees of front

              return (
                <div
                  key={index}
                  onMouseEnter={() => { if (isFront) setIsHovered(true); }}
                  onMouseLeave={() => setIsHovered(false)}
                  className="absolute top-1/2 left-1/2 -mt-45 -ml-32.5 h-80 w-55 rounded-3xl overflow-hidden shadow-2xl"
                  style={{
                    transition: isDragging ? "none" : "all 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)",
                    transform: `rotateY(${angle}deg) translateZ(380px) scale(${isFront ? 1.05 : 0.95})`,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    WebkitBoxReflect: isFront ? "below 10px linear-gradient(transparent, transparent 60%, rgba(255,255,255,0.15))" : "none",
                    // Apply dynamic styling based on position in cylinder
                    opacity: isFront ? 1 : Math.max(0.5, 1 - (distanceFromFront / 200)),
                    filter: isFront ? 'brightness(1) blur(0px)' : `brightness(${Math.max(0.5, 1 - (distanceFromFront / 120))}) blur(${distanceFromFront / 60}px)`,
                    boxShadow: isFront ? "0 0 50px rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.8)" : "0 0 30px rgba(255,255,255,0.08), 0 10px 20px rgba(0,0,0,0.9)",
                    border: isFront ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(255,255,255,0.02)",
                  }}
                >
                  <video
                    src={card.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover scale-105"
                    style={{ willChange: "transform" }} // Hardware acceleration fix for glitchy video edges
                  />

                  {/* Elegant Gradient Overlay */}
                  <div className={`absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-700 ${isFront ? 'opacity-100' : 'opacity-0'}`} />

                  {/* Card Content */}
                  <div className={`absolute bottom-8 left-6 right-6 transition-all duration-1000 transform ${isFront ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div className={`h-1 bg-primary mb-3 rounded-full transition-all duration-1000 delay-100 ${isFront ? 'w-10' : 'w-3'}`}></div>
                    <h3 className="text-xl font-black uppercase tracking-widest leading-tight text-white drop-shadow-[0_4px_10px_rgba(0,0,0,1)]">
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