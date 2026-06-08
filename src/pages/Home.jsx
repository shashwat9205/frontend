// src/pages/Home.jsx
import React, { useState } from "react";
import Hero from "../components/Hero";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaQuoteLeft,
  FaShieldAlt,
  FaBolt,
  FaHeart,
  FaClock,
  FaFileMedical,
  FaBookOpen,
  FaRegHospital,
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
  Award,
} from "lucide-react";
import AppDownloadSection from "../components/AppDownloadSection";
import CylinderCarousel from "@/components/CylinderCarousel";
import lady from "../assets/lady.png";

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  // Biological Age Calculator State
  const [calcAge, setCalcAge] = useState(40);
  const [calcSleep, setCalcSleep] = useState("moderate");
  const [calcStress, setCalcStress] = useState("moderate");
  const [calcActivity, setCalcActivity] = useState("moderate");

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

    return { estimatedBioAge, nadPercent, recommendation, recDesc };
  };

  const { estimatedBioAge, nadPercent, recommendation, recDesc } =
    calculateMetrics();

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  const clinicalProtocols = [
    {
      title: "Cellular & DNA Repair",
      desc: "Up-regulate NAD+ synthesis pathways and stimulate sirtuin enzymes to target cellular damage at the nucleus.",
      biomarkers: "NAD+ Levels, Glycation, Epigenetic Age Index",
      icon: <Dna className="w-5 h-5 text-primary" />,
      link: "/quiz",
    },
    {
      title: "Neuro-Adrenal & Sleep Support",
      desc: "Modulate the hypothalamic-pituitary-adrenal (HPA) axis to promote deep circadian sleep and restore focus metrics.",
      biomarkers: "Diurnal Cortisol Curve, HRV Profile, Deep Sleep Latency",
      icon: <Brain className="w-5 h-5 text-primary" />,
      link: "/quiz",
    },
    {
      title: "Metabolic & Mitochondrial Fitness",
      desc: "Accelerate adenosine triphosphate (ATP) recycling and optimize insulin sensitivity index via glucose disposal pathways.",
      biomarkers: "HbA1c Baseline, Fasting Insulin, Mitochondrial Output",
      icon: <Activity className="w-5 h-5 text-primary" />,
      link: "/quiz",
    },
  ];

  const focusAreasList = [
    {
      title: "NAD+ Coenzymes",
      desc: "Clinical precursors utilizing enteric-coated liposomal encapsulation for targeted systemic bioavailability.",
      icon: <Dna className="w-6 h-6 text-primary" />,
      link: "/science",
      bg: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400",
    },
    {
      title: "Circadian Regulators",
      desc: "Neuromodulators formulated to lower brain wave frequency and enhance delta-wave rest cycles.",
      icon: <Brain className="w-6 h-6 text-primary" />,
      link: "/science",
      bg: "https://images.unsplash.com/photo-1511295742364-92767fa62d9f?auto=format&fit=crop&q=80&w=400",
    },
    {
      title: "Senolytic Compounds",
      desc: "Targeted botanical molecules certified to clear senescent 'zombie' cells without inflammatory cascades.",
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      link: "/science",
      bg: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=400",
    },
  ];

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
                title: "CLINICALLY VALIDATED",
                desc: "Every molecular protocol undergoes independent HPLC and chemical composition validation.",
              },
              {
                icon: <FaBolt className="w-5 h-5 text-primary" />,
                title: "LIPOSOMAL BIOAVAILABILITY",
                desc: "Enriched with enteric-resistant lipid carrier layers for optimized cellular absorption.",
              },
              {
                icon: <FaHeart className="w-5 h-5 text-primary" />,
                title: "PHYSICIAN PRESCRIPTIIVE",
                desc: "Developed in clinical partnership with board-certified longevity experts and researchers.",
              },
              {
                icon: <FaClock className="w-5 h-5 text-primary" />,
                title: "BIOMARKER TRACKED",
                desc: "Formulas dynamically adjusted based on metabolic, sleep, and DNA diagnostics.",
              },
            ].map((badge, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="p-3 bg-card border border-border rounded-xl text-primary shrink-0">
                  {badge.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
                    {badge.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-stone-400 font-medium leading-relaxed">
                    {badge.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Interactive Biological Age & NAD+ Calculator */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={revealVariants}
        className="py-20 md:py-28 max-w-7xl mx-auto px-6"
      >
        <div className="text-center mb-16 space-y-2">
          <span className="text-primary font-bold uppercase tracking-widest text-[9px] flex items-center justify-center gap-2">
            <Activity className="w-3.5 h-3.5" /> METABOLIC BASAL CALCULATOR
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight">
            Assess Your Cellular Metrics
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 font-medium max-w-lg mx-auto">
            Input chronological values to forecast your estimated cellular
            resilience and discover your recommended scientific protocol path.
          </p>
        </div>

        <div className="bg-card border border-border rounded-[2.5rem] p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Sliders Side */}
          <div className="flex flex-col justify-center space-y-8">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider border-b border-border pb-3 flex items-center gap-2">
              <FaFileMedical className="text-primary text-sm" /> 1. Basal
              Biomarker Inputs
            </h3>

            {/* Slider 1: Chronological Age */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-300 font-bold uppercase tracking-wider">
                  Chronological Age
                </span>
                <span className="text-primary font-mono font-black text-lg">
                  {calcAge} years
                </span>
              </div>
              <input
                type="range"
                min="25"
                max="80"
                value={calcAge}
                onChange={(e) => setCalcAge(Number(e.target.value))}
                className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary border border-border"
              />
            </div>

            {/* Selector 2: Sleep Duration */}
            <div className="space-y-3">
              <span className="text-xs text-stone-300 font-bold uppercase tracking-wider block">
                Average Sleep Cycle
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "poor", label: "Less than 6h" },
                  { id: "moderate", label: "6 to 8h" },
                  { id: "optimal", label: "8h+ Rested" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setCalcSleep(opt.id)}
                    className={`py-3 px-2 text-[10px] font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${calcSleep === opt.id ? "bg-primary border-primary text-background" : "bg-secondary border-border text-stone-400 hover:text-white"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Selector 3: Stress Profile */}
            <div className="space-y-3">
              <span className="text-xs text-stone-300 font-bold uppercase tracking-wider block">
                Occupational Stress Profile
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "low", label: "Stabilized" },
                  { id: "moderate", label: "Moderate" },
                  { id: "high", label: "Executive / High" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setCalcStress(opt.id)}
                    className={`py-3 px-2 text-[10px] font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${calcStress === opt.id ? "bg-primary border-primary text-background" : "bg-secondary border-border text-stone-400 hover:text-white"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Selector 4: Physical Output */}
            <div className="space-y-3">
              <span className="text-xs text-stone-300 font-bold uppercase tracking-wider block">
                Cardiovascular Physical Output
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "sedentary", label: "Sedentary" },
                  { id: "moderate", label: "Active" },
                  { id: "high", label: "High Athletic" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setCalcActivity(opt.id)}
                    className={`py-3 px-2 text-[10px] font-bold uppercase tracking-wider rounded-xl border transition-all cursor-pointer ${calcActivity === opt.id ? "bg-primary border-primary text-background" : "bg-secondary border-border text-stone-400 hover:text-white"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Side */}
          <div className="bg-secondary/40 border border-border rounded-[2rem] p-8 flex flex-col justify-between items-center text-center relative">
            <div className="space-y-8 w-full">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider border-b border-border pb-3 flex items-center justify-center gap-2">
                <Award className="text-primary w-4.5 h-4.5" /> 2. Estimated
                Bio-Metrics
              </h3>

              <div className="grid grid-cols-2 gap-4 w-full">
                {/* Metric 1: Biological Age */}
                <div className="bg-card border border-border p-5 rounded-2xl flex flex-col items-center justify-center">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">
                    Biological Age
                  </span>
                  <span className="text-4xl font-extrabold text-white mt-1.5">
                    {estimatedBioAge}{" "}
                    <span className="text-xs font-normal text-stone-400">
                      yrs
                    </span>
                  </span>
                  <span
                    className={`text-[9px] font-bold uppercase mt-2 px-2.5 py-0.5 rounded-full ${estimatedBioAge > calcAge ? "bg-red-950/40 text-red-400 border border-red-950/50" : "bg-emerald-950/40 text-emerald-400 border border-emerald-950/50"}`}
                  >
                    {estimatedBioAge > calcAge
                      ? `+${estimatedBioAge - calcAge} Year Offset`
                      : `${estimatedBioAge === calcAge ? "Baseline Level" : `${calcAge - estimatedBioAge} Year Advantage`}`}
                  </span>
                </div>

                {/* Metric 2: NAD+ Capacity */}
                <div className="bg-card border border-border p-5 rounded-2xl flex flex-col items-center justify-center">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">
                    Est. NAD+ Capacity
                  </span>
                  <span className="text-4xl font-extrabold text-white mt-1.5">
                    {nadPercent}%
                  </span>
                  <div className="w-full bg-secondary h-1.5 rounded-full mt-3 overflow-hidden border border-border/50">
                    <div
                      className="bg-primary h-full transition-all duration-500"
                      style={{ width: `${nadPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Suggested Protocol Card */}
              <div className="bg-card border border-border p-6 rounded-2xl text-left space-y-2">
                <span className="text-[9px] font-bold tracking-widest text-primary uppercase">
                  Recommended Pathway Clinical Protocol
                </span>
                <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
                  {recommendation}
                </h4>
                <p className="text-[11px] text-stone-400 leading-relaxed font-medium">
                  {recDesc}
                </p>
              </div>
            </div>

            <div className="pt-8 w-full">
              <a
                href="/quiz"
                className="bg-primary hover:opacity-90 text-background w-full py-4 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all shadow-xl block text-center no-underline duration-300"
              >
                Initiate Board Diagnosis & Quiz
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Clinical Target Protocols Section (Replacing Product Catalog) */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={revealVariants}
        className="py-20 md:py-28 bg-card border-y border-border"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 space-y-2">
            <span className="text-primary font-bold uppercase tracking-widest text-[9px] flex items-center justify-center gap-2">
              <Shield className="w-3.5 h-3.5" /> ADVANCED CLINICAL PATHWAYS
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight">
              Longevity Protocols
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 font-medium max-w-lg mx-auto">
              Our targeted programs are developed to target biological markers,
              restoring homeostasis under the direction of medical boards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {clinicalProtocols.map((protocol, i) => (
              <div
                key={i}
                className="bg-background border border-border rounded-[2.25rem] p-8 flex flex-col justify-between hover:border-primary/45 transition-all duration-300"
              >
                <div className="space-y-6">
                  <div className="w-11 h-11 rounded-2xl bg-secondary/80 flex items-center justify-center border border-border">
                    {protocol.icon}
                  </div>
                  <div className="space-y-2.5">
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                      {protocol.title}
                    </h3>
                    <p className="text-xs text-stone-400 leading-relaxed font-medium">
                      {protocol.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-border mt-8 space-y-5">
                  <div>
                    <span className="text-[8px] font-bold text-stone-500 uppercase tracking-widest block">
                      TARGETED BIOMARKERS
                    </span>
                    <span className="text-[10px] font-bold text-white tracking-wide mt-1 block uppercase">
                      {protocol.biomarkers}
                    </span>
                  </div>
                  <a
                    href={protocol.link}
                    className="group flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-primary no-underline pt-1"
                  >
                    Explore Protocol Specifications{" "}
                    <ArrowRight
                      size={12}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Focus Area Monograph Grid (Reframed Categories) */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={revealVariants}
        className="py-20 md:py-28 max-w-7xl mx-auto px-6"
      >
        <div className="text-center mb-16 space-y-2">
          <span className="text-primary font-bold uppercase tracking-widest text-[9px] flex items-center justify-center gap-2">
            <FaRegHospital className="w-3 h-3" /> CLINICAL PHARMACOLOGY
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight">
            Therapeutic Monographs
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 font-medium max-w-lg mx-auto">
            Review our primary cellular restoration compounds and physiological
            mechanism profiles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {focusAreasList.map((cat, i) => (
            <a
              href={cat.link}
              key={i}
              className="group relative h-80 rounded-[2.5rem] overflow-hidden border border-border bg-black flex flex-col justify-end p-8 no-underline"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:scale-103 group-hover:opacity-40 transition-all duration-700"
                style={{ backgroundImage: `url(${cat.bg})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-background/90 border border-border rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-background transition-all">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-stone-400 font-medium leading-relaxed mt-2">
                    {cat.desc}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Analyze Clinical Science <ArrowRight size={12} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </motion.section>

      {/* Scientific Research Publications & Trials (NEW) */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={revealVariants}
        className="py-20 md:py-28 bg-card border-y border-border"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-[9px] flex items-center gap-2">
                <FaBookOpen className="w-3 h-3" /> CLINICAL TRIALS REPOSITORY
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-1 uppercase tracking-tight">
                Published Clinical Studies
              </h2>
            </div>
            <a
              href="/science"
              className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white bg-secondary/80 border border-border px-5 py-3 rounded-full hover:border-primary/45 transition-all no-underline"
            >
              Access Science Hub{" "}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {publications.map((paper, i) => (
              <div
                key={i}
                className="bg-background border border-border rounded-[2.25rem] p-8 flex flex-col justify-between hover:border-primary/20 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-widest text-primary uppercase font-mono">
                      {paper.journal}
                    </span>
                    <span className="text-[11px] font-bold uppercase bg-emerald-950/40 text-emerald-400 border border-emerald-950/50 px-2.5 py-0.5 rounded-full">
                      Peer Reviewed
                    </span>
                  </div>
                  <h3 className="text-sm md:text-base font-extrabold text-white leading-snug uppercase tracking-wider">
                    {paper.title}
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-medium">
                    {paper.summary}
                  </p>
                </div>
                <div className="pt-6 border-t border-border mt-6 flex justify-between items-center text-[10px]">
                  <div>
                    <span className="text-stone-500 uppercase tracking-wider block text-[8px]">
                      CLINICAL INVESTIGATORS
                    </span>
                    <span className="text-stone-300 font-bold uppercase tracking-wide">
                      {paper.authors}
                    </span>
                  </div>
                  <a
                    href="/science"
                    className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider hover:text-white transition-colors no-underline"
                  >
                    View Trial Data <FileText size={12} />
                  </a>
                </div>
              </div>
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
        className="py-20 md:py-28 max-w-7xl mx-auto px-6"
      >
        <div className="text-center mb-16 space-y-2">
          <span className="text-primary font-bold uppercase tracking-widest text-[9px]">
            CLINICAL PROTOCOL ENGINE
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight">
            Onboarding Methodology
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 font-medium max-w-lg mx-auto">
            A clinically structured process integrating baseline diagnostic
            metrics with custom therapeutic formulations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {[
            {
              step: "01",
              title: "Onboarding Metrics",
              desc: "Complete our comprehensive biological quiz or submit clinic laboratory biomarker data directly to our database.",
            },
            {
              step: "02",
              title: "Clinical Formulation",
              desc: "Our longevity board reviews your metabolical baseline to personalize custom molecular concentration protocols.",
            },
            {
              step: "03",
              title: "Biometric Monitoring",
              desc: "Monitor ongoing sleep latency, physical power recovery curves, and biochemical indicators over a 90-day cycle.",
            },
            {
              step: "04",
              title: "Adaptive Calibration",
              desc: "Schedule clinical consultations with advisory board doctors to adjust dosage values and target aging hallmarks.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-card/40 border border-border rounded-3xl p-8 relative z-10 flex flex-col gap-4"
            >
              <span className="text-4xl font-black text-primary/20 font-mono leading-none">
                {item.step}
              </span>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                {item.title}
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            href="/quiz"
            className="bg-primary hover:opacity-90 text-background px-10 py-4 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all shadow-xl inline-block no-underline duration-300"
          >
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
        className="py-20 md:py-28 bg-background border-y border-border"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-primary font-bold uppercase tracking-widest text-[9px] flex items-center gap-2">
                <Shield size={12} /> EVIDENCE-BASED MEDICINE
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">
                Peer-Reviewed Science.
                <br />
                Clinical Validation.
              </h2>
              <p className="text-stone-300 text-sm leading-relaxed font-medium">
                We advocate that cell optimization must rest on clinical trial
                verification rather than lifestyle marketing. Each formula stack
                of our liposomal range undergoes strict heavy metal, purity, and
                HPLC assays.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3 items-center">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    ✓
                  </div>
                  <span className="text-xs font-bold text-white">
                    Liposomal delivery layers for enhanced biological absorption
                  </span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    ✓
                  </div>
                  <span className="text-xs font-bold text-white">
                    99.8% pharmaceutical-grade NMN purity standard
                  </span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    ✓
                  </div>
                  <span className="text-xs font-bold text-white">
                    Endorsed by leading anti-aging clinical advisory boards
                  </span>
                </div>
              </div>
              <div className="pt-4">
                <a
                  href="/science"
                  className="bg-primary hover:opacity-90 text-background px-10 py-4 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all shadow-xl inline-block no-underline duration-300"
                >
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
                  <h4 className="text-xs font-bold uppercase text-white tracking-wider">
                    Whitepapers Published
                  </h4>
                  <p className="text-[10px] text-stone-400 font-medium">
                    Read our double-blind clinical trials on NAD+ restoration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <CylinderCarousel />

      {/* Scientific Advisory / Doctor recommendations */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20px" }}
        variants={revealVariants}
        className="py-20 md:py-28 max-w-7xl mx-auto px-6"
      >
        <div className="text-center mb-16 space-y-2">
          <span className="text-primary font-bold uppercase tracking-widest text-[9px] flex items-center justify-center gap-2">
            <Calendar className="w-3.5 h-3.5" /> CLINICAL ADVISORY BOARD
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight">
            Doctors & Longevity Advisors
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 font-medium max-w-lg mx-auto">
            Backed by world-renowned longevity researchers, molecular
            biologists, and sports medicine physicians.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          ].map((doc, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-[2rem] overflow-hidden group"
            >
              <div className="aspect-[4/3] bg-black overflow-hidden relative border-b border-border">
                <img
                  src={doc.img}
                  alt={doc.name}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 space-y-3">
                <span className="text-primary font-bold tracking-widest text-[9px] uppercase">
                  {doc.role}
                </span>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                  {doc.name}
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed font-medium">
                  {doc.bio}
                </p>
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
        className="py-20 md:py-28 bg-card/45 border-y border-border"
      >
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <FaQuoteLeft className="text-primary/10 w-20 h-20 mx-auto mb-8" />
          <div className="space-y-8">
            <p className="text-xl md:text-3xl font-extrabold italic tracking-normal leading-relaxed text-white max-w-3xl mx-auto">
              "The cognitive clarity and recovery acceleration I've achieved
              with their custom clinical protocols is honestly revolutionary. I
              track my biological age closely, and the results speak for
              themselves."
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
        className="py-20 md:py-28 max-w-3xl mx-auto px-6"
      >
        <div className="text-center mb-16">
          <span className="text-primary font-bold uppercase tracking-widest text-[9px]">
            CLINICAL PROTOCOLS FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-1 uppercase tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-4">
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
              className="bg-card rounded-[1.5rem] border border-border overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
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
        className="py-20 md:py-28 bg-card/20 border-t border-border"
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
