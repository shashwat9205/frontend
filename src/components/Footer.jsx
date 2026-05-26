// src/components/Footer.jsx
import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0f1b11] text-stone-200 py-20 border-t border-primary-dark/25">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="text-3xl tracking-tight flex items-center">
              <span className="text-white font-bold font-sans tracking-wide">PURE</span>
              <span className="text-accent-gold font-serif italic font-light ml-1">PLANT</span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed font-light max-w-xs">
              World's cleanest, scientifically backed plant-based performance nutrition. Pure ingredients for elite minds and bodies.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-full border border-emerald-900/30 flex items-center justify-center hover:bg-accent-gold hover:text-stone-900 hover:border-accent-gold transition-all duration-350 cursor-pointer">
                <FaInstagram size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-emerald-900/30 flex items-center justify-center hover:bg-accent-gold hover:text-stone-900 hover:border-accent-gold transition-all duration-350 cursor-pointer">
                <FaFacebookF size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-emerald-900/30 flex items-center justify-center hover:bg-accent-gold hover:text-stone-900 hover:border-accent-gold transition-all duration-350 cursor-pointer">
                <FaTwitter size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-emerald-900/30 flex items-center justify-center hover:bg-accent-gold hover:text-stone-900 hover:border-accent-gold transition-all duration-350 cursor-pointer">
                <FaYoutube size={15} />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-serif text-lg font-medium text-accent-gold mb-6 italic">Shop Collection</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="/shop" className="text-stone-400 hover:text-white transition-all no-underline">All Proteins</a></li>
              <li><a href="/shop" className="text-stone-400 hover:text-white transition-all no-underline">Vegan Whey</a></li>
              <li><a href="/shop" className="text-stone-400 hover:text-white transition-all no-underline">Superfoods</a></li>
              <li><a href="/shop" className="text-stone-400 hover:text-white transition-all no-underline">Accessories</a></li>
            </ul>
          </div>

          {/* Support & Resources Column */}
          <div>
            <h4 className="font-serif text-lg font-medium text-accent-gold mb-6 italic">Support & Resources</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="/contact" className="text-stone-400 hover:text-white transition-all no-underline">Track Order</a></li>
              <li><a href="/contact" className="text-stone-400 hover:text-white transition-all no-underline">Shipping Info</a></li>
              <li><a href="/faq" className="text-stone-400 hover:text-white transition-all no-underline">Returns</a></li>
              <li><a href="/blog" className="text-stone-400 hover:text-white transition-all no-underline">Performance Blog</a></li>
              <li><a href="/login" className="text-stone-400 hover:text-white transition-all no-underline">Customer Login</a></li>
              <li><a href="/doctor/join" className="text-stone-400 hover:text-white transition-all no-underline">Doctor Partner Program</a></li>
              <li><a href="/contact" className="text-stone-400 hover:text-white transition-all no-underline">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-6">
            <div>
              <h4 className="font-serif text-lg font-medium text-accent-gold mb-3 italic">Stay Informed</h4>
              <p className="text-stone-400 text-xs leading-relaxed font-light">Subscribe for premium drops, early access, and science-backed nutrition tips.</p>
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-[#0a120b] border border-emerald-900/40 p-3.5 rounded-xl outline-none focus:border-accent-gold transition-all text-white text-xs placeholder:text-stone-600 font-medium"
              />
              <button className="w-full bg-accent-gold hover:bg-accent-gold/90 text-[#0f1b11] py-3.5 rounded-xl font-bold uppercase tracking-wider text-[10px] shadow-lg transition-all active:scale-95 cursor-pointer">
                Join Club Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-emerald-900/20 flex flex-col md:flex-row justify-between items-center gap-8 text-stone-500 font-medium text-[10px] tracking-widest uppercase">
          <p>
            &copy; 2026 PURE PLANT PERFORMANCE. ALL RIGHTS RESERVED.
          </p>
          <p>
            Developed by <a href="https://hrntechsolutions.com/" className='text-stone-400 hover:text-accent-gold transition-all duration-300 cursor-pointer no-underline'>HRN TECH SOLUTIONS</a>
          </p>
          <div className="flex gap-6 opacity-60 items-center hover:opacity-100 transition-all duration-300 cursor-pointer ">
            <img src="https://cdn.brandfetch.io/idhem73aId/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1679062244003" alt="Visa" className="h-5 grayscale hover:grayscale-0 transition-all" />
            <img src="https://cdn.brandfetch.io/idFw8DodCr/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1721117489739" alt="Mastercard" className="h-5 grayscale hover:grayscale-0 transition-all" />
            <img src="https://cdn.brandfetch.io/id-Wd4a4TS/theme/dark/id31tBizMM.svg?c=1bxid64Mup7aczewSAYMX&t=1727787879793" alt="PayPal" className="h-4 grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;