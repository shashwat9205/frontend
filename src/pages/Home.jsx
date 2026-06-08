// src/pages/Home.jsx
import React, { useState } from "react";
import Hero from "../components/Hero";
import ProductList from "../components/ProductList";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaQuoteLeft,
  FaShieldAlt,
  FaBolt,
  FaHeart,
  FaTruck
} from "react-icons/fa";
import { Shield, Activity, Sparkles, Brain, ArrowRight, Dna, FileText } from "lucide-react";
import AppDownloadSection from "../components/AppDownloadSection";

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  const categoriesList = [
    {
      title: "NMN & Cellular Energy",
      desc: "Replenish NAD+ levels, repair DNA, and supercharge mitochondrial output.",
      icon: <Dna className="w-6 h-6 text-primary" />,
      link: "/shop?category=NMN",
      bg: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Sleep & Circadian Balance",
      desc: "Maximize deep sleep cycles and accelerate cellular regeneration overnight.",
      icon: <Brain className="w-6 h-6 text-primary" />,
      link: "/shop?category=Sleep",
      bg: "https://images.unsplash.com/photo-1511295742364-92767fa62d9f?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Skin & Anti-Aging",
      desc: "Liposomal collagen promoters and cellular antioxidants for dermal longevity.",
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      link: "/shop?category=Skin",
      bg: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Metabolic Health",
      desc: "Optimize insulin sensitivity, glucose clearance, and lipolysis pathways.",
      icon: <Activity className="w-6 h-6 text-primary" />,
      link: "/shop?category=Metabolic",
      bg: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Brain & Focus",
      desc: "Nootropic formulas designed to upgrade neurotransmission, memory and focus.",
      icon: <Shield className="w-6 h-6 text-primary" />,
      link: "/shop?category=Nootropics",
      bg: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=400"
    },
    {
      title: "Muscle & Recovery",
      desc: "Premium cellular recovery agents to combat exercise-induced inflammation.",
      icon: <Activity className="w-6 h-6 text-primary" />,
      link: "/shop?category=Recovery",
      bg: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden">
      
      {/* Hero Section */}
      <Hero />

      {/* Trust & Science Validation Badges */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={revealVariants}
        className="py-12 bg-secondary/30 border-y border-border"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaShieldAlt className="w-5 h-5 text-primary" />,
                title: "100% Lab Certified",
                desc: "Every single batch is third-party tested for purity and chemical composition."
              },
              {
                icon: <FaBolt className="w-5 h-5 text-primary" />,
                title: "Maximum Bioavailability",
                desc: "Enriched with liposomal technology for maximum cellular absorption."
              },
              {
                icon: <FaHeart className="w-5 h-5 text-primary" />,
                title: "Physician Formulated",
                desc: "Developed in collaboration with leading longevity clinicians and experts."
              },
              {
                icon: <FaTruck className="w-5 h-5 text-primary" />,
                title: "Insured Global Shipping",
                desc: "Temperature-controlled distribution to safeguard molecular stability."
              }
            ].map((badge, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="p-3 bg-card border border-border rounded-xl text-primary shrink-0">
                  {badge.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1">{badge.title}</h4>
                  <p className="text-[10px] sm:text-xs text-stone-400 font-medium leading-relaxed">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Molecular Stacks */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={revealVariants}
        className="py-16 md:py-24 max-w-7xl mx-auto px-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-[9px]">CLINICAL INVENTORY</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-1 uppercase tracking-tight">Featured Molecular Stacks</h2>
          </div>
          <a href="/shop" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-secondary/80 border border-border px-5 py-3 rounded-full hover:border-primary/45 transition-all no-underline">
            View All Stacks <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        <ProductList limit={4} />
      </motion.section>

      {/* Biohacking Categories Grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={revealVariants}
        className="py-16 md:py-24 bg-card/45 border-y border-border"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-primary font-bold uppercase tracking-widest text-[9px]">TARGETED OPTIMIZATION</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight">Longevity Categories</h2>
            <p className="text-xs sm:text-sm text-stone-400 font-medium max-w-lg mx-auto">Address metabolic degradation, cell senescence, and performance decline at the root.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesList.map((cat, i) => (
              <a 
                href={cat.link} 
                key={i} 
                className="group relative h-80 rounded-[2rem] overflow-hidden border border-border bg-black flex flex-col justify-end p-8 no-underline"
              >
                {/* Background image */}
                <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700" style={{ backgroundImage: `url(${cat.bg})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent"></div>
                
                <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 bg-background/90 border border-border rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-background transition-all">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">{cat.title}</h3>
                    <p className="text-xs text-stone-400 font-medium leading-relaxed mt-2">{cat.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Initialize Stack <ArrowRight size={12} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={revealVariants}
        className="py-16 md:py-24 max-w-7xl mx-auto px-6"
      >
        <div className="text-center mb-16 space-y-2">
          <span className="text-primary font-bold uppercase tracking-widest text-[9px]">PROTOCOL ENGINE</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight">How Biohacker's Fuel Works</h2>
          <p className="text-xs sm:text-sm text-stone-400 font-medium max-w-lg mx-auto">A continuous optimization cycle designed to bridge diagnostic data with high-performance supplementation.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-16 left-16 right-16 h-0.5 bg-border z-0"></div>

          {[
            {
              step: "01",
              title: "Assess Biomarkers",
              desc: "Complete the Biohacking Quiz or submit clinic reports to establish your cellular health baseline."
            },
            {
              step: "02",
              title: "Tailor Supplementation",
              desc: "Recieve a tailored molecular stack formula targeted to optimize cellular energy and cellular health."
            },
            {
              step: "03",
              title: "Track Biometrics",
              desc: "Observe fluctuations in your energy levels, sleep tracking metrics, and overall performance."
            },
            {
              step: "04",
              title: "Refine & Optimize",
              desc: "Consult our clinical experts to adapt dosage and target aging hallmarks dynamically."
            }
          ].map((item, i) => (
            <div key={i} className="bg-card/40 border border-border rounded-3xl p-8 relative z-10 flex flex-col gap-4">
              <span className="text-4xl font-black text-primary/20 font-mono leading-none">{item.step}</span>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">{item.title}</h3>
              <p className="text-xs text-stone-400 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a href="/quiz" className="bg-primary hover:opacity-90 text-background px-10 py-4 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all shadow-xl inline-block no-underline duration-300">
            Take Biohacking Quiz
          </a>
        </div>
      </motion.section>

      {/* Scientific Hub Preview Split Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={revealVariants}
        className="py-16 md:py-24 bg-card border-y border-border"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-primary font-bold uppercase tracking-widest text-[9px] flex items-center gap-2">
                <Shield size={12} /> CLINICALLY PROVEN & LAB BACKED
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">
                Scientifically Formulated.<br/>Clinically Proven.
              </h2>
              <p className="text-stone-300 text-sm leading-relaxed font-medium">
                We believe that longevity is not built on trends, but raw clinical trials and molecular validation. Every batch of our liposomal range and NAD+ precursors undergoes heavy metal, pesticide, and purity assays.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3 items-center">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    ✓
                  </div>
                  <span className="text-xs font-bold text-white">Liposomal delivery for 15x absorption metrics</span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    ✓
                  </div>
                  <span className="text-xs font-bold text-white">99.8% pharmaceutical-grade NMN purity standard</span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    ✓
                  </div>
                  <span className="text-xs font-bold text-white">Endorsed by anti-aging clinical boards</span>
                </div>
              </div>
              <div className="pt-4">
                <a href="/science" className="bg-primary hover:opacity-90 text-background px-10 py-4 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all shadow-xl inline-block no-underline duration-300">
                  Explore Science Hub
                </a>
              </div>
            </div>
            <div className="relative rounded-[2.5rem] overflow-hidden border border-border bg-black aspect-video lg:aspect-[4/3] flex items-center justify-center group">
              <img 
                src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800" 
                alt="Molecular Laboratory" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 flex gap-4 items-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-background">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase text-white tracking-wider">Whitepaper Published</h4>
                  <p className="text-[10px] text-stone-400 font-medium">Read our double-blind clinical trials on NAD+ restoration.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Scientific Advisory / Doctor recommendations */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={revealVariants}
        className="py-16 md:py-24 max-w-7xl mx-auto px-6"
      >
        <div className="text-center mb-16 space-y-2">
          <span className="text-primary font-bold uppercase tracking-widest text-[9px]">EXPERT ADVISORY BOARD</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight">Doctors & Experts</h2>
          <p className="text-xs sm:text-sm text-stone-400 font-medium max-w-lg mx-auto">Backed by world-renowned longevity researchers, molecular biologists, and sports medicine physicians.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Dr. Aris Thorne",
              role: "PHD IN CELLULAR BIOCHEMISTRY",
              bio: "Pioneered clinical research in mitochondrial dysfunction and NAD+ restoration protocols at Oxford Labs.",
              img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
            },
            {
              name: "Dr. Elena Rostova",
              role: "REGENERATIVE ENDOCRINOLOGIST",
              bio: "Anti-aging clinic director specializing in cellular longevity programs and customized nutritional therapies.",
              img: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400"
            },
            {
              name: "Prof. Marcus Vance",
              role: "DIRECTOR OF SPORTS BIOLOGY",
              bio: "Advises elite performance athletes on biohacking, cellular hydration, and circadian recovery engines.",
              img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400"
            }
          ].map((doc, i) => (
            <div key={i} className="bg-card border border-border rounded-[2rem] overflow-hidden group">
              <div className="aspect-[4/3] bg-black overflow-hidden relative border-b border-border">
                <img src={doc.img} alt={doc.name} className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 space-y-3">
                <span className="text-primary font-bold tracking-widest text-[9px] uppercase">{doc.role}</span>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">{doc.name}</h3>
                <p className="text-xs text-stone-400 leading-relaxed font-medium">{doc.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={revealVariants}
        className="py-16 md:py-24 bg-card/45 border-y border-border"
      >
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <FaQuoteLeft className="text-primary/10 w-20 h-20 mx-auto mb-8" />
          <div className="space-y-8">
            <p className="text-xl md:text-3xl font-extrabold italic tracking-normal leading-relaxed text-white max-w-3xl mx-auto">
              "The cognitive clarity and recovery acceleration I've achieved with their NMN stacks is honestly revolutionary. I track my biometric age, and my scores are the best they've been in a decade."
            </p>
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Alex Rivera
              </span>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                Professional CrossFit Athlete & Human Performance Coach
              </span>
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
        className="py-16 md:py-24 max-w-3xl mx-auto px-6"
      >
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-widest text-[9px]">CLINICAL PROTOCOLS</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-1 uppercase tracking-tight">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {[
            {
              q: "What makes Biohacker's Fuel NAD+ precursors different from standard supplements?",
              a: "Unlike typical supplements, our NMN is encapsulated in enteric-resistant liposomal vesicles. This protects the compound from gastric enzymes, achieving up to 15x higher bioavailability in blood plasma."
            },
            {
              q: "How does the personalized longevity program function?",
              a: "Based on your clinical quiz, our board of longevity experts crafts a targeted stack schedule. This is adjusted dynamically as you track biomarkers, sleep efficiency, and mental stamina."
            },
            {
              q: "Are the formulations third-party certified?",
              a: "Absolutely. Every molecular batch undergoes independent HPLC, heavy metals, and toxicity testing in ISO-certified laboratories. You can view the Certificate of Analysis (COA) directly on our Science Hub."
            },
            {
              q: "How quickly can I expect changes in my biometric markers?",
              a: "Initial improvements in ATP production and cognitive stamina are typically noticed within 7-14 days. DNA repair mechanisms and anti-aging markers display clinically significant shifts at the 3-6 month mark."
            }
          ].map((faq, index) => (
            <div
              key={index}
              className="bg-card rounded-[1.5rem] border border-border overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() =>
                  setActiveFaq(activeFaq === index ? null : index)
                }
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
              >
                <span className="font-bold text-white text-xs uppercase tracking-wider">
                  {faq.q}
                </span>
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${activeFaq === index ? "bg-primary text-background rotate-180" : "bg-secondary text-stone-400"}`}
                >
                  <i className="fa-solid fa-chevron-down text-[8px]"></i>
                </span>
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === index ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="text-stone-400 text-xs leading-relaxed font-medium">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Instagram Feed Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={revealVariants}
        className="py-16 md:py-24 bg-card/20 border-t border-border"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">
              @BIOHACKERSFUEL_OFFICIAL
            </h3>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary cursor-pointer hover:text-white transition-colors">
              <FaInstagram size={14} /> Join Community
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
              "https://images.unsplash.com/photo-1549476464-37392f717541",
              "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
              "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5",
            ].map((img, i) => (
              <div
                key={i}
                className="aspect-square rounded-[2rem] overflow-hidden group relative border border-border shadow-xs bg-black"
              >
                <img
                  src={`${img}?auto=format&fit=crop&q=80&w=400`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-75 group-hover:opacity-90"
                  alt="Instagram Feed"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <FaInstagram className="text-white text-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* App Companion Section */}
      <AppDownloadSection />
      
    </div>
  );
};

export default Home;
