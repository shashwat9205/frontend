// src/pages/Contact.jsx
import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto px-6 max-w-6xl py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-10">
          <div>
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Connect</span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight uppercase">Get in Touch</h1>
          </div>
          <p className="text-lg text-gray-400 font-light max-w-md leading-relaxed">
            Have questions about our products or your order? Our team of nutrition experts is ready to help you reach your goals.
          </p>
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Email Us</p>
              <p className="text-xl font-bold">support@pureplant.com</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Call Us</p>
              <p className="text-xl font-bold">+91 98765 43210</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-10 rounded-3xl space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input type="text" placeholder="First Name" className="w-full bg-white p-4 rounded-xl outline-none font-semibold text-sm border border-transparent focus:border-primary transition-all" />
            <input type="text" placeholder="Last Name" className="w-full bg-white p-4 rounded-xl outline-none font-semibold text-sm border border-transparent focus:border-primary transition-all" />
          </div>
          <input type="email" placeholder="Email Address" className="w-full bg-white p-4 rounded-xl outline-none font-semibold text-sm border border-transparent focus:border-primary transition-all" />
          <textarea placeholder="How can we help?" className="w-full bg-white p-4 rounded-xl outline-none font-semibold text-sm border border-transparent focus:border-primary transition-all h-32"></textarea>
          <button className="w-full bg-primary hover:bg-primary-dark text-white py-5 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg transition-all transform hover:-translate-y-1">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
