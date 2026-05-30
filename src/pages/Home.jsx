import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

// Custom Icons
const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const Home = () => {
  const [featuredArtwork, setFeaturedArtwork] = useState(null);

  useEffect(() => {
    fetchFeaturedArtwork();
  }, []);

  const fetchFeaturedArtwork = async () => {
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .eq('status', 'available')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!error && data) {
      setFeaturedArtwork(data);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000&auto=format&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover brightness-[0.9]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-tight">
              Capturing Light & Emotion
            </h1>
            <p className="text-xl md:text-2xl font-sans mb-8 text-brand-50 opacity-90">
              Exploring the intersection of nature and abstraction through contemporary oil painting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/gallery"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-950 font-medium rounded-full hover:bg-brand-100 transition-colors group"
              >
                View Gallery
                <span className="ml-2 group-hover:translate-x-1 transition-transform">
                  <ArrowRightIcon />
                </span>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 border border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors"
              >
                The Artist
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Artwork Section */}
      {featuredArtwork && (
        <section className="py-24 bg-brand-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={featuredArtwork.image_url}
                  alt={featuredArtwork.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur text-brand-900 text-sm font-medium rounded-full">
                    Latest Available Piece
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-left"
              >
                <h2 className="text-4xl md:text-5xl font-serif mb-6 text-brand-950">
                  {featuredArtwork.title}
                </h2>
                <p className="text-lg text-brand-700 mb-8 leading-relaxed line-clamp-4">
                  {featuredArtwork.description}
                </p>
                <div className="space-y-4 mb-10">
                  <div className="flex justify-between border-b border-brand-200 pb-2">
                    <span className="text-brand-600">Medium</span>
                    <span className="text-brand-950 font-medium">{featuredArtwork.medium}</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-200 pb-2">
                    <span className="text-brand-600">Dimensions</span>
                    <span className="text-brand-950 font-medium">{featuredArtwork.dimensions}</span>
                  </div>
                  <div className="flex justify-between border-b border-brand-200 pb-2">
                    <span className="text-brand-600">Year</span>
                    <span className="text-brand-950 font-medium">{featuredArtwork.year_painted}</span>
                  </div>
                </div>
                <Link
                  to={`/artwork/${featuredArtwork.id}`}
                  className="inline-flex items-center text-brand-950 font-semibold border-b-2 border-brand-950 pb-1 hover:text-brand-600 hover:border-brand-600 transition-colors"
                >
                  View Details
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="py-24 bg-brand-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-6 text-brand-950">
            Join the Collector's Circle
          </h2>
          <p className="text-brand-700 mb-10">
            Be the first to see new collections, studio updates, and exclusive exhibition invitations.
          </p>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-6 py-4 rounded-full border border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-brand-950 text-white rounded-full font-medium hover:bg-brand-900 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
