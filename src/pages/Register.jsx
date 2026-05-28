import { API_BASE_URL } from '../config';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '', otp: '' });
  const [otpSent, setOtpSent] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      setError('Please fill in Name, Email, Password, and Phone number first.');
      return;
    }

    // Basic E.164 phone number format validation (+ country code followed by digits)
    const phoneRegex = /^\+[1-9]\d{1,14}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Phone number must be in E.164 format (e.g. +919876543210 or +17623363571).');
      return;
    }

    setOtpLoading(true);
    setError('');
    setInfoMessage('');

    try {
      const response = await fetch(API_BASE_URL + 'api/auth.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: formData.email, 
          phone: formData.phone, 
          action: 'send_otp' 
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setOtpSent(true);
        setInfoMessage(data.message || 'OTP sent successfully! Please check your phone.');
      } else {
        setError(data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      console.error('Send OTP error:', err);
      setError('Failed to connect to the server.');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpSent) {
      setError('Please request and verify an OTP code first.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_BASE_URL + 'api/auth.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, action: 'register' }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('customer_user', JSON.stringify(data.data));
        window.dispatchEvent(new Event('storage')); // Trigger navbar update
        navigate('/');
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      console.error('Registration error:', err);
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
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Create Account</h2>
          <p className="text-gray-500 text-sm font-medium">Join the Pure Plant community</p>
        </div>

        {/* Form */}
        <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-800 border border-red-200 rounded-xl text-sm font-bold text-center">
              {error}
            </div>
          )}

          {infoMessage && (
            <div className="mb-6 p-4 bg-green-50 text-green-800 border border-green-200 rounded-xl text-sm font-bold text-center">
              {infoMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={otpSent}
                className="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium disabled:opacity-50 disabled:bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={otpSent}
                className="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium disabled:opacity-50 disabled:bg-gray-100"
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
                disabled={otpSent}
                className="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium disabled:opacity-50 disabled:bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Phone Number (with Country Code)</label>
              <input 
                type="tel" 
                name="phone"
                placeholder="+17623363571"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={otpSent}
                className="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium disabled:opacity-50 disabled:bg-gray-100"
              />
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Must include + and country code (e.g. +17623363571)</p>
            </div>

            {!otpSent ? (
              <button 
                type="button"
                onClick={handleSendOtp}
                disabled={otpLoading}
                className={`w-full bg-black text-white py-5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-primary transition-all shadow-xl mt-4 ${otpLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {otpLoading ? 'Sending Verification OTP...' : 'Send Verification OTP'}
              </button>
            ) : (
              <>
                <div className="space-y-2 animate-pulse-once">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">6-Digit OTP Code</label>
                  <input 
                    type="text" 
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    required
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="w-full bg-white border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-bold text-center tracking-widest"
                  />
                </div>

                <div className="flex gap-2 mt-4">
                  <button 
                    type="button"
                    onClick={() => { setOtpSent(false); setInfoMessage(''); }}
                    className="w-1/3 bg-gray-200 text-black py-5 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-gray-300 transition-all"
                  >
                    Change Info
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className={`w-2/3 bg-black text-white py-5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-primary transition-all shadow-xl ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Verifying & Registering...' : 'Verify & Sign Up'}
                  </button>
                </div>
              </>
            )}

            <div className="text-center pt-6">
              <p className="text-xs text-gray-500 font-medium">
                Already have an account? <Link to="/login" className="text-black font-bold border-b border-black pb-0.5 hover:text-primary hover:border-primary transition-colors">Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Register;
