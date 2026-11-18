// eslint-disable-next-line no-unused-vars
import React from "react";
import app from "../../public/app.png";

const AppDownloadSection = () => {
  return (
    <section className="w-full bg-[#071324] text-white py-14 sm:py-20 px-4 sm:px-6 border-t border-white/10 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-80 h-80 bg-[#b89047]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#0a192f] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 relative z-10">
        {/* App Mockup Image - Shown on both mobile and desktop with luxury frame */}
        <div className="flex justify-center w-full lg:w-1/2 order-2 lg:order-1">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#b89047]/20 to-[#0a192f]/40 rounded-[2.5rem] blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
            <img
              src={app}
              alt="Biohackerz Mobile App"
              className="
                relative
                w-[190px]
                sm:w-[240px]
                md:w-[260px]
                lg:w-[320px]
                h-auto
                rounded-3xl
                shadow-2xl
                border
                border-white/15
                group-hover:scale-102
                transition-transform
                duration-500
              "
            />
          </div>
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b89047]/10 border border-[#b89047]/25 text-[#b89047] font-bold uppercase tracking-[0.22em] text-[9px] sm:text-[10px] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b89047] animate-pulse"></span>
            Biohackerz Mobile Companion
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl text-white font-serif font-extrabold uppercase tracking-tight leading-tight mb-4">
            Optimize Your Biology <br className="hidden sm:block" />
            <span className="text-[#b89047]">Everywhere You Go</span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 font-sans font-medium">
            Track daily circadian protocols, log cellular biomarkers, consult your Biohackerz AI wellness guide, and reorder clinical longevity stacks with single-tap express delivery.
          </p>

          {/* App Store Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0">
            {/* Google Play */}
            <a
              href="/shop"
              className="w-full sm:w-auto no-underline"
            >
              <button className="flex items-center justify-center gap-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-[#b89047]/60 px-5 sm:px-6 py-3.5 rounded-2xl transition duration-300 w-full sm:w-auto cursor-pointer shadow-md">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                  alt="Play Store"
                  className="w-6 h-6 shrink-0"
                />
                <div className="text-left">
                  <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">GET IT ON</p>
                  <h3 className="font-bold text-xs sm:text-sm font-sans tracking-wide">Google Play</h3>
                </div>
              </button>
            </a>

            {/* App Store */}
            <a
              href="/shop"
              className="w-full sm:w-auto no-underline"
            >
              <button className="flex items-center justify-center gap-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-[#b89047]/60 px-5 sm:px-6 py-3.5 rounded-2xl transition duration-300 w-full sm:w-auto cursor-pointer shadow-md">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/831/831276.png"
                  alt="App Store"
                  className="w-6 h-6 filter invert shrink-0"
                />
                <div className="text-left">
                  <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">DOWNLOAD ON THE</p>
                  <h3 className="font-bold text-xs sm:text-sm font-sans tracking-wide">App Store</h3>
                </div>
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;
