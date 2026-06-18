import React from 'react';
import { motion } from 'motion/react';
import { Sparkle, ArrowRight, Phone, ShieldCheck, Zap } from './Icons';
import { CourseDeckCarousel } from './CourseDeckCarousel';

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onContactClick }) => {
  return (
    <section
      id="home"
      className="relative min-h-fit lg:min-h-[580px] flex flex-col justify-start items-center pt-24 sm:pt-26 pb-12 overflow-hidden bg-brand-dark animate-fade-in"
    >
      {/* Immersive radial gradient mesh background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[130px] animate-blob-1" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[130px] animate-blob-2" />
        <div className="absolute top-[40%] right-[15%] w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[120px]" />
        
        {/* Tech Grid Matrix Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-2 sm:mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Admission Open Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mx-auto lg:mx-0"
              id="hero-badge"
            >
              <Sparkle size={13} className="animate-spin text-cyan-400 [animation-duration:6s]" />
              <span>Session 2026 Admissions Open</span>
            </motion.div>

            {/* Main Luxury Heading */}
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white leading-[1.1]"
                id="hero-heading"
              >
                UPAYAN
                <span className="block mt-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  COMPUTER TRAINING
                </span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl mt-1 tracking-wide font-bold text-slate-300">
                  Empowering Students with <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Future-Ready</span> Skills
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-slate-400 max-w-xl mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed font-sans"
                id="hero-p"
              >
                Join the UPAYAN Computer Training Center and master the digital landscape with industry-leading mentors. Experience top-tier practical labs and government-vetted certifications.
              </motion.p>
            </div>

            {/* Conversion Triggers & CTAs */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                id="hero-ctas"
              >
                <button
                  onClick={onExploreClick}
                  className="w-full sm:w-auto h-12 px-8 text-xs font-bold font-mono tracking-widest rounded-xl bg-gradient-to-r from-blue-650 to-cyan-500 text-white shadow-lg shadow-blue-500/20 hover:from-blue-600 hover:to-cyan-400 hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2 group cursor-pointer"
                  id="hero-cta-explore"
                >
                  <span>EXPLORE COURSES</span>
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={onContactClick}
                  className="w-full sm:w-auto h-12 px-8 text-xs font-bold font-mono tracking-widest rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="hero-cta-contact"
                >
                  <Phone size={14} />
                  <span>WATCH DEMO / CONTACT</span>
                </button>
              </motion.div>

              {/* Endorsements / Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5 max-w-sm mx-auto lg:mx-0"
                id="hero-trust-badges"
              >
                <div className="flex items-center gap-2 text-left">
                  <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                  <span className="text-[11px] text-slate-400 leading-snug font-mono">BTEB Approved syllabus</span>
                </div>
                <div className="flex items-center gap-2 text-left">
                  <Zap size={16} className="text-blue-400 shrink-0" />
                  <span className="text-[11px] text-slate-400 leading-snug font-mono">1:1 PC allocation</span>
                </div>
                <div className="flex items-center gap-2 text-left">
                  <Sparkle size={16} className="text-purple-400 shrink-0" />
                  <span className="text-[11px] text-slate-400 leading-snug font-mono">Govt ISO Registered</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Hero Column: Premium Interactive 3D Course Deck Carousel */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0 flex items-center justify-center w-full overflow-visible">
            {/* Ambient Background Neon Glows behind carousel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-cyan-500/15 blur-[95px] pointer-events-none" />
            <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 22, stiffness: 105, delay: 0.35 }}
              className="relative w-full z-10"
              id="hero-visual"
            >
              <CourseDeckCarousel />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
