/* eslint-disable no-unused-vars */
// src/components/Footer.jsx
import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-foreground py-10 border-t border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="text-2xl tracking-tight flex items-center">
              <span className="text-white font-bold font-sans tracking-widest uppercase">BIOHACKER'S</span>
              <span className="text-primary font-sans font-light ml-1.5 tracking-wider uppercase">FUEL</span>
            </div>
            <p className="text-stone-300 text-xs leading-relaxed font-medium max-w-xs">
              Futuristic longevity and cellular optimization stacks. Premium, lab-tested formulations for upgrading human performance.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-background hover:border-primary transition-all duration-350 cursor-pointer">
                <FaInstagram size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-background hover:border-primary transition-all duration-350 cursor-pointer">
                <FaFacebookF size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-background hover:border-primary transition-all duration-350 cursor-pointer">
                <FaTwitter size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-background hover:border-primary transition-all duration-350 cursor-pointer">
                <FaYoutube size={15} />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-sans text-xs font-bold text-primary mb-6 uppercase tracking-wider">Shop Stacks</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
              <li><a href="/shop" className="text-stone-300 hover:text-primary transition-all no-underline">All Stacks</a></li>
              <li><a href="/shop?category=NMN" className="text-stone-300 hover:text-primary transition-all no-underline">NMN & NAD+</a></li>
              <li><a href="/shop?category=Liposomal" className="text-stone-300 hover:text-primary transition-all no-underline">Liposomal Range</a></li>
              <li><a href="/shop?category=Performance" className="text-stone-300 hover:text-primary transition-all no-underline">Performance stack</a></li>
            </ul>
          </div>

          {/* Support & Resources Column */}
          <div>
            <h4 className="font-sans text-xs font-bold text-primary mb-6 uppercase tracking-wider">Longevity Center</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
              <li><a href="/science" className="text-stone-300 hover:text-primary transition-all no-underline">Science Hub</a></li>
              <li><a href="/longevity-programs" className="text-stone-300 hover:text-primary transition-all no-underline">Longevity Programs</a></li>
              <li><a href="/quiz" className="text-stone-300 hover:text-primary transition-all no-underline">Biohacking Quiz</a></li>
              <li><a href="/doctor/join" className="text-stone-300 hover:text-primary transition-all no-underline">Partner Clinics</a></li>
              <li><a href="/contact" className="text-stone-300 hover:text-primary transition-all no-underline">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-6">
            <div>
              <h4 className="font-sans text-xs font-bold text-primary mb-3 uppercase tracking-wider">Upgrade Protocol</h4>
              <p className="text-stone-300 text-xs leading-relaxed font-medium">Subscribe for early access to advanced molecular formulas, clinical trials, and biohacking articles.</p>
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full bg-secondary border border-border p-3.5 rounded-xl outline-none focus:border-primary transition-all text-white text-xs placeholder:text-gray-500 font-bold"
              />
              <button className="w-full bg-primary hover:opacity-90 text-background py-3.5 rounded-xl font-bold uppercase tracking-wider text-[10px] shadow-lg transition-all active:scale-95 cursor-pointer">
                Initialize Protocol
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8 text-stone-400 font-bold text-[10px] tracking-widest uppercase">
          <p>
            &copy; 2026 BIOHACKER'S FUEL. ALL RIGHTS RESERVED.
          </p>
          <p>
            Developed by <a href="https://hrntechsolutions.com/" className='text-primary hover:text-white transition-all duration-300 cursor-pointer no-underline'>HRN TECH SOLUTIONS</a>
          </p>
          <div className="flex gap-6 opacity-60 items-center hover:opacity-100 transition-all duration-300 cursor-pointer ">
            <img src="https://cdn.brandfetch.io/idhem73aId/theme/light/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1679062244003" alt="Visa" className="h-5 hover:grayscale-0 transition-all" />
            <img src="https://cdn.brandfetch.io/idFw8DodCr/theme/dark/symbol.svg?c=1bxid64Mup7aczewSAYMX&t=1721117489739" alt="Mastercard" className="h-5 hover:grayscale-0 transition-all" />
            <img src="https://cdn.brandfetch.io/id-Wd4a4TS/theme/dark/id31tBizMM.svg?c=1bxid64Mup7aczewSAYMX&t=1727787879793" alt="PayPal" className="h-4 hover:grayscale-0 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;