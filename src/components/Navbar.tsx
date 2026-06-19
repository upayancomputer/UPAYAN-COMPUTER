import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Menu, X, ArrowRight } from './Icons';

interface NavbarProps {
  onEnrollClick: (courseId?: string) => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onEnrollClick, currentPath, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (currentPath === '/admission') {
      setActiveSection('admission');
      return;
    }

    const handleScroll = () => {
      if (window.location.pathname !== '/') return;
      setScrolled(window.scrollY > 20);

      // Track active section on scroll
      const sections = ['home', 'courses', 'why-us', 'stats', 'testimonials', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
    { id: 'admission', label: '🎓 ADMISSION FORM' }
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'admission') {
      onNavigate('/admission');
      return;
    }

    if (currentPath !== '/') {
      onNavigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 150);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-350 px-4 sm:px-6 lg:px-8 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
        id="app-navbar"
      >
        <div 
          className={`max-w-7xl mx-auto px-5 py-3 transition-all duration-350 ${
            scrolled 
              ? 'bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl shadow-slate-950/20' 
              : 'bg-transparent border-b border-white/0'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group"
              id="nav-logo"
            >
              <div className="h-9.5 w-9.5 flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 group-hover:scale-105 text-white transition-all duration-300 shadow-md shadow-blue-500/20">
                <GraduationCap size={20} className="group-hover:rotate-6 transition-transform" />
              </div>
              <div>
                <h1 className="text-sm font-extrabold tracking-tight font-display bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent leading-none">
                  UPAYAN
                </h1>
                <p className="text-[8.5px] font-bold tracking-widest font-mono text-cyan-400 mt-0.5 uppercase">
                  Computer Training Center
                </p>
              </div>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-full">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-1.5 rounded-full text-[10.5px] font-bold tracking-wider transition-all uppercase font-mono ${
                    activeSection === item.id
                      ? 'bg-white/10 text-cyan-400 border border-white/10 shadow-inner'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Actions Desktop */}
            <div className="hidden md:block">
              <button
                onClick={() => onEnrollClick()}
                className="bg-gradient-to-r from-blue-650 to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white px-5 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-transform flex items-center gap-1.5 group cursor-pointer"
                id="header-enroll-btn"
              >
                <span>ADMISSION OPEN</span>
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-all hover:bg-white/10"
                id="nav-mobile-hamburger"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border border-white/10 bg-slate-950/95 backdrop-blur-xl mt-2 rounded-2xl mx-4 shadow-xl overflow-hidden"
              id="nav-mobile-panel"
            >
              <div className="px-4 py-5 space-y-4">
                <div className="space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full px-4 py-3 rounded-xl text-left text-xs font-bold tracking-wider font-mono uppercase flex items-center justify-between ${
                        activeSection === item.id
                          ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400'
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                      id={`mobile-nav-item-${item.id}`}
                    >
                      <span>{item.label}</span>
                      {activeSection === item.id && <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/10">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onEnrollClick();
                    }}
                    className="w-full h-11 text-xs font-bold font-mono tracking-wider text-white bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl hover:scale-102 flex items-center justify-center gap-2 cursor-pointer"
                    id="mobile-enroll-btn"
                  >
                    <span>ENROLL NOW</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};
