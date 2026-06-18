import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon, ChevronDown, ChevronUp, Clock, Check, ArrowRight, Zap, ShieldCheck } from './Icons';
import { Course } from '../types';

interface CoursesProps {
  courses: Course[];
  onEnrollClick: (courseId: string) => void;
}

export const Courses: React.FC<CoursesProps> = ({ courses, onEnrollClick }) => {
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedCourseId === id) {
      setExpandedCourseId(null);
    } else {
      setExpandedCourseId(id);
      // Wait for re-render and scroll to the expansion box
      setTimeout(() => {
        const item = document.getElementById(`course-expansion-${id}`);
        if (item) {
          item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }
  };

  return (
    <section id="courses" className="py-24 relative overflow-hidden bg-[#020617]/50">
      {/* Decorative Blur Background Spot */}
      <div className="absolute top-1/2 left-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[130px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest font-mono text-cyan-455 bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20 uppercase">
            Premium Programs
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white" id="courses-title">
            Empowering Students with <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Future-Ready</span> Skills
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans" id="courses-p">
            Join the UPAYAN Computer Training Center and master the digital landscape with industry-leading mentors.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="courses-card-grid">
          {courses.map((course) => {
            const isExpanded = expandedCourseId === course.id;
            return (
              <div
                key={course.id}
                className={`group bg-white/5 hover:bg-white/10 border rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                  isExpanded 
                    ? 'border-cyan-500/30 bg-white/10 shadow-cyan-500/5 shadow-xl' 
                    : 'border-white/10'
                }`}
                id={`course-card-${course.id}`}
              >
                {/* Decorative border highlight for hover styling */}
                <span className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-transparent to-transparent opacity-60" />

                {/* Card Top Info */}
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-cyan-500/15 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shadow-inner shrink-0 scale-up-hover">
                      <Icon name={course.icon} className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-cyan-400">
                          {course.category} program
                        </span>
                        <span className="h-1 w-1 rounded-full bg-slate-600" />
                        <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
                          <Clock size={11} className="text-slate-500" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold font-display text-white mt-1 leading-snug">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans min-h-[60px]">
                    {course.description}
                  </p>
                </div>

                {/* Card CTA & Expand Controls */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4 justify-between">
                  <div className="text-left w-full sm:w-auto">
                    <span className="text-[9px] font-mono uppercase text-slate-500 block tracking-wider">Tuition Fees</span>
                    <span className="text-sm font-bold text-white mt-0.5 block">{course.price || 'Contact us'}</span>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => toggleExpand(course.id)}
                      className={`h-10 px-4 rounded-xl border text-xs font-bold font-mono tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                        isExpanded 
                          ? 'border-cyan-500 bg-cyan-500/15 text-cyan-400 shadow-lg shadow-cyan-500/5' 
                          : 'border-white/10 hover:border-white/20 text-slate-350 hover:text-white hover:bg-white/5'
                      }`}
                      id={`course-expand-btn-${course.id}`}
                    >
                      <span>{isExpanded ? 'LESS DETAILS' : 'SYLLABUS & OUTCOMES'}</span>
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    <button
                      onClick={() => onEnrollClick(course.id)}
                      className="h-10 px-4 rounded-xl text-xs font-bold font-mono tracking-wider text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md transition-all flex items-center gap-1 cursor-pointer"
                      id={`course-enroll-btn-${course.id}`}
                    >
                      <span>BOOK ADMISSION</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

                {/* Expanding Full Syllabus Area */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                      id={`course-expansion-${course.id}`}
                    >
                      <div className="pt-8 mt-6 border-t border-slate-800/600 space-y-6 text-left">
                        {/* Summary Block */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold tracking-wider uppercase text-blue-400 font-mono flex items-center gap-1.5">
                            <Zap size={13} />
                            <span>Program Overview</span>
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-950/40 p-4 rounded-2xl border border-white/5 border-l-4 border-l-blue-500">
                            {course.fullDescription}
                          </p>
                        </div>

                        {/* Curriculum / Lessons */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold tracking-wider uppercase text-blue-400 font-mono">
                            Course Curriculum & Lecture Plan
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                            {course.curriculum.map((lesson, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2.5 p-2 bg-white/[0.02] border border-white/[0.03] rounded-xl text-xs text-slate-300 font-sans"
                              >
                                <span className="h-5 w-5 shrink-0 rounded-md bg-blue-500/10 text-blue-400 font-bold font-mono flex items-center justify-center text-[10px]">
                                  {idx + 1}
                                </span>
                                <span className="pt-0.5">{lesson}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Split Outcomes & Opportunities */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                          {/* Outcomes */}
                          <div className="space-y-3">
                            <h4 className="text-xs font-bold tracking-wider uppercase text-cyan-400 font-mono flex items-center gap-1">
                              <Check size={13} />
                              <span>Learning Outcomes</span>
                            </h4>
                            <ul className="space-y-2 text-xs text-slate-400 font-sans">
                              {course.learningOutcomes.map((item, idx) => (
                                <li key={idx} className="flex gap-2">
                                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Opportunities */}
                          <div className="space-y-3">
                            <h4 className="text-xs font-bold tracking-wider uppercase text-purple-400 font-mono flex items-center gap-1">
                              <ShieldCheck size={13} />
                              <span>Career Paths</span>
                            </h4>
                            <ul className="space-y-2 text-xs text-slate-400 font-sans">
                              {course.opportunities.map((item, idx) => (
                                <li key={idx} className="flex gap-2">
                                  <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0 mt-1.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Extra Benefits Box */}
                        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
                          <h4 className="text-[10px] font-bold text-slate-300 font-mono tracking-wider uppercase">
                            Extra Benefits Included For You
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {course.benefits.map((benefit, idx) => (
                              <div key={idx} className="flex items-start gap-2.5 text-[11px] text-slate-400">
                                <span className="text-blue-400 shrink-0 mt-0.5">✓</span>
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Inner booking conversion */}
                        <div className="flex bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl items-center justify-between gap-4">
                          <p className="text-xs text-slate-300">
                            Book your station computer allocation inside our upcoming batch.
                          </p>
                          <button
                            onClick={() => onEnrollClick(course.id)}
                            className="text-xs font-bold font-mono text-white bg-blue-600 hover:bg-blue-500 py-2 px-4 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                            id={`expansion-book-${course.id}`}
                          >
                            ENROLL IN {course.shortTitle.toUpperCase()}
                          </button>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
