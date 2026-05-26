import { API_BASE_URL } from '../config';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DoctorJoin = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    specialty: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(API_BASE_URL + 'api/doctor_register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setMessage({ type: 'success', text: 'Application submitted successfully! Our team will review your profile shortly.' });
        setFormData({ name: '', email: '', password: '', specialty: '', bio: '' });
      } else {
        setMessage({ type: 'error', text: data.message || 'An error occurred during registration.' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({ type: 'error', text: 'Failed to connect to the server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-6">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-black text-white p-10 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Join the Elite</h2>
          <p className="text-gray-400 text-sm font-medium tracking-wide">
            Apply to become a verified Pure Plant practitioner and earn through your recommendations.
          </p>
        </div>

        {/* Form Section */}
        <div className="p-10">
          {message.text && (
            <div className={`mb-6 p-4 rounded-xl text-sm font-bold text-center ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Full Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Dr. Jane Doe"
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Email Address *</label>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Password *</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a strong password"
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Specialty *</label>
                <input 
                  type="text" 
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Sports Nutritionist"
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Professional Bio *</label>
              <textarea 
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Tell us about your practice, experience, and how you help your patients..."
                className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl outline-none focus:border-primary transition-all text-sm font-medium resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-primary text-white py-5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-primary-dark transition-all shadow-xl mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Submitting Application...' : 'Submit Application'}
            </button>

            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 font-medium">
                Already have an account? <Link to="/doctor/login" className="text-primary font-bold hover:underline">Sign In</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorJoin;
