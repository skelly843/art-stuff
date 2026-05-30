import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl relative z-10">
              <img
                src="https://images.unsplash.com/photo-1547891319-184a7551c1f3?q=80&w=1000&auto=format&fit=crop"
                alt="Artist Portrait"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-200 rounded-3xl -z-0"></div>
          </motion.div>

          <div>
            <h1 className="text-5xl font-serif text-brand-950 mb-8">About the Artist</h1>
            <div className="space-y-6 text-lg text-brand-700 leading-relaxed">
              <p>
                My work is a continuous exploration of the ephemeral quality of light and the profound
                emotional resonance found in the natural world. Based in my sun-drenched studio in Brooklyn,
                I bridge the gap between traditional oil painting techniques and contemporary abstraction.
              </p>
              <p>
                Born in a small coastal town, the rhythm of the tides and the shifting colors of the horizon
                have always been my primary muses. Each canvas begins as a series of spontaneous gestures,
                which I then refine through countless thin layers of pigment, seeking to capture not just
                what is seen, but what is felt.
              </p>
              <h2 className="text-2xl font-serif text-brand-950 pt-6">The Studio Process</h2>
              <p>
                Everything is created by hand using the highest quality archival materials. I believe the
                tactile nature of the medium is essential to the final piece, often incorporating
                impasto textures alongside delicate glazes.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-32">
          <h2 className="text-3xl font-serif text-brand-950 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-xl font-serif text-brand-900">Shipping & Returns</h3>
              <p className="text-brand-600">
                All artworks are professionally packed and shipped globally. Available works are typically
                dispatched within 5-7 business days. We offer a 14-day return window for original pieces.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-serif text-brand-900">Commissions</h3>
              <p className="text-brand-600">
                I accept a limited number of custom commissions each year. If you have a specific size
                or color palette in mind, please reach out via the contact page to discuss your vision.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-serif text-brand-900">Certificate of Authenticity</h3>
              <p className="text-brand-600">
                Every original painting comes with a signed Certificate of Authenticity, documenting
                the title, dimensions, medium, and year of completion.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-serif text-brand-900">Payment Options</h3>
              <p className="text-brand-600">
                Payments are securely processed via Stripe. We accept all major credit cards.
                Payment plans may be available for larger works upon request.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
