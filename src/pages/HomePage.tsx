// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Homepage with Reference Hero Banner & Circular Category Showcase
// ==============================================================================

import React, { useState } from 'react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { DemoModeBanner } from '../components/common/DemoModeBanner';
import { SampleReaderModal } from '../components/common/SampleReaderModal';
import { AppleHeroSlider } from '../components/home/AppleHeroSlider';
import { EditorialCategoriesSection } from '../components/home/EditorialCategoriesSection';
import { HotNewReleasesSection } from '../components/home/HotNewReleasesSection';
import { CuratedGenreRowsSection } from '../components/home/CuratedGenreRowsSection';
import { FeaturedBooksSection } from '../components/home/FeaturedBooksSection';
import type { Book as BookType } from '../types';

export const HomePage: React.FC = () => {
  const [activeReaderBook, setActiveReaderBook] = useState<BookType | null>(null);

  const handleCategorySelect = () => {
    const el = document.getElementById('releases');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <DemoModeBanner />
      {/* Floating Fixed Glassmorphism Top App Bar */}
      <Navbar />

      {/* ====================================================================
          SEAMLESS HERO STAGE
          Hero banner background flows from the very top behind the floating Navbar
          ==================================================================== */}
      <div className="medhankar-hero-stage-root">
        <AppleHeroSlider onOpenSampleReader={setActiveReaderBook} />

        <style>{`
          .medhankar-hero-stage-root {
            position: relative;
            width: 100%;
            overflow: hidden;
            background: #F8FAFD;
          }
        `}</style>
      </div>

      <main style={{ flex: 1 }}>


        {/* ====================================================================
            EDITORIAL CATEGORIES SECTION (MYTHOLOGY, SCIENCE, BIOGRAPHY)
            Apple-Inspired Curated Genre Showcase Matching User Reference
            ==================================================================== */}
        <EditorialCategoriesSection onSelectCategory={handleCategorySelect} />

        {/* ====================================================================
            HOT NEW RELEASES SECTION (Matching User Reference Image 1)
            Pure Apple iOS horizontal showcase with smooth spring micro-animations
            ==================================================================== */}
        <HotNewReleasesSection />

        {/* ====================================================================
            CURATED GENRE ROWS SECTION (Matching User Reference Image 2)
            Row 1: Suspense & Thriller Novels
            Row 2: Top Reads in Non-Fiction/ Self Help
            ==================================================================== */}
        <CuratedGenreRowsSection />

        {/* ====================================================================
            FEATURED BOOKS SHOWCASE
            Dynamic 3D Scale & Depth Display matching User Reference Image 2
            ==================================================================== */}
        <FeaturedBooksSection />

      </main>

      <Footer />

      {/* Sample Reader Preview Modal */}
      <SampleReaderModal
        book={activeReaderBook}
        onClose={() => setActiveReaderBook(null)}
      />
    </div>
  );
};
