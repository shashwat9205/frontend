import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  return (
    <div className="relative w-full h-[380px] md:h-[520px] overflow-hidden bg-black select-none promo-swiper-container">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom",
          bulletClass: "swiper-pagination-bullet-custom",
          bulletActiveClass: "swiper-pagination-bullet-active-custom",
        }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full flex items-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 w-full h-full flex items-center">
              <div className="max-w-xl text-left space-y-4 md:space-y-6">

                {/* Badge */}
                <div className={`inline-block px-3.5 py-1 rounded-full border text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-black/40 backdrop-blur-md ${slide.accent}`}>
                  {slide.badge}
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white font-serif leading-[1.1] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
                  {slide.title}
                </h2>

                {/* Subtitle */}
                <p className="text-stone-300 text-xs md:text-base font-light leading-relaxed max-w-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                  {slide.subtitle}
                </p>

                {/* CTA */}
                <div className="pt-2 md:pt-4">
                  <a
                    href={slide.ctaLink}
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white hover:bg-accent-gold text-black font-black uppercase tracking-wider text-[9px] md:text-[10px] shadow-2xl transition-all duration-300 hover:shadow-accent-gold/25 cursor-pointer no-underline"
                  >
                    {slide.ctaText}
                    <FaArrowRight className="text-[10px]" />
                  </a>
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Controls */}
      <button className="swiper-button-prev-custom absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-accent-gold hover:text-black border border-white/10 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 cursor-pointer shadow-lg active:scale-95">
        <FaChevronLeft className="text-xs md:text-sm" />
      </button>
      <button className="swiper-button-next-custom absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-accent-gold hover:text-black border border-white/10 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 cursor-pointer shadow-lg active:scale-95">
        <FaChevronRight className="text-xs md:text-sm" />
      </button>

      {/* Pagination Controls */}
      <div className="swiper-pagination-custom absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5"></div>

      {/* Custom Styles for Swiper Pagination */}
      <style>{`
        .swiper-pagination-bullet-custom {
          display: inline-block;
          height: 6px;
          width: 8px;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.4);
          transition: all 0.5s ease;
          cursor: pointer;
        }
        .swiper-pagination-bullet-active-custom {
          width: 28px !important;
          background-color: #c3a46d !important;
        }
        .swiper-pagination-bullet-custom:hover {
          background-color: rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </div>
  );
}