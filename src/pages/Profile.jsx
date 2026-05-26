import { API_BASE_URL } from '../config';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    zip: ''
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const userStr = localStorage.getItem('customer_user');
    if (!userStr) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(userStr);
      setUser(parsedUser);
      setFormData({
        name: parsedUser.name || '',
        phone: parsedUser.phone || '',
        address: parsedUser.address || '',
        city: parsedUser.city || '',
        zip: parsedUser.zip || ''
      });
      fetchOrders(parsedUser.id);
    }
  }, [navigate]);

  const fetchOrders = async (userId) => {
    try {
      const res = await fetch(`${API_BASE_URL}api/customer_orders.php?user_id=${userId}`);
      const data = await res.json();
      if (data.status === 'success') {
        setOrders(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateMessage({ type: '', text: '' });

    try {
      const response = await fetch(API_BASE_URL + 'api/customer_update.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, id: user.id }),
      });
      const data = await response.json();
      
      if (data.status === 'success') {
        setUser(data.data);
        localStorage.setItem('customer_user', JSON.stringify(data.data));
        setUpdateMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        setUpdateMessage({ type: 'error', text: data.message || 'Failed to update.' });
      }
    } catch (err) {
      setUpdateMessage({ type: 'error', text: 'Connection failed.' });
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('customer_user');
    window.dispatchEvent(new Event('storage'));
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full border-4 border-white shadow-sm flex items-center justify-center shrink-0">
              <span className="text-3xl font-black text-primary">{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tighter text-gray-900">{user.name}</h1>
              <p className="text-gray-500 font-bold tracking-widest text-[10px] uppercase mt-1">{user.email}</p>
            </div>
          </div>
          <div>
            <button onClick={handleLogout} className="bg-red-50 text-red-600 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-colors">
              Sign Out
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full lg:w-[25%]">
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-row lg:flex-col gap-2 overflow-x-auto custom-scrollbar">
              <button 
                onClick={() => setActiveTab('orders')}
                className={`flex-1 lg:w-full text-left px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all whitespace-nowrap ${activeTab === 'orders' ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <i className="fa-solid fa-box-open mr-3"></i> My Orders
              </button>
              <button 
                onClick={() => setActiveTab('address')}
                className={`flex-1 lg:w-full text-left px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all whitespace-nowrap ${activeTab === 'address' ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <i className="fa-solid fa-location-dot mr-3"></i> Shipping Details
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-[75%]">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[400px]">
              
              {/* ORDERS TAB */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-black uppercase tracking-widest text-gray-800 mb-8">Order History</h2>
                  
                  {loadingOrders ? (
                    <div className="animate-pulse space-y-4">
                      {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-100 rounded-2xl"></div>)}
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                      <i className="fa-solid fa-box-open text-4xl text-gray-200 mb-4"></i>
                      <p className="text-gray-500 font-medium">You haven't placed any orders yet.</p>
                      <Link to="/shop" className="text-primary font-bold uppercase tracking-widest text-[10px] mt-4 inline-block hover:underline">Start Shopping</Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map(order => (
                        <div key={order.id} className="border border-gray-100 rounded-2xl p-6">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Order #{order.id}</p>
                              <p className="text-xs font-bold text-gray-800">{new Date(order.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Total</p>
                                {parseFloat(order.discount_amount) > 0 ? (
                                  <div>
                                    <p className="text-[10px] text-gray-400 line-through leading-none">₹{parseFloat(order.total_amount).toLocaleString('en-IN')}</p>
                                    <p className="text-sm font-black text-black leading-tight">₹{parseFloat(order.final_amount).toLocaleString('en-IN')}</p>
                                    <p className="text-[9px] font-bold text-green-500 uppercase tracking-widest leading-none mt-1">-₹{parseFloat(order.discount_amount).toLocaleString('en-IN')}</p>
                                  </div>
                                ) : (
                                  <p className="text-sm font-black text-black">₹{parseFloat(order.total_amount).toLocaleString('en-IN')}</p>
                                )}
                              </div>
                              <span className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-yellow-50 text-yellow-700 border border-yellow-200">
                                {order.status}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-4">
                            {order.items && order.items.map((item, idx) => {
                              const imgUrl = item.image_url ? (item.image_url.startsWith('http') ? item.image_url : `${API_BASE_URL}admin/${item.image_url}`) : 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=600';
                              return (
                                <div key={idx} className="flex items-center gap-4">
                                  <div className="w-16 h-16 bg-gray-50 rounded-xl p-2 border border-gray-100">
                                    <img src={imgUrl} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-xs font-black uppercase text-gray-800">{item.name}</p>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                                  </div>
                                  <p className="text-sm font-bold text-gray-800">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ADDRESS TAB */}
              {activeTab === 'address' && (
                <div>
                  <h2 className="text-xl font-black uppercase tracking-widest text-gray-800 mb-2">Shipping Details</h2>
                  <p className="text-xs text-gray-500 font-medium mb-8">Save your details here to auto-fill at checkout.</p>

                  {updateMessage.text && (
                    <div className={`mb-6 p-4 rounded-xl text-[10px] font-bold tracking-widest uppercase text-center ${updateMessage.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                      {updateMessage.text}
                    </div>
                  )}

                  <form onSubmit={handleUpdate} className="space-y-6 max-w-2xl">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Full Name</label>
                      <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Street Address</label>
                      <input name="address" value={formData.address} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">City</label>
                        <input name="city" value={formData.city} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Postal Code</label>
                        <input name="zip" value={formData.zip} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Phone Number</label>
                      <input name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium" />
                    </div>

                    <button 
                      type="submit" 
                      disabled={updateLoading}
                      className={`w-full md:w-auto px-10 bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-primary transition-all shadow-xl mt-4 ${updateLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {updateLoading ? 'Saving...' : 'Save Details'}
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
