import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Courses } from './components/Courses';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Stats } from './components/Stats';
import { Testimonials } from './components/Testimonials';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { EnrollModal } from './components/EnrollModal';

import { COURSES, FEATURES, STATS, TESTIMONIALS, GALLERY } from './data';

export default function App() {
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [preselectedCourseId, setPreselectedCourseId] = useState('office-app');

  const handleEnrollBtnClick = (courseId?: string) => {
    if (courseId) {
      setPreselectedCourseId(courseId);
    } else {
      setPreselectedCourseId('office-app');
    }
    setIsEnrollModalOpen(true);
  };

  const handleNavClick = (id: string) => {
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
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-white pb-0 relative overflow-hidden">
      {/* Background High Density Accent Glow Filters */}
      <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[30%] right-0 w-[35%] h-[35%] bg-purple-600/10 blur-[135px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-[10%] w-[45%] h-[45%] bg-cyan-600/8 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Main Sticky Glassmorphism Header */}
      <Navbar onEnrollClick={handleEnrollBtnClick} />

      {/* Hero Visual Area with Animated Gradients */}
      <Hero 
        onExploreClick={() => handleNavClick('courses')} 
        onContactClick={() => handleNavClick('contact')} 
      />

      {/* Stats Counter Section */}
      <Stats stats={STATS} />

      {/* Interactive Course Curriculum cards */}
      <Courses courses={COURSES} onEnrollClick={handleEnrollBtnClick} />

      {/* Bento Standard Benefits & Labs */}
      <WhyChooseUs features={FEATURES} />

      {/* Student Stories Testimonial Slider */}
      <Testimonials testimonials={TESTIMONIALS} />

      {/* Masonry Filterable Gallery */}
      <Gallery items={GALLERY} />

      {/* Contact Form and Localized coordinates */}
      <Contact courses={COURSES} />

      {/* Modular Multi column Footer */}
      <Footer onNavClick={handleNavClick} onEnrollClick={handleEnrollBtnClick} />

      {/* Premium Course Booking desk modal */}
      <EnrollModal 
        isOpen={isEnrollModalOpen} 
        onClose={() => setIsEnrollModalOpen(false)} 
        courses={COURSES}
        selectedCourseId={preselectedCourseId}
      />
    </div>
  );
}
