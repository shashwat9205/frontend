import { API_BASE_URL } from '../config';
// src/components/Hero.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Layers, Stethoscope, FlaskConical, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Hero Banner Content
    fetch(API_BASE_URL + 'api/hero.php')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success' && data.data) {
          setHeroData(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching hero data:', err);
        setLoading(false);
      });

    // Fetch dynamic categories
    fetch(API_BASE_URL + 'api/categories.php')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setCategories(data.data);
        }
      })
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  const displayData = heroData || {
    title: "Upgrade Human Performance",
    subtitle: "Premium clinical-grade longevity and cellular optimization stacks.",
    btn_text: "Initialize Protocol",
    btn_link: "/shop"
  };

  const pathways = [
    {
      title: "Biohacking Quiz",
      subtitle: "Biomarker Assessment",
      path: "/quiz",
      icon: <Zap size={18} className="text-[#b89047]" />
    },
    {
      title: "Science Hub",
      subtitle: "Clinical Trials & Data",
      path: "/science",
      icon: <FlaskConical size={18} className="text-[#b89047]" />
    },
    {
      title: "Advisory Board",
      subtitle: "Doctor Network",
      path: "/doctor/join",
      icon: <Stethoscope size={18} className="text-[#b89047]" />
    },
    {
      title: "Longevity Stacks",
      subtitle: "Full Catalog",
      path: "/shop",
      icon: <Layers size={18} className="text-[#b89047]" />
    }
  ];

  return (
    <>
      {/* UNIFIED CINEMATIC HERO (MOBILE & DESKTOP RESPONSIVE WITH VIDEO) */}
      <section className="relative min-h-[82vh] md:h-[calc(100vh-80px)] w-full flex items-center justify-center overflow-hidden bg-[#071324] text-center border-b border-white/5 shadow-2xl py-14 sm:py-20 md:py-0">
        
        {/* Background Layer with Autoplaying Video & Dark Luxury Overlays */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {heroData?.video ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover opacity-65 md:opacity-75 scale-102 transition-transform duration-1000"
            >
              <source src={heroData.video} type="video/mp4" />
            </video>
          ) : heroData?.image ? (
            <img
              src={heroData.image}
              alt="Hero Background"
              className="w-full h-full object-cover opacity-60 md:opacity-75 scale-102 transition-transform duration-1000"
            />
          ) : (
            <div className="w-full h-full bg-[#071324]"></div>
          )}

          {/* Multi-stage Luxury Dark Gradient Mask */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-[#071324]/60 to-black/45"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,144,71,0.14),transparent_70%)]"></div>
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#b89047]/10 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-60 sm:w-80 h-60 sm:h-80 bg-[#b89047]/10 rounded-full blur-[90px] pointer-events-none"></div>

        {/* Content Layer */}
        <div className="relative z-10 container mx-auto px-5 sm:px-6 max-w-5xl flex flex-col items-center">
          
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 border border-white/15 shadow-sm mb-5 sm:mb-8 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b89047] animate-ping"></span>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.22em] uppercase text-white font-sans">
              Board-Led Longevity Portal
            </span>
          </div>

          {/* Luxury Serif Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.14] text-white mb-4 sm:mb-6 md:mb-8 font-serif max-w-4xl mx-auto px-2 uppercase drop-shadow-md">
            {displayData.title.split(' ').map((word, i) => (
              <span key={i} className={i % 3 === 2 ? "text-[#b89047] block sm:inline" : ""}>
                {word}{" "}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm md:text-base mb-8 sm:mb-10 md:mb-12 text-slate-300 font-medium max-w-xl sm:max-w-2xl mx-auto leading-relaxed px-4 font-sans tracking-wide">
            {displayData.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-5 w-full sm:w-auto px-4 sm:px-0 justify-center max-w-xs sm:max-w-none mx-auto">
            <Link
              to="/quiz"
              className="bg-gradient-to-r from-[#b89047] to-[#cba463] hover:from-[#cba463] hover:to-[#b89047] text-[#071324] font-black uppercase tracking-widest text-[10px] sm:text-[11px] px-8 sm:px-12 py-3.5 sm:py-4.5 rounded-xl shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-center no-underline"
            >
              Assess Biological Age
            </Link>
            <Link
              to="/doctor/join"
              className="bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-[#b89047]/50 font-bold uppercase tracking-widest text-[10px] sm:text-[11px] px-8 sm:px-12 py-3.5 sm:py-4.5 rounded-xl backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-center no-underline"
            >
              Consult Advisory Board
            </Link>
          </div>
        </div>

        {/* Desktop Scrolling Mouse Indicator */}
        <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1.5 opacity-60 hover:opacity-90 transition-opacity pointer-events-none">
          <span className="text-[8px] font-bold tracking-[0.2em] text-white uppercase font-sans">Explore</span>
          <div className="w-4 h-7 border border-white/25 rounded-full flex justify-center p-1">
            <div className="w-1 h-1.5 bg-[#b89047] rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* DIAGNOSTIC & CLINICAL PATHWAYS (RESPONSIVE GLASS CARDS) */}
      <section className="bg-[#050e1d] border-b border-white/10 py-6 sm:py-8 px-4 sm:px-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b89047]" />
              <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#b89047] font-sans">
                Diagnostic & Clinical Pathways
              </h3>
            </div>
            <Link
              to="/shop"
              className="text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-white flex items-center gap-1 transition-colors no-underline"
            >
              All Stacks <ArrowRight size={10} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {pathways.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="group p-3.5 sm:p-4 rounded-2xl bg-[#0a192f]/70 border border-white/10 hover:border-[#b89047]/40 hover:bg-[#0a192f] transition-all duration-300 flex items-center gap-3 no-underline shadow-sm active:scale-[0.98]"
              >
                <div className="w-10 h-10 rounded-xl bg-[#b89047]/15 border border-[#b89047]/30 flex items-center justify-center shrink-0 group-hover:bg-[#b89047] group-hover:text-[#071324] transition-all duration-300">
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-serif truncate group-hover:text-[#b89047] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[9px] text-slate-400 font-sans truncate font-medium mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
