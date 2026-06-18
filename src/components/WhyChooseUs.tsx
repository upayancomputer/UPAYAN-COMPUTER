import React from 'react';
import { motion } from 'motion/react';
import { Icon } from './Icons';
import { Feature } from '../types';

interface WhyChooseUsProps {
  features: Feature[];
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ features }) => {
  const colorMap = {
    blue: 'border-blue-500/10 text-blue-400 bg-blue-500/5 hover:border-blue-500/30 glow-glow-blue',
    purple: 'border-purple-500/10 text-purple-400 bg-purple-500/5 hover:border-purple-500/30 glow-glow-purple',
    cyan: 'border-cyan-500/10 text-cyan-400 bg-cyan-500/5 hover:border-cyan-500/30 glow-glow-cyan',
    indigo: 'border-indigo-500/10 text-indigo-400 bg-indigo-500/5 hover:border-indigo-500/30 glow-glow-blue',
    emerald: 'border-emerald-500/10 text-emerald-400 bg-emerald-500/5 hover:border-emerald-500/30 glow-glow-cyan'
  };

  return (
    <section id="why-us" className="py-24 relative overflow-hidden bg-[#020617]/40 border-t border-white/10">
      {/* Background Decorators */}
      <div className="absolute top-1/4 right-0 h-[350px] w-[350px] rounded-full bg-cyan-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest font-mono text-purple-400 uppercase bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/20">
            Institutional Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white" id="why-title">
            The UPAYAN Educational Standard
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans" id="why-p">
            We operate beyond standard tutoring. Every student gets a dedicated desk workspace, customized lecture sheets, and robust professional code reviews.
          </p>
        </div>

        {/* Bento Grid Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="why-features-grid">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`glass-card rounded-2xl p-6 flex flex-col justify-between border h-full transition-all duration-300 transform hover:-translate-y-1.5 ${
                colorMap[feature.color] || colorMap.blue
              }`}
              id={`feature-card-${feature.id}`}
            >
              <div className="space-y-4 text-left">
                {/* Custom glowing icon box */}
                <div className="h-12 w-12 rounded-xl flex items-center justify-center border bg-slate-900/60 shadow-inner shrink-0 text-inherit border-white/5">
                  <Icon name={feature.iconName} className="h-6 w-6" />
                </div>
                
                <h3 className="text-base font-bold font-display text-white">
                  {feature.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Accent visual banner */}
        <div className="mt-16 p-6 md:p-8 rounded-3xl glass-panel border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden" id="why-banner">
          <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-blue-500/5 blur-2xl" />
          
          <div className="text-left space-y-2 relative z-10">
            <h4 className="text-lg font-bold text-white font-display">Are you looking for government-vetted programs?</h4>
            <p className="text-xs text-slate-400 max-w-xl font-sans">
              Our core syllabus matches Bangladesh Technical Education Board (BTEB) standards, ensuring complete preparedness for international freelancers, local office jobs, or engineering board certifications.
            </p>
          </div>

          <div className="flex gap-4 relative z-10 shrink-0">
            <div className="px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <span className="block text-xs text-slate-500 uppercase font-mono tracking-wider">Lab Size</span>
              <span className="block text-sm font-bold text-slate-200 mt-1">1:1 PCs</span>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <span className="block text-xs text-slate-500 uppercase font-mono tracking-wider">Certificate</span>
              <span className="block text-sm font-bold text-slate-200 mt-1">Verified</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
