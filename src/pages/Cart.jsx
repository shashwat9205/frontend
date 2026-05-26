import { API_BASE_URL } from '../config';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrashAlt, FaMinus, FaPlus, FaLock, FaTruck, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
 
const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md"
        >
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <i className="fa-solid fa-cart-shopping text-4xl text-gray-200"></i>
          </div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-black mb-4">Empty Selection</h2>
          <p className="text-gray-400 mb-10 font-medium leading-relaxed">Your curated selection is currently empty. Explore our latest drops and elite formulas to fuel your progress.</p>
          <Link to="/shop" className="inline-block bg-black text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-primary transition-all shadow-2xl no-underline">
            Begin Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] pt-6 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header with Progress */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div className="space-y-1">
            <h4 className="text-primary font-black uppercase tracking-[0.4em] text-[10px]">Your Selection</h4>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-black uppercase leading-none">
              Shopping <br /> Bag
            </h1>
          </div>
          <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-gray-300">
            <span className="text-black border-b-2 border-primary pb-1">01. Bag</span>
            <span>02. Checkout</span>
            <span>03. Success</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Cart Items List */}
          <div className="w-full lg:w-[65%] space-y-6">
            <AnimatePresence>
              {cart.map((item, index) => {
                const imageUrl = item.image_url 
                  ? (item.image_url.startsWith('http') ? item.image_url : `${API_BASE_URL}admin/${item.image_url}`)
                  : 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=600';

                return (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ delay: index * 0.1 }}
                    key={item.id} 
                    className="flex flex-col sm:flex-row gap-8 pb-8 border-b border-gray-100 group"
                  >
                    {/* Product Image */}
                    <Link to={`/product/${item.slug}`} className="w-full sm:w-40 aspect-square bg-gray-50 rounded-3xl p-6 overflow-hidden relative shrink-0">
                      <img 
                        src={imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
                      />
                    </Link>
                    
                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <p className="text-primary font-black uppercase tracking-[0.2em] text-[9px]">{item.category || 'Nutrition'}</p>
                          <Link to={`/product/${item.slug}`} className="no-underline text-black group-hover:text-primary transition-colors">
                            <h3 className="text-2xl font-black tracking-tighter uppercase leading-tight max-w-md">{item.name}</h3>
                          </Link>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-300 hover:bg-red-50 hover:text-red-500 transition-all"
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-6 mt-8">
                        {/* Quantity Controls */}
                        <div className="flex items-center bg-white border border-gray-100 rounded-2xl p-1 shadow-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, item.qty - 1)}
                            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                          ><FaMinus size={10} /></button>
                          <span className="w-10 text-center font-black text-black text-xs">{item.qty}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.qty + 1)}
                            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                          ><FaPlus size={10} /></button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1">Unit Price</p>
                          <p className="text-xl font-black text-black tracking-tight">₹{parseFloat(item.price).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-[35%] lg:sticky lg:top-24">
            <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.03)] space-y-8">
              <h2 className="text-xl font-black uppercase tracking-[0.2em] text-black">Summary</h2>
              
              <div className="space-y-6">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-black font-black">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-500 font-black">Complementary</span>
                </div>
                <div className="pt-6 border-t border-gray-50 flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">Total Amount</span>
                  <span className="text-4xl font-black text-black leading-none tracking-tighter">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => {
                    const userStr = localStorage.getItem('customer_user');
                    if (!userStr) {
                      navigate('/login?redirect=/checkout');
                    } else {
                      navigate('/checkout');
                    }
                  }}
                  className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-primary transition-all shadow-xl flex items-center justify-center gap-3 group"
                >
                  Proceed to Checkout
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <FaArrowRight />
                  </motion.span>
                </button>
                <p className="text-center text-[9px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
                  <FaLock className="text-primary" /> Secure encrypted checkout
                </p>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                  <FaTruck className="text-primary" />
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase">Fast Delivery</span>
                    <span className="text-[7px] text-gray-400 uppercase font-bold text-nowrap">3-5 Business Days</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                  <FaShieldAlt className="text-primary" />
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black uppercase">Premium Lab</span>
                    <span className="text-[7px] text-gray-400 uppercase font-bold text-nowrap">Tested & Certified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
