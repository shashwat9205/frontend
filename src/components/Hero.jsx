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
    fetch('http://localhost/E-commerce/backendDR/api/hero.php')
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
    fetch('http://localhost/E-commerce/backendDR/api/categories.php')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setCategories(data.data);
        }
      })
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  const displayData = heroData || {
    title: "Pure Plant Performance",
    subtitle: "The world's cleanest plant-based protein for peak performance.",
    btn_text: "Shop Now",
    btn_link: "/shop"
  };

  // Map dynamic categories for mobile category navigation
  const mobileCatList = [
    {
      name: 'All Products',
      path: '/shop',
      icon: <LayoutGrid size={16} className="text-primary" />,
      bgImage: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=150'
    },
    ...categories.map(cat => {
      // Map dynamic icons based on keywords
      let icon = <Layers size={16} className="text-primary" />;
      const name = cat.name.toLowerCase();
      
      if (name.includes('protein')) {
        icon = <Layers size={16} className="text-primary" />;
      } else if (name.includes('recovery') || name.includes('reco')) {
        icon = <RefreshCw size={16} className="text-primary" />;
      } else if (name.includes('pre') || name.includes('energ') || name.includes('perform')) {
        icon = <Zap size={16} className="text-primary" />;
      } else if (name.includes('wellness') || name.includes('health') || name.includes('women')) {
        icon = <Flame size={16} className="text-primary" />;
      }

      const bgImage = cat.image_url 
        ? `http://localhost/E-commerce/backendDR/admin/${cat.image_url}`
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
      <section className="hidden md:flex relative h-[calc(100vh-120px)] w-full items-center justify-center overflow-hidden bg-[#0d160e] text-center">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          {heroData?.video ? (
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-50">
              <source src={heroData.video} type="video/mp4" />
            </video>
          ) : heroData?.image ? (
            <img src={heroData.image} alt="" className="w-full h-full object-cover opacity-50" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0c1c11] via-[#09100a] to-[#050505] opacity-95"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d160e] via-transparent to-black/35"></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 container mx-auto px-6 max-w-7xl flex flex-col items-center -mt-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.15] text-white mb-8 font-serif max-w-4xl mx-auto px-4 drop-shadow-md">
            {displayData.title}
          </h1>
          <p className="text-sm sm:text-base mb-12 text-stone-200/95 font-medium max-w-xl mx-auto leading-relaxed px-4 font-sans tracking-wide">
            {displayData.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-10 sm:px-0 justify-center">
            <a href="/shop" className="bg-accent-gold hover:bg-accent-gold/95 hover:shadow-accent-gold/25 text-[#0f1b11] px-10 py-4 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all shadow-xl hover:-translate-y-1 inline-block no-underline duration-300">
              {displayData.btn_text}
            </a>
            <a href="/about" className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/15 px-10 py-4 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all shadow-xl hover:-translate-y-1 inline-block no-underline duration-300">
              Learn More
            </a>
          </div>
        </div>

        {/* Scrolling Mouse Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-60">
          <span className="text-[8px] font-bold tracking-widest text-stone-300 uppercase font-sans">Scroll</span>
          <div className="w-4.5 h-8 border border-stone-400 rounded-full flex justify-center p-1">
            <div className="w-1 h-1.5 bg-accent-gold rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* 2. PREMIUM COMPACT HERO & DYNAMIC CIRCULAR CATEGORIES (MOBILE VIEW) */}
      <div className="block md:hidden bg-[#faf9f6] px-5 pt-4 pb-4">
        
        {/* Compact Banner slider block */}
        <div className="relative w-full bg-[#0d160e] bg-gradient-to-br from-[#0c1c11] via-[#09100a] to-[#040604] rounded-3xl p-5 overflow-hidden flex items-center min-h-[160px] shadow-md border border-primary/5">
          {/* Background overlay details */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
          
          {/* Left Text details */}
          <div className="relative z-10 flex-1 flex flex-col justify-center pr-24">
            <span className="text-accent-gold font-bold uppercase tracking-wider text-[7px] mb-1 font-sans">
              PURE PLANT PERFORMANCE
            </span>
            <h2 className="text-white text-base font-bold font-serif leading-tight mb-1.5">
              Build It Right From Day One
            </h2>
            <p className="text-stone-300 text-[9px] leading-normal font-sans font-medium">
              Elite organic recovery formulas to fuel your gains and optimize recovery.
            </p>
            <Link 
              to="/shop" 
              className="mt-3.5 bg-accent-gold text-stone-950 px-5 py-2.5 rounded-full font-extrabold uppercase tracking-widest text-[9px] inline-block no-underline shadow-md active:scale-95 transition-all self-start border border-accent-gold/25 hover:brightness-105"
            >
              Shop Now
            </Link>
          </div>

          {/* Right Floating FLAGSHIP Image Spotlight Circle */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white/95 shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-stone-100 flex items-center justify-center p-2 z-10 pointer-events-none select-none">
            <img 
              src="https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=300" 
              alt="Flagship supplement" 
              className="w-[85%] h-[85%] object-contain mix-blend-multiply"
            />
          </div>
        </div>

        {/* Circular Categories Navigation */}
        <div className="mt-6">
          <h3 className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-stone-400 font-sans mb-3.5">
            Shop By Category
          </h3>
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-1">
            {mobileCatList.map((cat, index) => (
              <Link 
                key={index} 
                to={cat.path} 
                className="flex flex-col items-center shrink-0 no-underline group"
              >
                <div className="relative w-14 h-14 rounded-full bg-white border border-stone-100/80 shadow-xs flex items-center justify-center overflow-hidden transition-all duration-300 group-active:scale-95 group-hover:border-primary/20">
                  {/* Category Background Blurred Crop */}
                  <img 
                    src={cat.bgImage} 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.9] opacity-40 blur-[0.5px]" 
                  />
                  {/* Category icon */}
                  <div className="relative z-10 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center shadow-xs">
                    {cat.icon}
                  </div>
                </div>
                <span className="text-[9px] font-bold tracking-wider text-stone-500 mt-2 uppercase font-sans transition-colors group-active:text-primary">
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
