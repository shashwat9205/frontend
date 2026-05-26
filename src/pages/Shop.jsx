import { API_BASE_URL } from '../config';
// src/pages/Shop.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import BrandTeaser from '../components/BrandTeaser';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import PriceFilter from "../components/PriceFilter";


const Shop = () => {
  const [priceRange, setPriceRange] = useState([200, 15000]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlCategory = queryParams.get('category');
  const urlSearch = queryParams.get('search');

  const [brand2Status, setBrand2Status] = useState('coming_soon');
  const [activeBrand, setActiveBrand] = useState(localStorage.getItem('activeBrand') || 'Brand 1');
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || 'all');
  const [searchQuery, setSearchQuery] = useState(urlSearch || '');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch Brand 2 Status
    fetch(API_BASE_URL + 'api/settings.php')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setBrand2Status(data.brand2_status);
        }
      })
      .catch(err => console.error('Error fetching settings:', err));

    // Fetch Categories for Filter
    fetch(API_BASE_URL + 'api/categories.php')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setCategories(data.data);
        }
      })
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  // Update selected category and search if URL changes (e.g. clicking from home or navbar)
  useEffect(() => {
    if (urlCategory) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedCategory(urlCategory);
    }
    if (urlSearch !== null) {
      setSearchQuery(urlSearch);
    }
  }, [urlCategory, urlSearch]);

  const handleBrandChange = (brand) => {
    setActiveBrand(brand);
    localStorage.setItem('activeBrand', brand);
  };

  if (activeBrand === 'Brand 2' && brand2Status === 'coming_soon') {
    return (
      <div className="pt-8">
        <div className="container mx-auto px-6 max-w-7xl mb-10">
          <div className="flex gap-4">
            <button onClick={() => handleBrandChange('Brand 1')} className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-all">← Back to Brand 1</button>
          </div>
        </div>
        <BrandTeaser />
      </div>
    );
  } return (
    <div className="bg-[#faf9f6] min-h-screen">
      {/* Brand Toggle Section */}
      <section className="bg-white py-6 border-b border-primary/5 shadow-xs">
        <div className="container mx-auto px-6 max-w-7xl flex justify-center gap-4">
          <button
            onClick={() => handleBrandChange('Brand 1')}
            className={`text-xs font-bold uppercase tracking-wider transition-all relative py-2.5 px-6 rounded-full cursor-pointer ${activeBrand === 'Brand 1' ? 'bg-[#0f1b11] text-white shadow-md' : 'text-stone-400 hover:text-stone-700 bg-stone-50'}`}
          >
            Brand 1
          </button>
          <button
            onClick={() => handleBrandChange('Brand 2')}
            className={`text-xs font-bold uppercase tracking-wider transition-all relative py-2.5 px-6 rounded-full cursor-pointer ${activeBrand === 'Brand 2' ? 'bg-[#0f1b11] text-white shadow-md' : 'text-stone-400 hover:text-stone-700 bg-stone-50'}`}
          >
            Brand 2
          </button>
        </div>
      </section>

      {/* Compact Header Section */}
      <section className="pt-8 pb-4 md:pt-10 md:pb-6">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-xl space-y-2.5">
              <h4 className="text-accent-gold font-bold uppercase tracking-wider text-[10px] font-sans">
                {activeBrand} {selectedCategory !== 'all' ? ` / ${selectedCategory}` : ''}
              </h4>
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1e2925] font-serif leading-none">
                Shop Collection
              </h1>
              <p className="text-stone-400 text-sm font-medium leading-relaxed font-sans">
                Elite formulas scientifically formulated to fuel your recovery and power your progress.
              </p>
            </div>

            {/* Compact Search Bar - Desktop Side */}
            <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-100'>
              <PriceFilter
                min={200}
                max={15000}
                onPriceChange={(newRange) => setPriceRange(newRange)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="sticky top-[132px] z-40 bg-white/75 backdrop-blur-md border-b border-primary/5 py-4">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`whitespace-nowrap text-xs font-semibold tracking-wide px-5 py-2.5 rounded-full transition-all cursor-pointer border ${selectedCategory === 'all' ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-stone-600 border-primary/5 hover:bg-[#f4f3ee]'}`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`whitespace-nowrap text-xs font-semibold tracking-wide px-5 py-2.5 rounded-full transition-all cursor-pointer border ${selectedCategory === cat.name ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-stone-600 border-primary/5 hover:bg-[#f4f3ee]'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <ProductList category={selectedCategory} search={searchQuery} priceRange={priceRange} />
        </div>
      </section>
    </div>
  );
};

export default Shop;
