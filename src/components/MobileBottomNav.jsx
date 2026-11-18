import { API_BASE_URL } from '../config';
// src/components/MobileBottomNav.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Heart, ShoppingBag, User, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const MobileBottomNav = () => {
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  // Search overlay state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef(null);

  const activeBrand = localStorage.getItem('activeBrand') || 'Brand 1';

  // Dynamic calculations for cart and wishlist bubbles
  const cartCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
  const wishlistCount = wishlist ? wishlist.length : 0;

  // Debounced search fetch
  useEffect(() => {
    if (!isSearchOpen) return;

    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true);
        fetch(`${API_BASE_URL}api/products.php?brand=${encodeURIComponent(activeBrand)}&search=${encodeURIComponent(searchQuery)}`)
          .then(res => res.json())
          .then(data => {
            if (data.status === 'success') {
              setSearchResults(data.data);
            } else {
              setSearchResults([]);
            }
            setIsSearching(false);
          })
          .catch(err => {
            console.error('Error fetching search:', err);
            setIsSearching(false);
          });
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, isSearchOpen, activeBrand]);

  // Auto-focus search input when overlay opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // Handle active states for non-button nav items
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' && !isSearchOpen;
    }
    return location.pathname.startsWith(path) && !isSearchOpen;
  };

  const popularTags = ['NMN', 'Liposomal', 'Longevity', 'Cellular', 'Mitochondria'];

  return (
    <>
      {/* Mobile Bottom Tab Bar with Dark Luxury Glassmorphism */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-[#071324]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_35px_rgba(0,0,0,0.5)] z-[9999] md:hidden px-2 pb-safe">
        <div className="h-16 flex items-center justify-around relative">
          
          {/* Home Tab */}
          <Link
            to="/"
            className="flex-1 flex flex-col items-center justify-center h-full relative group no-underline"
            onClick={() => setIsSearchOpen(false)}
          >
            <div className={`relative flex items-center justify-center p-1 transition-all duration-300 ${
              isActive('/') ? 'text-[#b89047]' : 'text-slate-400'
            }`}>
              <Home size={20} className="transition-transform duration-300 group-active:scale-95" />
            </div>
            <span className={`text-[9px] tracking-wider uppercase mt-0.5 transition-colors duration-300 ${
              isActive('/') ? 'text-[#b89047] font-bold' : 'text-slate-400 font-semibold'
            }`}>
              Home
            </span>
          </Link>

          {/* Search Tab */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex-1 flex flex-col items-center justify-center h-full relative group no-underline border-none bg-transparent cursor-pointer"
          >
            <div className={`relative flex items-center justify-center p-1 transition-all duration-300 ${
              isSearchOpen ? 'text-[#b89047]' : 'text-slate-400'
            }`}>
              <Search size={20} className="transition-transform duration-300 group-active:scale-95" />
            </div>
            <span className={`text-[9px] tracking-wider uppercase mt-0.5 transition-colors duration-300 ${
              isSearchOpen ? 'text-[#b89047] font-bold' : 'text-slate-400 font-semibold'
            }`}>
              Search
            </span>
          </button>

          {/* Wishlist Tab */}
          <Link
            to="/wishlist"
            className="flex-1 flex flex-col items-center justify-center h-full relative group no-underline"
            onClick={() => setIsSearchOpen(false)}
          >
            <div className={`relative flex items-center justify-center p-1 transition-all duration-300 ${
              isActive('/wishlist') ? 'text-[#b89047]' : 'text-slate-400'
            }`}>
              <Heart size={20} className="transition-transform duration-300 group-active:scale-95" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[8px] font-extrabold text-white w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className={`text-[9px] tracking-wider uppercase mt-0.5 transition-colors duration-300 ${
              isActive('/wishlist') ? 'text-[#b89047] font-bold' : 'text-slate-400 font-semibold'
            }`}>
              Wishlist
            </span>
          </Link>

          {/* Cart Tab */}
          <Link
            to="/cart"
            className="flex-1 flex flex-col items-center justify-center h-full relative group no-underline"
            onClick={() => setIsSearchOpen(false)}
          > 
            <div className={`relative flex items-center justify-center p-1 transition-all duration-300 ${
              isActive('/cart') ? 'text-[#b89047]' : 'text-slate-400'
            }`}>
              <ShoppingBag size={20} className="transition-transform duration-300 group-active:scale-95" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[8px] font-black text-[#0a192f] w-4 h-4 bg-[#b89047] rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
            <span className={`text-[9px] tracking-wider uppercase mt-0.5 transition-colors duration-300 ${
              isActive('/cart') ? 'text-[#b89047] font-bold' : 'text-slate-400 font-semibold'
            }`}>
              Cart
            </span>
          </Link>

          {/* Account Tab */}
          <Link
            to="/profile"
            className="flex-1 flex flex-col items-center justify-center h-full relative group no-underline"
            onClick={() => setIsSearchOpen(false)}
          >
            <div className={`relative flex items-center justify-center p-1 transition-all duration-300 ${
              isActive('/profile') ? 'text-[#b89047]' : 'text-slate-400'
            }`}>
              <User size={20} className="transition-transform duration-300 group-active:scale-95" />
            </div>
            <span className={`text-[9px] tracking-wider uppercase mt-0.5 transition-colors duration-300 ${
              isActive('/profile') ? 'text-[#b89047] font-bold' : 'text-slate-400 font-semibold'
            }`}>
              Account
            </span>
          </Link>

        </div>
      </div>

      {/* Global Mobile Search Overlay Sheet (Dark Theme) */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-[#071324] z-[10001] md:hidden p-6 flex flex-col overflow-y-auto animate-in fade-in slide-in-from-bottom-5 duration-300 text-white">
          
          {/* Header Controls */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#b89047]">Search Stacks</span>
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search Input field */}
          <div className="relative w-full mb-6">
            <input 
              ref={searchInputRef}
              type="text"
              placeholder="Search molecular formulas, NMN, stacks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/15 focus:border-[#b89047] focus:bg-white/10 p-4 pl-12 rounded-2xl outline-none transition-all text-sm font-semibold placeholder:text-slate-400 text-white shadow-xs"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              {isSearching ? (
                <div className="w-4 h-4 border-2 border-[#b89047] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Search size={16} className="text-[#b89047]" />
              )}
            </div>
          </div>

          {/* Popular Tag Quick Suggestions */}
          {searchQuery.length === 0 && (
            <div className="mb-8">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-3">Popular Searches</h4>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="text-xs font-semibold px-4 py-2 bg-white/5 border border-white/10 text-slate-200 rounded-full hover:bg-[#b89047]/20 hover:border-[#b89047]/40 transition-all cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Search Results */}
          <div className="flex-1">
            {searchResults.length > 0 ? (
              <div className="flex flex-col gap-3">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#b89047] mb-1">Found Protocols ({searchResults.length})</h4>
                {searchResults.map((product) => {
                  const itemImageUrl = product.image_url 
                    ? (product.image_url.startsWith('http') 
                        ? product.image_url 
                        : `${API_BASE_URL}admin/${product.image_url}`)
                    : 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=600';

                  return (
                    <Link
                      key={product.id}
                      to={`/product/${product.slug}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-4 p-3.5 bg-white/5 border border-white/10 hover:border-[#b89047]/40 rounded-2xl transition-all duration-300 no-underline shadow-xs"
                    >
                      <div className="w-12 h-12 bg-[#0a192f] border border-white/10 rounded-xl p-1 shrink-0 flex items-center justify-center overflow-hidden">
                        <img 
                          src={itemImageUrl} 
                          alt={product.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#b89047]">{product.category || 'Longevity'}</span>
                        <h4 className="text-xs font-semibold text-white leading-tight truncate mt-0.5">{product.name}</h4>
                        <p className="text-[#b89047] font-bold text-xs mt-1 font-mono">₹{parseFloat(product.price).toLocaleString('en-IN')}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              searchQuery.trim().length > 1 && !isSearching && (
                <div className="py-20 text-center text-slate-400">
                  <p className="text-sm font-semibold">No results match "{searchQuery}"</p>
                  <p className="text-xs font-light mt-1 text-slate-500">Double check spelling or search another biomarker term</p>
                </div>
              )
            )}
          </div>

        </div>
      )}
    </>
  );
};

export default MobileBottomNav;
