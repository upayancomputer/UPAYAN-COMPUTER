import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, GraduationCap } from './Icons';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000); // 6s rotation

    return () => clearInterval(interval);
  }, [currentIndex, isPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const active = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-[#020617]/50 border-b border-white/10">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-purple-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest font-mono text-cyan-400 uppercase bg-cyan-500/5 px-4 py-1.5 rounded-full border border-cyan-500/10">
            Student Success
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Success Stories From Our Alumni
          </h2>
          <p className="text-sm text-slate-400 font-sans max-w-2xl mx-auto">
            Witness how we helped hundreds of college graduates, freelancers, and local students level up their computer proficiency and secure prospective careers.
          </p>
        </div>

        {/* Carousel Slider */}
        <div
          className="relative"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
          id="testimonials-slider-box"
        >
          {/* Main Card View */}
          <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden min-h-[300px] flex flex-col justify-between">
            {/* Top quote decorator visual */}
            <span className="absolute top-4 right-8 text-white/[0.03] text-7xl font-serif select-none pointer-events-none">
              “
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 text-left"
              >
                {/* Rating & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className={i < active.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 pr-4">{active.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-slate-300 font-sans italic leading-relaxed">
                  "{active.review}"
                </p>

                {/* Profile Meta */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <img
                    referrerPolicy="no-referrer"
                    src={active.avatarUrl}
                    alt={active.name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-blue-500/20"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">
                      {active.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 font-sans">
                      <GraduationCap size={13} className="text-blue-400" />
                      <span>{active.course}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-600" />
                      <span className="font-mono text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
                        {active.role}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Controllers */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-6 bg-blue-500 shadow shadow-blue-500/20' : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  id={`testimonial-dot-${idx}`}
                />
              ))}
            </div>

            {/* Nav Arrows */}
            <div className="flex gap-2.5">
              <button
                onClick={handlePrev}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-900 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer hover:bg-slate-800"
                aria-label="Previous Student Story"
                id="testimonial-prev-arrow"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNext}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-900 border border-white/5 hover:border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer hover:bg-slate-800"
                aria-label="Next Student Story"
                id="testimonial-next-arrow"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
