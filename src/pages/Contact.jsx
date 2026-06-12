// src/pages/Contact.jsx
import { div } from 'framer-motion/client';
import React from 'react';

const Contact = () => {
  return (
    
    <div className="  px-30  py-22 bg-[#FAF9F6] text-background ">
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-10">
          <div>
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-[12px] mb-4 block">Connect</span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase ">Get in Touch</h1>
          </div>
          <p className="text-sm sm:text-base text-black font-medium max-w-md leading-relaxed">
            Have questions about our clinical protocols, molecular stacks, or your subscription stack? Our diagnostic assistance team is available.
          </p>
          <div className="space-y-6">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-widest text-primary  mb-2">Protocol Email Support</p>
              <p className="text-xl font-bold uppercase font-sans">support@biohackersfuel.com</p>
            </div>
            <div>
              <p className="text-[12px] font-bold uppercase tracking-widest text-primary  mb-2">Advisory Hotline</p>
              <p className="text-xl font-bold  uppercase font-sans">+91 98765 43210</p>
            </div>
          </div>
        </div>
        <div className="bg-[#111D30] border border-border p-10 rounded-[2.5rem] space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input type="text" placeholder="FIRST NAME" className="w-full bg-secondary-foreground border border-border p-4 rounded-xl outline-none font-bold text-xs tracking-wider placeholder:text-stone-500 focus:border-primary text-black transition-all" />
            <input type="text" placeholder="LAST NAME" className="w-full bg-secondary-foreground border border-border p-4 rounded-xl outline-none font-bold text-xs tracking-wider placeholder:text-stone-500 focus:border-primary text-black transition-all" />
          </div>
          <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-secondary-foreground border border-border p-4 rounded-xl outline-none font-bold text-xs tracking-wider placeholder:text-stone-500 focus:border-primary text-black transition-all" />
          <textarea placeholder="HOW CAN WE HELP YOU OPTIMIZE?" className="w-full bg-secondary-foreground border border-border p-4 rounded-xl outline-none font-bold text-xs tracking-wider placeholder:text-stone-500 focus:border-primary text-black transition-all h-32"></textarea>
          <button className="w-full bg-primary hover:opacity-90 text-background py-5 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg transition-all active:scale-95 cursor-pointer">
            Transmit Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
