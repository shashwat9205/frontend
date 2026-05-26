// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import BrandGateway from '../components/BrandGateway';
import ProductList from '../components/ProductList';
import BrandTeaser from '../components/BrandTeaser';
import CategoryShowcase from '../components/CategoryShowcase';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaBolt, FaHeart, FaTruck, FaInstagram, FaQuoteLeft } from 'react-icons/fa';
import CylinderCarousel from '@/components/CylinderCarousel';

const Home = () => {
  const [brand2Status, setBrand2Status] = useState('coming_soon');
  const [activeBrand, setActiveBrand] = useState(localStorage.getItem('activeBrand') || 'Brand 1');
  const [activeFaq, setActiveFaq] = useState(null);
  const featuredRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost/E-commerce/backendDR/api/settings.php')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setBrand2Status(data.brand2_status);
        }
      })
      .catch(err => console.error('Error fetching settings:', err));
  }, []);

  const handleBrandChange = (brand) => {
    setActiveBrand(brand);
    localStorage.setItem('activeBrand', brand);
    if (brand === 'Brand 1' || (brand === 'Brand 2' && brand2Status === 'live')) {
      setTimeout(() => {
        featuredRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] } }
  };

  return (
    <div className="bg-[#faf9f6] min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#0d160e]">
        <Hero />
      </div>

      {/* Brand Selector Gateway */}
      <div className="bg-[#faf9f6]">
        <BrandGateway
          activeBrand={activeBrand}
          onBrandChange={handleBrandChange}
          brand2Status={brand2Status}
        />
      </div>

      {activeBrand === 'Brand 2' && brand2Status === 'coming_soon' ? (
        <BrandTeaser />
      ) : (
        <>
          {/* Featured Inventory Section */}
          <motion.section 
            ref={featuredRef} 
            id="featured" 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            variants={revealVariants}
            className="py-12 md:py-16 bg-white border-y border-primary/5 shadow-xs"
          >
            <div className="container mx-auto px-6 max-w-7xl">
              <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8">
                <div className="flex flex-col items-center md:items-start space-y-3 text-center md:text-left">
                  <h4 className="text-accent-gold font-bold uppercase tracking-wider text-[10px] font-sans">
                    Fresh Drop
                  </h4>
                  <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1e2925] font-serif leading-none">
                    Recent Additions
                  </h2>
                </div>
                <a href="/shop" className="text-xs font-bold uppercase tracking-wider text-primary border-b border-accent-gold pb-1.5 hover:text-accent-gold transition-colors no-underline">
                  View All Products →
                </a>
              </div>

              <ProductList limit={4} />
            </div>
          </motion.section>

          {/* Category Showcase Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            variants={revealVariants}
          >
            <CategoryShowcase />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            variants={revealVariants}
          >
            <CylinderCarousel />
          </motion.div>

          {/* Benefits Section */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            variants={revealVariants}
            className="bg-[#faf9f6] py-12 md:py-16 border-b border-primary/5"
          >
            <div className="container mx-auto px-6 max-w-7xl">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
                {[
                  { icon: <FaShieldAlt className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Cleanest Lab Tested", desc: "No fillers, no heavy metals. Purely science-backed performance." },
                  { icon: <FaBolt className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Bio-Available", desc: "Formulated for 99% absorption rate to fuel your muscles instantly." },
                  { icon: <FaHeart className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Gut Friendly", desc: "Enriched with digestive enzymes for zero bloating, every time." },
                  { icon: <FaTruck className="w-5 h-5 sm:w-6 sm:h-6" />, title: "Free Global Shipping", desc: "Elite nutrition delivered to your doorstep within 3-5 business days." }
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ y: -8 }}
                    className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-primary/5 shadow-xs transition-all duration-500 hover:shadow-[0_20px_50px_rgba(27,67,50,0.04)] flex flex-col gap-3 sm:gap-6"
                  >
                    <div className="w-10 h-10 sm:w-14 sm:h-14 bg-[#f4f3ee] rounded-xl sm:rounded-2xl flex items-center justify-center text-primary transition-all duration-500 shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex flex-col gap-1 sm:gap-2">
                      <h3 className="text-xs sm:text-base font-semibold text-[#1e2925] font-serif leading-tight">{item.title}</h3>
                      <p className="text-stone-400 text-[10px] sm:text-[13px] leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Promotional Banner / Newsletter */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            variants={revealVariants}
            className="py-12 md:py-16 bg-gradient-to-br from-[#102517] via-[#0c1810] to-[#060b07] text-white overflow-hidden relative border-y border-accent-gold/10"
          >
            <div className="absolute inset-0 opacity-15">
              <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Newsletter Background" />
            </div>
            <div className="container mx-auto px-6 relative z-10 text-center space-y-6">
              <h4 className="text-accent-gold font-bold uppercase tracking-wider text-[10px] font-sans">Exclusive Access</h4>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight font-serif italic text-white leading-none my-3">Join the Elite Club</h2>
              <p className="max-w-xl mx-auto text-stone-300 text-sm font-light leading-relaxed">
                Subscribe to receive early access to new premium drops, limited restocks, and expert performance nutrition tips.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4 max-w-md mx-auto">
                <input type="email" placeholder="ENTER YOUR EMAIL ADDRESS" className="bg-white/10 backdrop-blur-md border border-white/10 px-6 py-3.5 rounded-full text-xs font-semibold outline-none focus:border-accent-gold transition-all w-full sm:flex-1 placeholder:text-stone-500" />
                <button className="bg-accent-gold hover:bg-accent-gold/90 text-stone-900 px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all shadow-md active:scale-95 cursor-pointer">Subscribe</button>
              </div>
            </div>
          </motion.section>

          {/* Testimonial Section */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            variants={revealVariants}
            className="py-12 md:py-16 bg-white"
          >
            <div className="container mx-auto px-6 max-w-5xl text-center">
              <FaQuoteLeft className="text-[#f4f3ee] w-20 h-20 mx-auto mb-8" />
              <div className="space-y-8">
                <p className="text-xl md:text-3xl font-medium italic tracking-normal leading-relaxed text-stone-700 font-serif max-w-3xl mx-auto">
                  "Finally, a plant protein that doesn't taste like sand. The recovery speed I've seen with PurePlant is honestly revolutionary."
                </p>
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent-gold font-sans">Alex Rivera</span>
                  <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider font-sans">Professional CrossFit Athlete</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            variants={revealVariants}
            className="py-12 md:py-16 bg-[#faf9f6] border-t border-primary/5"
          >
            <div className="container mx-auto px-6 max-w-3xl">
              <div className="text-center mb-16">
                <h4 className="text-accent-gold font-bold uppercase tracking-wider text-[10px] mb-3 font-sans">Support</h4>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1e2925] font-serif leading-none">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-4">
                {[
                  { q: "What makes your protein different from others?", a: "Our formula is 100% plant-based, lab-tested for purity, and includes digestive enzymes for maximum absorption without bloating. No artificial fillers." },
                  { q: "How long does shipping take?", a: "We offer free global shipping on all orders. Standard delivery takes 3-5 business days within the US, and 7-10 business days internationally." },
                  { q: "Are your products safe for athletes?", a: "Yes. All our products are third-party tested and certified free of banned substances, making them completely safe for professional athletes." },
                  { q: "What is your return policy?", a: "We stand by our products with a 30-day money-back guarantee. If you're not satisfied, simply contact support to initiate a return." }
                ].map((faq, index) => (
                  <div key={index} className="bg-white rounded-[1.5rem] border border-primary/5 shadow-xs overflow-hidden transition-all duration-300">
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
                    >
                      <span className="font-semibold text-stone-850 text-sm font-sans">{faq.q}</span>
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${activeFaq === index ? 'bg-primary text-white rotate-180' : 'bg-[#f4f3ee] text-stone-400'}`}>
                        <i className="fa-solid fa-chevron-down text-[8px]"></i>
                      </span>
                    </button>
                    <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="text-stone-400 text-[13px] leading-relaxed font-light font-sans">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Instagram Feed Section */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20px" }}
            variants={revealVariants}
            className="bg-white py-12 md:py-16"
          >
            <div className="container mx-auto px-6 max-w-7xl">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#1e2925] font-sans">@PUREPLANT_OFFICIAL</h3>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary cursor-pointer hover:text-accent-gold transition-colors font-sans">
                  <FaInstagram size={14} /> Follow Us
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
                  "https://images.unsplash.com/photo-1549476464-37392f717541",
                  "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
                  "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5"
                ].map((img, i) => (
                  <div key={i} className="aspect-square rounded-[2rem] overflow-hidden group relative border border-primary/5 shadow-xs">
                    <img src={`${img}?auto=format&fit=crop&q=80&w=600`} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" alt="Instagram" />
                    <div className="absolute inset-0 bg-[#0f1b11]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <FaInstagram className="text-white text-xl" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        </>
      )}
    </div>
  );
};

export default Home;