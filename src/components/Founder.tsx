import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, Copy, Check, ExternalLink, X, Award, Shield, User, MessageCircle } from 'lucide-react';
// @ts-ignore
import founderPhoto from '../assets/images/founder_photo_1781807580066.jpg';

export const Founder: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const founderEmail = 'upayan.site@gmail.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(founderEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy email', err);
    }
  };

  return (
    <section id="founder" className="py-12 sm:py-16 relative overflow-hidden bg-[#020617] border-t border-white/10">
      {/* Dynamic Background Glow Filters */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-cyan-600/10 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-6 right-6 h-[200px] w-[200px] rounded-full bg-blue-600/10 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 space-y-2">
          <span className="text-[10px] font-bold tracking-widest font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 uppercase">
            Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-white" id="founder-title">
            Our Founder
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans" id="founder-p font-display">
            Meet the visionary behind UPAYAN COMPUTER TRAINING CENTER
          </p>
        </div>

        {/* Founder Premium Card */}
        <div className="max-w-3xl mx-auto flex justify-center">
          <motion.div
            whileHover={{ y: -4, scale: 1.005 }}
            className="w-full bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/15 hover:border-cyan-500/30 rounded-2.5xl p-5 md:p-8 shadow-2xl relative overflow-hidden group cursor-pointer"
            onClick={() => setIsModalOpen(true)}
            id="founder-card"
          >
            {/* Top-right corner accent glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 group-hover:bg-cyan-500/10 blur-xl transition-all duration-300 pointer-events-none" />
            <span className="absolute top-0 left-0 w-2/3 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent opacity-60" />

            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              {/* Profile Photo Display */}
              <div className="relative shrink-0">
                {/* Rotating Neon Border Glow */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 blur-sm opacity-50 group-hover:opacity-100 transition-all duration-500 animate-pulse [animation-duration:4s]" />
                <div className="relative h-36 w-36 sm:h-40 sm:w-40 rounded-2xl overflow-hidden border border-white/20 bg-slate-950">
                  <img
                    src={founderPhoto}
                    alt="MD. YUNUS MAHMUD"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Founder Text Info */}
              <div className="flex-1 text-center md:text-left space-y-3">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-[9px] font-bold font-mono tracking-wider text-cyan-400 uppercase">
                    <Award size={10} />
                    <span>Founder & Director</span>
                  </span>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight font-display">
                    MD. YUNUS MAHMUD
                  </h3>
                  <p className="text-[10px] font-semibold tracking-wider font-mono text-slate-400 uppercase">
                    UPAYAN COMPUTER TRAINING CENTER
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  "Dedicated to empowering students with modern digital skills, practical computer education and career-focused ICT training."
                </p>

                <div className="pt-1 flex justify-center md:justify-start">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold font-mono tracking-wider text-cyan-400 hover:text-cyan-300 transition-all">
                    <span>VIEW DIRECT PROFILE & CONTACT INFO</span>
                    <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Founder Details Interactive Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 150 }}
              className="relative w-full max-w-lg bg-[#090f23]/95 border border-white/10 rounded-[24px] overflow-hidden shadow-2xl p-4 sm:p-6 z-10"
              id="founder-details-modal"
            >
              {/* Decorative radial background glow inside modal */}
              <div className="absolute -top-12 -left-12 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3.5 right-3.5 h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                id="close-founder-modal"
              >
                <X size={16} />
              </button>

              {/* Modal Core Contents */}
              <div className="space-y-4">
                
                {/* Header Profile Info row */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pb-4 border-b border-white/10">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-500 blur-xs opacity-50" />
                    <div className="relative h-18 w-18 rounded-xl overflow-hidden border border-white/10 bg-slate-950 shrink-0">
                      <img
                        src={founderPhoto}
                        alt="MD. YUNUS MAHMUD"
                        loading="lazy"
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  <div className="text-center sm:text-left space-y-0.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-[8px] font-bold font-mono tracking-wider text-cyan-400 uppercase">
                      Founder & Director
                    </span>
                    <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight font-display">
                      MD. YUNUS MAHMUD
                    </h2>
                    <p className="text-[9px] font-bold font-mono tracking-wider text-slate-400 uppercase">
                      UPAYAN COMPUTER TRAINING CENTER
                    </p>
                  </div>
                </div>

                {/* Grid for Contact Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Phone Calls Block */}
                  <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl space-y-2">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                      <Phone size={12} />
                      <span>Direct Calls</span>
                    </div>
                    <div className="space-y-1.5">
                      <a
                        href="tel:01645773950"
                        className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 text-xs text-white transition-all group"
                      >
                        <span className="font-mono tracking-wider font-semibold">01645-773950</span>
                        <span className="text-[8px] font-bold tracking-wider font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20">CALL</span>
                      </a>
                      <a
                        href="tel:01577416188"
                        className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 text-xs text-white transition-all group"
                      >
                        <span className="font-mono tracking-wider font-semibold">01577-416188</span>
                        <span className="text-[8px] font-bold tracking-wider font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20">CALL</span>
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp Direct Chat Block */}
                  <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl space-y-2">
                    <div className="flex items-center gap-1.5 text-[#25D366] font-mono text-[9px] font-bold uppercase tracking-wider">
                      {/* WhatsApp Icon SVG */}
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.058 5.386 5.396.048 12.013.048c3.205.001 6.22 1.248 8.487 3.514 2.269 2.268 3.511 5.284 3.51 8.492-.004 6.627-5.343 11.966-11.96 11.966a11.905 11.905 0 0 1-5.748-1.488L0 24zm6.59-4.835c1.536.911 3.01 1.393 4.88 1.393a9.924 9.924 0 0 0 9.922-9.925C21.45 5.18 17.218 1.01 12.02 1.01c-5.203 0-9.431 4.226-9.431 9.431a9.855 9.855 0 0 0 1.542 5.147l-.988 3.612 3.69-.968zM17.15 14.15c-.273-.137-1.616-.797-1.867-.889-.25-.09-.432-.136-.613.137-.18.272-.7.886-.857 1.069-.158.182-.317.205-.59.068-.273-.137-1.154-.425-2.2-1.359-.812-.725-1.36-1.62-1.519-1.893-.159-.273-.017-.42.12-.557.123-.122.273-.318.41-.477.137-.159.182-.272.273-.454.09-.18.046-.341-.023-.477-.07-.137-.613-1.477-.841-2.023-.222-.533-.443-.46-.613-.469-.159-.009-.34-.01-.523-.01-.182 0-.477.068-.727.341-.25.272-.953.931-.953 2.272a3.913 3.913 0 0 0 .818 2.071c.09.122 1.579 2.411 3.826 3.38.535.23 1.157.369 1.554.493.537.17 1.026.146 1.412.088.431-.065 1.617-.66 1.844-1.298.228-.638.228-1.185.159-1.298-.068-.113-.25-.182-.522-.319z" />
                      </svg>
                      <span>WhatsApp Directs</span>
                    </div>
                    <div className="space-y-1.5">
                      <a
                        href="https://wa.me/8801645773950"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5 hover:border-[#25D366]/30 hover:bg-[#25D366]/5 text-xs text-white transition-all group"
                      >
                        <span className="font-mono tracking-wider font-semibold">01645-773950</span>
                        <span className="text-[8px] font-bold tracking-wider font-mono px-1.5 py-0.5 rounded bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366]/20">CHAT</span>
                      </a>
                      <a
                        href="https://wa.me/8801577416188"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5 hover:border-[#25D366]/30 hover:bg-[#25D366]/5 text-xs text-white transition-all group"
                      >
                        <span className="font-mono tracking-wider font-semibold">01577-416188</span>
                        <span className="text-[8px] font-bold tracking-wider font-mono px-1.5 py-0.5 rounded bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366]/20">CHAT</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email Display with Copy support */}
                <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center shrink-0">
                      <Mail size={14} />
                    </div>
                    <div>
                      <p className="text-[8px] font-mono tracking-widest font-bold uppercase text-slate-500">Official Email</p>
                      <p className="text-xs font-semibold text-white tracking-wide font-mono mt-0.5">{founderEmail}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center justify-center gap-1 px-3 h-8.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-slate-200 hover:text-white transition-colors active:scale-95 cursor-pointer font-mono font-bold shrink-0"
                  >
                    {copiedEmail ? (
                      <>
                        <Check size={12} className="text-emerald-400" />
                        <span className="text-emerald-400">COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={11} />
                        <span>COPY EMAIL</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Social links row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <a
                    href="https://www.facebook.com/share/14nbzDJTg14/"
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 px-3.5 rounded-lg bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/20 text-blue-400 hover:text-white hover:border-blue-500/50 transition-all flex items-center justify-center gap-2 font-mono text-[11px] font-bold tracking-wide"
                  >
                    {/* Custom Facebook Icon */}
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>PERSONAL FB PROFILE</span>
                  </a>

                  <a
                    href="https://www.facebook.com/share/1HrLsATXKL/"
                    target="_blank"
                    rel="noreferrer"
                    className="h-10 px-3.5 rounded-lg bg-cyan-600/15 hover:bg-cyan-600/25 border border-cyan-500/20 text-cyan-400 hover:text-white hover:border-cyan-400/50 transition-all flex items-center justify-center gap-2 font-mono text-[11px] font-bold tracking-wide"
                  >
                    {/* Page Icon */}
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>OFFICIAL FB PAGE</span>
                  </a>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
