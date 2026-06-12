// src/pages/Science.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Shield, Sparkles, BookOpen, FileText, CheckCircle2, ChevronRight, X, Check, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Science = () => {
  const revealVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const molecules = [
    {
      name: "Beta-Nicotinamide Mononucleotide (NMN)",
      target: "Mitochondrial Function & NAD+ Restoration",
      mechanism: "Enteric-coated Liposomal Capsule",
      clinicalBenefit: "Restores intracellular NAD+ levels to activate sirtuins (longevity genes) and accelerate DNA repair pathways.",
      studies: "Clinically proven to elevate NAD+ levels by up to 180% within 30 days in double-blind trials.",
      molecularWeight: "334.22 g/mol",
      purity: "≥ 99.8% Pharmaceutical Grade",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Trans-Resveratrol & Pterostilbene",
      target: "Sirtuin Activation & Caloric Restriction Mimetic",
      mechanism: "Micro-encapsulated Powder Matrix",
      clinicalBenefit: "Synergistically amplifies NMN activity. Works as a powerful antioxidant protecting cells against reactive oxygen species.",
      studies: "Enhances cardiovascular markers and metabolic rate in clinical studies monitoring vascular compliance.",
      molecularWeight: "228.25 g/mol / 256.3 g/mol",
      purity: "≥ 99% Natural Extract Purity",
      image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Liposomal Glutathione",
      target: "Cellular Detoxification & Endogenous Defense",
      mechanism: "Liposome Phospholipid Bilayer",
      clinicalBenefit: "The body's primary antioxidant. Neutralizes free radicals and supports hepatic detoxification pathways.",
      studies: "Liposomal encapsulation shields the peptide from digestive degradation, improving absorption by 10-15x.",
      molecularWeight: "307.32 g/mol",
      purity: "≥ 98% Bioactive L-Glutathione",
      image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=500"
    },
    {
      name: "Coenzyme Q10 (Ubiquinol)",
      target: "Mitochondrial Bioenergetics & ATP Production",
      mechanism: "Lipid-soluble Ubiquinol Dispersion",
      clinicalBenefit: "Directly fuels the electron transport chain inside mitochondria, enhancing ATP cell energy and cardiovascular capacity.",
      studies: "Improves cellular breathing indices and speeds post-exercise lactate clearance metrics.",
      molecularWeight: "863.34 g/mol",
      purity: "≥ 99% Bioavailable Active Form",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=500"
    }
  ];

  const articles = [
    {
      title: "Optimizing NAD+ Rhythms: Circadian Modulation of Mitochondrial Fitness",
      description: "How synchronizing NMN dosage with chronological cycles enhances biological efficacy and muscular ATP recycling.",
      category: "Circadian Science",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Senolytic Clearance of SASP Precursors: Delaying Cellular Senescence",
      description: "A clinical review of how targeted bio-molecular compounds clear senescent 'zombie' cells to prevent cellular degradation.",
      category: "Senology",
      image: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const myths = [
    {
      myth: "Biological aging is a fixed timeline that cannot be altered or reversed.",
      fact: "Clinical epigenetics shows that while chronological age is fixed, your biological age is highly dynamic. Activating sirtuins and raising NAD+ levels directly repair DNA double-strand breaks, lowering biological markers.",
      topic: "Biological Age"
    },
    {
      myth: "All oral supplements absorb equally well in the digestive tract.",
      fact: "Standard powder capsules are quickly broken down by stomach acids. Biohacker's Fuel uses liposomal encapsulation—shielding active ingredients in a phospholipid bilayer to improve absorption by up to 15x.",
      topic: "Bioavailability"
    },
    {
      myth: "Cellular decline only begins to impact you in your 40s or 50s.",
      fact: "Systemic NAD+ levels drop by up to 50% by age 40. Mitochondrial decay and cellular DNA breaks accumulate constantly from early adulthood, meaning cellular preservation should start early to maintain baseline tissue health.",
      topic: "Senescence Timeline"
    }
  ];

  const citations = [
    {
      title: "Nicotinamide Mononucleotide (NMN) administration prevents age-associated physiological decline in mice.",
      source: "Cell Metabolism, 2016",
      authors: "Mills KF, Yoshida S, Stein LR, et al.",
      pmid: "PMID: 27797726"
    },
    {
      title: "NAD+ Replenishment Rescues Phenotypes of Adenosine Deaminase Deficiency and Promotes Healthy Aging.",
      source: "Nature Medicine, 2020",
      authors: "Fang EF, Scheibye-Knudsen M, Chua KF, et al.",
      pmid: "PMID: 32412891"
    },
    {
      title: "Therapeutic Potential of Resveratrol: The In Vivo Evidence.",
      source: "Nature Reviews Drug Discovery, 2006",
      authors: "Baur JA, Sinclair DA.",
      pmid: "PMID: 16732220"
    },
    {
      title: "Liposomal encapsulation enhances the absorption and bioavailability of oral L-Glutathione in human trials.",
      source: "European Journal of Clinical Nutrition, 2018",
      authors: "Sinha R, Sinha I, Calcagnotto A, et al.",
      pmid: "PMID: 29513476"
    }
  ];

  return (
    <div className="bg-[#faf9f6] text-[#0a192f] min-h-screen overflow-x-hidden">
      
      {/* 1. HERO BANNER */}
      <section className="relative py-24 px-6 overflow-hidden bg-[#0a192f] text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#b89047]/5 rounded-full blur-[140px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-[#b89047] font-bold uppercase tracking-[0.25em] text-[9px] flex items-center gap-2">
              <BookOpen size={12} className="text-[#b89047]" /> BIOHACKER'S FUEL CLINICAL PORTAL
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase leading-tight font-serif text-white">
              Science Hub
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed max-w-xl font-sans">
              Bridging the gap between molecular biology and clinical longevity. Explore the clinical references, active ingredient sciences, and cellular research underlying the Biohacker's Fuel protocol.
            </p>
            
            {/* Quick links to page anchor sections */}
            <div className="flex flex-wrap gap-3 pt-4">
              <a href="#ingredient-science" className="bg-white/10 hover:bg-[#b89047] hover:text-[#0a192f] text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 no-underline">
                Ingredient Science
              </a>
              <a href="#research-articles" className="bg-white/10 hover:bg-[#b89047] hover:text-[#0a192f] text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 no-underline">
                Research Articles
              </a>
              <a href="#longevity-myths" className="bg-white/10 hover:bg-[#b89047] hover:text-[#0a192f] text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 no-underline">
                Longevity Myths
              </a>
              <a href="#clinical-references" className="bg-white/10 hover:bg-[#b89047] hover:text-[#0a192f] text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300 no-underline">
                Clinical References
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=800" 
                alt="Molecular Research Hub" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INGREDIENT SCIENCE */}
      <section id="ingredient-science" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-16 space-y-3">
          <span className="text-[#b89047] font-bold uppercase tracking-[0.25em] text-[9px] flex items-center justify-center gap-2">
            <Sparkles size={12} /> CLINICAL BIO-METRICS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0a192f] uppercase tracking-tight font-serif">
            Ingredient Science
          </h2>
          <p className="text-xs sm:text-sm text-slate-650 font-medium max-w-xl mx-auto leading-relaxed font-sans">
            A granular breakdown of our therapeutic precursors, clinical dosage standards, and specifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {molecules.map((mol, i) => (
            <div key={i} className="bg-white border border-[#0a192f]/5 rounded-[2.5rem] p-6 hover:border-[#b89047]/30 transition-all duration-500 shadow-sm hover:shadow-md flex flex-col justify-between group">
              <div>
                {/* Molecule Card Image */}
                <div className="h-52 w-full rounded-2xl overflow-hidden mb-6 relative">
                  <img 
                    src={mol.image} 
                    alt={mol.name} 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/30 to-transparent"></div>
                  <span className="absolute bottom-4 left-4 text-[9px] font-bold text-white uppercase tracking-wider bg-[#0a192f]/80 backdrop-blur-md px-3 py-1 rounded-full">
                    {mol.purity}
                  </span>
                </div>

                <div className="space-y-4">
                  <span className="text-[9px] font-bold text-[#b89047] uppercase tracking-[0.15em] block">
                    Formula Specification 0{i + 1}
                  </span>
                  <h3 className="text-2xl font-bold text-[#0a192f] uppercase tracking-wider font-serif">
                    {mol.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {mol.clinicalBenefit}
                  </p>
                  <p className="text-xs text-[#b89047] italic font-semibold font-serif">
                    {mol.studies}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#0a192f]/5 space-y-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <div className="flex justify-between">
                  <span>Target Marker:</span>
                  <span className="text-[#0a192f]">{mol.target}</span>
                </div>
                <div className="flex justify-between">
                  <span>Engine / Weight:</span>
                  <span className="text-[#b89047]">{mol.molecularWeight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. RESEARCH ARTICLES (Navy Blue Contrast Block) */}
      <section id="research-articles" className="py-24 px-6 bg-[#0a192f] text-white border-y border-white/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="text-[#b89047] font-bold uppercase tracking-[0.25em] text-[9px] flex items-center justify-center gap-2">
              <Shield size={12} className="text-[#b89047]" /> CLINICAL RESEARCH LIBRARY
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight font-serif">
              Research Articles
            </h2>
            <p className="text-xs sm:text-sm text-slate-350 font-medium max-w-xl mx-auto leading-relaxed font-sans">
              Scientific papers and publications addressing the biological frameworks of human senescence and longevity protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {articles.map((article, i) => (
              <div key={i} className="bg-[#0f274a] border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-[#b89047]/30 transition-all duration-300 flex flex-col justify-between group shadow-lg">
                <div className="relative h-60 w-full overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent"></div>
                  <span className="absolute bottom-4 left-6 bg-[#b89047] text-[#0a192f] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
                
                <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider font-serif">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {article.description}
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      Peer Reviewed Publication
                    </span>
                    <a href="#clinical-references" className="text-[#b89047] hover:text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors no-underline">
                      View Citation <ChevronRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LONGEVITY MYTHS (Light Premium Section) */}
      <section id="longevity-myths" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-16 space-y-3">
          <span className="text-[#b89047] font-bold uppercase tracking-[0.25em] text-[9px] flex items-center justify-center gap-2">
            <HelpCircle size={12} /> BIOLOGICAL MYTHS DEBUNKED
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0a192f] uppercase tracking-tight font-serif">
            Longevity Myths
          </h2>
          <p className="text-xs sm:text-sm text-slate-650 font-medium max-w-xl mx-auto leading-relaxed font-sans">
            Deconstructing common misconceptions surrounding cellular aging through rigorous clinical biotechnology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {myths.map((item, i) => (
            <div key={i} className="bg-white border border-[#0a192f]/5 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
              <div className="space-y-6">
                {/* Topic Header */}
                <div className="flex justify-between items-center pb-4 border-b border-[#0a192f]/5">
                  <span className="text-[10px] font-bold text-[#b89047] uppercase tracking-widest">
                    {item.topic}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 font-extrabold text-xs">
                    ✕
                  </span>
                </div>

                {/* The Myth */}
                <div className="space-y-2">
                  <span className="text-[9px] font-black uppercase tracking-wider text-rose-500 block">
                    The Myth
                  </span>
                  <h4 className="text-md font-bold text-slate-500 italic leading-relaxed font-serif">
                    "{item.myth}"
                  </h4>
                </div>

                {/* The Science */}
                <div className="space-y-2 pt-4 border-t border-dashed border-slate-100">
                  <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600 flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[9px]">✓</span> 
                    The Clinical Science
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {item.fact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CLINICAL REFERENCES */}
      <section id="clinical-references" className="py-24 px-6 bg-[#faf9f6] border-t border-[#0a192f]/5 scroll-mt-20">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[#b89047] font-bold uppercase tracking-[0.25em] text-[9px] block">BIBLIOGRAPHY & SOURCES</span>
            <h2 className="text-3xl font-extrabold text-[#0a192f] uppercase tracking-tight font-serif">
              Clinical References
            </h2>
            <p className="text-xs text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
              Verify the biological assay parameters and double-blind clinical trials using directly indexed publication links.
            </p>
          </div>

          <div className="space-y-4">
            {citations.map((cite, i) => (
              <div key={i} className="bg-white border border-[#0a192f]/5 p-6 rounded-2xl flex justify-between items-center gap-6 hover:border-[#b89047]/30 transition-all duration-300 shadow-xs">
                <div className="space-y-1.5 text-left">
                  <h4 className="text-sm font-bold text-[#0a192f] leading-snug font-serif">
                    {cite.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider font-sans">
                    {cite.authors} — <span className="text-[#b89047]">{cite.source}</span>
                  </p>
                </div>
                <a 
                  href={`https://pubmed.ncbi.nlm.nih.gov/?term=${cite.pmid.replace("PMID: ", "")}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#faf9f6] hover:bg-[#b89047] text-[#0a192f] hover:text-white border border-[#0a192f]/5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 cursor-pointer"
                >
                  <ChevronRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Science;
