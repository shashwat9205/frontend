import { API_BASE_URL } from '../config';
// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, LogOut, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [customerUser, setCustomerUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [navSearch, setNavSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  


  const checkUser = () => {
    const userStr = localStorage.getItem('customer_user');
    if (userStr) {
      try {
        setCustomerUser(JSON.parse(userStr));
      } catch (e) {
        setCustomerUser(null);
      }
    } else {
      setCustomerUser(null);
    }
  };

  useEffect(() => {
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  // Live Search Logic
  useEffect(() => {
    if (navSearch.trim().length > 1) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        fetch(`${API_BASE_URL}api/products.php?search=${encodeURIComponent(navSearch)}&limit=5`)
          .then(res => res.json())
          .then(data => {
            if (data.status === 'success') {
              setSearchResults(data.data);
              setShowResults(true);
            }
            setIsSearching(false);
          })
          .catch(() => setIsSearching(false));
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [navSearch]);

  // Click Outside logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('customer_user');
    checkUser();
    setIsDropdownOpen(false);
    navigate('/login');
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/shop?search=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch('');
    }
  };

  return (
    <nav 
      className="glassmorphism-light border-b border-primary/5 flex items-center sticky top-0 z-50 shadow-xs transition-all duration-350"
      style={{ height: '80px' }}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center max-w-7xl w-full">
        {/* Left Block: Logo + Navigation Links */}
        <div className="flex items-center gap-6 lg:gap-10 shrink-0">
          {/* Logo */}
          <Link to="/" className="text-2xl tracking-tight no-underline hover:opacity-90 transition-opacity flex items-center shrink-0 border-none">
            <span className="text-primary font-bold font-sans tracking-wide">PURE</span>
            <span className="text-accent-gold font-sans font-light ml-1">PLANT</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex gap-6 lg:gap-8 text-xs font-medium tracking-wide shrink-0">
            <Link to="/shop" className={`transition-colors no-underline relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:transition-transform after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:origin-center ${location.pathname === '/shop' ? 'text-primary after:scale-x-100' : 'text-[#1e2925] hover:text-primary'}`}>Shop</Link>
            <Link to="/about" className={`transition-colors no-underline relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:transition-transform after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:origin-center ${location.pathname === '/about' ? 'text-primary after:scale-x-100' : 'text-[#1e2925] hover:text-primary'}`}>About</Link>
            <Link to="/contact" className={`transition-colors no-underline relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:transition-transform after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:origin-center ${location.pathname === '/contact' ? 'text-primary after:scale-x-100' : 'text-[#1e2925] hover:text-primary'}`}>Contact</Link>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-6 lg:mx-8 relative" ref={searchRef}>
          <form onSubmit={onSearchSubmit} className="relative w-full group">
            <input 
              type="text" 
              placeholder="Search premium products..." 
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              onFocus={() => navSearch.length > 1 && setShowResults(true)}
              className="w-full bg-[#f4f3ee] border border-transparent focus:border-primary/20 focus:bg-white p-2.5 pl-10 rounded-xl outline-none transition-all text-xs font-medium placeholder:text-gray-400 text-[#1e2925]"
            />
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-450 group-focus-within:text-primary transition-colors">
              {isSearching ? (
                <div className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <i className="fa-solid fa-magnifying-glass text-xs"></i>
              )}
            </div>
          </form>

          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white mt-2 rounded-2xl shadow-xl border border-primary/5 overflow-hidden z-200 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-gray-50 bg-[#faf9f6]">
                <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-400">Quick Results</span>
              </div>
              <div className="max-h-100 overflow-y-auto">
                {searchResults.map(product => (
                  <Link 
                    key={product.id}
                    to={`/product/${product.slug}`}
                    onClick={() => {
                      setShowResults(false);
                      setNavSearch('');
                    }}
                    className="flex items-center gap-4 p-4 hover:bg-[#faf9f6] transition-colors no-underline group"
                  >
                    <div className="w-12 h-12 bg-gray-50 rounded-lg p-1 shrink-0 flex items-center justify-center">
                      <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full object-contain mix-blend-multiply" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-[#1e2925] truncate group-hover:text-primary transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-gray-400 font-medium">₹{parseFloat(product.price).toLocaleString('en-IN')}</p>
                    </div>
                    <div className="text-gray-300 group-hover:text-primary transition-colors">
                      <i className="fa-solid fa-chevron-right text-[10px]"></i>
                    </div>
                  </Link>
                ))}
              </div>
              <Link 
                to={`/shop?search=${encodeURIComponent(navSearch)}`}
                onClick={() => setShowResults(false)}
                className="block p-4 bg-[#f4f3ee] text-center text-xs font-bold uppercase tracking-wider text-[#1e2925] hover:bg-primary hover:text-white transition-all no-underline"
              >
                View All Results
              </Link>
            </div>
          )}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          
          {/* User / Login */}
          <div className="relative">
            {customerUser ? (
              <div className="relative group">
                {/* The trigger */}
                <div 
                  className="flex items-center gap-2 cursor-pointer mt-1"
                  onClick={() => navigate('/profile')}
                >
                  <div className="w-8 h-8 bg-[#f4f3ee] border border-primary/5 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors relative z-10">
                    <span className="font-semibold text-xs">{customerUser.name.charAt(0).toUpperCase()}</span>
                  </div>
                </div>

                {/* Hover Dropdown */}
                <div className="absolute right-0 top-full pt-4 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-200 translate-y-2 group-hover:translate-y-0">
                  <div className="bg-white border border-primary/5 rounded-2xl shadow-xl overflow-hidden relative">
                    {/* Tiny arrow pointing up */}
                    <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-t border-l border-primary/5 transform rotate-45"></div>
                    
                    <div className="p-5 border-b border-gray-50 bg-[#faf9f6] relative z-10">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Welcome Back</p>
                      <p className="text-sm font-bold text-[#1e2925] truncate mt-1">{customerUser.name}</p>
                    </div>
                    <div className="p-2 relative z-10 flex flex-col">
                      <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-stone-600 hover:text-primary hover:bg-[#faf9f6] rounded-xl transition-all no-underline">
                        <User size={14} /> My Profile
                      </Link>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-all text-left"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="cursor-pointer group block mt-1">
                <User size={22} strokeWidth={1.5} className="text-[#1e2925] group-hover:text-primary transition-colors" />
              </Link>
            )}
          </div>
          
          {/* Wishlist */}
          <Link to="/wishlist" className="cursor-pointer group block mt-1">
            <Heart size={22} strokeWidth={1.5} className="text-[#1e2925] group-hover:text-primary transition-colors" />
          </Link>

          <Link to="/cart" className="relative group cursor-pointer mt-1 block">
            <ShoppingBag size={22} strokeWidth={1.5} className="group-hover:text-primary transition-colors text-[#1e2925]" />
            <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
              {cartCount}
            </span>
          </Link>
          <button className="lg:hidden text-[#1e2925] hover:text-primary transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-screen h-[calc(100vh-120px)] bg-white/95 backdrop-blur-md z-[9999] lg:hidden p-6 flex flex-col items-center overflow-y-auto animate-in fade-in slide-in-from-top-5 duration-300">
          
          {/* Mobile Search Bar */}
          <div className="w-full max-w-sm mb-8 relative" ref={searchRef}>
            <form onSubmit={onSearchSubmit} className="relative w-full group">
              <input 
                type="text" 
                placeholder="Search products..." 
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                onFocus={() => navSearch.length > 1 && setShowResults(true)}
                className="w-full bg-[#f4f3ee] border border-transparent focus:border-primary/20 focus:bg-white p-3.5 pl-11 rounded-xl outline-none transition-all text-xs font-semibold placeholder:text-gray-400 text-[#1e2925]"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-450">
                {isSearching ? (
                  <div className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <i className="fa-solid fa-magnifying-glass text-xs"></i>
                )}
              </div>
            </form>

            {/* Search Results Dropdown inside Mobile Menu */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white mt-2 rounded-xl shadow-xl border border-primary/5 overflow-hidden z-[200]">
                <div className="max-h-60 overflow-y-auto">
                  {searchResults.map(product => (
                    <Link 
                      key={product.id}
                      to={`/product/${product.slug}`}
                      onClick={() => {
                        setShowResults(false);
                        setNavSearch('');
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-[#faf9f6] no-underline border-b border-stone-50"
                    >
                      <div className="w-9 h-9 bg-gray-50 rounded-lg p-1 shrink-0 flex items-center justify-center">
                        <img src={product.image_url} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[10px] font-black text-[#1e2925] truncate">{product.name}</h4>
                        <p className="text-[9px] text-primary font-bold">₹{parseFloat(product.price).toLocaleString('en-IN')}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Links Grid */}
          <div className="flex flex-col items-center gap-4 w-full max-w-sm">
            <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold tracking-widest uppercase text-[#1e2925] hover:text-primary no-underline py-3.5 border-b border-stone-100 w-full text-center transition-colors">Shop</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold tracking-widest uppercase text-[#1e2925] hover:text-primary no-underline py-3.5 border-b border-stone-100 w-full text-center transition-colors">About</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold tracking-widest uppercase text-[#1e2925] hover:text-primary no-underline py-3.5 border-b border-stone-100 w-full text-center transition-colors">Contact</Link>
            <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="text-xs font-bold tracking-widest uppercase text-[#1e2925] hover:text-primary no-underline py-3.5 border-b border-stone-100 w-full text-center transition-colors">Wishlist</Link>
          </div>

          {/* User Account / Session Actions */}
          <div className="w-full max-w-sm mt-8 border-t border-stone-100 pt-6 flex flex-col gap-3">
            {customerUser ? (
              <>
                <div className="flex items-center gap-2.5 justify-center mb-3">
                  <div className="w-7 h-7 bg-[#f4f3ee] border border-primary/5 rounded-full flex items-center justify-center">
                    <span className="font-bold text-[10px] text-primary">{customerUser.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-stone-500">Logged in as {customerUser.name}</span>
                </div>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="w-full py-3.5 bg-stone-50 hover:bg-stone-100 text-stone-700 text-center rounded-xl text-[10px] font-black uppercase tracking-wider no-underline transition-all">
                  My Profile
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-3.5 bg-red-50 hover:bg-red-100 text-red-500 text-center rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer border-none outline-none"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full py-3.5 bg-black hover:bg-emerald-800 text-white text-center rounded-xl text-[10px] font-black uppercase tracking-wider no-underline transition-all">
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
