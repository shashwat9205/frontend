// src/pages/Home.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "../config";
import {
  FaInstagram,
  FaQuoteLeft,
  FaFileMedical,
  FaBookOpen,
  FaStar,
} from "react-icons/fa";
import {
  Shield,
  Activity,
  Sparkles,
  Brain,
  ArrowRight,
  Dna,
  FileText,
  Calendar,
  Clock,
  Sun,
  Moon,
  ChevronRight,
  TrendingUp,
  Zap,
  ShoppingCart,
  Stethoscope,
  Award,
  CheckCircle2,
  Users,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import AppDownloadSection from "../components/AppDownloadSection";
import CylinderCarousel from "../components/CylinderCarousel";
import CategoryShowcase from "../components/CategoryShowcase";
import lady from "../assets/lady.png";
import { useCart } from "../context/CartContext";

const Home = () => {
  const { addToCart } = useCart();
  const [activeFaq, setActiveFaq] = useState(null);
  const [heroProduct, setHeroProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  // Fetch products on load
  useEffect(() => {
    fetch(API_BASE_URL + "api/products.php")
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success" && Array.isArray(json.data)) {
          setAllProducts(json.data);
          const foundHero = json.data.find(
            (p) => p.is_hero === 1 || p.is_hero === "1",
          );
          if (foundHero) {
            setHeroProduct(foundHero);
          }
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Biological Age Calculator State
  const [calcAge, setCalcAge] = useState(40);
  const [calcSleep, setCalcSleep] = useState("moderate");
  const [calcStress, setCalcStress] = useState("moderate");
  const [calcActivity, setCalcActivity] = useState("moderate");

  // Timeline Schedule State
  const [activeTimelineSlot, setActiveTimelineSlot] = useState("morning");

  const calculateMetrics = () => {
    let nadBase = Math.max(15, 100 - (calcAge - 25) * 1.5);
    let bioAgeOffset = 0;

    if (calcSleep === "poor") {
      nadBase = Math.max(10, nadBase - 15);
      bioAgeOffset += 3;
    } else if (calcSleep === "optimal") {
      bioAgeOffset -= 1.5;
    }

    if (calcStress === "high") {
      nadBase = Math.max(10, nadBase - 20);
      bioAgeOffset += 4.5;
    } else if (calcStress === "low") {
      bioAgeOffset -= 1.0;
    }

    if (calcActivity === "sedentary") {
      nadBase = Math.max(10, nadBase - 10);
      bioAgeOffset += 2.5;
    } else if (calcActivity === "high") {
      nadBase = Math.min(100, nadBase + 10);
      bioAgeOffset -= 3.0;
    }

    const estimatedBioAge = Math.round(calcAge + bioAgeOffset);
    const nadPercent = Math.round(nadBase);
    const longevityScore = Math.max(
      10,
      Math.round(100 - (estimatedBioAge - 20) * 1.1),
    );

    let recommendation = "NAD+ Restoration & Mitochondrial Support Protocol";
    let recDesc =
      "Intensive cellular replenishment stack designed to reverse age-associated metabolic decline.";
    if (calcSleep === "poor" || calcStress === "high") {
      recommendation = "Circadian Repair & Neuro-Adrenal Protocol";
      recDesc =
        "Focuses on balancing cortisol rhythms, down-regulating sympathetic nervous activity, and optimizing deep sleep phase duration.";
    } else if (calcAge < 35 && calcActivity === "high") {
      recommendation = "Cellular Hydration & Athletic Respiration Protocol";
      recDesc =
        "Mitochondrial catalyst formula designed to accelerate muscular ATP recycling and minimize exercise-induced oxidative stress.";
    } else if (calcAge > 52) {
      recommendation = "Senolytic Cleansing & Epigenetic Methylation Protocol";
      recDesc =
        "High-potency cellular clearance and DNA methylation support targeted to combat advanced hallmarks of aging.";
    }

    return {
      estimatedBioAge,
      nadPercent,
      longevityScore,
      recommendation,
      recDesc,
    };
  };

  const {
    estimatedBioAge,
    // eslint-disable-next-line no-unused-vars
    nadPercent,
    longevityScore,
    recommendation,
    recDesc,
  } = calculateMetrics();

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  // 4 Pillars of Cellular Longevity
  const pillarsList = [
    {
      title: "Mitochondrial Fitness",
      desc: "Accelerate cellular oxygenation and ATP synthesis. Support cellular powerhouses to optimize daily energy dynamics.",
      metric: "ATP Output Rate",
      accent: "from-[#b89047]/10 to-[#b89047]/5",
      icon: <TrendingUp className="w-5 h-5 text-[#b89047]" />,
    },
    {
      title: "Precision Nutrition",
      desc: "Deploy clinical-grade liposomal coenzymes for maximum bioavailability. Suppress system cellular inflammation indicators.",
      metric: "Bioavailability Index",
      accent: "from-[#0a192f]/10 to-[#0a192f]/5",
      icon: <Dna className="w-5 h-5 text-[#b89047]" />,
    },
    {
      title: "Circadian Regulation",
      desc: "Modulate HPA axis activities to normalize deep sleep phases. Attenuate neurological wear from chronic work stress.",
      metric: "HRV Recovery Index",
      accent: "from-[#b89047]/10 to-[#b89047]/5",
      icon: <Brain className="w-5 h-5 text-[#b89047]" />,
    },
    {
      title: "Clinical Diagnostics",
      desc: "Track biological age metrics via DNA methylation patterns. Provide direct feedback for formulation micro-calibration.",
      metric: "Epigenetic Accuracy",
      accent: "from-slate-100 to-slate-50",
      icon: <Activity className="w-5 h-5 text-[#b89047]" />,
    },
  ];

  // Daily Regimen Protocols
  const dailyTimeline = {
    morning: {
      time: "07:30 AM",
      title: "Cellular Energy Spark",
      subtitle: "Liposomal NAD+ Catalyst & Biomarker Quiz",
      desc: "Begin the circadian cycle with molecular coenzymes designed to optimize mitochondrial output. Log baseline biomarker updates to personalize your protocol variables.",
      activeIngredients: "NMN, CoQ10, Liposomal Glutathione",
      status: "Metabolic Catalyst Phase",
      icon: <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-[#b89047]" />,
    },
    midday: {
      time: "01:00 PM",
      title: "Metabolic Respiration",
      subtitle: "ATP Recycler & Cellular Nutrition",
      desc: "Sustain cognitive performance and muscular endurance. Prevent executive brain-fog and support systemic metabolic efficiency via glucose disposal pathways.",
      activeIngredients: "Alpha GPC, Resveratrol, Liposomal B-Complex",
      status: "Cognitive Focus Phase",
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#b89047]" />,
    },
    evening: {
      time: "06:30 PM",
      title: "Neuro-Adrenal Calming",
      subtitle: "Cortisol Regulator & HPA Axis Shield",
      desc: "Down-regulate sympathetic nervous system activities. Lower brainwave frequencies to initiate active neuro-adrenal recovery and prepare for delta rest.",
      activeIngredients:
        "L-Theanine, Ashwagandha KSM-66, Magnesium L-Threonate",
      status: "Circadian Adaptability Phase",
      icon: <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-[#b89047]" />,
    },
    night: {
      time: "10:30 PM",
      title: "Circadian Deep Repair",
      subtitle: "Sleep Architecture Catalyst",
      desc: "Deepen restorative delta-sleep cycles and clear cellular waste. Allow your natural peptide synthesis pathways to activate biological tissue repair.",
      activeIngredients: "Apigenin, Melatonin (Micro-dose), Chamomile Extract",
      status: "Senolytic Waste Clearance",
      icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#b89047]" />,
    },
  };

  const publications = [
    {
      journal: "JOURNAL OF CELLULAR LONGEVITY (2025)",
      title:
        "Enteric-Liposomal Delivery of Nicotinamide Mononucleotide: A Double-Blind Purity and Biomarker Study",
      summary:
        "Clinical trial assessing systemic NAD+ levels in active adult cohorts following liposomal oral administration. Results demonstrated a 15.4x improvement in systemic absorption index compared to standard powder capsules.",
      authors: "Thorne A., Rostova E., Vance M.",
    },
    {
      journal: "MITOCHONDRIAL CLINICAL RESEARCH (2026)",
      title:
        "Synergistic Integration of CoQ10 and Nootropic Peptides on Executive Circadian Adaptation Patterns",
      summary:
        "Observational study evaluating sleep architecture profiles and cognitive resilience under extreme neurological workloads. Biomarker analyses verified reduced cortisol spiking and stabilized heart rate variability indexes.",
      authors: "Vance M., Harrison D.",
    },
  ];

  const flagshipProducts = [
    {
      title: "NMN Cell Catalyst",
      purpose: "DNA Repair & Cellular Health",
      desc: "High-potency 99.8% pure nicotinamide mononucleotide enclosed in liposomal carrier spheres for maximum systemic bioavailability.",
      biomarkers: "NAD+ Levels, Glycation, Epigenetic Index",
      price: "₹3,499.00",
      bg: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=400",
    },
    {
      title: "Circadian Regulator",
      purpose: "Deep Sleep & Neuro-Adrenal Repair",
      desc: "Advanced neuromodulators designed to optimize deep delta-sleep wave patterns and lower nightly cortisol spikes.",
      biomarkers: "HRV Profile, Sleep Latency, Diurnal Cortisol",
      price: "₹2,899.00",
      bg: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&q=80&w=400",
    },
    {
      title: "Senolytic Cleanse",
      purpose: "Clearance of Senescent Cells",
      desc: "Targeted bio-molecular compounds certified to selectively clear 'zombie' senescent cells to prevent inflammatory aging.",
      biomarkers: "IL-6 Markers, Inflammatory Cytokines",
      price: "₹3,999.00",
      bg: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <div className="bg-[#faf9f6] min-h-screen text-[#0a192f] overflow-x-hidden selection:bg-[#b89047] selection:text-white">
      {/* Hero Section */}
      <Hero />

      {/* FEATURED HERO PRODUCT SECTION */}
      {heroProduct && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
          className="py-8 sm:py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6"
        >
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[3rem] border border-white/10 bg-[#0a192f] p-5 sm:p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 shadow-xl">
            {/* Glowing background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#b89047]/10 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Left Content */}
            <div className="relative z-10 flex-1 space-y-4 sm:space-y-6 w-full">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b89047]/15 border border-[#b89047]/30 text-[#b89047] text-[8.5px] sm:text-[9px] font-bold tracking-[0.2em] uppercase">
                <Sparkles className="w-3 h-3" /> INTRODUCING THE HERO PROTOCOL
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-tight font-serif leading-tight">
                {heroProduct.name}
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed max-w-xl font-sans">
                {heroProduct.description}
              </p>

              {/* Rating & Review Info */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="flex text-[#b89047] text-xs gap-0.5">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  5.0 Rating • clinical index certified
                </span>
              </div>

              {/* Price Details */}
              <div className="flex items-baseline flex-wrap gap-3 sm:gap-4 pt-1 sm:pt-2">
                <span className="text-white font-bold text-2xl sm:text-3xl font-mono">
                  ₹
                  {Number(heroProduct.price).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </span>
                {Number(heroProduct.stock) > 0 ? (
                  <span className="text-[8.5px] sm:text-[9px] font-bold uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                    In Stock ({heroProduct.stock} units)
                  </span>
                ) : (
                  <span className="text-[8.5px] sm:text-[9px] font-bold uppercase bg-rose-500/15 text-rose-300 border border-rose-500/30 px-2.5 py-0.5 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* CTA Button */}
              <div className="pt-2 sm:pt-4">
                <a
                  href={`/product/${heroProduct.slug}`}
                  className="w-full sm:w-auto bg-[#b89047] hover:bg-white hover:text-[#0a192f] text-[#0a192f] px-6 sm:px-10 py-3.5 sm:py-4 rounded-xl font-bold uppercase tracking-widest text-[9px] shadow-lg transition-all duration-300 inline-block text-center no-underline active:scale-95"
                >
                  Explore specifications & order
                </a>
              </div>
            </div>

            {/* Right Image Content Container */}
            <div className="relative z-10 flex-1 flex items-center justify-center select-none group w-full">
              <div className="relative w-full max-w-[460px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#071324]/50 shadow-inner">
                <img
                  src={
                    heroProduct.image_url
                      ? heroProduct.image_url.startsWith("http")
                        ? heroProduct.image_url
                        : `${API_BASE_URL}admin/${heroProduct.image_url}`
                      : "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=400"
                  }
                  alt={heroProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* SECTION 0.5: SHOP BY CATEGORY */}
      <CategoryShowcase />

      {/* SECTION 1: THE 4 PILLARS OF LONGEVITY */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="py-12 sm:py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 relative"
      >
        <div className="text-center mb-8 sm:mb-14 space-y-2 sm:space-y-3">
          <span className="text-[#b89047] font-bold uppercase tracking-[0.25em] text-[9px] flex items-center justify-center gap-2">
            <Shield className="w-3.5 h-3.5" /> CLINICAL FRAMEWORK
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#0a192f] uppercase tracking-tight font-serif">
            The Pillars of Cellular Preservation
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed font-sans">
            Our board-led scientific methodology addresses cellular biological
            decay across four core diagnostic vectors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {pillarsList.map((pillar, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-2xl md:rounded-[2rem] border border-[#0a192f]/5 bg-gradient-to-br ${pillar.accent} p-6 sm:p-8 flex flex-col justify-between hover:border-[#b89047]/30 transition-all duration-500 group shadow-sm`}
            >
              <div className="space-y-4 sm:space-y-6">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-[#0a192f]/5 flex items-center justify-center shadow-inner group-hover:bg-[#0a192f] group-hover:text-white transition-all duration-300">
                  {pillar.icon}
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#0a192f] uppercase tracking-wider font-serif">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium font-sans">
                    {pillar.desc}
                  </p>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 pt-4 border-t border-[#0a192f]/5 flex justify-between items-center text-[9px] sm:text-[10px]">
                <span className="text-slate-400 font-bold uppercase tracking-wider">
                  Target Marker:
                </span>
                <span className="text-[#b89047] font-bold tracking-wide uppercase">
                  {pillar.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 2: INTERACTIVE LONGEVITY SCORE & WIDGET GAUGE */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="py-12 sm:py-16 md:py-24 bg-[#0a192f] border-y border-white/5 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-14 space-y-2 sm:space-y-3">
            <span className="text-[#b89047] font-bold uppercase tracking-[0.25em] text-[9px] flex items-center justify-center gap-2">
              <Activity className="w-3.5 h-3.5" /> METABOLIC BASAL GAUGE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight font-serif">
              Assess Your Cellular Index
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mx-auto leading-relaxed font-sans">
              Input chronological factors to calculate your biological age
              offset and determine your custom molecular replenishment target.
            </p>
          </div>

          <div className="bg-[#0f274a] border border-white/10 rounded-2xl sm:rounded-3xl md:rounded-[3rem] p-5 sm:p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center shadow-2xl relative overflow-hidden">
            {/* Glowing background blob */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#b89047]/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Left sliders input dashboard (Column: 7) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3 sm:pb-4 flex items-center gap-2 font-serif">
                <FaFileMedical className="text-[#b89047] text-sm" /> 1. Basal
                Biomarker Sliders
              </h3>

              {/* Slider 1: Chronological Age */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-bold uppercase tracking-wider text-[10px] sm:text-xs">
                    Chronological Age
                  </span>
                  <span className="text-[#b89047] font-mono font-black text-base sm:text-lg">
                    {calcAge} years
                  </span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="80"
                  value={calcAge}
                  onChange={(e) => setCalcAge(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#b89047] border-none focus:outline-none"
                />
              </div>

              {/* Selector 2: Sleep Duration */}
              <div className="space-y-2 sm:space-y-3">
                <span className="text-[10px] sm:text-xs text-slate-300 font-bold uppercase tracking-wider block">
                  Average Sleep Cycle
                </span>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                  {[
                    { id: "poor", label: "< 6h Low" },
                    { id: "moderate", label: "6 to 8h" },
                    { id: "optimal", label: "8h+ Rested" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setCalcSleep(opt.id)}
                      className={`py-2.5 sm:py-3.5 px-1 sm:px-3 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer text-center ${
                        calcSleep === opt.id
                          ? "bg-[#b89047] border-[#b89047] text-white shadow-sm"
                          : "bg-[#0a192f] border-white/10 text-slate-300 hover:text-white hover:bg-[#0a192f]/80"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector 3: Stress Profile */}
              <div className="space-y-2 sm:space-y-3">
                <span className="text-[10px] sm:text-xs text-slate-300 font-bold uppercase tracking-wider block">
                  Occupational Stress Profile
                </span>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                  {[
                    { id: "low", label: "Stabilized" },
                    { id: "moderate", label: "Moderate" },
                    { id: "high", label: "Executive High" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setCalcStress(opt.id)}
                      className={`py-2.5 sm:py-3.5 px-1 sm:px-3 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer text-center ${
                        calcStress === opt.id
                          ? "bg-[#b89047] border-[#b89047] text-white shadow-sm"
                          : "bg-[#0a192f] border-white/10 text-slate-300 hover:text-white hover:bg-[#0a192f]/80"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector 4: Physical Output */}
              <div className="space-y-2 sm:space-y-3">
                <span className="text-[10px] sm:text-xs text-slate-300 font-bold uppercase tracking-wider block">
                  Cardiovascular Physical Output
                </span>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                  {[
                    { id: "sedentary", label: "Sedentary" },
                    { id: "moderate", label: "Active" },
                    { id: "high", label: "Athletic High" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setCalcActivity(opt.id)}
                      className={`py-2.5 sm:py-3.5 px-1 sm:px-3 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer text-center ${
                        calcActivity === opt.id
                          ? "bg-[#b89047] border-[#b89047] text-white shadow-sm"
                          : "bg-[#0a192f] border-white/10 text-slate-300 hover:text-white hover:bg-[#0a192f]/80"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right circular meter display (Column: 5) */}
            <div className="lg:col-span-5 flex flex-col justify-between items-center text-center bg-[#0a192f] border border-white/10 rounded-2xl md:rounded-[2.5rem] p-5 sm:p-8 shadow-sm relative w-full">
              <div className="w-full space-y-4 sm:space-y-6">
                <h3 className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-widest border-b border-white/10 pb-3 font-serif">
                  2. Estimated Biological Index
                </h3>

                {/* SVG Luxury Circular Dial Gauge */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto flex items-center justify-center">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    {/* Background track */}
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    {/* Active track with gold gradient */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#c5a059"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray="251.2"
                      animate={{
                        strokeDashoffset:
                          251.2 - (251.2 * longevityScore) / 100,
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Score numbers inside dial */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      Score
                    </span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {longevityScore}
                    </span>
                    <span className="text-[7.5px] sm:text-[8px] font-bold text-[#b89047] uppercase tracking-widest mt-0.5">
                      Longevity
                    </span>
                  </div>
                </div>

                {/* Bio Age and Offset stats */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                  <div className="bg-[#0f274a] border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                      Bio Age
                    </span>
                    <span className="text-base sm:text-xl font-bold text-white mt-0.5 block">
                      {estimatedBioAge} yrs
                    </span>
                  </div>

                  <div className="bg-[#0f274a] border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                      Offset Status
                    </span>
                    <span
                      className={`text-[9px] sm:text-[10px] font-extrabold uppercase mt-1 inline-block ${
                        estimatedBioAge > calcAge
                          ? "text-rose-400"
                          : "text-emerald-400"
                      }`}
                    >
                      {estimatedBioAge > calcAge
                        ? `+${estimatedBioAge - calcAge} yr lag`
                        : `${estimatedBioAge === calcAge ? "baseline" : `${calcAge - estimatedBioAge} yr lead`}`}
                    </span>
                  </div>
                </div>

                {/* Path Recommendations */}
                <div className="bg-[#0f274a] border border-white/10 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 text-left space-y-1 sm:space-y-1.5">
                  <span className="text-[7.5px] sm:text-[8px] font-bold tracking-widest text-[#b89047] uppercase block">
                    Target Pathway:
                  </span>
                  <h4 className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider leading-tight font-serif">
                    {recommendation}
                  </h4>
                  <p className="text-[9.5px] sm:text-[10px] text-slate-300 leading-normal font-medium font-sans">
                    {recDesc}
                  </p>
                </div>
              </div>

              <a
                href="/quiz"
                className="mt-5 sm:mt-6 w-full bg-[#b89047] hover:bg-[#cba463] text-[#0a192f] py-3.5 sm:py-4 rounded-xl font-bold uppercase tracking-widest text-[8.5px] sm:text-[9px] shadow-sm transition-all duration-300 block text-center no-underline active:scale-95"
              >
                Initiate Board Diagnosis & Quiz
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 3: A DAY IN YOUR LONGEVITY REGIMEN TIMELINE */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="py-12 sm:py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="text-center mb-8 sm:mb-14 space-y-2 sm:space-y-3">
          <span className="text-[#b89047] font-bold uppercase tracking-[0.25em] text-[9px] flex items-center justify-center gap-2">
            <Clock className="w-3.5 h-3.5" /> DAILY WORKFLOW
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#0a192f] uppercase tracking-tight font-serif">
            A Day in Your Longevity Protocol
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed font-sans">
            See how diagnostic checkups, custom molecular formulas, and
            physiological monitors integrate into a seamless 24-hour routine.
          </p>
        </div>

        {/* Interactive Timeline Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-stretch">
          {/* Left Navigation Buttons (Grid on mobile, flex column on desktop) */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-col gap-2 sm:gap-3 justify-center">
            {Object.keys(dailyTimeline).map((key) => {
              const isActive = activeTimelineSlot === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTimelineSlot(key)}
                  className={`text-left p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    isActive
                      ? "bg-white border-[#b89047] text-[#0a192f] shadow-md lg:pl-7"
                      : "bg-white/60 border-[#0a192f]/5 text-slate-500 hover:text-[#0a192f] hover:bg-white"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-4">
                    <span
                      className={`text-[8.5px] sm:text-[10px] font-bold tracking-widest uppercase ${isActive ? "text-[#b89047]" : "text-slate-400"}`}
                    >
                      {dailyTimeline[key].time}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider font-serif">
                      {key}
                    </span>
                  </div>
                  <ChevronRight
                    size={14}
                    className={`hidden lg:block transition-transform duration-300 ${isActive ? "translate-x-1 text-[#b89047]" : "text-slate-400"}`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Card Panel displaying active phase details */}
          <div className="lg:col-span-8 bg-white border border-[#0a192f]/5 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] p-5 sm:p-8 md:p-12 relative flex flex-col justify-between overflow-hidden min-h-[320px] sm:min-h-[360px] shadow-sm">
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#b89047]/5 rounded-full blur-2xl pointer-events-none"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTimelineSlot}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 sm:space-y-6"
              >
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#faf9f6] rounded-2xl border border-[#0a192f]/5 flex items-center justify-center shrink-0 shadow-inner">
                    {dailyTimeline[activeTimelineSlot].icon}
                  </div>
                  <div>
                    <span className="text-[8.5px] sm:text-[9px] font-bold text-[#b89047] uppercase tracking-[0.2em] block">
                      {dailyTimeline[activeTimelineSlot].time} •{" "}
                      {dailyTimeline[activeTimelineSlot].status}
                    </span>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0a192f] uppercase tracking-wider font-serif mt-0.5">
                      {dailyTimeline[activeTimelineSlot].title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <h4 className="text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-widest">
                    {dailyTimeline[activeTimelineSlot].subtitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium font-sans">
                    {dailyTimeline[activeTimelineSlot].desc}
                  </p>
                </div>

                <div className="pt-4 sm:pt-6 border-t border-[#0a192f]/5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
                  <div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">
                      Active Stacks & Indicators:
                    </span>
                    <span className="text-[#0a192f] font-bold block mt-1 font-sans text-[11px] sm:text-xs">
                      {dailyTimeline[activeTimelineSlot].activeIngredients}
                    </span>
                  </div>
                  <div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider block">
                      Phase Target:
                    </span>
                    <span className="text-[#b89047] font-bold block mt-1 uppercase tracking-wide text-[11px] sm:text-xs">
                      {dailyTimeline[activeTimelineSlot].status}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* 3D CYLINDER VIDEO CAROUSEL SECTION */}
      <CylinderCarousel />

      {/* SECTION 3.5: EXPLORE ALL PRODUCTS */}
      <section className="py-12 sm:py-16 md:py-20 bg-white border-b border-[#0a192f]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-end mb-8 sm:mb-10">
            <div>
              <span className="text-[#b89047] text-[9px] sm:text-[10px] font-bold tracking-[0.25em] uppercase block mb-1 sm:mb-2">
                Curated Wellness Catalog
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0a192f] uppercase tracking-tight font-serif">
                Explore All Products
              </h2>
            </div>
            <a
              href="/shop"
              className="text-[#b89047] hover:text-[#0a192f] font-bold text-xs uppercase tracking-wider flex items-center gap-1 transition-colors group no-underline"
            >
              See all{" "}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {allProducts.slice(0, 3).map((product) => {
              const originalPrice = parseFloat(product.price) * 1.15;
              const discountPercent = 15;
              const imageUrl = product.image_url
                ? product.image_url.startsWith("http")
                  ? product.image_url
                  : `${API_BASE_URL}admin/${product.image_url}`
                : "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=600";
              const isOutOfStock = parseInt(product.stock) <= 0;

              return (
                <div
                  key={product.id}
                  className="flex flex-row items-stretch bg-white border border-[#0a192f]/10 rounded-2xl sm:rounded-[2rem] p-3.5 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-300 w-full group"
                >
                  {/* Left Side: Image on Soft Tinted Background */}
                  <div className="w-[100px] sm:w-[130px] shrink-0 bg-[#b89047]/5 rounded-xl sm:rounded-[1.5rem] overflow-hidden flex items-center justify-center p-2.5 sm:p-3 relative">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=600";
                      }}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    {isOutOfStock && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                        <span className="text-[7.5px] font-bold uppercase tracking-widest bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded border border-rose-200">
                          Sold Out
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right Side: Product Details */}
                  <div className="flex-1 pl-3 sm:pl-4 flex flex-col justify-between">
                    <div>
                      {/* Subtitle / Category */}
                      <p className="text-[#b89047] font-bold uppercase tracking-wider text-[8px] mb-1 font-sans">
                        {product.category || "General"}
                      </p>

                      {/* Title */}
                      <a
                        href={`/product/${product.slug}`}
                        className="no-underline"
                      >
                        <h3 className="text-xs sm:text-sm font-bold text-[#0a192f] hover:text-[#b89047] transition-colors leading-tight font-sans line-clamp-2 mb-1">
                          {product.name}
                        </h3>
                      </a>

                      {/* Rating info */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <div className="flex text-[#b89047] text-[10px]">
                          <FaStar />
                        </div>
                        <span className="text-[8.5px] sm:text-[9px] font-bold text-slate-400 font-mono">
                          5.0 (48 reviews)
                        </span>
                      </div>
                    </div>

                    <div>
                      {/* Price Section */}
                      <div className="flex items-baseline flex-wrap gap-1.5 mb-2 sm:mb-2.5">
                        <span className="text-[#0a192f] font-bold text-sm sm:text-base font-mono">
                          ₹{parseFloat(product.price).toLocaleString("en-IN")}
                        </span>
                        <span className="text-slate-400 line-through text-[9px] sm:text-xs font-mono">
                          ₹{Math.round(originalPrice).toLocaleString("en-IN")}
                        </span>
                        <span className="text-[#b89047] text-[8.5px] sm:text-[9px] font-bold whitespace-nowrap">
                          ({discountPercent}% OFF)
                        </span>
                      </div>

                      {/* Add to Cart button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (!isOutOfStock) {
                            addToCart(product, 1);
                          }
                        }}
                        disabled={isOutOfStock}
                        className={`w-full py-2 sm:py-2.5 rounded-xl font-bold uppercase tracking-widest text-[8.5px] sm:text-[9px] transition-all duration-300 flex items-center justify-center gap-1.5 border cursor-pointer active:scale-95 ${
                          isOutOfStock
                            ? "bg-slate-50 border-slate-100 text-slate-400"
                            : "bg-transparent border-[#0a192f]/10 text-[#0a192f] hover:bg-[#0a192f] hover:text-white hover:border-[#0a192f]"
                        }`}
                      >
                        <ShoppingCart className="w-3 h-3" />
                        {isOutOfStock ? "Sold Out" : "Add to cart"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: FLAGSHIP FORMULATIONS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="py-12 sm:py-16 md:py-24 bg-[#0a192f] border-y border-white/5 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-14 space-y-2 sm:space-y-3">
            <span className="text-[#b89047] font-bold uppercase tracking-[0.25em] text-[9px] flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> PRECISION PRODUCTS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight font-serif">
              Flagship Molecular Formulas
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed font-sans">
              Pharmaceutical-grade purity, enteric liposomal coatings, and
              chemical HPLC validation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {flagshipProducts.map((prod, idx) => (
              <div
                key={idx}
                className="bg-[#0f274a] border border-white/10 rounded-2xl sm:rounded-[2.5rem] overflow-hidden hover:border-[#b89047]/30 transition-all duration-500 flex flex-col justify-between group shadow-lg"
              >
                <div className="relative aspect-video overflow-hidden border-b border-white/10 bg-black">
                  <img
                    src={prod.bg}
                    alt={prod.title}
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f274a] to-transparent"></div>
                  <span className="absolute top-4 sm:top-6 left-4 sm:left-6 text-[7.5px] sm:text-[8px] font-bold text-[#b89047] bg-[#0a192f]/90 border border-[#b89047]/30 px-3 py-1 rounded-full uppercase tracking-wider">
                    {prod.purpose}
                  </span>
                </div>

                <div className="p-5 sm:p-8 space-y-4 sm:space-y-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-serif">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium font-sans">
                      {prod.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-between items-center text-[9px] sm:text-[10px]">
                    <div>
                      <span className="text-slate-400 font-bold uppercase tracking-wider block text-[7.5px] sm:text-[8px]">
                        Target Indicators:
                      </span>
                      <span className="text-white font-bold block mt-0.5 sm:mt-1 uppercase tracking-wide">
                        {prod.biomarkers}
                      </span>
                    </div>
                    <span className="text-[#b89047] font-black text-base sm:text-lg font-mono">
                      {prod.price}
                    </span>
                  </div>
                </div>

                <div className="px-5 sm:px-8 pb-5 sm:pb-8">
                  <a
                    href="/shop"
                    className="w-full py-3 sm:py-3.5 bg-[#b89047] hover:bg-[#cba463] text-white rounded-xl font-bold uppercase tracking-widest text-[8px] sm:text-[8.5px] shadow-sm transition-all duration-300 block text-center no-underline active:scale-95"
                  >
                    View Stack Specifications
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 5: CLINICAL TRIALS & PUBLICATIONS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="py-12 sm:py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-14 gap-4 sm:gap-6">
          <div>
            <span className="text-[#b89047] font-bold uppercase tracking-[0.25em] text-[9px] flex items-center gap-2">
              <FaBookOpen className="w-3 h-3" /> CLINICAL TRIALS REPOSITORY
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#0a192f] mt-1 sm:mt-2 uppercase tracking-tight font-serif">
              Published Clinical Studies
            </h2>
          </div>
          <a
            href="/science"
            className="group flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-[#0a192f] bg-white border border-[#0a192f]/10 px-5 sm:px-6 py-3 sm:py-4 rounded-full hover:border-[#b89047]/30 transition-all duration-300 no-underline shadow-sm"
          >
            Access Science Hub{" "}
            <ArrowRight
              size={12}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
          {publications.map((paper, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#0a192f]/5 rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-8 md:p-10 flex flex-col justify-between hover:border-[#b89047]/20 transition-all duration-500 shadow-sm"
            >
              <div className="space-y-3 sm:space-y-5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[8.5px] sm:text-[9px] font-bold tracking-[0.15em] text-[#b89047] uppercase font-mono">
                    {paper.journal}
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-sans">
                    Peer Reviewed
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-extrabold text-[#0a192f] leading-snug uppercase tracking-wider font-serif">
                  {paper.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium font-sans">
                  {paper.summary}
                </p>
              </div>

              <div className="pt-4 sm:pt-6 border-t border-[#0a192f]/5 mt-4 sm:mt-6 flex justify-between items-center text-[9px] sm:text-[10px]">
                <div>
                  <span className="text-slate-400 uppercase tracking-wider block text-[7.5px] sm:text-[8px]">
                    Clinical Investigators:
                  </span>
                  <span className="text-slate-700 font-bold uppercase tracking-wide mt-0.5 block font-sans">
                    {paper.authors}
                  </span>
                </div>
                <a
                  href="/science"
                  className="flex items-center gap-1.5 text-[#b89047] font-bold uppercase tracking-wider hover:text-[#0a192f] transition-colors no-underline"
                >
                  View Data <FileText size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* SECTION 6: ADVISORY BOARD DOCTORS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="py-12 sm:py-16 md:py-24 bg-[#faf9f6] border-t border-[#0a192f]/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-14 space-y-2 sm:space-y-3">
            <span className="text-[#b89047] font-bold uppercase tracking-[0.25em] text-[9px] flex items-center justify-center gap-2">
              <Calendar className="w-3.5 h-3.5" /> CLINICAL ADVISORY BOARD
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#0a192f] uppercase tracking-tight font-serif">
              Doctors & Longevity Advisors
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto leading-relaxed font-sans">
              Our clinical formulations and diagnostic markers are built in
              partnership with leading global molecular biochemists and
              longevity researchers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Dr. Aris Thorne",
                role: "PHD IN CELLULAR BIOCHEMISTRY",
                bio: "Pioneered clinical research in mitochondrial dysfunction and NAD+ restoration protocols at Oxford Labs.",
                img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
              },
              {
                name: "Dr. Elena Rostova",
                role: "REGENERATIVE ENDOCRINOLOGIST",
                bio: "Anti-aging clinic director specializing in cellular longevity programs and customized nutritional therapies.",
                img: lady,
              },
              {
                name: "Prof. Marcus Vance",
                role: "DIRECTOR OF SPORTS BIOLOGY",
                bio: "Advises elite performance athletes on biohacking, cellular hydration, and circadian recovery engines.",
                img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
              },
            ].map((doc, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#0a192f]/5 rounded-2xl sm:rounded-[2.5rem] overflow-hidden group shadow-sm"
              >
                <div className="aspect-[4/3] bg-black overflow-hidden relative border-b border-[#0a192f]/5">
                  <img
                    src={doc.img}
                    alt={doc.name}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-95 transition-all duration-700"
                  />
                </div>
                <div className="p-5 sm:p-8 space-y-2 sm:space-y-3">
                  <span className="text-[#b89047] font-bold tracking-widest text-[8.5px] sm:text-[9px] uppercase">
                    {doc.role}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#0a192f] uppercase tracking-wider font-serif">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium font-sans">
                    {doc.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 6B: DOCTOR & PRACTITIONER COMMUNITY PORTAL */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="py-12 sm:py-16 md:py-24 bg-[#faf9f6] border-t border-[#0a192f]/5 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl md:rounded-[3.5rem] bg-gradient-to-br from-[#071324] via-[#0a192f] to-[#0d2242] text-white p-6 sm:p-10 md:p-14 lg:p-18 overflow-hidden shadow-2xl border border-[#b89047]/30">
            {/* Ambient Background Glows */}
            <div className="absolute -top-32 -right-32 w-80 sm:w-96 h-80 sm:h-96 bg-[#b89047]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-80 sm:w-96 h-80 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left Column: Value Proposition & Call to Actions */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#b89047]/15 border border-[#b89047]/30 text-[#d4af37] text-[9px] sm:text-[10px] font-bold tracking-[0.22em] uppercase backdrop-blur-sm shadow-sm">
                  <Stethoscope className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Healthcare Practitioner Network</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15] font-serif">
                    Empower Your Practice With{" "}
                    <span className="bg-gradient-to-r from-[#b89047] via-[#f3e5ab] to-[#b89047] bg-clip-text text-transparent italic font-serif">
                      Precision Longevity
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-slate-300 font-medium leading-relaxed max-w-xl font-sans">
                    Partner with Biohackerz to prescribe clinical-grade, third-party verified cellular longevity protocols. Give your patients seamless direct-to-door access while tracking adherence and earning recurring practitioner commissions.
                  </p>
                </div>

                {/* 4 Feature Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2">
                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/5 space-y-1.5 hover:border-[#b89047]/30 transition-colors">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#b89047]/20 flex items-center justify-center text-[#d4af37]">
                      <Award className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white font-serif">
                      Clinical-Grade Purity
                    </h4>
                    <p className="text-[10.5px] sm:text-[11px] text-slate-300 leading-relaxed font-sans">
                      100% bioavailable liposomal NAD+, NMN, and cellular stacks with zero synthetic binders or fillers.
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/5 space-y-1.5 hover:border-[#b89047]/30 transition-colors">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#b89047]/20 flex items-center justify-center text-[#d4af37]">
                      <Users className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white font-serif">
                      Custom Referral Link
                    </h4>
                    <p className="text-[10.5px] sm:text-[11px] text-slate-300 leading-relaxed font-sans">
                      Provide patients with your clinic link (<code className="text-[#d4af37] font-mono">/dr/your-code</code>) with preferred patient pricing.
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/5 space-y-1.5 hover:border-[#b89047]/30 transition-colors">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#b89047]/20 flex items-center justify-center text-[#d4af37]">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white font-serif">
                      Real-Time Commission Portal
                    </h4>
                    <p className="text-[10.5px] sm:text-[11px] text-slate-300 leading-relaxed font-sans">
                      Monitor patient refill compliance and receive transparent recurring commissions via direct deposit.
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/5 space-y-1.5 hover:border-[#b89047]/30 transition-colors">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#b89047]/20 flex items-center justify-center text-[#d4af37]">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white font-serif">
                      Verified Practitioner Status
                    </h4>
                    <p className="text-[10.5px] sm:text-[11px] text-slate-300 leading-relaxed font-sans">
                      Access exclusive clinical monographs, laboratory COAs, and patient education resources.
                    </p>
                  </div>
                </div>

                {/* Call-to-Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                  <Link
                    to="/doctor/join"
                    className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#b89047] via-[#cbb06d] to-[#b89047] text-[#0a192f] font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-[#b89047]/20 text-center no-underline cursor-pointer"
                  >
                    <span>Apply to Join Network</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/doctor/login"
                    className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full border border-white/20 hover:border-[#b89047]/60 text-white font-bold text-xs uppercase tracking-widest bg-white/5 hover:bg-white/10 active:scale-95 transition-all backdrop-blur-sm text-center no-underline cursor-pointer"
                  >
                    <span>Practitioner Sign In</span>
                    <ArrowUpRight className="w-4 h-4 text-[#d4af37]" />
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 pt-1 sm:pt-2 text-[9px] sm:text-[10px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Open to MD, DO, ND, DC & Licensed Dietitians
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Zero Minimum Orders
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive Portal Showcase Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl sm:rounded-3xl bg-white/[0.05] border border-white/15 backdrop-blur-xl p-5 sm:p-7 space-y-4 sm:space-y-5 shadow-2xl shadow-black/40">
                  {/* Decorative Header */}
                  <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#b89047] to-[#78591f] flex items-center justify-center text-[#0a192f] font-black text-xs sm:text-sm tracking-tighter shadow-md">
                        DR
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-xs sm:text-sm text-white font-serif">
                            Dr. Elena Vance, MD
                          </h4>
                          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" title="Active Verified" />
                        </div>
                        <p className="text-[9px] sm:text-[10px] text-slate-300 font-mono tracking-wide">
                          Longevity & Regenerative Medicine
                        </p>
                      </div>
                    </div>
                    <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">
                      Verified
                    </span>
                  </div>

                  {/* Referral Link Box Mockup */}
                  <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-black/30 border border-white/5 space-y-1 sm:space-y-1.5">
                    <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400 font-medium">
                      <span>Clinic Patient Referral URL</span>
                      <span className="text-[#d4af37] font-semibold text-[8px] sm:text-[9px] uppercase tracking-wider">10% Patient Discount</span>
                    </div>
                    <div className="flex items-center justify-between px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-slate-200">
                      <span className="truncate">biohackersfuel.com/dr/dr-vance-md</span>
                      <span className="text-[9px] sm:text-[10px] text-[#d4af37] uppercase font-bold tracking-wider ml-2 shrink-0">Active</span>
                    </div>
                  </div>

                  {/* Quick Metrics */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                    <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 text-center">
                      <div className="text-sm sm:text-lg font-black text-white font-serif">142</div>
                      <div className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Patients</div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 text-center">
                      <div className="text-sm sm:text-lg font-black text-emerald-400 font-serif">96.4%</div>
                      <div className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Adherence</div>
                    </div>
                    <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 text-center">
                      <div className="text-sm sm:text-lg font-black text-[#d4af37] font-serif">₹3.8L</div>
                      <div className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Mo. Revenue</div>
                    </div>
                  </div>

                  {/* Recommended Stack Snippet */}
                  <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <div className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#d4af37] font-bold">
                      Prescribed Longevity Stack
                    </div>
                    <div className="text-[11px] sm:text-xs text-white font-medium flex items-center justify-between">
                      <span>Cellular NAD+ & Longevity Matrix</span>
                      <span className="text-[9px] sm:text-[10px] text-emerald-400 font-mono">1,000mg Daily</span>
                    </div>
                    <p className="text-[9px] sm:text-[10px] text-slate-400 leading-relaxed font-sans">
                      Targeted protocol for mitochondrial respiration and cellular NAD+ restoration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 7: TESTIMONIALS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="py-12 sm:py-16 md:py-24 bg-[#0a192f] border-y border-white/5 text-center"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8">
          <FaQuoteLeft className="text-[#b89047]/20 w-10 h-10 sm:w-16 sm:h-16 mx-auto mb-2" />
          <p className="text-base sm:text-xl md:text-3xl font-bold italic tracking-wide leading-relaxed text-white font-serif">
            "The cognitive clarity and recovery acceleration I've achieved with
            their custom clinical protocols is honestly revolutionary. I track
            my biological age closely, and the results speak for themselves."
          </p>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b89047]">
              Alex Rivera
            </span>
            <span className="text-[8.5px] sm:text-[9px] text-slate-300 font-bold uppercase tracking-wider font-sans">
              Professional CrossFit Athlete & Human Performance Coach
            </span>
          </div>
        </div>
      </motion.section>

      {/* SECTION 8: FAQ ACCORDION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="py-12 sm:py-16 md:py-24 bg-[#faf9f6] border-t border-[#0a192f]/5"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-14">
            <span className="text-[#b89047] font-bold uppercase tracking-[0.25em] text-[9px]">
              CLINICAL PROTOCOLS FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#0a192f] mt-1 sm:mt-2 uppercase tracking-tight font-serif">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {[
              {
                q: "What makes these longevity protocols different from standard supplements?",
                a: "Unlike typical over-the-counter supplements, our formulations use liposomal carrier membranes to shield active molecules from stomach acids, dramatically increasing plasma bioavailability. Every batch is certified under third-party laboratory HPLC protocols.",
              },
              {
                q: "How does the personalized diagnostic system function?",
                a: "By completing our onboarding assessment, your answers are mapped to clinical marker projections. For advanced users, we integrate direct blood panel data and clinician review to customize concentration variables.",
              },
              {
                q: "Are the formulations certified by third parties?",
                a: "Yes. Every molecular batch undergoes complete HPLC, heavy metals, pesticide, and purity assays in ISO-certified laboratories. You can view the Certificate of Analysis (COA) directly on our Science Hub.",
              },
              {
                q: "Can standard clinicians read or recommend these stacks?",
                a: "Absolutely. We provide a physician referral dashboard. Clinicians can create custom programs, review molecular monographs, and track diagnostic baseline charts directly within their provider login portal.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl sm:rounded-2xl border border-[#0a192f]/5 overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left focus:outline-none cursor-pointer gap-3"
                >
                  <span className="font-bold text-[#0a192f] text-[11px] sm:text-xs uppercase tracking-wider font-serif">
                    {faq.q}
                  </span>
                  <span
                    className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center transition-all duration-350 text-xs ${
                      activeFaq === index
                        ? "bg-[#b89047] text-white rotate-180"
                        : "bg-[#faf9f6] text-[#0a192f] border border-[#0a192f]/5"
                    }`}
                  >
                    ↓
                  </span>
                </button>
                <div
                  className={`px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    activeFaq === index
                      ? "max-h-48 pb-5 sm:pb-6 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-slate-600 text-xs leading-relaxed font-medium pt-2 border-t border-[#0a192f]/5 font-sans">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 9: INSTAGRAM COMMUNITY FEED */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="py-12 sm:py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 border-t border-[#0a192f]/5"
      >
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#0a192f]">
            @BIOHACKERSFUEL_OFFICIAL
          </h3>
          <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#b89047] cursor-pointer hover:text-[#0a192f] transition-colors">
            <FaInstagram size={14} /> Join Community
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {[
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
            "https://images.unsplash.com/photo-1549476464-37392f717541",
            "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
            "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5",
          ].map((img, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-xl sm:rounded-[2rem] overflow-hidden group relative border border-[#0a192f]/5 shadow-sm bg-white"
            >
              <img
                src={`${img}?auto=format&fit=crop&q=80&w=400`}
                className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-90 transition-all duration-700"
                alt="Instagram Feed"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <FaInstagram className="text-white text-xl" />
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* App Companion Section */}
      <AppDownloadSection />
    </div>
  );
};

export default Home;
