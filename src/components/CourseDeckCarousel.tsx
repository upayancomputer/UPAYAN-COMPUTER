import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkle, ArrowRight, ChevronLeft, ChevronRight } from './Icons';

interface CourseCard {
  id: number;
  title: string;
  duration: string;
  image: string;
  badge: string;
  rating: string;
  color: string;
  linkId: string;
}

const COURSES: CourseCard[] = [
  {
    id: 1,
    title: "Computer Office Application Course",
    duration: "3/6 Months",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=600&q=80",
    badge: "Official & Essential",
    rating: "4.9 (420+ reviews)",
    color: "from-blue-600/30 to-cyan-500/20",
    linkId: "office"
  },
  {
    id: 2,
    title: "Advanced Computer Technology Course",
    duration: "6 Months",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    badge: "Advanced Skills",
    rating: "4.8 (180+ reviews)",
    color: "from-purple-600/30 to-indigo-500/20",
    linkId: "advanced"
  },
  {
    id: 3,
    title: "Diploma in Information & Communication Technology (ICT)",
    duration: "1 Year",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
    badge: "Industry Standard",
    rating: "4.9 (310+ reviews)",
    color: "from-cyan-600/30 to-blue-500/20",
    linkId: "ict"
  },
  {
    id: 4,
    title: "HSC ICT Academic Program",
    duration: "Academic Session",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
    badge: "Curriculum Match",
    rating: "5.0 (150+ reviews)",
    color: "from-amber-600/30 to-orange-500/20",
    linkId: "hsc"
  }
];

export const CourseDeckCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto-play interval
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % COURSES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + COURSES.length) % COURSES.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const scrollToCourse = (id: string) => {
    const el = document.getElementById('courses');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative w-full flex flex-col items-center select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      id="course-deck-carousel-container"
    >
      {/* 3D Perspective Box */}
      <div 
        className="relative w-full h-[370px] sm:h-[450px] flex items-center justify-center p-4 overflow-visible"
        style={{ perspective: '1200px' }}
      >
        <AnimatePresence initial={false}>
          {COURSES.map((course, index) => {
            // Find relative displacement with wrap-around
            let diff = index - activeIndex;
            if (diff > COURSES.length / 2) diff -= COURSES.length;
            if (diff < -COURSES.length / 2) diff += COURSES.length;

            const isActive = diff === 0;
            const isLeft = diff === -1 || (COURSES.length === 4 && diff === 3);
            const isRight = diff === 1 || (COURSES.length === 4 && diff === -3);
            const isFar = !isActive && !isLeft && !isRight;

            // Compute transform details
            let xOffset = '0%';
            let zOffset = -150;
            let rotateY = 0;
            let rotateZ = 0;
            let scale = 0.8;
            let opacity = 0.4;
            let zIndex = 10;

            if (isActive) {
              xOffset = '0%';
              zOffset = 0;
              rotateY = 0;
              rotateZ = 0;
              scale = 1.0;
              opacity = 1;
              zIndex = 30;
            } else if (isLeft) {
              xOffset = '-32%';
              zOffset = -120;
              rotateY = 22;
              rotateZ = -6;
              scale = 0.84;
              opacity = 0.7;
              zIndex = 20;
            } else if (isRight) {
              xOffset = '32%';
              zOffset = -120;
              rotateY = -22;
              rotateZ = 6;
              scale = 0.84;
              opacity = 0.7;
              zIndex = 20;
            } else if (isFar) {
              xOffset = '0%';
              zOffset = -220;
              rotateY = 0;
              rotateZ = 0;
              scale = 0.75;
              opacity = 0.25;
              zIndex = 10;
            }

            return (
              <motion.div
                key={course.id}
                style={{
                  transformStyle: 'preserve-3d',
                  zIndex
                }}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  rotateY: rotateY,
                  rotate: rotateZ,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 18
                }}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(index);
                  }
                }}
                className={`absolute w-[240px] sm:w-[290px] h-[340px] sm:h-[410px] rounded-[24px] cursor-pointer overflow-hidden transition-all duration-300 ${
                  isActive 
                    ? 'border border-cyan-400/45 bg-slate-900/90 shadow-[0_15px_40px_-5px_rgba(34,211,238,0.22)]' 
                    : 'border border-white/10 bg-slate-950/80 shadow-lg brightness-75 hover:brightness-95'
                }`}
                id={`carousel-deck-card-${course.id}`}
              >
                {/* 70% Area Course Image banner */}
                <div className="relative h-[62%] sm:h-[65%] w-full overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Badge floating on image */}
                  <span className={`absolute top-3 left-3 text-[9px] font-mono tracking-wider uppercase font-bold text-slate-100 bg-gradient-to-r ${course.color} px-2.5 py-1 rounded-full border border-white/10 shadow-sm backdrop-blur-md`}>
                    {course.badge}
                  </span>

                  {/* Highlight Glow Border on Active */}
                  {isActive && (
                    <div className="absolute inset-0 border border-cyan-400/20 rounded-t-[24px] pointer-events-none" />
                  )}
                </div>

                {/* Card Info area below image */}
                <div className="p-3 sm:p-4 flex flex-col justify-between h-[38%] sm:h-[35%] bg-slate-950/95">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400 font-mono">
                      <span className="text-cyan-400 font-bold">{course.duration}</span>
                      <span>★ {course.rating.split(' ')[0]}</span>
                    </div>
                    <h3 className="text-xs sm:text-[13px] font-extrabold text-white leading-snug tracking-tight line-clamp-2">
                      {course.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mt-1 sm:mt-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        scrollToCourse(course.linkId);
                      }}
                      className="text-[10px] tracking-wider uppercase font-bold font-mono text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>LEARN MORE</span>
                      <ArrowRight size={10} className="stroke-[2.5]" />
                    </button>
                    {isActive && (
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Control Dots & Arrow indicators */}
      <div className="flex items-center gap-5 mt-2 z-10" id="carousel-deck-controls">
        <button 
          onClick={handlePrev}
          className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white hover:border-cyan-400/30 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft size={14} />
        </button>
        
        <div className="flex gap-1.5">
          {COURSES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex 
                  ? 'w-6 bg-cyan-400' 
                  : 'w-1.5 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        <button 
          onClick={handleNext}
          className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white hover:border-cyan-400/30 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};
