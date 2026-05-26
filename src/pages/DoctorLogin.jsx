import { API_BASE_URL } from '../config';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const DoctorLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_BASE_URL + 'api/doctor_auth.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('doctor_user', JSON.stringify(data.data));
        navigate('/doctor/dashboard');
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-black text-white p-10 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Doctor Portal</h2>
          <p className="text-gray-400 text-sm font-medium tracking-wide">
            Sign in to access your referral dashboard.
          </p>
        </div>

        {/* Form */}
        <div className="p-10">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-800 border border-red-200 rounded-xl text-sm font-bold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="jane@example.com"
                className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Password</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-primary text-white py-5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-primary-dark transition-all shadow-xl mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>

            <div className="text-center pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-500 font-medium">
                Not a partner yet? <Link to="/doctor/join" className="text-primary font-bold hover:underline">Apply Here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
