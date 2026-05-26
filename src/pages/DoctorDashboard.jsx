import { API_BASE_URL } from '../config';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaWallet, FaShoppingBag, FaChartLine, FaCopy,
  FaCheckCircle, FaClock, FaSignOutAlt, FaCamera,
  FaFileInvoiceDollar
} from 'react-icons/fa';

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Profile Edit State
  const [editFormData, setEditFormData] = useState({ name: '', specialty: '', bio: '', age: '', achievements: '' });
  const [editLoading, setEditLoading] = useState(false);
  const [editMessage, setEditMessage] = useState({ type: '', text: '' });
  const [photoUploading, setPhotoUploading] = useState(false);

  // Product Recommendation State
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('doctor_user');
    if (!storedData) {
      navigate('/doctor/login');
      return;
    }
    const parsed = JSON.parse(storedData);
    setDoctor(parsed);
    fetchDashboardData(parsed.id);
    fetchProducts();
  }, [navigate]);

  const fetchDashboardData = async (docId) => {
    try {
      const response = await fetch(`${API_BASE_URL}api/doctor_dashboard.php?doctor_id=${docId}`);
      const data = await response.json();
      if (data.status === 'success') {
        const statsData = data.data.stats;
        setStats(statsData);
        setOrders(data.data.orders);

        // Update edit form data
        setEditFormData({
          name: statsData.name || '',
          specialty: statsData.specialty || '',
          bio: statsData.bio || '',
          age: statsData.age || '',
          achievements: statsData.achievements || ''
        });

        // Set recommendations
        if (statsData.recommended_products) {
          setSelectedProducts(statsData.recommended_products.split(',').map(Number));
        }
      }
      setLoading(false);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setLoading(false);
    }
  };

  const fetchProducts = () => {
    fetch(API_BASE_URL + 'api/products.php')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') setAllProducts(data.data);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('doctor_user');
    navigate('/doctor/login');
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhotoUploading(true);
    setEditMessage({ type: '', text: '' });

    const formData = new FormData();
    formData.append('image', file);
    formData.append('id', doctor.id);

    try {
      const response = await fetch(API_BASE_URL + 'api/doctor_upload_photo.php', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.status === 'success') {
        setDoctor(data.data);
        localStorage.setItem('doctor_user', JSON.stringify(data.data));
        setEditMessage({ type: 'success', text: 'Photo updated successfully!' });
        setTimeout(() => setEditMessage({ type: '', text: '' }), 3000);
      }
    } catch (err) {
      setEditMessage({ type: 'error', text: 'Upload failed' });
    } finally {
      setPhotoUploading(false);
    }
  };

  const copyToClipboard = () => {
    const link = `${window.location.origin}/dr/${stats?.referral_code || doctor?.referral_code}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Loading Dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf9f6] pb-20">
      {/* Top Banner */}
      <div className="bg-black py-3">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.25em] text-white text-center">
            Professional Partner Dashboard <span className="text-accent-gold ml-2">v2.0</span>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl mt-6 sm:mt-10">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center gap-6 sm:gap-8 mb-8 sm:mb-12 text-center lg:text-left bg-white p-6 sm:p-8 rounded-[2rem] border border-primary/5 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="relative group cursor-pointer" onClick={() => !photoUploading && fileInputRef.current.click()}>
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-100 flex items-center justify-center relative">
                {photoUploading ? (
                  <div className="w-full h-full flex items-center justify-center bg-black/50 absolute inset-0 z-10 text-white">
                    <i className="fa-solid fa-spinner fa-spin text-xl"></i>
                  </div>
                ) : doctor?.image_url ? (
                  <img src={`${API_BASE_URL}admin/${doctor.image_url}`} className="w-full h-full object-cover" alt="" />
                ) : (
                  <span className="text-xl sm:text-2xl font-black text-gray-300">{doctor?.name?.charAt(0)}</span>
                )}
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FaCamera className="text-white text-base sm:text-xl" />
              </div>
              <input type="file" ref={fileInputRef} className="hidden" onChange={handlePhotoUpload} />
            </div>
            <div>
              <div className="flex flex-row items-center justify-center lg:justify-start gap-2.5 mb-1.5">
                <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter text-black">{stats?.name}</h1>
                {Number(doctor?.is_verified) === 1 ? (
                  <FaCheckCircle className="text-primary text-base sm:text-xl shrink-0" />
                ) : (
                  <FaClock className="text-yellow-500 text-base sm:text-xl shrink-0" />
                )}
              </div>
              <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-stone-400">{doctor?.specialty || 'Nutrition Specialist'}</p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-3 w-full sm:w-auto justify-center">
            <button
              onClick={copyToClipboard}
              className={`flex-1 sm:flex-none px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black uppercase tracking-widest text-[9px] sm:text-[10px] flex items-center justify-center gap-2.5 transition-all cursor-pointer ${copied ? 'bg-primary text-white' : 'bg-[#f4f3ee] text-stone-850 hover:bg-[#eaeae2]'}`}
            >
              {copied ? <FaCheckCircle /> : <FaCopy />}
              {copied ? 'Copied Link' : 'Referral Link'}
            </button>
            <button onClick={handleLogout} className="p-3 sm:p-4 bg-[#f4f3ee] rounded-xl sm:rounded-2xl text-stone-400 hover:text-red-500 transition-colors cursor-pointer shrink-0">
              <FaSignOutAlt />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
          {[
            {
              label: 'Approved Earnings',
              value: `₹${Number(stats?.approved_commissions || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              icon: FaWallet,
              color: 'text-green-600 bg-green-50'
            },
            {
              label: 'Pending Balance',
              value: `₹${Number(stats?.pending_commissions || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
              icon: FaClock,
              color: 'text-yellow-600 bg-yellow-50'
            },
            { label: 'Total Referrals', value: stats?.total_orders || '0', icon: FaShoppingBag, color: 'text-black bg-stone-50' },
            { label: 'Comm. Rate', value: `${stats?.commission_rate || 0}%`, icon: FaChartLine, color: 'text-blue-500 bg-blue-50/50' },
          ].map((item, i) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              key={i}
              className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-primary/5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 ${item.color} shrink-0`}>
                  <item.icon className="text-sm sm:text-lg" />
                </div>
                <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] text-stone-400 mb-1">{item.label}</p>
              </div>
              <h3 className="text-base sm:text-2xl font-black text-stone-900 truncate">{item.value}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10">

          {/* Main Dashboard: Orders Table */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="bg-white rounded-2xl sm:rounded-[2.5rem] border border-primary/5 shadow-xs overflow-hidden">
              <div className="p-5 sm:p-8 border-b border-primary/5 flex justify-between items-center">
                <h2 className="text-xs sm:text-sm font-black uppercase tracking-widest text-black flex items-center gap-2.5">
                  <FaFileInvoiceDollar className="text-primary" />
                  Recent Referrals
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[500px] sm:min-w-0">
                  <thead className="bg-[#faf9f6]">
                    <tr>
                      <th className="px-5 sm:px-8 py-3 sm:py-4 text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-stone-400">Order ID</th>
                      <th className="px-5 sm:px-8 py-3 sm:py-4 text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-stone-400">Products</th>
                      <th className="px-5 sm:px-8 py-3 sm:py-4 text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-stone-400">Status</th>
                      <th className="px-5 sm:px-8 py-3 sm:py-4 text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-stone-400">Comm.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                    {orders.length > 0 ? orders.map((order) => (
                      <tr key={order.id} className="hover:bg-[#faf9f6]/30 transition-colors">
                        <td className="px-5 sm:px-8 py-4">
                          <p className="text-[10px] sm:text-[11px] font-black text-black">#{order.id}</p>
                          <p className="text-[8px] sm:text-[9px] font-bold text-stone-300 uppercase">{new Date(order.created_at).toLocaleDateString()}</p>
                        </td>
                        <td className="px-5 sm:px-8 py-4">
                          <p className="text-[9px] sm:text-[10px] font-bold text-stone-500 truncate max-w-[150px] sm:max-w-[200px]">{order.products}</p>
                        </td>
                        <td className="px-5 sm:px-8 py-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[7px] sm:text-[8px] font-black uppercase tracking-widest ${
                            order.commission_status === 'approved' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                          }`}>
                            {order.commission_status}
                          </span>
                        </td>
                        <td className="px-5 sm:px-8 py-4 text-black font-black text-[10px] sm:text-[11px]">
                          ₹{Number(order.commission_earned).toFixed(2)}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="4" className="px-5 sm:px-8 py-12 sm:py-16 text-center text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-stone-300">
                          No referrals recorded yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6 sm:space-y-8">
            {/* Quick Edit Card */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] border border-primary/5 shadow-xs space-y-5 sm:space-y-6">
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-black">Account Settings</h3>

              {editMessage.text && (
                <div className={`p-3.5 sm:p-4 rounded-xl text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-center ${editMessage.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  {editMessage.text}
                </div>
              )}

              <div className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-stone-400">Full Name</label>
                    <input
                      type="text"
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="w-full bg-[#f4f3ee]/50 border border-transparent p-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-bold focus:bg-white focus:border-primary transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-stone-400">Specialty</label>
                    <input
                      type="text"
                      value={editFormData.specialty}
                      onChange={(e) => setEditFormData({ ...editFormData, specialty: e.target.value })}
                      className="w-full bg-[#f4f3ee]/50 border border-transparent p-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-bold focus:bg-white focus:border-primary transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-stone-400">Age</label>
                  <input
                    type="number"
                    value={editFormData.age}
                    onChange={(e) => setEditFormData({ ...editFormData, age: e.target.value })}
                    className="w-full bg-[#f4f3ee]/50 border border-transparent p-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-bold focus:bg-white focus:border-primary transition-all outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-stone-400">Key Achievements</label>
                  <textarea
                    value={editFormData.achievements}
                    onChange={(e) => setEditFormData({ ...editFormData, achievements: e.target.value })}
                    rows="2"
                    className="w-full bg-[#f4f3ee]/50 border border-transparent p-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-bold focus:bg-white focus:border-primary transition-all outline-none resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-stone-400">Professional Bio</label>
                  <textarea
                    value={editFormData.bio}
                    onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                    rows="3"
                    className="w-full bg-[#f4f3ee]/50 border border-transparent p-3 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-bold focus:bg-white focus:border-primary transition-all outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Manage Recommendations Section */}
        <div className="bg-white p-5 sm:p-10 rounded-2xl sm:rounded-[2.5rem] border border-primary/5 mt-6 sm:mt-10 shadow-xs">
          <div className="mb-6 sm:mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6">
            <div>
              <h2 className="text-base sm:text-2xl font-black uppercase tracking-widest text-black mb-1 sm:mb-2">Featured Products</h2>
              <p className="text-[10px] sm:text-xs text-stone-400 font-medium leading-relaxed">
                Select the products you want to feature on your public portfolio page.
              </p>
            </div>
            <div className="px-4.5 py-2 sm:px-6 sm:py-3 bg-[#f4f3ee] rounded-full text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-stone-500">
              {selectedProducts.length} Items Selected
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6 max-h-[400px] sm:max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {allProducts.map(product => {
              const isSelected = selectedProducts.includes(Number(product.id));
              const imageUrl = product.image_url
                ? (product.image_url.startsWith('http')
                  ? product.image_url
                  : `${API_BASE_URL}admin/${product.image_url}`)
                : 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=600';

              return (
                <div
                  key={product.id}
                  onClick={() => {
                    const idNum = Number(product.id);
                    if (isSelected) {
                      setSelectedProducts(selectedProducts.filter(id => id !== idNum));
                    } else {
                      setSelectedProducts([...selectedProducts, idNum]);
                    }
                  }}
                  className={`relative cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden border-2 transition-all duration-300 ${isSelected ? 'border-primary bg-primary/5 shadow-xs' : 'border-primary/5 hover:border-stone-200 bg-white'}`}
                >
                  <div className="aspect-square p-4 sm:p-6 bg-stone-50 flex items-center justify-center">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-[85%] h-[85%] object-contain mix-blend-multiply"
                    />
                  </div>
                  <div className="p-3 sm:p-4 border-t border-primary/5 flex items-center justify-between gap-2">
                    <p className="truncate text-[8px] sm:text-[10px] font-black uppercase text-stone-800 flex-1">{product.name}</p>
                    {isSelected && <FaCheckCircle className="text-primary shrink-0 text-xs sm:text-sm" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Save Action */}
        <div className="flex justify-end mt-6 sm:mt-10">
          <button
            onClick={async (e) => {
              e.preventDefault();
              setEditLoading(true);
              try {
                const payload = {
                  ...editFormData,
                  recommended_products: selectedProducts.join(','),
                  id: doctor.id
                };
                const res = await fetch(API_BASE_URL + 'api/doctor_update.php', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload),
                });
                const data = await res.json();
                if (data.status === 'success') {
                  setEditMessage({ type: 'success', text: 'Dashboard updated successfully!' });
                  setDoctor(data.data);
                  localStorage.setItem('doctor_user', JSON.stringify(data.data));
                  setTimeout(() => setEditMessage({ type: '', text: '' }), 3000);
                }
              } catch (err) {
                setEditMessage({ type: 'error', text: 'Connection failed' });
              } finally {
                setEditLoading(false);
              }
            }}
            disabled={editLoading}
            className={`w-full sm:w-auto px-8 sm:px-16 py-4 sm:py-6 bg-black text-white rounded-xl sm:rounded-[2rem] font-black uppercase tracking-[0.25em] text-[9px] sm:text-[10px] shadow-2xl hover:bg-primary hover:-translate-y-0.5 active:scale-98 transition-all cursor-pointer ${editLoading ? 'opacity-50' : ''}`}
          >
            {editLoading ? 'Synchronizing...' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
