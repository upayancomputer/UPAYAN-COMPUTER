import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryItem } from '../types';

interface GalleryProps {
  items: GalleryItem[];
}

export const Gallery: React.FC<GalleryProps> = ({ items }) => {
  const [filter, setFilter] = useState<'all' | 'lab' | 'classroom' | 'events' | 'certificates'>('all');

  const filterCategories: { id: typeof filter; label: string }[] = [
    { id: 'all', label: 'All Photos' },
    { id: 'lab', label: 'Practical Labs' },
    { id: 'classroom', label: 'Classrooms' },
    { id: 'events', label: 'Campus Events' },
    { id: 'certificates', label: 'Certifications' }
  ];

  const filteredItems = filter === 'all' ? items : items.filter(item => item.category === filter);

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-[#020617]/50 border-t border-white/10">
      {/* Glow highlight */}
      <div className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest font-mono text-cyan-400 uppercase bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
            Campus Tour
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Explore our State-of-the-Art Facilities
          </h2>
          <p className="text-sm text-slate-400 font-sans">
            Take a virtual tour of our modern study environments. Clean air-conditioned classrooms, dedicated 1:1 computer stations, specialized technical workshops, and our annual convocation programs.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12" id="gallery-filters">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all uppercase font-mono cursor-pointer ${
                filter === cat.id
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25 border border-cyan-400/40'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
              id={`gallery-filter-btn-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry-like Flex/Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          id="gallery-masonry"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                key={item.id}
                className="relative overflow-hidden rounded-2xl glass-card group border border-white/5 aspect-video md:aspect-[4/3] flex flex-col justify-end text-left select-none shadow-md"
                id={`gallery-item-${item.id}`}
              >
                {/* Background image component */}
                <img
                  referrerPolicy="no-referrer"
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Black gradient overlay screen */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Floating Content caption */}
                <div className="relative z-10 p-5 space-y-1.5 pointer-events-none transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/15">
                    {item.category}
                  </span>
                  
                  <h3 className="text-sm font-bold font-display text-white pt-1 leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Floating shine flare */}
                <span className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Small reassurance banner */}
        <p className="text-center text-[11px] text-slate-500 mt-10 italic">
          Students are welcome to visit our physical facilities anytime Sunday to Friday (9:00 AM - 8:30 PM) for in-person tours and consultations.
        </p>

      </div>
    </section>
  );
};
