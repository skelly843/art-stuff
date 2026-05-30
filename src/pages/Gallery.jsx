import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// Custom Icons
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);

const Gallery = ({ showSold = false }) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchArtworks();
  }, [showSold]);

  const fetchArtworks = async () => {
    setLoading(true);
    let query = supabase
      .from('artworks')
      .select('*')
      .order('created_at', { ascending: false });

    if (showSold) {
      query = query.eq('status', 'sold');
    } else {
      query = query.in('status', ['available', 'reserved']);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching artworks:', error);
    } else {
      setArtworks(data || []);
    }
    setLoading(false);
  };

  const filteredArtworks = artworks.filter(art => {
    const matchesCategory = filter === 'all' || art.category === filter;
    const matchesSearch = art.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', ...new Set(artworks.map(a => a.category))].filter(Boolean);

  if (loading) {
    return (
      <div className="pt-40 pb-24 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
        <p className="mt-4 text-brand-500">Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-serif text-brand-950 mb-4 text-left">
            {showSold ? 'Sold Works' : 'Available Art'}
          </h1>
          <p className="text-brand-600 max-w-lg text-left">
            Explore a collection of unique pieces. Each work is hand-painted and comes with a certificate of authenticity.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search artworks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border-b border-brand-300 focus:border-brand-900 focus:outline-none bg-transparent"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent border-b border-brand-300 py-2 focus:outline-none focus:border-brand-900 capitalize"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {filteredArtworks.map((art, index) => (
          <motion.div
            key={art.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
          >
            <Link to={`/artwork/${art.id}`}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-4 bg-brand-100 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                <img
                  src={art.image_url}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {art.status === 'sold' && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-brand-950 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
                      Sold
                    </span>
                  </div>
                )}
                {art.status === 'reserved' && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
                      Reserved
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-6 py-2 bg-white text-brand-950 font-medium rounded-full scale-95 group-hover:scale-100 transition-transform">
                    View Artwork
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div className="text-left">
                  <h3 className="text-xl font-serif text-brand-950 group-hover:text-brand-600 transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-sm text-brand-500 font-sans">{art.medium} • {art.category}</p>
                </div>
                <p className="text-lg font-medium text-brand-900">
                  {art.status === 'sold' ? '' : `$${art.price.toLocaleString()}`}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredArtworks.length === 0 && (
        <div className="text-center py-24">
          <p className="text-brand-500 italic">No artworks found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
