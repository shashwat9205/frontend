// src/pages/About.jsx
import React from 'react';
import { Shield, BookOpen, Clock, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const revealVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      
      {/* Intro block */}
      <section className="container mx-auto px-6 max-w-4xl py-20 text-center space-y-6">
        <span className="text-primary font-bold uppercase tracking-[0.2em] text-[9px] block">THE BIOHACKER'S PROTOCOL</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase text-white leading-tight">
          Engineered for Human Lifespan Extension
        </h1>
        <p className="text-sm sm:text-base text-stone-300 font-medium max-w-2xl mx-auto leading-relaxed">
          Biohacker's Fuel was founded to address cellular decay at the root. We do not design consumer supplements; we engineer advanced molecular precursors and delivery vehicles to support cellular integrity and physical stamina.
        </p>
      </section>

      {/* Visual Break Image */}
      <div className="h-[400px] w-full overflow-hidden border-y border-border relative">
        <img
          src="https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=1200"
          alt="Biohacking Clinic Lab"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background"></div>
      </div>

      {/* Core values cards */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={revealVariants}
        className="container mx-auto px-6 max-w-7xl py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Shield className="text-primary w-6 h-6" />,
              title: "Clinical Potency Standards",
              desc: "Every formulation is batch-synthesized inside ISO-certified facilities, undergoing high-performance liquid chromatography (HPLC) testing to guarantee molecule purity."
            },
            {
              icon: <Cpu className="text-primary w-6 h-6" />,
              title: "Liposomal Encapsulation",
              desc: "By wrapping fragile precursors in double-layer lipid membranes, we bypass standard digestive breakdown, enabling maximum cellular penetration metrics."
            },
            {
              icon: <Clock className="text-primary w-6 h-6" />,
              title: "Lifespan & Healthspan Focus",
              desc: "We focus on extending cellular survival capacity, slowing chronological aging metrics, and maximizing active energy years."
            }
          ].map((val, idx) => (
            <div key={idx} className="bg-card border border-border p-8 rounded-3xl space-y-4">
              <div className="w-12 h-12 bg-secondary border border-border rounded-xl flex items-center justify-center">
                {val.icon}
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">{val.title}</h3>
              <p className="text-xs text-stone-400 leading-relaxed font-medium">{val.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

    </div>
  );
};

export default About;
