// src/pages/BiohackingQuiz.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Brain, Dna, Activity, ArrowRight, ArrowLeft, Loader2, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { API_BASE_URL } from '../config';

const BiohackingQuiz = () => {
  const { addToCart } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  
  // Quiz Responses
  const [goal, setGoal] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [activity, setActivity] = useState('');
  const [concerns, setConcerns] = useState([]);
  const [leadData, setLeadData] = useState({ name: '', email: '', phone: '' });

  // Recommendations state
  const [recProducts, setRecProducts] = useState([]);
  const [cellScore, setCellScore] = useState(72);
  const [primaryHallmark, setPrimaryHallmark] = useState('');
  const [recProgram, setRecProgram] = useState('');

  // Fetch all products from API to map recommendations
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch(API_BASE_URL + 'api/products.php')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setAllProducts(data.data);
        }
      })
      .catch(err => console.error('Error fetching products for quiz:', err));
  }, []);

  const handleConcernToggle = (concern) => {
    if (concerns.includes(concern)) {
      setConcerns(concerns.filter(c => c !== concern));
    } else {
      setConcerns([...concerns, concern]);
    }
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!leadData.name || !leadData.email) return;

    setLoading(true);
    // Simulate diagnostic calculations
    setTimeout(() => {
      calculateResults();
      setLoading(false);
      setQuizFinished(true);
    }, 2000);
  };

  const calculateResults = () => {
    // 1. Calculate Score
    let baseScore = 80;
    if (ageGroup === '60+') baseScore -= 20;
    else if (ageGroup === '45-60') baseScore -= 12;
    else if (ageGroup === '30-45') baseScore -= 5;

    if (activity === 'sedentary') baseScore -= 8;
    else if (activity === 'moderate') baseScore += 2;
    else if (activity === 'active') baseScore += 6;

    baseScore -= concerns.length * 4;
    setCellScore(Math.max(45, Math.min(96, baseScore)));

    // 2. Map Primary Hallmark
    if (goal === 'energy' || goal === 'metabolic') {
      setPrimaryHallmark('Mitochondrial Decay (ATP Decline)');
      setRecProgram('Protocol X');
    } else if (goal === 'sleep' || goal === 'brain') {
      setPrimaryHallmark('Genomic Instability (Cognitive Fatigue)');
      setRecProgram('Cellular Reset Protocol');
    } else {
      setPrimaryHallmark('Cellular Senescence & Dermal Aging');
      setRecProgram('Epigenetic Reversal Plan');
    }

    // 3. Map products dynamically from available products
    let filtered = [];
    if (goal === 'energy' || goal === 'metabolic') {
      filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes('nmn') || 
        p.category?.toLowerCase().includes('nmn') ||
        p.category?.toLowerCase().includes('energy')
      );
    } else if (goal === 'sleep' || goal === 'brain') {
      filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes('sleep') || 
        p.name.toLowerCase().includes('circadian') || 
        p.name.toLowerCase().includes('nootropic')
      );
    } else {
      filtered = allProducts.filter(p => 
        p.name.toLowerCase().includes('glutathione') || 
        p.name.toLowerCase().includes('liposomal') || 
        p.name.toLowerCase().includes('skin')
      );
    }

    // Fallback if no matching products in DB yet
    if (filtered.length === 0) {
      filtered = allProducts.slice(0, 2);
    } else {
      filtered = filtered.slice(0, 2);
    }
    setRecProducts(filtered);
  };

  const stepsTitle = [
    "Primary Objective",
    "Biological Age Group",
    "Energy Output / Activity",
    "Hallmarks of Concern",
    "Initialize Protocol"
  ];

  return (
    <div className="bg-background text-foreground min-h-screen py-10 flex flex-col justify-center">
      <div className="max-w-xl sm:max-w-3xl mx-auto px-6 w-full">
        
        {!quizFinished ? (
          <div className="bg-card border border-border rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>

            {/* Header progress bar */}
            <div className="space-y-4 mb-10">
              <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-stone-400">
                <span>STEP {step} OF 5: {stepsTitle[step - 1]}</span>
                <span className="text-primary">{Math.round((step / 5) * 100)}%</span>
              </div>
              <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${(step / 5) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Steps Questionnaire */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                    What is your primary longevity objective?
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'energy', label: 'Boost Cellular Energy & Focus', icon: <Dna /> },
                      { id: 'sleep', label: 'Optimize Deep Sleep & Recovery', icon: <Brain /> },
                      { id: 'skin', label: 'Skin Health & Dermal Longevity', icon: <Sparkles /> },
                      { id: 'metabolic', label: 'Optimize Metabolic Regulation', icon: <Activity /> }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => { setGoal(opt.id); handleNext(); }}
                        className={`p-6 rounded-2xl border text-left flex gap-4 items-center transition-all cursor-pointer hover:border-primary/50 group
                          ${goal === opt.id ? 'border-primary bg-primary/10 text-white' : 'border-border bg-secondary/35 text-stone-300'}`}
                      >
                        <div className={`p-3 rounded-xl border border-border group-hover:text-primary transition-colors
                          ${goal === opt.id ? 'bg-primary text-background' : 'bg-background'}`}>
                          {opt.icon}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wide">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                    Select your chronological age group
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'under30', label: 'Under 30' },
                      { id: '30-45', label: '30 to 45' },
                      { id: '45-60', label: '45 to 60' },
                      { id: '60+', label: '60+' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => { setAgeGroup(opt.id); handleNext(); }}
                        className={`p-6 rounded-2xl border text-center transition-all cursor-pointer hover:border-primary/50 font-bold uppercase tracking-widest text-xs
                          ${ageGroup === opt.id ? 'border-primary bg-primary/10 text-white' : 'border-border bg-secondary/35 text-stone-300'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                    What is your physical activity level?
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'sedentary', label: 'Sedentary (Desk Job, Low Exercise)' },
                      { id: 'moderate', label: 'Moderate (Light Workouts 2-3x/wk)' },
                      { id: 'active', label: 'Active (Heavy Lifting 4-5x/wk)' },
                      { id: 'elite', label: 'Elite / Professional Athlete' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => { setActivity(opt.id); handleNext(); }}
                        className={`p-6 rounded-2xl border text-left transition-all cursor-pointer hover:border-primary/50 font-bold uppercase tracking-wider text-xs
                          ${activity === opt.id ? 'border-primary bg-primary/10 text-white' : 'border-border bg-secondary/35 text-stone-300'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                    Which aging symptoms concern you most?
                  </h2>
                  <p className="text-stone-400 text-xs font-semibold">Select all that apply.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'fog', label: 'Cognitive Brain Fog' },
                      { id: 'energy', label: 'General Stamina Deficit' },
                      { id: 'joint', label: 'Joint/Muscle Inflammation' },
                      { id: 'skin', label: 'Skin Wrinkles & Loose Skin' },
                      { id: 'bloat', label: 'Bloating & Slow Metabolism' }
                    ].map((opt) => {
                      const selected = concerns.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleConcernToggle(opt.id)}
                          className={`p-5 rounded-xl border text-left flex justify-between items-center transition-all cursor-pointer hover:border-primary/50 font-bold uppercase tracking-wider text-xs
                            ${selected ? 'border-primary bg-primary/10 text-white' : 'border-border bg-secondary/35 text-stone-300'}`}
                        >
                          <span>{opt.label}</span>
                          <div className={`w-5 h-5 rounded-full border border-border flex items-center justify-center
                            ${selected ? 'bg-primary text-background' : 'bg-transparent'}`}>
                            {selected && "✓"}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="pt-4">
                    <button 
                      onClick={handleNext}
                      disabled={concerns.length === 0}
                      className="w-full bg-primary hover:opacity-90 disabled:opacity-50 text-background py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg cursor-pointer"
                    >
                      Continue
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div 
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <h2 className="text-xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                      Review Biological Report
                    </h2>
                    <p className="text-stone-300 text-xs font-semibold">Please input your contact parameters. We'll generate your cellular profiling matrix instantly.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2.5">
                      <input 
                        type="text" 
                        placeholder="FULL NAME"
                        required
                        value={leadData.name}
                        onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                        className="w-full bg-secondary border border-border p-4 rounded-xl outline-none focus:border-primary text-white text-xs font-bold tracking-wider placeholder:text-stone-500"
                      />
                      <input 
                        type="email" 
                        placeholder="EMAIL ADDRESS"
                        required
                        value={leadData.email}
                        onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                        className="w-full bg-secondary border border-border p-4 rounded-xl outline-none focus:border-primary text-white text-xs font-bold tracking-wider placeholder:text-stone-500"
                      />
                      <input 
                        type="tel" 
                        placeholder="PHONE NUMBER (OPTIONAL)"
                        value={leadData.phone}
                        onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                        className="w-full bg-secondary border border-border p-4 rounded-xl outline-none focus:border-primary text-white text-xs font-bold tracking-wider placeholder:text-stone-500"
                      />
                    </div>

                    <div className="pt-4">
                      <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:opacity-90 disabled:opacity-50 text-background py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg cursor-pointer flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="animate-spin" size={14} /> ANALYZING BIOMARKERS...
                          </>
                        ) : (
                          <>
                            COMPILING REPORT <ArrowRight size={14} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Back Button (Conditional) */}
            {step > 1 && (
              <div className="mt-8 pt-6 border-t border-border flex">
                <button 
                  onClick={handleBack}
                  className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest cursor-pointer"
                >
                  <ArrowLeft size={12} /> Back
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Quiz Results Render */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            {/* Summary Score Card */}
            <div className="bg-card border border-border rounded-[2.5rem] p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <span className="text-primary font-bold uppercase tracking-widest text-[9px] flex items-center justify-center gap-2 mb-4">
                <CheckCircle2 size={12} /> CLINICAL PROFILE COMPILED
              </span>
              
              <h2 className="text-xl sm:text-2xl font-bold text-stone-300 uppercase tracking-widest">
                Welcome to the Protocol, {leadData.name}
              </h2>

              <div className="my-10 relative inline-flex items-center justify-center">
                <div className="w-36 h-36 rounded-full border-4 border-secondary flex flex-col items-center justify-center relative">
                  <span className="text-4xl font-mono font-black text-white">{cellScore}%</span>
                  <span className="text-[8px] font-black text-stone-400 uppercase tracking-widest mt-1">CELLULAR STAMINA</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto text-left pt-6 border-t border-border text-xs uppercase tracking-wider font-bold">
                <div className="space-y-1">
                  <p className="text-stone-400 text-[10px]">Primary Aging Hallmark:</p>
                  <p className="text-white text-sm font-extrabold">{primaryHallmark}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-stone-400 text-[10px]">Matching Subscription Protocol:</p>
                  <p className="text-primary text-sm font-extrabold">{recProgram}</p>
                </div>
              </div>

              <div className="pt-8">
                <a 
                  href="/longevity-programs" 
                  className="bg-primary hover:opacity-90 text-background px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all shadow-xl inline-block no-underline duration-300"
                >
                  Activate {recProgram} Plan
                </a>
              </div>
            </div>

            {/* Personalized Molecular Stack Recommendations */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white uppercase tracking-tight text-center">
                Recommended Molecular Stacks
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {recProducts.map((prod) => (
                  <div key={prod.id} className="bg-card border border-border p-6 rounded-[2rem] flex flex-col justify-between group hover:border-primary/30 transition-all duration-300">
                    <div className="space-y-4">
                      {/* Image block */}
                      <div className="aspect-[4/3] rounded-2xl bg-secondary border border-border overflow-hidden flex items-center justify-center p-4">
                        <img 
                          src={prod.image_url ? (prod.image_url.startsWith('http') ? prod.image_url : `${API_BASE_URL}admin/${prod.image_url}`) : 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=400'} 
                          alt={prod.name} 
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-700" 
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-primary uppercase tracking-widest">{prod.category || 'Clinical Stack'}</span>
                        <h4 className="text-base font-bold text-white uppercase leading-snug truncate group-hover:text-primary transition-colors">{prod.name}</h4>
                        <p className="text-xs text-primary font-bold">₹{parseFloat(prod.price).toLocaleString('en-IN')}</p>
                      </div>
                    </div>

                    <div className="pt-5 flex gap-2">
                      <button 
                        onClick={() => addToCart(prod, 1)}
                        className="flex-1 bg-primary hover:opacity-90 text-background py-3 rounded-xl font-bold uppercase tracking-widest text-[9px] shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag size={12} /> Add stack
                      </button>
                      <a 
                        href={`/product/${prod.slug}`} 
                        className="px-4 bg-secondary hover:bg-primary hover:text-background border border-border text-stone-300 rounded-xl flex items-center justify-center transition-all duration-300 text-xs no-underline"
                      >
                        Details
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Restart Quiz CTA */}
            <div className="text-center pt-8">
              <button 
                onClick={() => {
                  setStep(1);
                  setQuizFinished(false);
                  setGoal('');
                  setAgeGroup('');
                  setActivity('');
                  setConcerns([]);
                }}
                className="text-stone-400 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer border-b border-border pb-1"
              >
                Restart Biohacking Quiz
              </button>
            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
};

export default BiohackingQuiz;
