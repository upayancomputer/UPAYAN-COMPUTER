import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, FolderOpen } from 'lucide-react';

/*
================================================================================
HOW TO ADD NEW IMAGES TO GALLERY:

Step 1:
Upload your image file (e.g. computer-lab.jpg) to the GitHub repository folder:
public/gallery/

Step 2:
Open the "public/data/gallery.json" file and append a new JSON object to the list:
{
  "title": "Computer Lab",
  "image": "/gallery/computer-lab.jpg",
  "category": "lab"
}

Step 3:
Commit and deploy.
The image title will automatically be captured and rendered as the card title!

Supported field categories:
- "lab" (Practical Labs)
- "classroom" (Classrooms)
- "events" (Campus Events)
- "certificates" or "certifications" (Certifications)
================================================================================
*/

interface JSONGalleryItem {
  title: string;
  image: string;
  category: string;
}

export const Gallery: React.FC = () => {
  const [items, setItems] = useState<JSONGalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<'all' | 'lab' | 'classroom' | 'events' | 'certificates'>('all');

  useEffect(() => {
    fetch('/data/gallery.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch gallery file.');
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching gallery photos:', err);
        setLoading(false);
      });
  }, []);

  const filterCategories: { id: typeof filter; label: string }[] = [
    { id: 'all', label: 'All Photos' },
    { id: 'lab', label: 'Practical Labs' },
    { id: 'classroom', label: 'Classrooms' },
    { id: 'events', label: 'Campus Events' },
    { id: 'certificates', label: 'Certifications' }
  ];

  // Helper matching certificates & certifications categories
  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'certificates') {
      return item.category === 'certificates' || item.category === 'certifications';
    }
    return item.category === filter;
  });

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

        {loading ? (
          /* Premium Loading State */
          <div className="min-h-[300px] flex flex-col items-center justify-center text-slate-400 space-y-4">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full border-2 border-cyan-500/15" />
              <div className="absolute inset-0 rounded-full border-2 border-t-cyan-400 animate-spin" />
            </div>
            <div className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">LOADING GALLERY...</div>
          </div>
        ) : items.length === 0 ? (
          /* Premium Empty State: No Gallery Images Available Yet */
          <div className="flex flex-col items-center justify-center py-20 px-6 border border-white/5 bg-slate-900/30 rounded-3xl text-center max-w-md mx-auto space-y-5 shadow-2xl backdrop-blur-sm relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-cyan-500/5 blur-2xl pointer-events-none" />
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] animate-pulse">
              <Image className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold font-display text-white tracking-tight">No Gallery Images Available Yet</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                We are currently organizing and updating our latest batch of campus photographs. Please check back soon or configure a photo library in public/data/gallery.json!
              </p>
            </div>
          </div>
        ) : (
          <>
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
                {filteredItems.map((item, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    key={`${item.image}-${index}`}
                    className="relative overflow-hidden rounded-2xl bg-slate-900 border border-white/5 aspect-video md:aspect-[4/3] flex flex-col justify-end text-left select-none shadow-md group"
                    id={`gallery-item-${index}`}
                  >
                    {/* Background image component */}
                    <img
                      referrerPolicy="no-referrer"
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    
                    {/* Black gradient overlay screen */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Floating Content caption */}
                    <div className="relative z-10 p-5 space-y-1.5 pointer-events-none transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/15">
                        {item.category === 'lab' ? 'Practical Lab' : 
                         item.category === 'classroom' ? 'Classroom' : 
                         item.category === 'events' ? 'Campus Event' : 
                         item.category === 'certificates' || item.category === 'certifications' ? 'Certification' : 
                         item.category}
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

            {filteredItems.length === 0 && (
              <div className="text-center py-12 text-slate-500 text-xs font-mono">
                No items available in this category filter.
              </div>
            )}
          </>
        )}

        {/* Small reassurance banner */}
        <p className="text-center text-[11px] text-slate-500 mt-10 italic">
          Students are welcome to visit our physical facilities anytime Sunday to Friday (9:00 AM - 8:30 PM) for in-person tours and consultations.
        </p>

      </div>
    </section>
  );
};
