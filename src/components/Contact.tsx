import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, Check, Loader2, X } from './Icons';
import { Course } from '../types';

interface ContactProps {
  courses: Course[];
}

export const Contact: React.FC<ContactProps> = ({ courses }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [message, setMessage] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setStatus('submitting');
    
    const matchedCourse = Array.isArray(courses) ? courses.find(c => c && c.title === selectedCourse) : undefined;
    const courseFee = matchedCourse ? matchedCourse.price : 'Not Specified';

    try {
      const response = await fetch('https://formspree.io/f/mwvjdnqw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'Student Name': name,
          'Mobile Number': phone,
          'Email': email || 'Not Provided',
          'Selected Course': selectedCourse || 'General Academic Inquiry',
          'Course Fee': courseFee,
          'Preferred Batch': 'Not Specified (Contact Inquiry)',
          'Message / Requirements': message || 'None',
          'Submission Date & Time': new Date().toLocaleString()
        })
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#020617] border-t border-white/10">
      {/* Decorative colored lights */}
      <div className="absolute bottom-0 right-1/4 h-[350px] w-[350px] rounded-full bg-cyan-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 h-[320px] w-[320px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest font-mono text-cyan-400 uppercase bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
            Admissions Office
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            Have Questions? Let's Coordinate!
          </h2>
          <p className="text-sm text-slate-400 font-sans">
            Drop us an inquiry online, or visit our physical campus desk to chat with one of our certified instructors directly. We are here to navigate your academic pathway.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-panel-grid">
          
          {/* Left Column: Campus Information details */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-display text-white">Campus Location desk</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                Located at Nandina Sheikh Anwar Hossain College Gate, Nandina, Jamalpur Sadar, Jamalpur, Bangladesh, the UPAYAN Head Offices are highly accessible by public transport and provide an incredibly peaceful atmosphere for tech learning.
              </p>
            </div>

            {/* Practical Contact Info Blocks */}
            <div className="space-y-5" id="contact-details-box">
              {/* Address */}
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Nandina+Sheikh+Anwar+Hossain+College+Gate+Nandina+Jamalpur+Sadar+Jamalpur+Bangladesh"
                target="_blank"
                rel="noreferrer"
                className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all shadow-md group block"
              >
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:text-blue-300 flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400">Head Office Address</h4>
                  <p className="text-xs sm:text-sm text-slate-200 group-hover:text-white mt-1 leading-relaxed">
                    Nandina Sheikh Anwar Hossain College Gate, Nandina, Jamalpur Sadar, Jamalpur, Bangladesh
                    <span className="text-[10px] font-mono tracking-wider font-bold text-blue-400 inline-flex items-center gap-1 ml-2 bg-blue-500/10 px-1.5 py-0.5 rounded">
                      <span>MAPS</span>
                      <svg className="w-2.5 h-2.5 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </span>
                  </p>
                </div>
              </a>

              {/* Phone Hotlines */}
              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 shadow-md">
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400">Direct Academic Hotlines</h4>
                  <a 
                    href="tel:+8801645773950"
                    className="block text-xs sm:text-sm text-slate-200 mt-1 font-mono hover:text-blue-400 transition-colors"
                  >
                    +8801645773950 (Admission Guide)
                  </a>
                  <a 
                    href="tel:+8801577416188"
                    className="block text-[11px] sm:text-xs text-slate-200 mt-1 font-mono hover:text-blue-400 transition-colors"
                  >
                    +8801577416188 (Alternative Hotline)
                  </a>
                </div>
              </div>

              {/* Emails */}
              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 shadow-md">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400">Official Registrar Electronic Desk</h4>
                  <a 
                    href="mailto:upayan.site@gmail.com"
                    className="block text-xs sm:text-sm text-slate-200 mt-1 font-mono hover:text-cyan-400 transition-colors"
                  >
                    upayan.site@gmail.com
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 shadow-md">
                <div className="h-10 w-10 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400">Institutional Timings</h4>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-snug">
                    Sunday – Friday: 9:00 AM – 8:30 PM
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    (Weekly Lab closes on Saturdays for maintenance work)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Glassmorphism Inquiry Form */}
          <div className="lg:col-span-7" id="contact-form-box">
            <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-center">
              
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.form
                    key="form"
                    onSubmit={handleInquirySubmit}
                    className="space-y-5 text-left"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400">Your Full Name <span className="text-rose-500">*</span></label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g., Mahmudul Hasan"
                          className="w-full h-11 px-4 rounded-xl glass-input placeholder-slate-600 text-sm focus:ring-1 focus:ring-blue-500"
                          id="contact-form-name"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400">Mobile Number <span className="text-rose-500">*</span></label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="01712XXXXXX"
                          className="w-full h-11 px-4 rounded-xl glass-input placeholder-slate-600 text-sm focus:ring-1 focus:ring-blue-500 font-mono"
                          id="contact-form-phone"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400">Email Address (Optional)</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="student@example.com"
                          className="w-full h-11 px-4 rounded-xl glass-input placeholder-slate-600 text-sm focus:ring-1 focus:ring-blue-500"
                          id="contact-form-email"
                        />
                      </div>

                      {/* Course select */}
                      <div className="space-y-1.5 font-sans">
                        <label className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400">Course Interested In</label>
                        <select
                          value={selectedCourse}
                          onChange={(e) => setSelectedCourse(e.target.value)}
                          className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 text-slate-100 text-sm focus:border-blue-500 focus:outline-none cursor-pointer"
                          id="contact-form-course-select"
                        >
                          <option value="">-- Choose Core Program --</option>
                          {Array.isArray(courses) && courses.map((c, idx) => {
                            if (!c) return null;
                            let displayName = c.shortTitle;
                            if (c.id === 'office-app') displayName = 'Computer Office Application Course (3/6 Months)';
                            else if (c.id === 'adv-tech') displayName = 'Advanced Computer Technology Course (6 Months)';
                            else if (c.id === 'diploma-ict') displayName = 'Diploma in Information & Communication Technology (ICT) (1 Year)';
                            else if (c.id === 'hsc-ict') displayName = 'HSC ICT Academic Program';
                            
                            return (
                              <option key={c.id || idx} value={c.title || ''} className="bg-slate-950 text-white">
                                {displayName}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    {/* Email Message */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400">Your Detailed Message</label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write down any particular schedule preferences, college boards constraints, or general technical questions you want answered..."
                        className="w-full p-4 rounded-xl glass-input placeholder-slate-600 text-sm focus:ring-1 focus:ring-blue-500"
                        id="contact-form-msg"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full h-12 text-xs font-bold font-mono tracking-widest text-white bg-blue-600 rounded-xl hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 active:bg-blue-700 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                      id="contact-form-submit-btn"
                    >
                      <span>TRANSMIT ONLINE INQUIRY</span>
                      <Send size={14} />
                    </button>
                  </motion.form>
                )}

                {status === 'submitting' && (
                  <motion.div
                    key="submitting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 space-y-4"
                  >
                    <Loader2 className="animate-spin text-blue-500" size={40} />
                    <p className="text-base font-semibold text-white font-display">Transmitting technical message...</p>
                    <p className="text-xs text-slate-500 font-mono">Connecting to UPAYAN Admissions Registry.</p>
                  </motion.div>
                )}

                {status === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="h-14 w-14 mb-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-lg">
                      <Check size={26} />
                    </div>
                    
                    <h4 className="text-lg sm:text-xl font-bold font-display text-white px-4 leading-tight">
                      ✅ Your Admission Request Has Been Submitted Successfully. We Will Contact You Soon.
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-350 max-w-sm mx-auto mt-4 leading-relaxed">
                      Thank you, <strong className="text-white">{name}</strong>. Your message regarding <strong className="text-blue-400">{selectedCourse || 'General Academic Inquiries'}</strong> has been registered.
                    </p>
                    <p className="text-[11px] text-slate-500 max-w-xs mt-6 leading-relaxed">
                      Our board moderator will check your mobile number <strong>({phone})</strong> and email details to arrange a callback or SMS confirmation.
                    </p>

                    <button
                      onClick={() => {
                        setStatus('idle');
                        setName('');
                        setPhone('');
                        setEmail('');
                        setSelectedCourse('');
                        setMessage('');
                      }}
                      className="mt-8 px-5 py-2 text-xs font-bold font-mono text-slate-300 border border-white/10 rounded-xl hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                      id="form-success-reset-btn"
                    >
                      SEND ANOTHER INQUIRY
                    </button>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    key="error"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="h-14 w-14 mb-5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shadow-lg">
                      <X size={26} />
                    </div>
                    
                    <h4 className="text-lg font-bold font-display text-rose-400 leading-tight">
                      ❌ Submission Failed. Please Try Again.
                    </h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto mt-4 leading-relaxed">
                      There was an error communicating with the admission registration endpoint. Please check your network connection and try again.
                    </p>

                    <button
                      onClick={() => {
                        setStatus('idle');
                      }}
                      className="mt-8 px-6 py-2.5 text-xs font-bold font-mono text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all cursor-pointer"
                      id="form-error-retry-btn"
                    >
                      RETRY SUBMISSION
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
