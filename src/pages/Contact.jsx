import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <h1 className="text-5xl font-serif text-brand-950 mb-8">Get in Touch</h1>
          <p className="text-lg text-brand-700 mb-12 leading-relaxed">
            Interested in a piece of art, a custom commission, or just want to say hello?
            Fill out the form below or reach out directly via email or social media.
            I typically respond within 48 hours.
          </p>

          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-900">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-brand-500 uppercase tracking-wider">Email</p>
                <p className="text-lg text-brand-950">studio@artistportfolio.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-900">
                <MapPin size={20} />
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
          <form className="space-y-6">
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
              <Send size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
