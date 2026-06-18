import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Send, Phone, Mail, Award, Loader2 } from './Icons';
import { Course } from '../types';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  selectedCourseId: string;
}

export const EnrollModal: React.FC<EnrollModalProps> = ({
  isOpen,
  onClose,
  courses,
  selectedCourseId
}) => {
  const [courseId, setCourseId] = useState(selectedCourseId);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shift, setShift] = useState('morning');
  const [notes, setNotes] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    if (selectedCourseId) {
      setCourseId(selectedCourseId);
    }
  }, [selectedCourseId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setStatus('submitting');
    
    // Simulate premium secure database transaction
    setTimeout(() => {
      setStatus('success');
    }, 1800);
  };

  const activeCourse = courses.find(c => c.id === courseId);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            id="modal-backdrop"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl glass-panel text-slate-100 shadow-2xl"
            id="modal-content"
          >
            {/* Top decorative glow */}
            <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />

            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-white/5 px-6 py-5">
              <div>
                <span className="text-xs font-semibold tracking-wider uppercase text-blue-400 font-mono">Enrollment Desk</span>
                <h3 className="text-2xl font-bold font-display text-white mt-0.5">Instant Course Enrollment</h3>
              </div>
              <button
                onClick={onClose}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all hover:bg-white/10"
                id="modal-close-btn"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="px-6 py-6 max-h-[80vh] overflow-y-auto relative z-10">
              {status === 'idle' && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-300">Your Full Name <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Mahmudul Hasan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl glass-input placeholder-slate-500 text-sm focus:ring-1 focus:ring-blue-500"
                        id="enroll-name"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-300">Mobile Number <span className="text-rose-500">*</span></label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-mono">+880</span>
                        <input
                          type="tel"
                          required
                          pattern="[0-9]{10,11}"
                          placeholder="1712345678"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full h-11 pl-16 pr-4 rounded-xl glass-input placeholder-slate-500 text-sm focus:ring-1 focus:ring-blue-500 font-mono"
                          id="enroll-phone"
                        />
                      </div>
                      <p className="text-[10px] text-slate-500">Provide 10-digit number without country code or initial 0</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Email address */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-300">Email Address</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl glass-input placeholder-slate-500 text-sm focus:ring-1 focus:ring-blue-500"
                        id="enroll-email"
                      />
                    </div>

                    {/* Course Selection */}
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-300">Select Learning Program <span className="text-rose-500">*</span></label>
                      <select
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 text-slate-100 text-sm focus:border-blue-500 focus:outline-none"
                        id="enroll-course-select"
                      >
                        {courses.map((course) => (
                          <option key={course.id} value={course.id} className="bg-slate-950">
                            {course.shortTitle} ({course.duration})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Program Info Snippet */}
                  {activeCourse && (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 space-y-2 text-slate-300"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-blue-400 font-mono">Course Fee</span>
                        <span className="text-xs font-semibold text-slate-400">Duration: {activeCourse.duration}</span>
                      </div>
                      <div className="flex justify-between items-end">
                        <p className="text-lg font-bold font-display text-white">{activeCourse.price || 'Contact for Fees'}</p>
                        {activeCourse.installments && (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-purple-400 border border-purple-500/15">
                            {activeCourse.installments}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Batch Shift selection */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Preferred Batch Shift</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'morning', label: 'Morning', desc: '9:00 AM - 11:00 AM' },
                        { id: 'afternoon', label: 'Afternoon', desc: '2:00 PM - 4:00 PM' },
                        { id: 'evening', label: 'Evening', desc: '6:30 PM - 8:30 PM' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setShift(item.id)}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            shift === item.id
                              ? 'border-blue-500 bg-blue-500/10 text-white shadow-lg shadow-blue-500/5'
                              : 'border-white/5 bg-white/5 hover:bg-white/10 text-slate-300'
                          }`}
                          id={`shift-btn-${item.id}`}
                        >
                          <span className="block text-xs font-bold">{item.label}</span>
                          <span className="block text-[10px] text-slate-400 mt-0.5">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message/Notes */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Queries / Special Requirements (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Ask about batch start date, discount offers, or class schedules..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full p-4 rounded-xl glass-input placeholder-slate-500 text-sm focus:ring-1 focus:ring-blue-500"
                      id="enroll-notes"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      required
                      defaultChecked
                      className="mt-1 h-4 w-4 rounded border-white/10 bg-slate-900 text-blue-500"
                      id="enroll-consent"
                    />
                    <label className="text-[11px] text-slate-400 select-none">
                      I agree to the guidelines, admission requirements, and understand UPAYAN Academic Council will reach out to me via phone/SMS to lock my batch station.
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 h-11 text-xs font-bold font-mono tracking-wider rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                      id="enroll-cancel"
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      className="px-6 h-11 text-xs font-bold font-mono tracking-wider text-white bg-blue-600 rounded-xl hover:bg-blue-500 active:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20 flex items-center gap-2 group cursor-pointer"
                      id="enroll-submit"
                    >
                      <span>CONFIRM REGISTRATION</span>
                      <Send size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </form>
              )}

              {status === 'submitting' && (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <Loader2 className="animate-spin text-blue-500" size={48} />
                  <p className="text-lg font-medium font-display text-white">Transacting secure enrollment form...</p>
                  <p className="text-xs text-slate-400 font-mono">Locking seat computer allocation details.</p>
                </div>
              )}

              {status === 'success' && (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="h-16 w-16 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center glow-glow-cyan shadow-xl">
                    <Check size={32} />
                  </div>
                  
                  <h4 className="text-2xl font-bold font-display text-white">Seat Blocked Successfully!</h4>
                  <p className="text-slate-300 max-w-md mx-auto mt-2.5 text-sm leading-relaxed">
                    Assalamu Alaikum, <strong className="text-white">{name}</strong>. Your provisional admission for the <strong className="text-blue-400">{activeCourse?.title}</strong> ({shift} shift) has been successfully recorded.
                  </p>

                  <div className="mt-8 p-5 rounded-2xl bg-slate-900/50 border border-white/5 w-full max-w-sm space-y-3.5 text-left text-xs text-slate-400">
                    <div className="flex items-center gap-3">
                      <Phone size={14} className="text-blue-400" />
                      <div>
                        <p className="text-slate-500">Contact Number Registered</p>
                        <p className="font-semibold text-slate-200 mt-0.5">+880 {phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={14} className="text-purple-400" />
                      <div>
                        <p className="text-slate-500">Academic Registration Email</p>
                        <p className="font-semibold text-slate-200 mt-0.5">{email || 'Not Provided'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award size={14} className="text-cyan-400" />
                      <div>
                        <p className="text-slate-500">Provisional Registration Certificate ID</p>
                        <p className="font-mono text-cyan-400 mt-0.5">UPY-2026-{(Math.random() * 100000).toFixed(0)}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-8 max-w-xs mx-auto italic">
                    An academic counselor will ring (+880 {phone}) within the next 24 business hours to finalize physical seat allocations and coordinate class timings.
                  </p>

                  <button
                    onClick={() => {
                      onClose();
                      setStatus('idle');
                      setName('');
                      setPhone('');
                      setEmail('');
                      setNotes('');
                    }}
                    className="mt-8 px-6 py-2.5 text-xs font-bold font-mono text-slate-300 border border-white/10 rounded-xl hover:bg-white/5 hover:text-white transition-all cursor-pointer"
                    id="success-ok-btn"
                  >
                    RETURN TO HOMEPAGE
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
