import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaWallet, FaShoppingBag, FaChartLine, FaCopy,
  FaCheckCircle, FaClock, FaSignOutAlt, FaCamera,
  FaChevronRight, FaFilter, FaFileInvoiceDollar
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
      const response = await fetch(`http://localhost/E-commerce/backendDR/api/doctor_dashboard.php?doctor_id=${docId}`);
      const data = await response.json();
      if (data.status === 'success') {
        const statsData = data.data.stats;
        setStats(statsData);
        setOrders(data.data.orders);

        // Update edit form data with EVERYTHING from the database
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
    fetch('http://localhost/E-commerce/backendDR/api/products.php')
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
      const response = await fetch('http://localhost/E-commerce/backendDR/api/doctor_upload_photo.php', {
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
    const link = `http://localhost:5173/dr/${stats?.referral_code || doctor?.referral_code}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Loading Dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfcfc] pb-20">
      {/* Top Banner */}
      <div className="bg-black py-3">
        <div className="container mx-auto px-6 max-w-7xl">
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white text-center">
            Professional Partner Dashboard <span className="text-primary ml-2">v2.0</span>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl mt-10">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
          <div className="flex items-center gap-6">
            <div className="relative group cursor-pointer" onClick={() => !photoUploading && fileInputRef.current.click()}>
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                {photoUploading ? (
                  <div className="w-full h-full flex items-center justify-center bg-black/50 absolute inset-0 z-10 text-white">
                    <i className="fa-solid fa-spinner fa-spin text-xl"></i>
                  </div>
                ) : doctor?.image_url ? (
                  <img src={`http://localhost/E-commerce/backendDR/admin/${doctor.image_url}`} className="w-full h-full object-cover" alt="" />
                ) : (
                  <span className="text-2xl font-black text-gray-300">{doctor?.name?.charAt(0)}</span>
                )}
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FaCamera className="text-white text-xl" />
              </div>
              <input type="file" ref={fileInputRef} className="hidden" onChange={handlePhotoUpload} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-4xl font-black uppercase tracking-tighter text-black">{stats?.name}</h1>
                {Number(doctor?.is_verified) === 1 ? (
                  <FaCheckCircle className="text-primary" />
                ) : (
                  <FaClock className="text-yellow-500" />
                )}
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">{doctor?.specialty}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={copyToClipboard}
              className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 transition-all ${copied ? 'bg-primary text-white shadow-primary/20' : 'bg-white text-black border border-gray-100 shadow-sm hover:shadow-md'}`}
            >
              {copied ? <FaCheckCircle /> : <FaCopy />}
              {copied ? 'Copied Link' : 'Referral Link'}
            </button>
            <button onClick={handleLogout} className="p-4 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-red-500 transition-colors shadow-sm">
              <FaSignOutAlt />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            {
              label: 'Approved Earnings',
              value: `₹${Number(stats?.approved_commissions || 0).toFixed(2)}`,
              icon: FaWallet,
              color: 'text-green-600'
            },
            {
              label: 'Pending Balance',
              value: `₹${Number(stats?.pending_commissions || 0).toFixed(2)}`,
              icon: FaClock,
              color: 'text-yellow-600'
            },
            { label: 'Total Referrals', value: stats?.total_orders, icon: FaShoppingBag, color: 'text-black' },
            { label: 'Comm. Rate', value: `${stats?.commission_rate}%`, icon: FaChartLine, color: 'text-blue-500' },
          ].map((item, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 ${item.color}`}>
                <item.icon size={20} />
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{item.label}</p>
              <h3 className="text-2xl font-black text-black">{item.value || '0'}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main Dashboard: Orders Table */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <h2 className="text-xl font-black uppercase tracking-widest text-black flex items-center gap-3">
                  <FaFileInvoiceDollar className="text-primary" />
                  Recent Referrals
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Order ID</th>
                      <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Products</th>
                      <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Status</th>
                      <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Comm.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {orders.length > 0 ? orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50/30 transition-colors">
                        <td className="px-8 py-5">
                          <p className="text-[11px] font-black text-black">#{order.id}</p>
                          <p className="text-[9px] font-bold text-gray-300 uppercase">{new Date(order.created_at).toLocaleDateString()}</p>
                        </td>
                        <td className="px-8 py-5">
                          <p className="text-[10px] font-bold text-gray-500 truncate max-w-[200px]">{order.products}</p>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${order.commission_status === 'approved' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                            }`}>
                            {order.commission_status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-black font-black text-[11px]">
                          ₹{Number(order.commission_earned).toFixed(2)}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="4" className="px-8 py-16 text-center text-[10px] font-black uppercase tracking-widest text-gray-300">
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
          <div className="space-y-8">
            {/* Quick Edit Card */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-black">Account Settings</h3>

              {editMessage.text && (
                <div className={`p-4 rounded-xl text-[10px] font-bold tracking-widest uppercase text-center ${editMessage.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  {editMessage.text}
                </div>
              )}

              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Full Name</label>
                    <input
                      type="text"
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="w-full bg-gray-50 border border-transparent p-3.5 rounded-2xl text-xs font-bold focus:bg-white focus:border-primary transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Specialty</label>
                    <input
                      type="text"
                      value={editFormData.specialty}
                      onChange={(e) => setEditFormData({ ...editFormData, specialty: e.target.value })}
                      className="w-full bg-gray-50 border border-transparent p-3.5 rounded-2xl text-xs font-bold focus:bg-white focus:border-primary transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Age</label>
                  <input
                    type="number"
                    value={editFormData.age}
                    onChange={(e) => setEditFormData({ ...editFormData, age: e.target.value })}
                    className="w-full bg-gray-50 border border-transparent p-3.5 rounded-2xl text-xs font-bold focus:bg-white focus:border-primary transition-all outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Key Achievements</label>
                  <textarea
                    value={editFormData.achievements}
                    onChange={(e) => setEditFormData({ ...editFormData, achievements: e.target.value })}
                    rows="2"
                    className="w-full bg-gray-50 border border-transparent p-3.5 rounded-2xl text-xs font-bold focus:bg-white focus:border-primary transition-all outline-none resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Professional Bio</label>
                  <textarea
                    value={editFormData.bio}
                    onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                    rows="3"
                    className="w-full bg-gray-50 border border-transparent p-3.5 rounded-2xl text-xs font-bold focus:bg-white focus:border-primary transition-all outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Manage Recommendations Section */}
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 mt-10 shadow-sm">
          <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-widest text-black mb-2">Featured Products</h2>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">
                Select the products you want to feature on your public portfolio page.
              </p>
            </div>
            <div className="px-6 py-3 bg-gray-50 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400">
              {selectedProducts.length} Items Selected
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
            {allProducts.map(product => {
              const isSelected = selectedProducts.includes(Number(product.id));
              const imageUrl = product.image_url
                ? (product.image_url.startsWith('http')
                  ? product.image_url
                  : `http://localhost/E-commerce/backendDR/admin/${product.image_url}`)
                : 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=600';

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
                  className={`relative cursor-pointer rounded-3xl overflow-hidden border-2 transition-all duration-300 ${isSelected ? 'border-primary bg-primary/5 shadow-lg' : 'border-gray-50 hover:border-gray-200 bg-white'}`}
                >
                  <div className="aspect-square p-6">
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <div className="p-4 border-t border-gray-50 flex items-center justify-between">
                    <p className="truncate text-[10px] font-black uppercase text-gray-800 flex-1">{product.name}</p>
                    {isSelected && <FaCheckCircle className="text-primary shrink-0" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Save Action */}
        <div className="flex justify-end mt-10">
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
                const res = await fetch('http://localhost/E-commerce/backendDR/api/doctor_update.php', {
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
            className={`px-16 py-6 bg-black text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:bg-primary hover:-translate-y-1 transition-all ${editLoading ? 'opacity-50' : ''}`}
          >
            {editLoading ? 'Synchronizing...' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
