import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { createCheckoutSession } from '../lib/stripe';

// Custom Icons
const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);
const ShoppingCartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
);
const ShieldCheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
);
const TruckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>
);
const RefreshCwIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
);

const ArtworkDetail = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    fetchArtwork();
  }, [id]);

  const fetchArtwork = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching artwork:', error);
    } else {
      setArtwork(data);
      setMainImage(data.image_url);
    }
    setLoading(false);
  };

  const handlePurchase = async () => {
    await createCheckoutSession(artwork);
  };

  if (loading) {
    return (
      <div className="pt-40 pb-24 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h2 className="text-2xl font-serif mb-4">Artwork not found</h2>
        <Link to="/gallery" className="text-accent hover:underline">Return to gallery</Link>
      </div>
    );
  }

  const images = [artwork.image_url, ...(artwork.additional_images || [])];

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Link
        to="/gallery"
        className="inline-flex items-center text-brand-600 hover:text-brand-950 mb-12 transition-colors group"
      >
        <span className="mr-2 group-hover:-translate-x-1 transition-transform">
          <ArrowLeftIcon />
        </span>
        Back to Gallery
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image Gallery */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[4/5] rounded-3xl overflow-hidden bg-brand-100 shadow-xl"
          >
            <img
              src={mainImage}
              alt={artwork.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          {images.length > 1 && (
            <div className="flex gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    mainImage === img ? 'border-brand-950 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-serif text-brand-950 mb-2">{artwork.title}</h1>
                <p className="text-brand-500 font-sans">{artwork.year_painted} • {artwork.medium}</p>
              </div>
              <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                artwork.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-brand-950 text-white'
              }`}>
                {artwork.status}
              </span>
            </div>

            <p className="text-3xl font-medium text-brand-950 mb-8">${artwork.price.toLocaleString()}</p>

            <div className="prose prose-brand text-brand-700 mb-10">
              <p>{artwork.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-10 p-6 bg-brand-100 rounded-2xl">
              <div>
                <p className="text-xs uppercase tracking-wider text-brand-400 mb-1">Dimensions</p>
                <p className="font-medium text-brand-950">{artwork.dimensions}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-brand-400 mb-1">Shipping</p>
                <p className="font-medium text-brand-950">Worldwide available</p>
              </div>
            </div>

            {artwork.status === 'available' ? (
              <button
                onClick={handlePurchase}
                className="w-full py-5 bg-brand-950 text-white rounded-full font-semibold flex items-center justify-center gap-3 hover:bg-brand-900 transition-all shadow-lg hover:shadow-brand-950/20 active:scale-[0.98]"
              >
                <ShoppingCartIcon />
                Purchase this Artwork
              </button>
            ) : (
              <button disabled className="w-full py-5 bg-brand-200 text-brand-400 rounded-full font-semibold cursor-not-allowed">
                {artwork.status === 'reserved' ? 'Reserved' : 'Currently Sold'}
              </button>
            )}

            <div className="mt-12 space-y-4 border-t border-brand-200 pt-8">
              <div className="flex items-center gap-4 text-sm text-brand-600">
                <ShieldCheckIcon />
                <span>Certificate of Authenticity included</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-brand-600">
                <TruckIcon />
                <span>Secure professional packaging and tracked shipping</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-brand-600">
                <RefreshCwIcon />
                <span>14-day return policy for ultimate peace of mind</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
