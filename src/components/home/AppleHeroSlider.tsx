// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Apple-Inspired Responsive Hero Section & Featured Book Slider
// Seamless 3D Book on Pedestal Artwork with Centered Controls & Pure Mobile Layout
// ==============================================================================

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
} from 'lucide-react';
import { DEMO_BOOKS } from '../../data/demoBooks';
import type { Book as BookType } from '../../types';
import {
  subscribeHeroSlides,
  DEFAULT_HERO_SLIDES,
  type HeroSlideData,
} from '../../services/heroSlidesService';

interface AppleHeroSliderProps {
  onOpenSampleReader: (book: BookType) => void;
}

export const AppleHeroSlider: React.FC<AppleHeroSliderProps> = ({ onOpenSampleReader }) => {
  const navigate = useNavigate();
  const [slides, setSlides] = useState<HeroSlideData[]>(DEFAULT_HERO_SLIDES);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Subscribe to real-time hero slides in Firestore
  useEffect(() => {
    const unsubscribe = subscribeHeroSlides((firestoreSlides) => {
      if (firestoreSlides && firestoreSlides.length > 0) {
        setSlides(firestoreSlides);
      }
    });
    return () => unsubscribe();
  }, []);

  // Touch swipe handling
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const safeIndex = currentIndex >= slides.length ? 0 : currentIndex;
  const currentSlide = slides[safeIndex] || slides[0] || DEFAULT_HERO_SLIDES[0];

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 450);
    },
    [currentIndex, isTransitioning]
  );

  const handleNext = useCallback(() => {
    goToSlide((currentIndex + 1) % slides.length);
  }, [currentIndex, goToSlide, slides.length]);

  const handlePrev = useCallback(() => {
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
  }, [currentIndex, goToSlide, slides.length]);

  // Autoplay with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(interval);
  }, [handleNext, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch gesture listeners
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = null;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const currentBookObject =
    DEMO_BOOKS.find((b) => b.slug === currentSlide.bookSlug) || DEMO_BOOKS[0];

  const customBgStyle: React.CSSProperties = {
    ...(currentSlide.backgroundColor ? { background: currentSlide.backgroundColor } : {}),
    ...(currentSlide.backgroundImage
      ? {
          backgroundImage: `url(${currentSlide.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : {}),
  };

  return (
    <section
      className="apple-hero-root"
      style={customBgStyle}
      aria-label="Medhankar Publication Featured Book Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Decorative Botanical Leaf Silhouettes (Shown only when no custom photographic banner is active) */}
      {!currentSlide.backgroundImage && (
        <>
          <svg
            className="apple-hero-foliage apple-hero-foliage-topright"
            viewBox="0 0 240 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <g opacity="0.82" filter="url(#leafBlur)">
              <path
                d="M230 0C195 40 160 70 120 78C80 85 30 65 15 30C35 85 70 120 125 125C70 140 25 180 5 240C45 200 100 185 150 178C115 210 95 255 90 295C130 255 165 210 185 160C220 180 245 215 250 255C250 185 230 125 195 85C230 65 250 30 230 0Z"
                fill="url(#sageGrad1)"
              />
              <path
                d="M205 20C180 55 140 80 100 86C135 108 175 110 205 90C170 115 145 155 130 195C155 170 190 155 220 152C195 182 180 222 175 262C205 222 225 175 240 125C240 75 225 35 205 20Z"
                fill="url(#sageGrad2)"
              />
            </g>
            <defs>
              <linearGradient id="sageGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4A6C54" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#304838" stopOpacity="0.25" />
              </linearGradient>
              <linearGradient id="sageGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5D8269" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#3B5744" stopOpacity="0.3" />
              </linearGradient>
              <filter id="leafBlur" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="2.2" />
              </filter>
            </defs>
          </svg>

          <svg
            className="apple-hero-foliage apple-hero-foliage-bottomleft"
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <g opacity="0.75" filter="url(#leafBlur)">
              <path
                d="M0 240C30 195 70 160 120 150C170 140 220 155 240 190C215 140 180 110 125 100C180 90 225 50 250 5C205 35 150 45 105 60C135 30 160 -10 165 -45C125 -10 90 30 70 75C35 55 10 25 0 0C5 65 25 125 60 165C25 185 5 210 0 240Z"
                fill="url(#sageGrad3)"
              />
            </g>
            <defs>
              <linearGradient id="sageGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5B7E67" stopOpacity="0.42" />
                <stop offset="100%" stopColor="#375340" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </>
      )}

      <div className="apple-hero-container">
        {/* ==================================================================
            LEFT COLUMN: Featured Book Label, Devanagari Headline, & Actions
            ================================================================== */}
        <div className="apple-hero-left-col">
          {/* Featured Book Pill Badge */}
          <div className="apple-hero-badge-pill">
            <BookOpen size={13} strokeWidth={2.4} className="apple-hero-badge-icon" />
            <span className="apple-hero-badge-text">{currentSlide.badge}</span>
          </div>

          {/* Majestic Hindi Book Title */}
          <h1 className="apple-hero-headline">
            <span className="apple-hero-line-sub">{currentSlide.titleLine1}</span>
            <span className="apple-hero-line-main">{currentSlide.titleLine2}</span>
          </h1>

          {/* Underline Bar Accent */}
          <div className="apple-hero-accent-bar" aria-hidden="true" />

          {/* Short Supporting Description */}
          <p className="apple-hero-tagline">{currentSlide.tagline}</p>

          {/* Primary Action Buttons (Desktop View) */}
          <div className="apple-hero-actions-group">
            {/* 1. Order Now (Deep Navy Solid) - Navigates to Book Purchase Flow */}
            <button
              type="button"
              onClick={() => navigate(`/books/${currentSlide.bookSlug}`)}
              className="apple-hero-btn-primary"
              id="apple-hero-order-btn"
              title={`Order ${currentSlide.titleLine1} ${currentSlide.titleLine2}`}
            >
              <ShoppingCart size={17} strokeWidth={2.2} />
              <span>Order Now</span>
              <ArrowRight size={17} strokeWidth={2.2} className="apple-btn-arrow-icon" />
            </button>

            {/* 2. Buy Digital Edition (Translucent White Border) */}
            <button
              type="button"
              onClick={() => onOpenSampleReader(currentBookObject)}
              className="apple-hero-btn-secondary"
              id="apple-hero-digital-btn"
              title={`Read Sample & Buy Digital Edition`}
            >
              <BookOpen size={17} strokeWidth={2.2} />
              <span>Buy Digital Edition</span>
            </button>
          </div>
        </div>

        {/* ==================================================================
            RIGHT COLUMN: 3D Book on Marble Pedestal (Zero Clutter, No Arch)
            ================================================================== */}
        <div className="apple-hero-right-col">
          <div className="apple-hero-scene-stage">
            {/* Book Link & Presentation */}
            <div
              className={`apple-hero-book-link ${isTransitioning ? 'is-fading' : ''}`}
              title={`${currentSlide.titleLine1} ${currentSlide.titleLine2} - विस्तृत विवरण`}
              aria-label={`${currentSlide.titleLine1} ${currentSlide.titleLine2}`}
            >
              {currentSlide.isPreRendered3D ? (
                /* High-Res Isolated 3D Book on Pedestal Image */
                <img
                  src={currentSlide.bookImage}
                  alt={`${currentSlide.titleLine1} ${currentSlide.titleLine2}`}
                  className="apple-hero-book-3d-img"
                  loading="eager"
                  fetchPriority="high"
                />
              ) : (
                /* Programmatic 3D Book for Flat Covers */
                <div className="apple-hero-css-3d-book">
                  <div className="apple-hero-book-spine" />
                  <img
                    src={currentSlide.bookImage}
                    alt={`${currentSlide.titleLine1} ${currentSlide.titleLine2}`}
                    className="apple-hero-book-face-img"
                    loading="eager"
                  />
                  <div className="apple-hero-book-pages-edge" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          MOBILE-ONLY BUTTON CONTAINER (STACKED PROPORTIONATELY)
          ==================================================================== */}
      <div className="apple-hero-mobile-buttons-stack">
        <button
          type="button"
          onClick={() => navigate(`/books/${currentSlide.bookSlug}`)}
          className="apple-hero-btn-primary apple-mobile-fullwidth"
          id="apple-hero-mobile-order-btn"
        >
          <ShoppingCart size={16} strokeWidth={2.2} />
          <span>Order Now</span>
          <ArrowRight size={16} strokeWidth={2.2} className="apple-btn-arrow-icon" />
        </button>

        <button
          type="button"
          onClick={() => onOpenSampleReader(currentBookObject)}
          className="apple-hero-btn-secondary apple-mobile-fullwidth"
          id="apple-hero-mobile-digital-btn"
        >
          <BookOpen size={16} strokeWidth={2.2} />
          <span>Buy Digital Edition</span>
        </button>
      </div>

      {/* ====================================================================
          CAROUSEL PAGINATION & NAVIGATION CONTROLS (‹ ••• ›)
          Centered Apple-Style Frosted Pill Navigation
          ==================================================================== */}
      <div className="apple-hero-controls-row">
        <div className="apple-hero-controls-pill">
          {/* Previous Slide Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="apple-hero-ctrl-arrow"
            aria-label="Previous featured book"
            title="Previous Book"
          >
            <ChevronLeft size={16} strokeWidth={2.4} />
          </button>

          {/* Pagination Dots */}
          <div className="apple-hero-dots-container" role="tablist" aria-label="Book Slides">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={idx === currentIndex}
                onClick={() => goToSlide(idx)}
                className={`apple-hero-dot ${idx === currentIndex ? 'is-active' : ''}`}
                aria-label={`Go to slide ${idx + 1}: ${s.titleLine2}`}
              />
            ))}
          </div>

          {/* Next Slide Button */}
          <button
            type="button"
            onClick={handleNext}
            className="apple-hero-ctrl-arrow"
            aria-label="Next featured book"
            title="Next Book"
          >
            <ChevronRight size={16} strokeWidth={2.4} />
          </button>
        </div>
      </div>

      {/* ====================================================================
          TRUST HIGHLIGHTS BAR (DESKTOP / TABLET SCREENSHOT 2)
          Floating Frosted Glass Ribbon: Secure Packaging, Trusted Publisher, Wide Range
          ==================================================================== */}
      <div className="apple-hero-trust-wrapper">
        <div className="apple-hero-trust-bar">
          {/* Item 1 */}
          <div className="apple-hero-trust-item">
            <div className="apple-hero-trust-icon-box">
              <Truck size={18} className="apple-hero-trust-icon" />
            </div>
            <div className="apple-hero-trust-text">
              <span className="apple-hero-trust-title">Secure Packaging</span>
              <span className="apple-hero-trust-sub">Books reach you safely</span>
            </div>
          </div>

          <div className="apple-hero-trust-divider" aria-hidden="true" />

          {/* Item 2 */}
          <div className="apple-hero-trust-item">
            <div className="apple-hero-trust-icon-box">
              <ShieldCheck size={18} className="apple-hero-trust-icon" />
            </div>
            <div className="apple-hero-trust-text">
              <span className="apple-hero-trust-title">Trusted Publisher</span>
              <span className="apple-hero-trust-sub">Quality books, genuine content</span>
            </div>
          </div>

          <div className="apple-hero-trust-divider" aria-hidden="true" />

          {/* Item 3 */}
          <div className="apple-hero-trust-item">
            <div className="apple-hero-trust-icon-box">
              <BookOpen size={18} className="apple-hero-trust-icon" />
            </div>
            <div className="apple-hero-trust-text">
              <span className="apple-hero-trust-title">Wide Range</span>
              <span className="apple-hero-trust-sub">Books for every reader</span>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          SCOPED STYLES: Apple Keynote Studio & Mobile Commerce Precision
          ==================================================================== */}
      <style>{`
        .apple-hero-root {
          position: relative;
          width: 100%;
          min-height: clamp(560px, 78vh, 740px);
          background-color: #F8FAFD;
          background-size: cover;
          background-position: center top;
          background-repeat: no-repeat;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0 0 24px;
          box-sizing: border-box;
          user-select: none;
        }

        /* Botanical Leaf Accents at Corners (Natural Studio Feel) */
        .apple-hero-foliage {
          position: absolute;
          pointer-events: none;
          z-index: 1;
        }

        .apple-hero-foliage-topright {
          top: -20px;
          right: -20px;
          width: clamp(140px, 16vw, 240px);
          height: auto;
          filter: blur(2.5px);
          opacity: 0.85;
        }

        .apple-hero-foliage-bottomleft {
          bottom: 20px;
          left: -30px;
          width: clamp(130px, 16vw, 240px);
          height: auto;
          filter: blur(3.2px);
          opacity: 0.75;
          z-index: 2;
        }

        /* Content Container (Padded from the top so it starts below the floating navbar) */
        .apple-hero-container {
          position: relative;
          z-index: 3;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: clamp(92px, 11vw, 118px) clamp(20px, 4.5vw, 64px) 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(24px, 4vw, 60px);
          box-sizing: border-box;
        }

        /* ------------------------------------------------------------------
           LEFT COLUMN: Featured Badge, Headline, Tagline, & Buttons
           ------------------------------------------------------------------ */
        .apple-hero-left-col {
          flex: 1;
          max-width: 580px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        /* Small Featured Book Capsule Pill */
        .apple-hero-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 14px;
          border-radius: 9999px;
          background: #E6EEFA;
          border: 1px solid rgba(11, 33, 107, 0.12);
          margin-bottom: 20px;
        }

        .apple-hero-badge-icon {
          color: #0B216B;
        }

        .apple-hero-badge-text {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #0B216B;
          text-transform: uppercase;
        }

        /* Devanagari Headline */
        .apple-hero-headline {
          margin: 0;
          display: flex;
          flex-direction: column;
          line-height: 1.05;
        }

        .apple-hero-line-sub {
          font-family: 'Mukta', 'Noto Sans Devanagari', sans-serif;
          font-size: clamp(2.2rem, 4vw, 3.8rem);
          font-weight: 800;
          color: #0B216B;
          letter-spacing: -0.015em;
          line-height: 1.12;
        }

        .apple-hero-line-main {
          font-family: 'Mukta', 'Noto Sans Devanagari', sans-serif;
          font-size: clamp(3.8rem, 7.2vw, 6.2rem);
          font-weight: 900;
          color: #0B216B;
          letter-spacing: -0.02em;
          line-height: 1;
          margin-top: 2px;
        }

        /* Accent Underline Bar */
        .apple-hero-accent-bar {
          width: 38px;
          height: 3.5px;
          border-radius: 2px;
          background: #0B216B;
          margin: 16px 0 16px;
        }

        /* Short Supporting Description */
        .apple-hero-tagline {
          font-family: 'Mukta', 'Noto Sans Devanagari', sans-serif;
          font-size: clamp(1rem, 1.3vw, 1.125rem);
          font-weight: 600;
          line-height: 1.6;
          color: #475569;
          margin: 0;
          max-width: 480px;
        }

        /* Action Buttons Row (Desktop) */
        .apple-hero-actions-group {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 28px;
          flex-wrap: wrap;
        }

        /* Primary Button: "Order Now →" (Solid Deep Navy) */
        .apple-hero-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 13px 26px;
          border-radius: 12px;
          background: #0B216B;
          color: #FFFFFF;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 8px 22px rgba(11, 33, 107, 0.28), 0 2px 4px rgba(11, 33, 107, 0.12);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.2s ease,
                      box-shadow 0.2s ease;
          border: 1px solid rgba(255, 255, 255, 0.15);
          cursor: pointer;
        }

        .apple-hero-btn-primary:hover {
          background: #081747;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(11, 33, 107, 0.38);
        }

        .apple-hero-btn-primary:active {
          transform: scale(0.97);
        }

        .apple-btn-arrow-icon {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .apple-hero-btn-primary:hover .apple-btn-arrow-icon {
          transform: translateX(3px);
        }

        /* Secondary Button: "Buy Digital Edition" (Translucent Border) */
        .apple-hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 13px 24px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1.5px solid #0B216B;
          color: #0B216B;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(11, 33, 107, 0.05);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.2s ease,
                      box-shadow 0.2s ease;
        }

        .apple-hero-btn-secondary:hover {
          background: #F1F5FC;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(11, 33, 107, 0.1);
        }

        .apple-hero-btn-secondary:active {
          transform: scale(0.97);
        }

        /* ------------------------------------------------------------------
           RIGHT COLUMN: 3D Book on Marble Pedestal
           ------------------------------------------------------------------ */
        .apple-hero-right-col {
          flex: 1.1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .apple-hero-scene-stage {
          position: relative;
          width: 100%;
          max-width: 540px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        /* 3D Book Presentation */
        .apple-hero-book-link {
          position: relative;
          z-index: 4;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          cursor: pointer;
          transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .apple-hero-book-link.is-fading {
          opacity: 0;
          transform: scale(0.96) translateY(6px);
        }

        .apple-hero-book-link:hover {
          transform: translateY(-4px);
        }

        .apple-hero-book-3d-img {
          display: block;
          max-height: clamp(340px, 40vw, 540px);
          width: auto;
          max-width: 100%;
          object-fit: contain;
          filter: drop-shadow(0 16px 30px rgba(15, 23, 42, 0.12));
          transition: filter 0.3s ease, transform 0.3s ease;
        }

        .apple-hero-book-link:hover .apple-hero-book-3d-img {
          filter: drop-shadow(0 24px 38px rgba(11, 33, 107, 0.18));
          transform: scale(1.015);
        }

        /* Fallback CSS 3D Book for Flat 2D Covers */
        .apple-hero-css-3d-book {
          position: relative;
          width: clamp(190px, 22vw, 300px);
          height: clamp(270px, 32vw, 430px);
          perspective: 1200px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotateY(-18deg) rotateX(2deg);
          transform-style: preserve-3d;
          box-shadow: 1px 1px 0 #D4D4D4,
                      2px 2px 0 #E2E2E2,
                      3px 3px 0 #CCCCCC,
                      4px 4px 0 #E5E5E5,
                      5px 5px 0 #C0C0C0,
                      8px 8px 24px rgba(11, 33, 107, 0.22);
          border-radius: 4px 10px 10px 4px;
          overflow: hidden;
        }

        .apple-hero-book-face-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* ------------------------------------------------------------------
           PAGINATION & NAVIGATION CONTROLS (‹ ••• ›) - CENTERED FROSTED PILL
           ------------------------------------------------------------------ */
        .apple-hero-controls-row {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin: 18px auto 0;
          box-sizing: border-box;
        }

        .apple-hero-controls-pill {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid rgba(11, 33, 107, 0.1);
          box-shadow: 0 4px 16px rgba(11, 33, 107, 0.06);
        }

        .apple-hero-ctrl-arrow {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid rgba(11, 33, 107, 0.12);
          color: #0B216B;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(11, 33, 107, 0.08);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.2s ease,
                      box-shadow 0.2s ease;
        }

        .apple-hero-ctrl-arrow:hover {
          background: #F8FAFD;
          transform: scale(1.08);
          box-shadow: 0 4px 10px rgba(11, 33, 107, 0.15);
        }

        .apple-hero-ctrl-arrow:active {
          transform: scale(0.94);
        }

        .apple-hero-dots-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .apple-hero-dot {
          height: 8px;
          width: 8px;
          border-radius: 9999px;
          background: #CBD5E1;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.25s ease;
        }

        .apple-hero-dot.is-active {
          width: 22px;
          background: #0B216B;
        }

        /* ------------------------------------------------------------------
           TRUST HIGHLIGHTS BAR (DESKTOP / TABLET SCREENSHOT 2)
           ------------------------------------------------------------------ */
        .apple-hero-trust-wrapper {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 1400px;
          margin: 32px auto 0;
          padding: 0 clamp(20px, 4.5vw, 64px);
          box-sizing: border-box;
        }

        .apple-hero-trust-bar {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 20px;
          box-shadow: 0 10px 32px rgba(11, 33, 107, 0.05);
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 16px 28px;
          gap: 20px;
        }

        .apple-hero-trust-item {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .apple-hero-trust-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #EBF3FC;
          color: #0B216B;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .apple-hero-trust-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .apple-hero-trust-title {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 0.86rem;
          font-weight: 700;
          color: #0B216B;
        }

        .apple-hero-trust-sub {
          font-size: 0.76rem;
          color: #64748B;
        }

        .apple-hero-trust-divider {
          width: 1px;
          height: 36px;
          background: #E2E8F0;
        }

        /* ------------------------------------------------------------------
           MOBILE-ONLY BUTTON CONTAINER
           ------------------------------------------------------------------ */
        .apple-hero-mobile-buttons-stack {
          display: none;
        }

        /* ------------------------------------------------------------------
           RESPONSIVE BREAKPOINTS (TABLET & MOBILE SCREENSHOTS)
           ------------------------------------------------------------------ */
        @media (max-width: 1023px) {
          .apple-hero-root {
            min-height: auto;
            padding: 0 0 24px;
          }

          .apple-hero-container {
            gap: 24px;
            padding: 88px 24px 20px;
          }

          .apple-hero-trust-wrapper {
            margin-top: 24px;
            padding: 0 24px;
          }

          .apple-hero-trust-bar {
            padding: 14px 20px;
            gap: 12px;
          }
        }

        /* Mobile Layout: Scaled, Balanced, Zero Overflow */
        @media (max-width: 767px) {
          .apple-hero-root {
            padding: 0 0 20px;
            overflow-x: hidden;
          }

          .apple-hero-container {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 78px 16px 14px;
            gap: 14px;
          }

          .apple-hero-left-col {
            align-items: center;
            text-align: center;
            max-width: 100%;
          }

          .apple-hero-badge-pill {
            margin-bottom: 8px;
            padding: 4px 12px;
          }

          .apple-hero-badge-text {
            font-size: 0.65rem;
          }

          .apple-hero-line-sub {
            font-size: clamp(1.4rem, 5.5vw, 1.85rem);
            line-height: 1.15;
          }

          .apple-hero-line-main {
            font-size: clamp(2.4rem, 9.6vw, 3.3rem);
            line-height: 1.05;
            margin-top: 1px;
          }

          .apple-hero-accent-bar {
            width: 32px;
            height: 3px;
            margin: 8px auto 10px;
          }

          .apple-hero-tagline {
            text-align: center;
            font-size: clamp(0.85rem, 3.2vw, 0.95rem);
            line-height: 1.45;
            max-width: 290px;
            margin: 0 auto;
          }

          /* On mobile, buttons appear below the book scene */
          .apple-hero-actions-group {
            display: none;
          }

          .apple-hero-right-col {
            width: 100%;
            margin-top: 2px;
          }

          .apple-hero-scene-stage {
            max-width: 320px;
            padding-bottom: 0;
          }

          .apple-hero-book-3d-img {
            max-height: clamp(210px, 34vh, 280px);
            max-width: 90vw;
          }

          .apple-hero-mobile-buttons-stack {
            display: flex;
            flex-direction: column;
            gap: 8px;
            width: 100%;
            max-width: 330px;
            margin: 14px auto 0;
            padding: 0 16px;
            box-sizing: border-box;
            z-index: 10;
          }

          .apple-mobile-fullwidth {
            width: 100%;
            padding: 11px 18px;
            font-size: 0.9rem;
            border-radius: 11px;
          }

          .apple-hero-controls-row {
            margin-top: 14px;
          }

          .apple-hero-controls-pill {
            padding: 5px 12px;
            gap: 10px;
          }

          .apple-hero-ctrl-arrow {
            width: 28px;
            height: 28px;
          }

          .apple-hero-trust-wrapper {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};
