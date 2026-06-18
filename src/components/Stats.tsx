import React, { useState, useEffect, useRef } from 'react';
import { Icon } from './Icons';
import { Statistic } from '../types';

interface StatsProps {
  stats: Statistic[];
}

export const Stats: React.FC<StatsProps> = ({ stats }) => {
  return (
    <section id="stats" className="py-16 relative bg-[#020617]/40 overflow-hidden border-y border-white/10">
      {/* Visual glowing blob behind the grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-cyan-600/10 blur-[110px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" id="stats-grid">
          {stats.map((stat) => (
            <StatItem key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Animated Single Counter Item
const StatItem: React.FC<{ stat: Statistic }> = ({ stat }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          startCountUp();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [stat.value, hasAnimated]);

  const startCountUp = () => {
    let startVal = 0;
    const endVal = stat.value;
    const totalDuration = 1200; // ms
    const stepTime = Math.max(Math.floor(totalDuration / endVal), 20);
    
    const timer = setInterval(() => {
      startVal += Math.ceil(endVal / 50); // fast leaps
      if (startVal >= endVal) {
        setCount(endVal);
        clearInterval(timer);
      } else {
        setCount(startVal);
      }
    }, stepTime);
  };

  return (
    <div
      ref={elementRef}
      className="bg-gradient-to-br from-cyan-600/15 via-blue-900/10 to-transparent backdrop-blur-lg border border-cyan-500/20 rounded-[20px] p-5 flex flex-col items-center justify-center space-y-2 text-center transition-all duration-300 hover:border-cyan-400/40 relative overflow-hidden group shadow-lg"
      id={`stat-item-${stat.id}`}
    >
      <div className="absolute top-2 right-2 text-cyan-400/10 group-hover:text-cyan-400/20 transition-colors">
        <Icon name={stat.iconName} className="h-10 w-10" />
      </div>

      <div className="h-9 w-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
        <Icon name={stat.iconName} className="h-4 w-4" />
      </div>

      <div className="space-y-0.5">
        <div className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-white flex items-baseline justify-center">
          <span className="bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent">
            {count}
          </span>
          <span className="text-cyan-400 select-none ml-0.5">{stat.suffix}</span>
        </div>
        
        <p className="text-xs font-bold tracking-wide uppercase text-slate-300 font-display">
          {stat.label}
        </p>
      </div>

      <p className="text-[10px] sm:text-xs text-slate-500 font-sans leading-relaxed">
        {stat.description}
      </p>
    </div>
  );
};
