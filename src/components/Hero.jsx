import { API_BASE_URL } from '../config';
// src/components/Hero.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, Flame, Zap, RefreshCw, Layers } from 'lucide-react';

const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const [categories, setCategories] = useState([]);
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

    // Fetch dynamic categories fromcategories.php
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

  // Map dynamic categories for mobile category navigation
  const mobileCatList = [
    {
      name: 'All Stacks',
      path: '/shop',
      icon: <LayoutGrid size={16} className="text-primary" />,
      bgImage: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=150'
    },
    ...categories.map(cat => {
      // Map dynamic icons based on keywords
      let icon = <Layers size={16} className="text-primary" />;
      const name = cat.name.toLowerCase();

      if (name.includes('protein') || name.includes('nmn')) {
        icon = <Layers size={16} className="text-primary" />;
      } else if (name.includes('recovery') || name.includes('reco')) {
        icon = <RefreshCw size={16} className="text-primary" />;
      } else if (name.includes('pre') || name.includes('energ') || name.includes('perform')) {
        icon = <Zap size={16} className="text-primary" />;
      } else if (name.includes('wellness') || name.includes('health') || name.includes('women')) {
        icon = <Flame size={16} className="text-primary" />;
      }

      const bgImage = cat.image_url
        ? `${API_BASE_URL}admin/${cat.image_url}`
        : 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&q=80&w=150';

      return {
        name: cat.name,
        path: `/shop?category=${encodeURIComponent(cat.name)}`,
        icon,
        bgImage
      };
    })
  ];

  return (
    <>
      {/* 1. CINEMATIC HERO (DESKTOP VIEW) */}
      <section className="hidden md:flex relative h-[calc(100vh-80px)] w-full items-center justify-center overflow-hidden bg-[#0a192f] text-center border-b border-white/5 shadow-md">
        {/* Background Layer with Dark cinematic overlays */}
        <div className="absolute inset-0 z-0">
          {heroData?.video ? (
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-75 scale-102 transition-transform duration-1000">
              <source src={heroData.video} type="video/mp4" />
            </video>
          ) : heroData?.image ? (
            <img src={heroData.image} alt="" className="w-full h-full object-cover opacity-75 scale-102 transition-transform duration-1000" />
          ) : (
            <div className="w-full h-full bg-[#0a192f]"></div>
          )}
          {/* Multi-stage Luxury Dark Gradient Mask */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/45 to-black/25"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,144,71,0.12),transparent_65%)]"></div>
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#b89047]/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#b89047]/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Content Layer */}
        <div className="relative z-10 container mx-auto px-6 max-w-5xl flex flex-col items-center">
          {/* Subtle Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-sm mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b89047] animate-ping"></span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">
              Board-Led Longevity Portal
            </span>
          </div>

          {/* Luxury Serif Title */}
          <h1 className="text-6xl lg:text-7xl font-bold tracking-tight leading-[1.12] text-white mb-8 font-serif max-w-4xl mx-auto px-4 uppercase">
            {displayData.title.split(' ').map((word, i) => (
              <span key={i} className={i % 3 === 2 ? "text-[#b89047] block sm:inline" : ""}>
                {word}{" "}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base mb-12 text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed px-4 font-sans tracking-wide">
            {displayData.subtitle}
          </p>

          {/* Luxury CTAs */}
          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto px-10 sm:px-0 justify-center">
            <a href="/quiz" className="bg-[#b89047] hover:bg-[#cba463] text-white px-12 py-4.5 rounded-xl font-bold uppercase tracking-wider text-[10px] transition-all shadow-md hover:-translate-y-0.5 active:translate-y-0 duration-300">
              Assess Biological Age
            </a>
            <a href="/doctor/join" className="bg-transparent border border-white/20 text-white hover:bg-white/5 px-12 py-4.5 rounded-xl font-bold uppercase tracking-wider text-[10px] transition-all hover:-translate-y-0.5 active:translate-y-0 duration-300">
              Consult Advisory Board
            </a>
          </div>
        </div>

        {/* Scrolling Mouse Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60 hover:opacity-90 transition-opacity">
          <span className="text-[8px] font-bold tracking-[0.2em] text-white uppercase font-sans">Explore</span>
          <div className="w-5 h-9 border border-white/20 rounded-full flex justify-center p-1.5">
            <div className="w-1 h-2 bg-[#b89047] rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* 2. PREMIUM COMPACT HERO & DYNAMIC CIRCULAR CATEGORIES (MOBILE VIEW) */}
      <div className="block md:hidden bg-white px-5 pt-6 pb-6">
        {/* Compact Banner slider block */}
        <div className="relative w-full bg-[#faf9f6] rounded-3xl p-6 overflow-hidden flex items-center min-h-[180px] shadow-sm border border-[#0a192f]/5">
          {/* Background overlay details */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#b89047]/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/50 to-transparent"></div>

          {/* Left Text details */}
          <div className="relative z-10 flex-1 flex flex-col justify-center pr-20">
            <span className="text-[#b89047] font-bold uppercase tracking-wider text-[8px] mb-1.5 font-sans">
              CLINICAL LONGEVITY
            </span>
            <h2 className="text-[#0a192f] text-lg font-bold font-serif leading-tight mb-2 uppercase">
              Upgrade Cellular Performance
            </h2>
            <p className="text-slate-600 text-[10px] leading-normal font-sans font-medium">
              Physician-formulated protocols based on clinical diagnostic baselines.
            </p>
            <Link
              to="/quiz"
              className="mt-4 bg-[#0a192f] text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[9px] inline-block no-underline shadow-md active:scale-98 transition-all self-start"
            >
              Start Assessment
            </Link>
          </div>

          {/* Right Floating Image Spotlight Circle */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white shadow-md border border-[#0a192f]/5 flex items-center justify-center p-2.5 z-10 pointer-events-none select-none">
            <img
              src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=300"
              alt="Medical laboratory research"
              className="w-full h-full object-cover rounded-full opacity-90"
            />
          </div>
        </div>

        {/* Diagnostic & Clinical Navigation */}
        <div className="mt-8">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 font-sans mb-4">
            Diagnostic & Clinical Pathways
          </h3>
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-2">
            {[
              {
                name: 'Bio-Quiz',
                path: '/quiz',
                icon: <Zap size={16} className="text-[#b89047]" />,
                bgImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=150'
              },
              {
                name: 'Science Hub',
                path: '/science',
                icon: <Layers size={16} className="text-[#b89047]" />,
                bgImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=150'
              },
              {
                name: 'Advisory Board',
                path: '/doctor/join',
                icon: <RefreshCw size={16} className="text-[#b89047]" />,
                bgImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150'
              },
              {
                name: 'Clinical Blog',
                path: '/blog',
                icon: <Flame size={16} className="text-[#b89047]" />,
                bgImage: 'https://images.unsplash.com/photo-1511295742364-92767fa62d9f?auto=format&fit=crop&q=80&w=150'
              }
            ].map((cat, index) => (
              <Link
                key={index}
                to={cat.path}
                className="flex flex-col items-center shrink-0 no-underline group"
              >
                <div className="relative w-15 h-15 rounded-full bg-white border border-[#0a192f]/5 shadow-sm flex items-center justify-center overflow-hidden transition-all duration-300 group-active:scale-95">
                  <img
                    src={cat.bgImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.9] opacity-20 blur-[0.5px]"
                  />
                  <div className="relative z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm border border-[#0a192f]/5">
                    {cat.icon}
                  </div>
                </div>
                <span className="text-[9px] font-bold tracking-wider text-slate-500 mt-2.5 uppercase font-sans transition-colors group-active:text-[#b89047]">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
