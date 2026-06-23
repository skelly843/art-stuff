import React from 'react';
import { motion } from 'framer-motion';

// Custom Icons
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);

const Contact = () => {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="text-left">
          <h1 className="text-5xl font-serif text-brand-950 mb-8">Get in Touch</h1>
          <p className="text-lg text-brand-700 mb-12 leading-relaxed">
            Interested in a piece of art, a custom commission, or just want to say hello?
            Fill out the form below or reach out directly via email or social media.
            I typically respond within 48 hours.
          </p>

          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-900">
                <MailIcon />
              </div>
              <div>
                <p className="text-sm text-brand-500 uppercase tracking-wider">Email</p>
                <p className="text-lg text-brand-950">studio@artistportfolio.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-900">
                <MapPinIcon />
              </div>
              <div>
                <p className="text-sm text-brand-500 uppercase tracking-wider">Studio Location</p>
                <p className="text-lg text-brand-950">Brooklyn, New York</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-brand-500 uppercase tracking-wider mb-4">Follow My Process</p>
            <div className="flex gap-4">
              <a href="#" className="px-4 py-2 rounded-full border border-brand-300 flex items-center justify-center text-brand-600 hover:bg-brand-950 hover:text-white hover:border-brand-950 transition-all text-sm font-medium">
                Instagram
              </a>
              <a href="#" className="px-4 py-2 rounded-full border border-brand-300 flex items-center justify-center text-brand-600 hover:bg-brand-950 hover:text-white hover:border-brand-950 transition-all text-sm font-medium">
                Facebook
              </a>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-brand-200/50"
        >
          <form className="space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-brand-50/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-brand-50/50"
                  placeholder="Your email"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">Subject</label>
              <select className="w-full px-4 py-3 rounded-xl border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-brand-50/50">
                <option>General Inquiry</option>
                <option>Artwork Purchase</option>
                <option>Commission Request</option>
                <option>Press/Media</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-2">Message</label>
              <textarea
                rows="5"
                className="w-full px-4 py-3 rounded-xl border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-brand-50/50"
                placeholder="How can I help you?"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-brand-950 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-brand-900 transition-colors"
            >
              Send Message
              <SendIcon />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
