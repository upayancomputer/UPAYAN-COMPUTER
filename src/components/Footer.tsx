import React from 'react';
import { GraduationCap, Phone, Mail, MapPin } from './Icons';

interface FooterProps {
  onNavClick: (id: string) => void;
  onEnrollClick: (courseId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onEnrollClick }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-white/5 relative z-10 overflow-hidden text-left">
      {/* Decorative subtle background mesh */}
      <div className="absolute -bottom-40 left-0 w-80 h-80 rounded-full bg-blue-600/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8" id="footer-grid">
          
          {/* Brand Col */}
          <div className="space-y-5">
            <button
              onClick={() => onNavClick('home')}
              className="flex items-center gap-2.5 text-left group"
              id="footer-logo"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-600 group-hover:bg-blue-500 text-white transition-colors duration-300">
                <GraduationCap size={22} />
              </div>
              <div>
                <h1 className="text-sm font-extrabold tracking-tight font-display text-white leading-none">
                  UPAYAN
                </h1>
                <p className="text-[9px] font-medium tracking-widest font-mono text-blue-400 mt-1 uppercase">
                  Computer Training Center
                </p>
              </div>
            </button>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              UPAYAN COMPUTER TRAINING CENTER is an established, registered IT learning institute standardizing practical computer knowledge across Jamalpur, Bangladesh. We bridge students to careers.
            </p>
            {/* Accreditation Badge */}
            <div className="pt-2">
              <span className="inline-block text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                ISO 9001:2015 Quality standards
              </span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-300">Quick Navigation</h3>
            <ul className="space-y-2 text-xs text-slate-400" id="footer-quick-links">
              {[
                { id: 'home', label: 'Back To Home' },
                { id: 'courses', label: 'High-Tech Courses' },
                { id: 'why-us', label: 'Why Choose Us' },
                { id: 'testimonials', label: 'Success Testimonies' },
                { id: 'gallery', label: 'Explore Practical Lab' },
                { id: 'contact', label: 'Contact Registrar' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavClick(link.id)}
                    className="hover:text-blue-400 transition-colors cursor-pointer"
                    id={`footer-nav-link-${link.id}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses Categories Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-300">Academic Programs</h3>
            <ul className="space-y-2 text-xs text-slate-400" id="footer-course-links">
              {[
                { id: 'office-app', label: 'Computer Office Application (3/6m)' },
                { id: 'adv-tech', label: 'Advanced Computer Technology (6m)' },
                { id: 'diploma-ict', label: 'Diploma in Academic ICT (1 Yr)' },
                { id: 'hsc-ict', label: 'HSC Board ICT Prep' }
              ].map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => onEnrollClick(c.id)}
                    className="hover:text-blue-400 transition-colors cursor-pointer"
                    id={`footer-course-link-${c.id}`}
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-300">Talk To Registrar</h3>
            <ul className="space-y-3 text-xs text-slate-400" id="footer-contact-details">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-blue-500 shrink-0 mt-0.5" />
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Nandina+College+Gate+Nandina+Jamalpur+Sadar+Jamalpur"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  Nandina College Gate, Nandina, Jamalpur Sadar, Jamalpur
                </a>
              </li>
              <li className="flex items-center gap-2.5 font-mono">
                <Phone size={15} className="text-blue-500 shrink-0" />
                <a href="tel:+8801645773950" className="hover:text-blue-400 transition-colors">
                  +8801645773950
                </a>
              </li>
              <li className="flex items-center gap-2.5 font-mono">
                <Mail size={15} className="text-blue-500 shrink-0" />
                <a href="mailto:upayan.site@gmail.com" className="hover:text-blue-400 transition-colors">
                  upayan.site@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="mt-12 pt-8 border-t border-t-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="font-mono">
            &copy; {currentYear} UPAYAN Computer Training Center. All Tech Rights Reserved.
          </p>
          <div className="flex gap-4">
            <span className="hover:text-slate-300 transition-colors font-mono uppercase text-[10px]">Bangladesh Board syllabus v2026</span>
            <span className="h-4 w-[1px] bg-slate-800" />
            <span className="hover:text-slate-300 transition-colors font-mono uppercase text-[10px]">Registered under Jamalpur Registrar</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
