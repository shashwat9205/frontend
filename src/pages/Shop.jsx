import { API_BASE_URL } from '../config';
// src/pages/Shop.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import PriceFilter from "../components/PriceFilter";


const Shop = () => {
  const [priceRange, setPriceRange] = useState([200, 15000]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlCategory = queryParams.get('category');
  const urlSearch = queryParams.get('search');

  const [selectedCategory, setSelectedCategory] = useState(urlCategory || 'all');
  const [searchQuery, setSearchQuery] = useState(urlSearch || '');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Ensure default brand is active
    localStorage.setItem('activeBrand', 'Brand 1');

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

  return (
    <div className="bg-[#faf9f6] min-h-screen">
      {/* Compact Header Section */}
      <section className="pt-6 pb-2 md:pt-12 md:pb-6">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-xl space-y-2.5">
              <h4 className="text-accent-gold font-bold uppercase tracking-wider text-[10px] font-sans">
                {selectedCategory !== 'all' ? selectedCategory : 'Clinical Protocols'}
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
      <section className="sticky top-[80px] z-40 bg-white/75 rounded-4xl backdrop-blur-md border-b border-primary/5 py-4">
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

      <section className="py-6 md:py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <ProductList category={selectedCategory} search={searchQuery} priceRange={priceRange} />
        </div>
      </section>
    </div>
  );
};

export default Shop;
