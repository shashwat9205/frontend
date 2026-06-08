// src/pages/LongevityPrograms.jsx
import React, { useState } from 'react';
import { Shield, Sparkles, Check, CheckCircle2, User, Clock, ArrowRight, Dna } from 'lucide-react';
import { motion } from 'framer-motion';

const LongevityPrograms = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'annual'

  const revealVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const programs = [
    {
      name: "Cellular Reset Protocol",
      priceMonthly: 3999,
      priceAnnual: 3499,
      tier: "Starter",
      tagline: "NAD+ baseline restoration",
      desc: "Perfect for individuals looking to neutralize early aging fatigue, optimize sleep cycles, and restore cellular energy markers.",
      features: [
        "Liposomal NMN (150mg/day active)",
        "Trans-Resveratrol synergistic activator",
        "Cellular energy tracking guide",
        "Quarterly biological assessment support",
        "Standard email consultations"
      ],
      cta: "Initialize Starter Plan",
      popular: false
    },
    {
      name: "Protocol X",
      priceMonthly: 7999,
      priceAnnual: 6999,
      tier: "Elite Optimization",
      tagline: "Hallmarks of aging target",
      desc: "Our signature protocol engineered for active professionals and athletes seeking complete metabolic and cellular rejuvenation.",
      features: [
        "High-dose Liposomal NMN (300mg/day active)",
        "Trans-Resveratrol + Pterostilbene matrix",
        "Liposomal L-Glutathione (antioxidant shield)",
        "Bi-monthly biomarker tracking panel",
        "Priority specialist physician consults",
        "Companion mobile app tracking access"
      ],
      cta: "Initialize Protocol X",
      popular: true
    },
    {
      name: "Epigenetic Reversal Plan",
      priceMonthly: 14999,
      priceAnnual: 12999,
      tier: "Clinical Grade",
      tagline: "Custom chronological age reversal",
      desc: "A fully personalized, clinic-backed program integrating diagnostic bloodwork analysis with cellular reprogramming stacks.",
      features: [
        "Custom compounding (NMN + CoQ10 + Senolytics)",
        "Full panel biological methylation testing",
        "1-on-1 monthly longevity board consultations",
        "Specialist doctor dashboard management",
        "DNA repair & epigenetic aging reports",
        "24/7 concierge clinical channel access"
      ],
      cta: "Consult Longevity Board",
      popular: false
    }
  ];

  return (
    <div className="bg-background text-foreground min-h-screen py-10">
      
      {/* Title Header */}
      <section className="relative py-20 px-6 overflow-hidden border-b border-border bg-card/25">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-primary font-bold uppercase tracking-widest text-[9px] flex items-center justify-center gap-2">
            <Dna size={12} /> PROTOCOL PROTOCOL
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase leading-tight">
            Epigenetic Programs & Protocols
          </h1>
          <p className="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed font-medium">
            Physician-supervised protocols designed to turn back your biological age. Subscribe to receive clinical-grade molecular formulas and biomarker monitoring.
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center pt-8">
            <div className="bg-secondary border border-border p-1 rounded-full flex gap-1">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${billingCycle === 'monthly' ? 'bg-primary text-background shadow-md' : 'text-stone-400 hover:text-white'}`}
              >
                Monthly Protocol
              </button>
              <button 
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${billingCycle === 'annual' ? 'bg-primary text-background shadow-md' : 'text-stone-400 hover:text-white'}`}
              >
                Annual Protocol (-15%)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Program Pricing Cards */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={revealVariants}
        className="py-16 px-6 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {programs.map((prog, idx) => {
            const price = billingCycle === 'monthly' ? prog.priceMonthly : prog.priceAnnual;
            return (
              <div 
                key={idx}
                className={`relative bg-card border rounded-[2.5rem] p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2
                  ${prog.popular ? 'border-primary/50 shadow-[0_20px_50px_rgba(197,160,89,0.06)]' : 'border-border'}`}
              >
                {prog.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-background text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
                    MOST RECOMMENDED PROTOCOL
                  </span>
                )}

                <div className="space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{prog.tier}</span>
                    <h3 className="text-2xl font-bold text-white uppercase tracking-wider">{prog.name}</h3>
                    <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">{prog.tagline}</p>
                  </div>

                  <div className="flex items-baseline gap-1 py-4 border-y border-border">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white">₹{price.toLocaleString('en-IN')}</span>
                    <span className="text-stone-400 text-xs font-bold uppercase">/ MONTH</span>
                  </div>

                  <p className="text-xs text-stone-400 leading-relaxed font-medium">
                    {prog.desc}
                  </p>

                  <ul className="space-y-3.5 pt-4">
                    {prog.features.map((feat, fidx) => (
                      <li key={fidx} className="flex gap-3 items-start">
                        <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                        <span className="text-xs text-stone-300 font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <a 
                    href="/checkout"
                    className={`w-full text-center py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all inline-block no-underline duration-300 cursor-pointer
                      ${prog.popular 
                        ? 'bg-primary text-background hover:bg-white hover:text-black shadow-lg shadow-primary/10' 
                        : 'bg-secondary hover:bg-primary hover:text-background text-foreground border border-border'}`}
                  >
                    {prog.cta}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Feature Comparison Table */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={revealVariants}
        className="py-16 px-6 bg-card/45 border-y border-border"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            <span className="text-primary font-bold uppercase tracking-widest text-[9px]">PROTOCOL PARAMETERS</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase">Feature Matrix</h2>
            <p className="text-xs sm:text-sm text-stone-400 font-medium">Compare the parameters of our three longevity subscription programs.</p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-border bg-background">
            <table className="w-full border-collapse text-left text-xs font-medium text-stone-300">
              <thead>
                <tr className="border-b border-border bg-secondary font-bold uppercase tracking-widest text-white text-[10px]">
                  <th className="p-6">Program Metrics</th>
                  <th className="p-6 text-center">Reset Plan</th>
                  <th className="p-6 text-center">Protocol X</th>
                  <th className="p-6 text-center">Epigenetic Reversal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-bold text-center tracking-wider uppercase text-[10px]">
                <tr>
                  <td className="p-6 text-left text-white font-sans text-xs">Daily NMN Precursor</td>
                  <td className="p-6">150mg Liposomal</td>
                  <td className="p-6 text-primary">300mg Liposomal</td>
                  <td className="p-6">Custom Compounded</td>
                </tr>
                <tr>
                  <td className="p-6 text-left text-white font-sans text-xs">Resveratrol Activator</td>
                  <td className="p-6">Included</td>
                  <td className="p-6">Double Dose</td>
                  <td className="p-6">Included</td>
                </tr>
                <tr>
                  <td className="p-6 text-left text-white font-sans text-xs">Biomarker Blood Assays</td>
                  <td className="p-6 text-stone-500">—</td>
                  <td className="p-6">Every 6 Months</td>
                  <td className="p-6 text-primary">Every Month</td>
                </tr>
                <tr>
                  <td className="p-6 text-left text-white font-sans text-xs">Medical Practitioner Support</td>
                  <td className="p-6">Email Support</td>
                  <td className="p-6">Priority Consultation</td>
                  <td className="p-6 text-primary">1-on-1 Concierge Board</td>
                </tr>
                <tr>
                  <td className="p-6 text-left text-white font-sans text-xs">Epigenetic Age Assessment</td>
                  <td className="p-6 text-stone-500">—</td>
                  <td className="p-6">Annual Report</td>
                  <td className="p-6 text-primary">Bi-Annual DNA Test</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      {/* Specialty Consultation Board Callout */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={revealVariants}
        className="py-16 px-6 max-w-5xl mx-auto"
      >
        <div className="bg-card border border-border rounded-[2.5rem] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <span className="text-primary font-bold uppercase tracking-widest text-[9px] flex items-center justify-center md:justify-start gap-2">
              <User size={12} /> SPECIALIST COORDINATORS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight leading-snug">
              Unsure which protocol fits your biological baseline?
            </h3>
            <p className="text-stone-300 text-xs leading-relaxed font-medium">
              Schedule a 15-minute diagnostic screening call with one of our cellular longevity coordinators. We'll evaluate your health markers and direct you.
            </p>
          </div>
          <div className="shrink-0">
            <a href="/contact" className="group flex items-center gap-2 bg-primary hover:opacity-90 text-background px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-[10px] transition-all no-underline shadow-lg cursor-pointer">
              Book Coordinator Screening <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </motion.section>

    </div>
  );
};

export default LongevityPrograms;
