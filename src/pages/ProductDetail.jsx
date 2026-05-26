import { API_BASE_URL } from '../config';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExpandAlt, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Heart } from 'lucide-react';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}api/products.php?slug=${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setProduct(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest">Product not found.</div>;
  }

  // Collect all available images
  const allImages = [
    product.image_url,
    product.image_url2,
    product.image_url3,
    product.image_url4,
    product.image_url5
  ].filter(url => url && url.trim() !== '');

  const formatImageUrl = (url) => {
    if (!url) return 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=600';
    return url.startsWith('http') ? url : `${API_BASE_URL}admin/${url}`;
  };

  const isOutOfStock = parseInt(product.stock_quantity || product.stock) <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = () => {
    const success = toggleWishlist(product);
    if (!success) {
      navigate('/login');
    }
  };

  const wishlisted = product ? isInWishlist(product.id) : false;

  return (
    <div className="min-h-screen bg-white pt-12 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Breadcrumbs */}
        <div className="mb-10 text-[10px] font-black uppercase tracking-widest text-gray-300 flex items-center gap-2">
          <Link to="/" className="hover:text-primary transition-colors no-underline">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary transition-colors no-underline">Shop</Link>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Left: Refined Compact Image Gallery */}
          <div className="w-full lg:w-[38%] space-y-4">
            <div className="relative group">
              <motion.div
                layoutId="main-image"
                className="aspect-square cursor-zoom-in relative flex items-center justify-center"
                onClick={() => setIsModalOpen(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={formatImageUrl(allImages[activeImageIndex])}
                    alt={product.name}
                    className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105 ${isOutOfStock ? 'grayscale opacity-50' : ''}`}
                  />
                </AnimatePresence>

                {/* Expand Icon */}
                <div className="absolute top-8 right-8 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaExpandAlt className="text-gray-400" />
                </div>
              </motion.div>
            </div>

            {/* Thumbnails - Pulled up and cleaned */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-xl bg-white border-2 transition-all p-1 shrink-0 ${activeImageIndex === idx ? 'border-primary' : 'border-transparent hover:border-gray-100'}`}
                  >
                    <img src={formatImageUrl(img)} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Focused Product Info */}
          <div className="w-full lg:w-[50%] lg:sticky lg:top-24">
            <div className="space-y-6">
              <div className="space-y-3 border-b border-gray-100 pb-8">
                <p className="text-primary font-black uppercase tracking-[0.4em] text-[9px] opacity-80">
                  {product.category || 'Nutrition'}
                </p>
                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-black leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4">
                  <p className="text-2xl font-black text-black tracking-tight">
                    ₹{parseFloat(product.price).toLocaleString('en-IN')}
                  </p>
                  <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">
                    Free Shipping
                  </span>
                </div>
              </div>

              <div className="text-gray-400 text-sm font-medium leading-relaxed max-w-lg">
                <p>{product.description || 'Premium performance nutrition designed for elite athletes.'}</p>
              </div>

              {/* Authenticity Badges */}
              <div className="flex items-center justify-between py-6 border-y border-gray-100 my-6">
                <div className="flex flex-col items-center gap-3 text-center w-1/3 group cursor-default">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <i className="fa-solid fa-certificate text-xl"></i>
                  </div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-gray-500 leading-tight group-hover:text-black transition-colors">100%<br/>Authentic</p>
                </div>
                <div className="flex flex-col items-center gap-3 text-center w-1/3 border-x border-gray-100 group cursor-default">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <i className="fa-solid fa-truck-fast text-xl"></i>
                  </div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-gray-500 leading-tight group-hover:text-black transition-colors">Fast<br/>Delivery</p>
                </div>
                <div className="flex flex-col items-center gap-3 text-center w-1/3 group cursor-default">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <i className="fa-solid fa-lock text-xl"></i>
                  </div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-gray-500 leading-tight group-hover:text-black transition-colors">Secure<br/>Checkout</p>
                </div>
              </div>

              {/* Actions - More compact */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Qty</span>
                    <div className="flex items-center bg-white rounded-lg p-1 border border-gray-100">
                      <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                      ><FaChevronLeft size={8} /></button>
                      <span className="w-8 text-center font-black text-black text-xs">{quantity}</span>
                      <button
                        onClick={() => setQuantity(q => q + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                      ><FaChevronRight size={8} /></button>
                    </div>
                  </div>

                  {isOutOfStock ? (
                    <span className="text-red-500 font-black uppercase tracking-widest text-[10px] bg-red-50 px-4 py-2 rounded-full">Sold Out</span>
                  ) : (
                    <span className="text-green-500 font-black uppercase tracking-widest text-[10px] bg-green-50 px-4 py-2 rounded-full">In Stock </span>
                  )}
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`w-full py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all shadow-xl flex items-center justify-center gap-3 ${isOutOfStock
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : added
                      ? 'bg-green-500 text-white shadow-green-100'
                      : 'bg-black text-white hover:bg-primary shadow-gray-100'
                    }`}
                >
                  {isOutOfStock ? 'Currently Unavailable' : added ? 'Added to Selection ✓' : 'Add to Cart'}
                </button>
                
                <button
                  onClick={handleWishlist}
                  className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all border-2 flex items-center justify-center gap-3 ${
                    wishlisted 
                      ? 'border-primary text-primary bg-primary/5 hover:bg-primary/10' 
                      : 'border-gray-200 text-gray-600 hover:border-black hover:text-black'
                  }`}
                >
                  <Heart size={16} className={wishlisted ? "fill-current" : ""} />
                  {wishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
                </button>
              </div>

              {/* Dynamic Trust Section */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                {product.category === 'Accessories' ? (
                  <>
                    <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                      <i className="fa-solid fa-shield-halved text-2xl text-primary"></i>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-black">BPA Free</p>
                        <p className="text-[7px] font-bold text-gray-400 uppercase">Non-Toxic Material</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                      <i className="fa-solid fa-gem text-2xl text-primary"></i>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-black">Premium Quality</p>
                        <p className="text-[7px] font-bold text-gray-400 uppercase">Built To Last</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                      <i className="fa-solid fa-leaf text-2xl text-primary"></i>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-black">Plant Based</p>
                        <p className="text-[7px] font-bold text-gray-400 uppercase">100% Vegan</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                      <i className="fa-solid fa-vial-circle-check text-2xl text-primary"></i>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-black">Lab Tested</p>
                        <p className="text-[7px] font-bold text-gray-400 uppercase">Batch Certified</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal Lightbox */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-20"
            onClick={() => setIsModalOpen(false)}
          >
            <button className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors">
              <FaTimes size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {allImages.length > 1 && (
                <button
                  onClick={() => setActiveImageIndex((activeImageIndex - 1 + allImages.length) % allImages.length)}
                  className="absolute left-0 text-white/20 hover:text-white transition-colors p-4"
                >
                  <FaChevronLeft size={48} />
                </button>
              )}

              <img
                src={formatImageUrl(allImages[activeImageIndex])}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />

              {allImages.length > 1 && (
                <button
                  onClick={() => setActiveImageIndex((activeImageIndex + 1) % allImages.length)}
                  className="absolute right-0 text-white/20 hover:text-white transition-colors p-4"
                >
                  <FaChevronRight size={48} />
                </button>
              )}
            </motion.div>

            {/* Modal Thumbnails */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
              {allImages.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${activeImageIndex === idx ? 'bg-primary w-8' : 'bg-white/20'}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;
