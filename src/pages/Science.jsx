// src/pages/Science.jsx
import React from 'react';
import { Shield, Sparkles, BookOpen, FileText, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
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
      purity: "≥ 99.8% Pharmaceutical Grade"
    },
    {
      name: "Trans-Resveratrol & Pterostilbene",
      target: "Sirtuin Activation & Caloric Restriction Mimetic",
      mechanism: "Micro-encapsulated Powder Matrix",
      clinicalBenefit: "Synergistically amplifies NMN activity. Works as a powerful antioxidant protecting cells against reactive oxygen species.",
      studies: "Enhances cardiovascular markers and metabolic rate in clinical studies monitoring vascular compliance.",
      molecularWeight: "228.25 g/mol / 256.3 g/mol",
      purity: "≥ 99% Natural Extract Purity"
    },
    {
      name: "Liposomal Glutathione",
      target: "Cellular Detoxification & Endogenous Defense",
      mechanism: "Liposome Phospholipid Bilayer",
      clinicalBenefit: "The body's primary antioxidant. Neutralizes free radicals and supports hepatic detoxification pathways.",
      studies: "Liposomal encapsulation shields the peptide from digestive degradation, improving absorption by 10-15x.",
      molecularWeight: "307.32 g/mol",
      purity: "≥ 98% Bioactive L-Glutathione"
    },
    {
      name: "Coenzyme Q10 (Ubiquinol)",
      target: "Mitochondrial Bioenergetics & ATP Production",
      mechanism: "Lipid-soluble Ubiquinol Dispersion",
      clinicalBenefit: "Directly fuels the electron transport chain inside mitochondria, enhancing ATP cell energy and cardiovascular capacity.",
      studies: "Improves cellular breathing indices and speeds post-exercise lactate clearance metrics.",
      molecularWeight: "863.34 g/mol",
      purity: "≥ 99% Bioavailable Active Form"
    }
  ];

  return (
    <div className="bg-background text-foreground min-h-screen py-10">
      
      {/* Title Header */}
      <section className="relative py-20 px-6 overflow-hidden border-b border-border bg-card/25">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-primary font-bold uppercase tracking-widest text-[9px] flex items-center justify-center gap-2">
            <BookOpen size={12} /> THE LONGEVITY PROTOCOL
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase leading-tight">
            The Science of Cellular Longevity
          </h1>
          <p className="text-stone-300 text-sm max-w-xl mx-auto leading-relaxed font-medium">
            Bridging the gap between molecular biology and clinical longevity. We isolate advanced precursors to delay cellular senescence.
          </p>
        </div>
      </section>

      {/* Hallmarks of Aging */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={revealVariants}
        className="py-16 px-6 max-w-7xl mx-auto"
      >
        <div className="text-center mb-16 space-y-2">
          <span className="text-primary font-bold uppercase tracking-widest text-[9px]">BIOLOGICAL HALLMARKS</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase">HALLMARKS OF AGING WE TARGET</h2>
          <p className="text-xs sm:text-sm text-stone-400 font-medium max-w-lg mx-auto">Our molecular formulations act directly on three core biological pathways responsible for physiological decline.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Mitochondrial Decay",
              description: "As NAD+ levels decline with age, mitochondria lose the capacity to manufacture ATP, resulting in fatigue and cellular death. NMN refills this pool.",
              stat: "-50% NAD+ by Age 40",
              target: "ATP & Energy pathways"
            },
            {
              title: "Cellular Senescence",
              description: "Damaged cells that cease dividing secrete inflammatory cytokines that degrade nearby healthy tissue. Our senolytic stacks help flush them out.",
              stat: "Hallmark of tissue decay",
              target: "SASP Clearance"
            },
            {
              title: "DNA Double-Strand Breaks",
              description: "Environmental toxins and replicative stress cause constant DNA breaks. Sirtuin enzymes repair these breaks but require NAD+ to activate.",
              stat: "Genomic Instability",
              target: "SIRT1 & SIRT6 Activation"
            }
          ].map((hallmark, i) => (
            <div key={i} className="bg-card border border-border p-8 rounded-3xl space-y-4">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">{hallmark.target}</span>
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">{hallmark.title}</h3>
              <p className="text-xs text-stone-400 leading-relaxed font-medium">{hallmark.description}</p>
              <div className="pt-4 border-t border-border flex justify-between items-center text-[10px] font-bold tracking-widest uppercase text-stone-300">
                <span>IMPACT</span>
                <span className="text-white">{hallmark.stat}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Ingredient Breakdown */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={revealVariants}
        className="py-16 px-6 bg-card/45 border-y border-border"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            <span className="text-primary font-bold uppercase tracking-widest text-[9px]">MOLECULAR METRICS</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase">THERAPEUTIC PRECURSORS</h2>
            <p className="text-xs sm:text-sm text-stone-400 font-medium max-w-lg mx-auto">Explore the biochemistry, clinical dosage delivery, and purity parameters of our core stacks.</p>
          </div>

          <div className="space-y-6">
            {molecules.map((mol, i) => (
              <div key={i} className="bg-background border border-border rounded-3xl p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Identification */}
                <div className="space-y-4">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Active Formula {i+1}</span>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider leading-tight">{mol.name}</h3>
                  <div className="space-y-2 text-xs font-bold text-stone-300 uppercase tracking-wider">
                    <p className="flex justify-between"><span>CELLULAR TARGET:</span> <span className="text-white">{mol.target}</span></p>
                    <p className="flex justify-between"><span>DELIVERY ENGINE:</span> <span className="text-white">{mol.mechanism}</span></p>
                  </div>
                </div>

                {/* Mechanism */}
                <div className="space-y-3 lg:border-x lg:border-border lg:px-8">
                  <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Clinical Action</h4>
                  <p className="text-xs text-stone-300 leading-relaxed font-medium">{mol.clinicalBenefit}</p>
                  <p className="text-xs text-stone-450 italic leading-relaxed font-medium">{mol.studies}</p>
                </div>

                {/* Assay details */}
                <div className="space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">Specification Assay</h4>
                    <div className="space-y-2 text-xs font-bold text-stone-300 uppercase tracking-wider">
                      <p className="flex justify-between"><span>Purity (HPLC):</span> <span className="text-primary">{mol.purity}</span></p>
                      <p className="flex justify-between"><span>Mol. Weight:</span> <span className="text-white">{mol.molecularWeight}</span></p>
                    </div>
                  </div>
                  <a href="/shop" className="w-full text-center py-3 bg-secondary hover:bg-primary hover:text-background text-foreground border border-border text-[9px] font-bold uppercase tracking-widest rounded-xl transition-all no-underline">
                    View Formulas
                  </a>
                </div>

              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Quality Control / Certificates */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={revealVariants}
        className="py-16 px-6 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-primary font-bold uppercase tracking-widest text-[9px] flex items-center gap-2">
              <Shield size={12} /> LABORATORY ASSURANCE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight leading-tight">
              Absolute Purity. No Compromises.
            </h2>
            <p className="text-stone-300 text-xs leading-relaxed font-medium">
              Unlike consumer-grade supplements, Biohacker's Fuel products are synthesized in cleanrooms. We release the full chemical assay for every production batch. You can download the certificates verifying zero heavy metals, zero microbial contaminants, and precise compound potency.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "HPLC Potency Verification Report",
                "Inductively Coupled Plasma (ICP-MS) Metal Assay",
                "Residual Solvent Analysis (GC-MS)",
                "Microbiological Pathogen Certificate"
              ].map((cert, idx) => (
                <div key={idx} className="flex gap-2.5 items-center">
                  <CheckCircle2 size={16} className="text-primary shrink-0" />
                  <span className="text-xs font-bold text-stone-200 uppercase tracking-wider">{cert}</span>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <button className="flex items-center gap-3 bg-primary hover:opacity-90 text-background px-8 py-3.5 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg cursor-pointer">
                <FileText size={14} /> Download Sample COA Report
              </button>
            </div>
          </div>
          <div className="relative rounded-[2rem] overflow-hidden border border-border aspect-video flex items-center justify-center bg-black">
            <img 
              src="https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=800" 
              alt="Quality Lab Assay" 
              className="w-full h-full object-cover opacity-60" 
            />
          </div>
        </div>
      </motion.section>

      {/* Bibliography & Clinical Citations */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={revealVariants}
        className="py-16 px-6 bg-card/20 border-t border-border"
      >
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <span className="text-primary font-bold uppercase tracking-widest text-[9px]">CLINICAL BIBLIOGRAPHY</span>
            <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight mt-1">Research Citations</h2>
          </div>
          <div className="space-y-4">
            {[
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
            ].map((cite, i) => (
              <div key={i} className="bg-card border border-border p-5 rounded-2xl flex justify-between items-center gap-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white leading-snug">{cite.title}</h4>
                  <p className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">{cite.authors} — <span className="text-primary">{cite.source}</span></p>
                </div>
                <a 
                  href={`https://pubmed.ncbi.nlm.nih.gov/?term=${cite.pmid.replace("PMID: ", "")}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-secondary hover:bg-primary hover:text-background border border-border rounded-full flex items-center justify-center text-stone-400 shrink-0 transition-all cursor-pointer"
                >
                  <ChevronRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

    </div>
  );
};

export default Science;
