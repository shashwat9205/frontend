// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import DoctorProfile from './pages/DoctorProfile';
import DoctorJoin from './pages/DoctorJoin';
import DoctorLogin from './pages/DoctorLogin';
import DoctorDashboard from './pages/DoctorDashboard';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import AnnouncementBar from './components/AnnouncementBar';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import ScrollToTop from './components/ScrollToTop';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Wishlist from './pages/Wishlist';
import Chatbot from './components/Chatbot';
import MobileBottomNav from './components/MobileBottomNav';


const ReferralTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get('ref');
    if (ref) {
      localStorage.setItem('doctor_referral', ref);
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <ScrollToTop/>
          <ReferralTracker />
          <div className="min-h-screen bg-white flex flex-col w-full">
        {/* Fixed Header Group */}
        <header className="fixed top-0 left-0 w-full z-1000">
          <AnnouncementBar />
          <Navbar />
        </header>
        
        <main className="flex-1 flex flex-col w-full pt-[80px] md:pt-[120px]  md:pb-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/doctor/join" element={<DoctorJoin />} />
            <Route path="/doctor/login" element={<DoctorLogin />} />
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/dr/:referralCode" element={<DoctorProfile />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </main>
        
          <Footer />
           <Chatbot />
           <MobileBottomNav />
        </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;