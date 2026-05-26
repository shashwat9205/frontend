import { API_BASE_URL } from '../config';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import {
  ChevronRight,
  CheckCircle2,
  Plus,
  Minus,
  Stethoscope,
  Activity,
  Heart,
  Award,
  MapPin,
  Clock,
  Mail,
  Phone
} from 'lucide-react';

const DoctorProfile = () => {
  const { referralCode } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [openFaq, setOpenFaq] = useState(null);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(tabId);
      if (element) {
        const offset = 180; // Adjust for fixed header/tabs height
        const y = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (referralCode) {
      localStorage.setItem('doctor_referral', referralCode);
    }

    fetch(`${API_BASE_URL}api/doctor.php?code=${referralCode}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setDoctor(data.data);
        } else {
          setError('Doctor profile not found.');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching doctor:', err);
        setError('Failed to load profile.');
        setLoading(false);
      });
  }, [referralCode]);

  useEffect(() => {
    if (doctor && doctor.recommended_products) {
      setProductsLoading(true);
      fetch(`${API_BASE_URL}api/products.php?ids=${doctor.recommended_products}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            setRecommendedProducts(data.data);
          }
          setProductsLoading(false);
        })
        .catch(err => {
          console.error("Failed to load products", err);
          setProductsLoading(false);
        });
    }
  }, [doctor]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50/50">
        <div className="animate-pulse flex flex-col items-center space-y-6">
          <div className="w-32 h-32 rounded-full border-4 border-slate-100 border-t-slate-300 animate-spin"></div>
          <div className="h-4 bg-slate-200 rounded-full w-48"></div>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 text-center px-6">
        <div className="w-20 h-20 bg-red-50 text-red-400 rounded-full flex items-center justify-center mb-6">
          <Stethoscope size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Profile Not Found</h2>
        <p className="text-slate-500 mb-8 max-w-md">{error}</p>
        <Link to="/shop" className="bg-slate-900 text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg">
          Return to Shop
        </Link>
      </div>
    );
  }

  const achievementsList = doctor.achievements
    ? doctor.achievements.split('\n').map(a => a.trim()).filter(a => a)
    : [];

  const faqs = [
    { q: "What benefits can I expect from your programs?", a: "Our programs are designed to optimize healthspan and lifespan by addressing cellular health, boosting energy, and enhancing recovery." },
    { q: "How do you tailor your treatments to individual needs?", a: "We begin with comprehensive diagnostic testing and use the results to build a fully personalized protocol tailored to your unique biology." },
    { q: "Are your treatments safe and scientifically backed?", a: "Yes, all of our protocols and recommended products are grounded in the latest peer-reviewed medical and clinical research." },
    { q: "Can I combine different therapies during a single visit?", a: "In most cases, yes. Our specialists will guide you on the safest and most effective combinations of treatments." },
    { q: "How often should I visit the center for optimal results?", a: "This depends entirely on your personalized plan. Some patients visit weekly, while others have monthly check-ins." }
  ];

  const services = [
    {
      icon: <Activity className="w-6 h-6 text-emerald-500" />,
      title: "Advanced Wellness Testing",
      desc: "Comprehensive diagnostic profiling to uncover your unique biological needs and optimize your health trajectory."
    },
    {
      icon: <Stethoscope className="w-6 h-6 text-blue-500" />,
      title: "Expert Medical Consultations",
      desc: "One-on-one sessions with specialists dedicated to building a proactive, personalized care plan."
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      title: "Women's Health Services",
      desc: "Compassionate, specialized care designed to support and empower women through every stage of life."
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-slate-200 selection:text-slate-900">

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-slate-100 border-b border-slate-200">
        <div className="container mx-auto px-6 py-20 lg:py-28 relative flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">

          {/* Image (Left) */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
            <div className="relative w-[320px] h-[400px] lg:w-[420px] lg:h-[520px]">
              <div className="w-full h-full bg-white border border-slate-200 rounded-[2rem] shadow-xl overflow-hidden z-10">
                {doctor.image_url ? (
                  <img
                    src={`${API_BASE_URL}admin/${doctor.image_url}`}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <img
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800"
                    alt="Doctor Placeholder"
                    className="w-full h-full object-cover object-top grayscale-[20%]"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Text (Right) */}
          <div className="w-full lg:w-[45%] flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-500 tracking-wider uppercase mb-8 shadow-sm">
              <Award className="w-4 h-4 text-slate-400" /> Premium Care
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-2 tracking-tight">
              {doctor.name}
            </h1>
            <h2 className="text-2xl lg:text-3xl text-slate-400 font-light mb-8 tracking-tight">
              Advanced Clinic
            </h2>
            <p className="text-lg text-slate-500 max-w-lg mb-10 leading-relaxed font-light">
              Elevating standards in proactive health management. Your journey to optimal wellness begins here.
            </p>
            <div className="flex gap-4">
              <button onClick={() => handleTabClick('about')} className="px-8 py-3.5 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition-colors shadow-md hover:shadow-lg">
                View Profile
              </button>
              <button onClick={() => handleTabClick('center-details')} className="px-8 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-full text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
                Contact Us
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Pill Navigation Tabs */}
      <div className="sticky top-30 z-40  py-4">
        <div className="container mx-auto px-6">
          <div className="flex justify-center md:justify-center gap-2 overflow-x-auto no-scrollbar">
            {['Home', 'About', 'Center Details'].map(tab => {
              const tabId = tab.toLowerCase().replace(' ', '-');
              return (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tabId)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${activeTab === tabId
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-500 hover:bg-slate-100 border border-transparent hover:border-slate-200'
                    }`}
                >
                  {tab}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 max-w-6xl py-24 space-y-32">

        {/* Services Grid (Replacing heavy banners) */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4 tracking-tight">Our Core Services</h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-light">Experience comprehensive, state-of-the-art medical care tailored to your unique physiological profile.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((svc, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {svc.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{svc.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-light">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Info Section */}
        <div id="about" className="pt-10 scroll-mt-32">
          <div className="bg-white rounded-[3rem] p-10 lg:p-16 border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-16 items-start">

            <div className="w-full lg:w-[55%]">
              <h2 className="text-4xl font-semibold text-slate-900 mb-3 tracking-tight">{doctor.name}</h2>
              <p className="text-slate-400 text-sm font-medium tracking-wide uppercase mb-8">{doctor.specialty || 'Consultant Specialist'}</p>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 text-base leading-loose font-light text-justify">
                  {doctor.bio || 'Experienced medical professional dedicated to providing the best care for patients. Committed to continuous learning and implementing the latest advancements in medical science to ensure optimal patient outcomes.'}
                </p>
              </div>
            </div>

            <div className="w-full lg:w-[45%]">
              <div className="mb-12">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-[0.2em] mb-6">Professional Certifications</h3>
                <ul className="space-y-4">
                  <li className="flex items-start pb-4 border-b border-slate-50 last:border-0">
                    <CheckCircle2 className="w-5 h-5 mr-4 text-emerald-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-slate-700 font-light">MBBS, MS (Obs & Gynae)</span>
                  </li>
                  <li className="flex items-start pb-4 border-b border-slate-50 last:border-0">
                    <CheckCircle2 className="w-5 h-5 mr-4 text-emerald-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-slate-700 font-light">DNB (Obs & Gynae)</span>
                  </li>
                  <li className="flex items-start pb-4 border-b border-slate-50 last:border-0">
                    <CheckCircle2 className="w-5 h-5 mr-4 text-emerald-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-slate-700 font-light">CIMP (Credentialed IMS Menopause Practitioner)</span>
                  </li>
                  <li className="flex items-start pb-4 border-b border-slate-50 last:border-0">
                    <CheckCircle2 className="w-5 h-5 mr-4 text-emerald-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-slate-700 font-light">FMAS (Fellowship in Minimal Access Surgery)</span>
                  </li>
                </ul>
              </div>

              {achievementsList.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-[0.2em] mb-6">Key Achievements</h3>
                  <ul className="space-y-4">
                    {achievementsList.map((achievement, idx) => (
                      <li key={idx} className="flex items-start pb-4 border-b border-slate-50 last:border-0">
                        <CheckCircle2 className="w-5 h-5 mr-4 text-emerald-400 shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-slate-700 font-light">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="pt-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold text-slate-900 mb-4 tracking-tight">Supplements & Tests</h2>
              <p className="text-slate-500 font-light leading-relaxed">Empower your health journey with our premium selection of clinical-grade supplements and advanced diagnostic tests.</p>
            </div>
            <Link to="/shop" className="inline-flex items-center text-sm text-slate-600 font-medium hover:text-slate-900 transition-colors group">
              View complete catalog
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {productsLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse flex flex-col gap-4">
                  <div className="aspect-[4/5] bg-slate-100 rounded-3xl"></div>
                  <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                  <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : recommendedProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 sm:gap-x-8 gap-y-6 sm:gap-y-12">
              {recommendedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 border-dashed">
              <p className="text-slate-400 font-light">No products recommended currently.</p>
            </div>
          )}
        </div>

        {/* Center Details Section */}
        <div id="center-details" className="pt-10 scroll-mt-32">
          <div className="bg-slate-900 rounded-[3rem] p-10 lg:p-16 text-white flex flex-col lg:flex-row gap-16 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="w-full lg:w-1/3 relative z-10">
              <h2 className="text-3xl font-semibold mb-6 tracking-tight">Visit Our Clinic</h2>
              <p className="text-slate-400 font-light mb-10">Experience healthcare in a modern, welcoming environment designed for your comfort.</p>
              <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800" alt="Clinic Reception" className="w-full h-48 object-cover rounded-2xl opacity-90 mix-blend-luminosity" />
            </div>

            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-12 relative z-10 lg:mt-4">
              <div>
                <div className="flex items-center gap-3 mb-6 text-slate-300">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em]">Location</h3>
                </div>
                <p className="text-slate-300 font-light leading-loose text-sm">
                  [Your Clinic Address Line 1]<br />
                  [Your City, State]<br />
                  [Your Zip Code]
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6 text-slate-300">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-xs font-semibold uppercase tracking-[0.2em]">Working Hours</h3>
                </div>
                <p className="text-slate-300 font-light leading-loose text-sm mb-10">
                  [e.g., Monday to Saturday]<br />
                  [9 AM to 9 PM]
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-300 text-sm font-light">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    [Your Phone Number]
                  </div>
                  <div className="flex items-center gap-3 text-slate-300 text-sm font-light">
                    <Mail className="w-4 h-4 text-emerald-400" />
                    [Your Contact Email]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="pt-10 pb-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-slate-500 font-light">Everything you need to know about our services.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-200">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex justify-between items-center text-left p-6 group"
                  >
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors pr-8">{faq.q}</span>
                    <div className={`shrink-0 transition-transform duration-300 text-slate-400 ${openFaq === index ? 'rotate-180 text-slate-900' : ''}`}>
                      {openFaq === index ? <Minus className="w-5 h-5" strokeWidth={1.5} /> : <Plus className="w-5 h-5" strokeWidth={1.5} />}
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? "max-h-48 opacity-100 pb-6 px-6" : "max-h-0 opacity-0 px-6"}`}
                  >
                    <p className="text-sm text-slate-500 font-light leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorProfile;
