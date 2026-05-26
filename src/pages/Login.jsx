import { API_BASE_URL } from '../config';
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_BASE_URL + 'api/auth.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, action: 'login' }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('customer_user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage')); // Trigger navbar update
        
        const params = new URLSearchParams(location.search);
        const redirect = params.get('redirect');
        if (redirect) {
          navigate(redirect);
        } else {
          navigate('/');
        }
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
    <div className="min-h-screen bg-white flex items-center justify-center py-20 px-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Welcome Back</h2>
          <p className="text-gray-500 text-sm font-medium">Sign in to your Pure Plant account</p>
        </div>

        {/* Form */}
        <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100">
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
                className="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Password</label>
                <a href="#" className="text-[10px] font-bold text-gray-400 hover:text-primary">Forgot?</a>
              </div>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-black text-white py-5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-primary transition-all shadow-xl mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="text-center pt-6">
              <p className="text-xs text-gray-500 font-medium">
                Don't have an account? <Link to="/register" className="text-black font-bold border-b border-black pb-0.5 hover:text-primary hover:border-primary transition-colors">Create one</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
