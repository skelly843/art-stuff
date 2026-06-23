import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const Commissions = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    details: '',
    budget_range: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('commissions').insert([formData]);
    if (error) {
      alert(error.message);
    } else {
      setSubmitted(true);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-24 text-center px-4">
        <h2 className="text-4xl font-serif text-brand-950 mb-4">Request Received</h2>
        <p className="text-brand-600 mb-8">Thank you for your interest. I will review your request and get back to you shortly.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-8 py-3 bg-brand-950 text-white rounded-full font-medium"
        >
          Send Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-serif text-brand-950 mb-6">Commissions</h1>
        <p className="text-lg text-brand-700 max-w-2xl mx-auto">
          Collaborate with me to create a unique piece tailored for your space.
          I am currently accepting a limited number of commissions for 2024.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8 text-left">
          <div>
            <h3 className="text-xl font-serif text-brand-950 mb-3">The Process</h3>
            <p className="text-brand-600">
              Every commission begins with a conversation about your vision, preferred colors, and the space where the artwork will live.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-serif text-brand-950 mb-3">Timeline</h3>
            <p className="text-brand-600">
              Custom pieces typically take 4-8 weeks to complete, depending on size and complexity, plus drying time for oil paints.
            </p>
          </div>
          <div className="p-8 bg-brand-100 rounded-3xl">
            <h3 className="text-lg font-serif text-brand-950 mb-2">Available Sizes</h3>
            <ul className="text-sm text-brand-700 space-y-2">
              <li>• Small (12x12" to 16x20")</li>
              <li>• Medium (24x24" to 30x40")</li>
              <li>• Large (36x48" and above)</li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl shadow-brand-200/50 space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1">Name</label>
            <input
              required
              type="text"
              value={formData.customer_name}
              onChange={e => setFormData({...formData, customer_name: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-brand-200 focus:ring-2 focus:ring-brand-500 bg-brand-50/50 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1">Email</label>
            <input
              required
              type="email"
              value={formData.customer_email}
              onChange={e => setFormData({...formData, customer_email: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-brand-200 focus:ring-2 focus:ring-brand-500 bg-brand-50/50 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1">Budget Range</label>
            <select
              required
              value={formData.budget_range}
              onChange={e => setFormData({...formData, budget_range: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-brand-200 focus:ring-2 focus:ring-brand-500 bg-brand-50/50 outline-none"
            >
              <option value="">Select a range</option>
              <option value="Under $1,000">Under $1,000</option>
              <option value="$1,000 - $3,000">$1,000 - $3,000</option>
              <option value="$3,000 - $5,000">$3,000 - $5,000</option>
              <option value="$5,000+">$5,000+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1">Details & Vision</label>
            <textarea
              required
              rows={5}
              value={formData.details}
              onChange={e => setFormData({...formData, details: e.target.value})}
              placeholder="Describe what you have in mind (size, style, colors...)"
              className="w-full px-4 py-3 rounded-xl border border-brand-200 focus:ring-2 focus:ring-brand-500 bg-brand-50/50 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-brand-950 text-white rounded-xl font-medium hover:bg-brand-900 transition-colors disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Commissions;
