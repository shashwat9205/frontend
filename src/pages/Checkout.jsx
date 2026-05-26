import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState(null);

  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);
 
  // Calculate Totals
  const finalTotal = appliedCoupon ? cartTotal - appliedCoupon.discount_amount : cartTotal;

  useEffect(() => {
    const userStr = localStorage.getItem('customer_user');
    if (!userStr) {
      navigate('/login?redirect=/checkout');
    } else {
      const user = JSON.parse(userStr);
      setFormData(prev => ({
        ...prev,
        firstName: user.name ? user.name.split(' ')[0] : '',
        lastName: user.name && user.name.split(' ').length > 1 ? user.name.split(' ').slice(1).join(' ') : '',
        email: user.email || '',
        address: user.address || '',
        city: user.city || '',
        zip: user.zip || '',
        phone: user.phone || ''
      }));
    }
  }, [navigate]);

  useEffect(() => {
    if (cart.length === 0 && !isSuccess) {
      navigate('/cart');
    }
  }, [cart, navigate, isSuccess]);

  if (cart.length === 0 && !isSuccess) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Get doctor referral code if it exists
    const referralCode = localStorage.getItem('doctor_referral');

    // Get user id if logged in
    const userStr = localStorage.getItem('customer_user');
    const user = userStr ? JSON.parse(userStr) : null;
    const userId = user ? user.id : null;

    const payload = {
      cart,
      shipping: formData,
      referral_code: referralCode,
      user_id: userId,
      total: cartTotal,
      coupon_code: appliedCoupon ? appliedCoupon.code : null
    };

    try {
      const response = await fetch('http://localhost/E-commerce/backendDR/api/checkout_react.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (data.status === 'success') {
        setPlacedOrderId(data.order_id);
        setIsSuccess(true);
        clearCart();
        localStorage.removeItem('doctor_referral');
      } else {
        setError(data.message || 'Checkout failed');
      }
    } catch (err) {
      console.error(err);
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code.');
      return;
    }
    
    setApplyingCoupon(true);
    setCouponError('');
    setCouponSuccess('');

    const userStr = localStorage.getItem('customer_user');
    const user = userStr ? JSON.parse(userStr) : null;

    try {
      const res = await fetch('http://localhost/E-commerce/backendDR/api/apply_coupon.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: couponCode,
          total_amount: cartTotal,
          user_id: user ? user.id : null
        })
      });
      const data = await res.json();

      if (data.success) {
        setAppliedCoupon(data);
        setCouponSuccess(data.message);
        setCouponCode('');
      } else {
        setCouponError(data.message || 'Invalid coupon.');
      }
    } catch (err) {
      setCouponError('Failed to verify coupon.');
    } finally {
      setApplyingCoupon(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponSuccess('');
    setCouponError('');
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center pt-24 pb-24 px-6">
        <div className="w-full max-w-2xl bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-stone-100 border border-stone-100 text-center space-y-8">
          {/* Animated Success Checkmark */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-100 relative z-10 animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div className="absolute top-0 left-0 w-20 h-20 bg-emerald-100 rounded-full animate-ping opacity-30"></div>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1e2925] font-serif">
              Order Placed Successfully!
            </h1>
            <p className="text-stone-400 text-sm font-medium leading-relaxed font-sans max-w-md mx-auto">
              Thank you for shopping with us. Your premium plant-based formulas are being prepared for dispatch!
            </p>
          </div>

          {/* Receipt Details Card */}
          <div className="bg-stone-50 rounded-3xl p-6 text-left border border-stone-100 space-y-4 font-sans text-xs">
            <div className="flex justify-between items-center border-b border-stone-200/60 pb-3">
              <span className="text-stone-400 font-bold uppercase tracking-wider">Order Reference</span>
              <span className="font-black text-[#1e2925] bg-white border border-stone-100 px-3 py-1.5 rounded-xl">
                #{10000 + (placedOrderId || 0)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <span className="text-stone-400 font-bold uppercase tracking-wider block mb-1">Customer Name</span>
                <span className="font-bold text-[#1e2925]">{formData.firstName} {formData.lastName}</span>
              </div>
              <div>
                <span className="text-stone-400 font-bold uppercase tracking-wider block mb-1">Email Address</span>
                <span className="font-bold text-[#1e2925] truncate block">{formData.email}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-stone-200/40 pt-3">
              <div>
                <span className="text-stone-400 font-bold uppercase tracking-wider block mb-1">Payment Mode</span>
                <span className="font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-lg text-[10px] inline-block uppercase tracking-wider">Cash on Delivery</span>
              </div>
              <div>
                <span className="text-stone-400 font-bold uppercase tracking-wider block mb-1">Estimated Delivery</span>
                <span className="font-bold text-[#1e2925]">3 - 5 Business Days</span>
              </div>
            </div>

            <div className="border-t border-stone-200/40 pt-3">
              <span className="text-stone-400 font-bold uppercase tracking-wider block mb-1">Shipping Address</span>
              <span className="font-medium text-[#1e2925] leading-relaxed">
                {formData.address}, {formData.city} - {formData.zip}
              </span>
            </div>

            <div className="border-t border-stone-200/60 pt-4 flex justify-between items-end">
              <span className="text-stone-400 font-bold uppercase tracking-wider text-xs">Total Amount Paid</span>
              <span className="text-2xl font-black text-[#1e2925] leading-none">₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="text-center text-[11px] text-stone-400 font-medium">
            A confirmation receipt and order updates will be sent to your email.
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <button
              onClick={() => navigate('/')}
              className="bg-black hover:bg-emerald-700 text-white font-extrabold uppercase tracking-widest text-[10px] py-4 px-8 rounded-2xl shadow-xl shadow-stone-200 transition-all cursor-pointer"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="bg-white hover:bg-stone-50 border border-stone-200 text-[#1e2925] font-extrabold uppercase tracking-widest text-[10px] py-4 px-8 rounded-2xl transition-all cursor-pointer"
            >
              View Order History
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-black mb-12">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12">

          {/* Form */}
          <div className="w-full lg:w-[65%]">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-xl font-black uppercase tracking-widest text-gray-800 mb-8">Shipping Details</h2>

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold tracking-widest uppercase">
                  {error}
                </div>
              )}

              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">First Name</label>
                    <input required name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Last Name</label>
                    <input required name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium" />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Street Address</label>
                  <input required name="address" value={formData.address} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">City</label>
                    <input required name="city" value={formData.city} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Postal Code</label>
                    <input required name="zip" value={formData.zip} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Phone Number</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium" />
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[35%]">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-32">
              <h2 className="text-xl font-black uppercase tracking-widest text-gray-800 mb-6">Your Order</h2>

              <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-xl p-2 shrink-0 border border-gray-100">
                      <img src={item.image_url ? (item.image_url.startsWith('http') ? item.image_url : `http://localhost/E-commerce/backendDR/admin/${item.image_url}`) : 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=600'} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black uppercase truncate">{item.name}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Qty: {item.qty}</p>
                    </div>
                    <p className="text-sm font-bold">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 text-sm font-medium text-gray-600 mb-6 border-b border-gray-100 pb-6 border-t pt-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-black">₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                
                {/* Coupon Section */}
                {!appliedCoupon ? (
                  <div className="pt-2 pb-2">
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Discount Code" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl outline-none focus:border-primary text-xs uppercase tracking-widest font-black"
                      />
                      <button 
                        onClick={handleApplyCoupon}
                        disabled={applyingCoupon || !couponCode.trim()}
                        className="bg-black text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-colors disabled:opacity-50"
                      >
                        {applyingCoupon ? '...' : 'Apply'}
                      </button>
                    </div>
                    {couponError && <p className="text-red-500 text-[10px] font-bold mt-2">{couponError}</p>}
                  </div>
                ) : (
                  <div className="flex justify-between items-center bg-green-50 p-3 rounded-xl">
                    <div>
                      <span className="text-green-600 font-black uppercase tracking-widest text-[10px]">Coupon Applied</span>
                      <p className="text-black font-bold text-xs uppercase">{appliedCoupon.code}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-green-600">-₹{appliedCoupon.discount_amount.toLocaleString('en-IN')}</span>
                      <button onClick={removeCoupon} className="text-red-400 hover:text-red-600">
                        <i className="fa-solid fa-times text-sm"></i>
                      </button>
                    </div>
                  </div>
                )}
                {couponSuccess && !appliedCoupon && <p className="text-green-500 text-[10px] font-bold mt-1">{couponSuccess}</p>}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-green-500 uppercase text-xs tracking-widest">Free</span>
                </div>
                {localStorage.getItem('doctor_referral') && (
                  <div className="flex justify-between">
                    <span>Referred By</span>
                    <span className="font-bold text-primary uppercase text-xs tracking-widest">{localStorage.getItem('doctor_referral')}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-gray-800 font-black uppercase tracking-widest text-xs">Total</span>
                <span className="text-3xl font-black text-black leading-none">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={loading}
                className={`w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-primary transition-all shadow-xl ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Processing...' : 'Place Order (Cash on Delivery)'}
              </button>

              {/* Trust & Payment Badges */}
              <div className="mt-8 pt-6 border-t border-gray-100 text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-stone-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 text-emerald-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-wider">100% Encrypted & Secure Checkout</span>
                </div>
                
                {/* Visual Payments Grid */}
                <div className="grid grid-cols-4 gap-2 items-center justify-center opacity-65 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                  {/* UPI */}
                  <div className="bg-stone-50 border border-stone-100 rounded-xl p-2 flex flex-col items-center justify-center h-11">
                    <span className="text-[10px] font-black tracking-tighter text-stone-700 leading-none">UPI</span>
                    <span className="text-[7px] font-bold text-stone-400 mt-1 uppercase tracking-widest leading-none">GPay / PhonePe</span>
                  </div>
                  
                  {/* Cards */}
                  <div className="bg-stone-50 border border-stone-100 rounded-xl p-2 flex flex-col items-center justify-center h-11">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-stone-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                    <span className="text-[7px] font-bold text-stone-400 mt-1 uppercase tracking-widest leading-none">Cards</span>
                  </div>
                  
                  {/* Cash on Delivery */}
                  <div className="bg-stone-50 border border-stone-100 rounded-xl p-2 flex flex-col items-center justify-center h-11">
                    <span className="text-[10px] font-black uppercase tracking-tight text-emerald-600 leading-none">COD</span>
                    <span className="text-[7px] font-bold text-stone-400 mt-1 uppercase tracking-widest leading-none">Cash / Pay</span>
                  </div>
                  
                  {/* NetBanking */}
                  <div className="bg-stone-50 border border-stone-100 rounded-xl p-2 flex flex-col items-center justify-center h-11">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-stone-700 leading-none">BANK</span>
                    <span className="text-[7px] font-bold text-stone-400 mt-1 uppercase tracking-widest leading-none">Netbanking</span>
                  </div>
                </div>

                <div className="text-[9px] text-stone-400 font-bold uppercase tracking-wider">
                  Guaranteed Safe Delivery • 3-5 Business Days
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
