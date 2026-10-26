// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Cinematic Editorial Bookshelf Component
// Grounded 3D Book Display on Continuous Travertine Stone Shelf with Natural Studio Light
// Matching Reference Screenshot Exactly
// ==============================================================================

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { useSavedBooks } from '../../context/SavedBooksContext';
import { BookPurchaseActions } from '../common/BookPurchaseActions';
import type { Book as BookType } from '../../types';

interface CinematicEditorialBookshelfProps {
  books: BookType[];
  onOpenSampleReader: (book: BookType) => void;
  selectedGenre?: string;
}

export const CinematicEditorialBookshelf: React.FC<CinematicEditorialBookshelfProps> = ({
  books,
  onOpenSampleReader,
}) => {
  const { isBookSaved, toggleSaveBook } = useSavedBooks();
  const reelRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  // We ensure the curated 4 primary books from reference are prioritized first
  const displayBooks = books;

  // Track scroll position to update progress bar and arrow states
  const handleScroll = useCallback(() => {
    if (!reelRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = reelRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(scrollLeft / maxScroll);
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < maxScroll - 10);
    }
  }, []);

  useEffect(() => {
    const el = reelRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll, displayBooks]);

  const scroll = (direction: 'left' | 'right') => {
    if (!reelRef.current) return;
    const scrollAmount = direction === 'left' ? -300 : 300;
    reelRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const getCategoryBadgeClass = (genre: string) => {
    const g = genre.toLowerCase();
    if (g.includes('literature') || g.includes('fiction')) return 'badge-lit';
    if (g.includes('philosophy') || g.includes('thought')) return 'badge-phil';
    if (g.includes('essay')) return 'badge-essay';
    if (g.includes('business')) return 'badge-biz';
    return 'badge-gen';
  };

  const getCategoryLabel = (genre: string) => {
    return genre.split('&')[0].trim();
  };

  return (
    <section
      id="releases"
      className="cinematic-bookshelf-root"
      aria-labelledby="releases-heading"
    >
      {/* ====================================================================
          ATMOSPHERIC LAYERS: Natural Studio Daylight, Window Shadows, Foliage
          ==================================================================== */}
      <div className="bookshelf-backdrop" aria-hidden="true">
        {/* Soft Natural Window Sunlight Diagonal Bands */}
        <div className="bookshelf-sunlight-bands" />

        {/* Upper-Right Warm Radiance Glow */}
        <div className="bookshelf-sun-radiance" />

        {/* Botanical Foliage Shadows (Top-Right and Right-Edge) */}
        <svg
          className="bookshelf-foliage-tr"
          viewBox="0 0 340 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.25" filter="url(#foliageBlur)">
            <path
              d="M340 0 C280 40, 240 85, 210 135 C185 180, 190 230, 170 290"
              stroke="#2E2415"
              strokeWidth="4"
            />
            {/* Clustered Olive / Ficus Leaves */}
            <path d="M280 45 C250 20, 205 38, 195 65 C215 72, 250 68, 280 45 Z" fill="#2E2415" />
            <path d="M250 90 C228 72, 185 88, 180 115 C200 120, 232 110, 250 90 Z" fill="#2E2415" />
            <path d="M225 140 C202 128, 160 144, 158 170 C176 172, 208 160, 225 140 Z" fill="#2E2415" />
            <path d="M200 185 C178 178, 140 195, 145 222 C162 220, 190 206, 200 185 Z" fill="#2E2415" />
            <path d="M300 95 C318 118, 312 155, 290 172 C284 150, 290 118, 300 95 Z" fill="#2E2415" />
            <path d="M260 160 C278 182, 272 220, 250 236 C244 214, 250 182, 260 160 Z" fill="#2E2415" />
          </g>
          <defs>
            <filter id="foliageBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
        </svg>

        {/* Foreground Botanical Foliage at Bottom-Left / Edges */}
        <div className="bookshelf-bottom-leaves" />
      </div>

      <div className="bookshelf-container">
        {/* ====================================================================
            HEADER: Eyebrow, Editorial Title, Subtitle & Circular Carousel Controls
            ==================================================================== */}
        <header className="bookshelf-header">
          <div className="bookshelf-header-left">
            {/* Eyebrow Label with Leading Hairline Rule */}
            <div className="bookshelf-eyebrow-row">
              <span className="bookshelf-eyebrow-rule" aria-hidden="true" />
              <span className="bookshelf-eyebrow-text">CURATED EDITORIAL CATALOGUE</span>
            </div>

            {/* Main Title: Deep Navy Serif with Muted Gold Italic Accent */}
            <h2 id="releases-heading" className="bookshelf-title">
              Latest <span className="bookshelf-title-accent">Releases</span>
            </h2>

            {/* Supporting Copy */}
            <p className="bookshelf-subtitle">
              Explore freshly printed books and digital excerpts from our catalogue.
            </p>
          </div>

          {/* Understated Circular Prev / Next Carousel Controls (Upper-Right) */}
          <div className="bookshelf-ctrls-top">
            <button
              type="button"
              onClick={() => scroll('left')}
              className={`bookshelf-arrow-btn ${!canScrollLeft ? 'is-disabled' : ''}`}
              aria-label="Previous books"
              title="Previous books"
              disabled={!canScrollLeft}
            >
              <ChevronLeft size={20} strokeWidth={2.2} />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className={`bookshelf-arrow-btn ${!canScrollRight ? 'is-disabled' : ''}`}
              aria-label="Next books"
              title="Next books"
              disabled={!canScrollRight}
            >
              <ChevronRight size={20} strokeWidth={2.2} />
            </button>
          </div>
        </header>

        {/* ====================================================================
            PHYSICAL BOOK DISPLAY: Grounded on Continuous Stone Shelf
            ==================================================================== */}
        <div className="bookshelf-stage-wrapper">
          {/* Continuous Cream Travertine / Marble Shelf Top & Beveled Front Edge */}
          <div className="bookshelf-stone-platform" aria-hidden="true">
            <div className="bookshelf-stone-top-plane" />
            <div className="bookshelf-stone-bevel-edge" />
            <div className="bookshelf-stone-drop-shadow" />
            <div className="bookshelf-stone-step-lower" />
          </div>

          {/* Far-Left Classical Editorial Prop: Stack of Vintage Books with Ceramic Vase & Baby's Breath */}
          <div className="bookshelf-left-prop-anchor" aria-hidden="true">
            <svg viewBox="0 0 170 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="prop-svg">
              <g opacity="0.95">
                {/* Stack of 4 Books */}
                {/* Book 4 (Bottom - "Better Humans") */}
                <rect x="12" y="280" width="144" height="26" rx="2" fill="#E8E1CE" stroke="#D5CAAe" strokeWidth="1" />
                <line x1="16" y1="280" x2="16" y2="306" stroke="#BAAF90" strokeWidth="2" />
                <text x="28" y="297" fill="#6A5F48" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" letterSpacing="0.06em">Better Humans</text>

                {/* Book 3 ("Knowledge") */}
                <rect x="16" y="254" width="134" height="26" rx="2" fill="#EFE9D7" stroke="#DDD4BD" strokeWidth="1" />
                <line x1="20" y1="254" x2="20" y2="280" stroke="#C3B89A" strokeWidth="2" />
                <text x="32" y="271" fill="#6A5F48" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" letterSpacing="0.06em">Knowledge</text>

                {/* Book 2 ("Ideas") */}
                <rect x="22" y="228" width="122" height="26" rx="2" fill="#F5F0E4" stroke="#E3DAC5" strokeWidth="1" />
                <line x1="26" y1="228" x2="26" y2="254" stroke="#D0C6AE" strokeWidth="2" />
                <text x="38" y="245" fill="#6A5F48" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" letterSpacing="0.06em">Ideas</text>

                {/* Book 1 (Top - "Books") */}
                <rect x="28" y="202" width="110" height="26" rx="2" fill="#FAF6EE" stroke="#E8E0CF" strokeWidth="1" />
                <line x1="32" y1="202" x2="32" y2="228" stroke="#D5CBb1" strokeWidth="2" />
                <text x="44" y="219" fill="#6A5F48" fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" letterSpacing="0.06em">Books</text>

                {/* Fluted White Ceramic Vase */}
                <path
                  d="M66 202 C64 175, 50 158, 50 132 C50 110, 65 98, 83 98 C101 98, 116 110, 116 132 C116 158, 102 175, 100 202 Z"
                  fill="#FFFFFF"
                  stroke="#E2D9C4"
                  strokeWidth="1.2"
                />
                {/* Vase Lip */}
                <ellipse cx="83" cy="98" rx="16" ry="4.5" fill="#F7F3E8" stroke="#DFD5BE" strokeWidth="1" />
                {/* Vertical Ceramic Flutes */}
                <path d="M72 116 C70 144, 72 176, 75 202" stroke="#EFE9DA" strokeWidth="1.6" />
                <path d="M83 103 C83 144, 83 176, 83 202" stroke="#E8E1CE" strokeWidth="1.6" />
                <path d="M94 116 C96 144, 94 176, 91 202" stroke="#EFE9DA" strokeWidth="1.6" />

                {/* Dried Baby's Breath / Gypsophila Floral Sprigs */}
                <g stroke="#978564" strokeWidth="1.2" strokeLinecap="round">
                  <path d="M80 95 C78 68, 68 44, 54 18" />
                  <path d="M83 95 C85 60, 92 34, 99 10" />
                  <path d="M85 95 C90 68, 106 48, 125 26" />
                  <path d="M75 78 C64 58, 48 44, 38 34" />
                  <path d="M88 68 C100 52, 114 40, 132 32" />
                  <path d="M58 32 C50 24, 42 20, 34 14" />
                  <path d="M70 45 C66 35, 60 28, 52 22" />
                  <path d="M92 40 C100 30, 108 24, 116 18" />
                </g>

                {/* Delicate White Blossoms / Flowers */}
                <g fill="#FFFFFF" stroke="#D8CEA7" strokeWidth="0.8">
                  <circle cx="54" cy="18" r="3.2" />
                  <circle cx="49" cy="12" r="2.6" />
                  <circle cx="36" cy="16" r="3" />
                  <circle cx="38" cy="34" r="2.8" />
                  <circle cx="56" cy="24" r="2.6" />
                  <circle cx="99" cy="10" r="3.4" />
                  <circle cx="106" cy="6" r="2.6" />
                  <circle cx="92" cy="18" r="2.8" />
                  <circle cx="116" cy="18" r="3.2" />
                  <circle cx="125" cy="26" r="3" />
                  <circle cx="132" cy="32" r="2.8" />
                  <circle cx="72" cy="38" r="2.5" />
                  <circle cx="110" cy="42" r="2.6" />
                </g>
              </g>
            </svg>
          </div>

          {/* Horizontal Scrollable Carousel Reel */}
          <div
            ref={reelRef}
            className="bookshelf-reel"
            tabIndex={0}
            role="region"
            aria-label="Latest book releases carousel"
          >
            {displayBooks.map((book) => {
              const saved = isBookSaved(book.id);
              const badgeClass = getCategoryBadgeClass(book.genre);
              const categoryLabel = getCategoryLabel(book.genre);
              const paperbackPrice = book.samplePrice?.paperback || '₹499.00';
              const is3dCutout = book.coverImageUrl && book.coverImageUrl.includes('3d');

              return (
                <article key={book.id} className="bookshelf-item-card">
                  {/* Upper Stage: Standing Book with Bookmark & Contact Shadow */}
                  <div className="bookshelf-book-stage">
                    {/* Non-navigating book cover presentation */}
                    <div
                      className="bookshelf-book-link"
                      role="presentation"
                      aria-label={book.title}
                    >
                      <div className={`bookshelf-book-container ${is3dCutout ? 'is-3d-cutout' : 'is-hardcover-mock'}`}>
                        {/* Book Cover Image */}
                        <img
                          src={book.coverImageUrl}
                          alt={book.title}
                          className="bookshelf-book-img"
                          loading="eager"
                        />

                        {/* Hardcover Spine & Page Texture for flat covers */}
                        {!is3dCutout && (
                          <>
                            <div className="bookshelf-book-spine-depth" aria-hidden="true" />
                            <div className="bookshelf-book-rim-highlight" aria-hidden="true" />
                          </>
                        )}
                      </div>
                    </div>

                    {/* Circular Bookmark Button at Upper-Right of Cover */}
                    <button
                      type="button"
                      onClick={() => toggleSaveBook(book.id)}
                      className={`bookshelf-bookmark-btn ${saved ? 'is-saved' : ''}`}
                      aria-label={saved ? `Remove ${book.title} from bookmarks` : `Bookmark ${book.title}`}
                      title={saved ? 'Bookmarked' : 'Bookmark this title'}
                    >
                      <Bookmark size={15} strokeWidth={2.2} fill={saved ? '#142B4A' : 'none'} color="#142B4A" />
                    </button>

                    {/* Realistic Grounding Contact Shadow below book */}
                    <div className="bookshelf-book-contact-shadow" aria-hidden="true" />
                  </div>

                  {/* Lower Stage: Sculptural Ivory Plinth Information Block */}
                  <div className="bookshelf-plinth-card">
                    {/* Category Label Pill */}
                    <div className="bookshelf-plinth-badge-row">
                      <span className={`bookshelf-cat-badge ${badgeClass}`}>
                        {categoryLabel}
                      </span>
                    </div>

                    {/* Book Title */}
                    <h3 className="bookshelf-book-title">
                      <Link to={`/books/${book.slug}`} className="bookshelf-title-anchor">
                        {book.title}
                      </Link>
                    </h3>

                    {/* Author Name */}
                    <p className="bookshelf-book-author">By {book.author.name}</p>

                    {/* Action Row: Price Tag, Read Action, Circular Arrow */}
                    <div className="bookshelf-plinth-actions">
                      {/* Price Tag Pill */}
                      <span className="bookshelf-price-pill">{paperbackPrice}</span>

                      {/* Read Sample Action */}
                      <button
                        type="button"
                        onClick={() => onOpenSampleReader(book)}
                        className="bookshelf-read-btn"
                        aria-label={`Read excerpt of ${book.title}`}
                      >
                        <BookOpen size={16} strokeWidth={2.0} />
                        <span>Read</span>
                      </button>

                      {/* Circular Arrow Button (Links to book purchase page) */}
                      <Link
                        to={`/books/${book.slug}`}
                        className="bookshelf-arrow-link"
                        aria-label={`View details and buy ${book.title}`}
                        title="View details & purchase"
                      >
                        <ArrowRight size={15} strokeWidth={2.4} className="bookshelf-arrow-link-icon" />
                      </Link>
                    </div>

                    {/* Primary: Buy Now | Secondary: Add to Cart */}
                    <BookPurchaseActions book={book} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ====================================================================
            BOTTOM CONTROLS: Slender Progress Track & Refined Outlined CTA
            ==================================================================== */}
        <div className="bookshelf-bottom-bar">
          {/* Thin Horizontal Scroll Progress Track */}
          <div className="bookshelf-progress-track" aria-hidden="true">
            <div
              className="bookshelf-progress-thumb"
              style={{
                transform: `translateX(${scrollProgress * 155}px)`,
              }}
            />
          </div>

          {/* Refined Center Button */}
          <Link
            to="/library"
            className="bookshelf-browse-cta"
            id="browse-library-cta-btn"
          >
            <span>Browse Full Medhankar Library</span>
            <ArrowRight size={16} strokeWidth={2.2} className="bookshelf-cta-arrow" />
          </Link>
        </div>
      </div>

      {/* ====================================================================
          SCOPED STYLES: Pure Vanilla CSS with Cinematic Editorial Atmosphere
          ==================================================================== */}
      <style>{`
        .cinematic-bookshelf-root {
          position: relative;
          width: 100%;
          background: #F5F1E9;
          background: radial-gradient(ellipse at 80% 15%, #FAF7F0 0%, #F5F1E9 55%, #EFE8DC 100%);
          padding: clamp(52px, 6.5vw, 78px) 0 clamp(44px, 5.5vw, 68px);
          box-sizing: border-box;
          overflow: hidden;
          border-top: 1px solid rgba(229, 222, 210, 0.6);
          border-bottom: 1px solid rgba(229, 222, 210, 0.6);
        }

        /* Continuous Atmospheric Background */
        .bookshelf-backdrop {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        /* Natural Window Sunlight Diagonal Bands */
        .bookshelf-sunlight-bands {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            124deg,
            rgba(255, 255, 255, 0.55) 0%,
            transparent 35%,
            rgba(20, 43, 74, 0.03) 38%,
            rgba(20, 43, 74, 0.038) 44%,
            transparent 48%,
            rgba(20, 43, 74, 0.02) 58%,
            rgba(20, 43, 74, 0.028) 63%,
            transparent 68%
          );
        }

        /* Upper-Right Warm Radiance Glow */
        .bookshelf-sun-radiance {
          position: absolute;
          top: -40px;
          right: -40px;
          width: clamp(340px, 42vw, 650px);
          height: clamp(340px, 42vw, 650px);
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 250, 235, 0.85) 0%,
            rgba(255, 246, 224, 0.35) 45%,
            transparent 75%
          );
          filter: blur(40px);
        }

        /* Botanical Foliage Shadows (Top Right) */
        .bookshelf-foliage-tr {
          position: absolute;
          top: -20px;
          right: -10px;
          width: clamp(200px, 24vw, 340px);
          height: auto;
          pointer-events: none;
          z-index: 1;
        }

        /* Subtle ambient shadow at edges */
        .bookshelf-bottom-leaves {
          position: absolute;
          bottom: -40px;
          left: -40px;
          width: 220px;
          height: 220px;
          background: radial-gradient(circle, rgba(45, 35, 20, 0.04) 0%, transparent 70%);
          pointer-events: none;
        }

        .bookshelf-container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 clamp(16px, 3.5vw, 44px);
          box-sizing: border-box;
        }

        /* ------------------------------------------------------------------
           HEADER ROW
           ------------------------------------------------------------------ */
        .bookshelf-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: clamp(24px, 3.5vw, 36px);
          flex-wrap: wrap;
        }

        .bookshelf-header-left {
          max-width: 680px;
        }

        .bookshelf-eyebrow-row {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .bookshelf-eyebrow-rule {
          width: 24px;
          height: 1.5px;
          background: #64748B;
        }

        .bookshelf-eyebrow-text {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.16em;
          font-weight: 700;
          color: #586578;
          text-transform: uppercase;
        }

        .bookshelf-title {
          font-family: 'Newsreader', Georgia, 'Mukta', serif;
          font-size: clamp(2.2rem, 3.8vw, 3.2rem);
          font-weight: 600;
          color: #142B4A;
          line-height: 1.15;
          margin: 0 0 6px;
          letter-spacing: -0.015em;
        }

        .bookshelf-title-accent {
          color: #B9924A;
          font-style: italic;
          font-weight: 600;
        }

        .bookshelf-subtitle {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: clamp(0.9rem, 1.2vw, 1.05rem);
          font-weight: 500;
          color: #77736C;
          line-height: 1.55;
          margin: 0;
        }

        /* Carousel Navigation Buttons */
        .bookshelf-ctrls-top {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .bookshelf-arrow-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid rgba(229, 222, 210, 0.9);
          box-shadow: 0 3px 12px rgba(20, 43, 74, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #142B4A;
          cursor: pointer;
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.22s ease,
                      border-color 0.22s ease,
                      background-color 0.2s ease;
        }

        .bookshelf-arrow-btn:hover:not(:disabled) {
          transform: scale(1.06);
          border-color: #B9924A;
          box-shadow: 0 6px 18px rgba(20, 43, 74, 0.1);
        }

        .bookshelf-arrow-btn:active:not(:disabled) {
          transform: scale(0.96);
        }

        .bookshelf-arrow-btn.is-disabled {
          opacity: 0.45;
          cursor: not-allowed;
          box-shadow: none;
        }

        /* ------------------------------------------------------------------
           STAGE & CONTINUOUS STONE SHELF
           ------------------------------------------------------------------ */
        .bookshelf-stage-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 24px;
        }

        /* Continuous Travertine Shelf Platform */
        .bookshelf-stone-platform {
          position: absolute;
          left: -60px;
          right: -60px;
          bottom: 12px;
          height: 90px;
          pointer-events: none;
          z-index: 1;
        }

        .bookshelf-stone-top-plane {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(180deg, rgba(238, 233, 222, 0.45) 0%, rgba(247, 244, 238, 0.95) 100%);
        }

        .bookshelf-stone-bevel-edge {
          position: absolute;
          top: 60px;
          left: 0;
          right: 0;
          height: 16px;
          background: linear-gradient(180deg, #EBE4D6 0%, #DBD2C0 50%, #D0C6B2 100%);
          border-top: 1.5px solid #FFFFFF;
          border-bottom: 1px solid #BFB4A0;
        }

        .bookshelf-stone-drop-shadow {
          position: absolute;
          top: 76px;
          left: 0;
          right: 0;
          height: 14px;
          background: linear-gradient(180deg, rgba(45, 35, 20, 0.08) 0%, transparent 100%);
        }

        /* Left Editorial Prop (Book Stack + Vase) */
        .bookshelf-left-prop-anchor {
          position: absolute;
          left: 0;
          bottom: 24px;
          width: clamp(120px, 12vw, 155px);
          height: auto;
          z-index: 2;
          pointer-events: none;
        }

        .prop-svg {
          width: 100%;
          height: auto;
          display: block;
          filter: drop-shadow(0 14px 22px rgba(45, 35, 20, 0.08));
        }

        /* Horizontal Carousel Reel */
        .bookshelf-reel {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: flex-end;
          gap: clamp(18px, 2.2vw, 26px);
          overflow-x: auto;
          overflow-y: visible;
          scroll-behavior: smooth;
          padding: 20px 4px 18px clamp(135px, 13vw, 165px);
          box-sizing: border-box;
          scrollbar-width: none;
          -ms-overflow-style: none;
          outline: none;
        }

        .bookshelf-reel::-webkit-scrollbar {
          display: none;
        }

        /* ------------------------------------------------------------------
           INDIVIDUAL BOOK ITEM CARD: Upper Book + Grounded Plinth
           ------------------------------------------------------------------ */
        .bookshelf-item-card {
          width: clamp(245px, 21.5vw, 275px);
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          user-select: none;
          box-sizing: border-box;
          transition: transform 0.26s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bookshelf-item-card:hover {
          transform: translateY(-3px);
        }

        /* Upper: Standing Book Stage */
        .bookshelf-book-stage {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          box-sizing: border-box;
          z-index: 3;
          margin-bottom: -10px;
        }

        .bookshelf-book-link {
          display: block;
          text-decoration: none;
          outline: none;
          position: relative;
        }

        /* 3D Cutout Book Presentation (e.g. Vaishali ki Amrapali) */
        .bookshelf-book-container.is-3d-cutout {
          position: relative;
          width: clamp(190px, 17vw, 220px);
          height: clamp(270px, 24vw, 305px);
          background: transparent;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .bookshelf-book-container.is-3d-cutout .bookshelf-book-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: bottom center;
          filter: drop-shadow(0 14px 24px rgba(20, 35, 60, 0.22));
          transition: transform 0.26s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bookshelf-item-card:hover .bookshelf-book-container.is-3d-cutout .bookshelf-book-img {
          transform: scale(1.02);
        }

        /* Hardcover Studio Mock Presentation (for rectangular covers) */
        .bookshelf-book-container.is-hardcover-mock {
          position: relative;
          width: clamp(185px, 16.5vw, 210px);
          height: clamp(265px, 23.5vw, 298px);
          border-radius: 3px 8px 8px 3px;
          overflow: hidden;
          background: #EAE6DF;
          box-shadow: -8px 14px 28px -4px rgba(20, 35, 60, 0.24),
                      0 4px 10px rgba(0, 0, 0, 0.08);
          transition: box-shadow 0.26s cubic-bezier(0.16, 1, 0.3, 1), transform 0.26s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bookshelf-item-card:hover .bookshelf-book-container.is-hardcover-mock {
          box-shadow: -10px 18px 34px -4px rgba(20, 35, 60, 0.3),
                      0 6px 14px rgba(0, 0, 0, 0.12);
          transform: scale(1.015);
        }

        .bookshelf-book-container.is-hardcover-mock .bookshelf-book-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Hardcover Left Spine Depth Gradient */
        .bookshelf-book-spine-depth {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 14px;
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.16) 45%,
            rgba(255, 255, 255, 0.12) 75%,
            transparent 100%
          );
          pointer-events: none;
        }

        .bookshelf-book-rim-highlight {
          position: absolute;
          inset: 0;
          border-radius: 3px 8px 8px 3px;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15);
          pointer-events: none;
        }

        /* Grounding Contact Shadow below book on shelf */
        .bookshelf-book-contact-shadow {
          width: 78%;
          height: 10px;
          background: radial-gradient(
            ellipse at 50% 50%,
            rgba(35, 25, 10, 0.35) 0%,
            rgba(35, 25, 10, 0.08) 55%,
            transparent 75%
          );
          margin-top: 2px;
          pointer-events: none;
        }

        /* Circular Bookmark Button at Upper-Right */
        .bookshelf-bookmark-btn {
          position: absolute;
          top: 6px;
          right: clamp(10px, 2vw, 20px);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid rgba(220, 214, 202, 0.95);
          box-shadow: 0 3px 10px rgba(20, 43, 74, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #142B4A;
          z-index: 10;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.2s ease,
                      background-color 0.2s ease;
        }

        .bookshelf-bookmark-btn:hover {
          transform: scale(1.1);
          background: #FFFFFF;
          box-shadow: 0 5px 14px rgba(20, 43, 74, 0.15);
        }

        .bookshelf-bookmark-btn.is-saved {
          background: #FFFFFF;
          color: #142B4A;
        }

        /* ------------------------------------------------------------------
           LOWER: SCULPTURAL IVORY PLINTH CARD
           ------------------------------------------------------------------ */
        .bookshelf-plinth-card {
          width: 100%;
          background: #FFFFFF;
          border: 1px solid rgba(230, 224, 212, 0.95);
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(20, 43, 74, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02);
          padding: 22px 18px 14px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 2;
          transition: border-color 0.24s ease, box-shadow 0.24s ease;
        }

        .bookshelf-item-card:hover .bookshelf-plinth-card {
          border-color: rgba(185, 146, 74, 0.4);
          box-shadow: 0 10px 26px rgba(20, 43, 74, 0.07);
        }

        .bookshelf-plinth-badge-row {
          margin-bottom: 6px;
        }

        /* Category Label Badge */
        .bookshelf-cat-badge {
          display: inline-block;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          padding: 2.5px 9px;
          border-radius: 9999px;
          line-height: 1.3;
        }

        .badge-lit {
          background: #FEF3C7;
          color: #92400E;
          border: 1px solid #FDE68A;
        }

        .badge-phil {
          background: #DBEAFE;
          color: #1E40AF;
          border: 1px solid #BFDBFE;
        }

        .badge-essay {
          background: #F3ECE6;
          color: #78350F;
          border: 1px solid #E7D7CC;
        }

        .badge-biz {
          background: #F0FDF4;
          color: #166534;
          border: 1px solid #BBF7D0;
        }

        .badge-gen {
          background: #F1F5F9;
          color: #334155;
          border: 1px solid #E2E8F0;
        }

        /* Title */
        .bookshelf-book-title {
          font-family: 'Newsreader', Georgia, 'Mukta', serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #142B4A;
          line-height: 1.25;
          margin: 0 0 4px;
          min-height: 2.5em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .bookshelf-title-anchor {
          color: inherit;
          text-decoration: none;
          outline: none;
          transition: color 0.2s ease;
        }

        .bookshelf-title-anchor:hover {
          color: #0B216B;
        }

        /* Author */
        .bookshelf-book-author {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 0.825rem;
          font-weight: 500;
          color: #77736C;
          line-height: 1.4;
          margin: 0 0 12px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Action Row: Price Pill, Read Action, Circular Arrow */
        .bookshelf-plinth-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
          margin-top: auto;
          padding-top: 10px;
          border-top: 1px solid rgba(232, 226, 214, 0.7);
        }

        /* Price Tag Pill */
        .bookshelf-price-pill {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 0.84rem;
          font-weight: 700;
          color: #8F5E18;
          background: #FAF5EB;
          border: 1px solid #EADECE;
          padding: 4px 10px;
          border-radius: 8px;
          white-space: nowrap;
        }

        /* Read Action Button */
        .bookshelf-read-btn {
          background: transparent;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 0.84rem;
          font-weight: 600;
          color: #142B4A;
          cursor: pointer;
          padding: 4px 6px;
          border-radius: 6px;
          transition: color 0.2s ease, transform 0.15s ease;
          outline: none;
        }

        .bookshelf-read-btn:hover {
          color: #B9924A;
          transform: translateY(-1px);
        }

        /* Circular Arrow Details Link */
        .bookshelf-arrow-link {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #FAF5EB;
          border: 1px solid #EADECE;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #142B4A;
          text-decoration: none;
          outline: none;
          flex-shrink: 0;
          transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bookshelf-arrow-link:hover {
          background: #FFFFFF;
          border-color: #B9924A;
          box-shadow: 0 3px 8px rgba(20, 43, 74, 0.08);
        }

        .bookshelf-arrow-link-icon {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bookshelf-arrow-link:hover .bookshelf-arrow-link-icon {
          transform: translateX(2.5px);
        }

        /* ------------------------------------------------------------------
           BOTTOM BAR: Progress Track & Browse Full Library CTA
           ------------------------------------------------------------------ */
        .bookshelf-bottom-bar {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          margin-top: clamp(24px, 3.5vw, 36px);
        }

        /* Slender Horizontal Scroll Progress Track */
        .bookshelf-progress-track {
          width: clamp(200px, 22vw, 240px);
          height: 5px;
          border-radius: 9999px;
          background: rgba(20, 43, 74, 0.12);
          position: relative;
          overflow: hidden;
        }

        .bookshelf-progress-thumb {
          width: 60px;
          height: 5px;
          border-radius: 9999px;
          background: #142B4A;
          transition: transform 0.12s linear;
        }

        /* Outlined Center CTA */
        .bookshelf-browse-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          border-radius: 9999px;
          background: #FFFFFF;
          border: 1.5px solid #DCD5C9;
          box-shadow: 0 3px 12px rgba(20, 43, 74, 0.04);
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          color: #142B4A;
          text-decoration: none;
          outline: none;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.2s ease,
                      color 0.2s ease,
                      box-shadow 0.2s ease;
        }

        .bookshelf-browse-cta:hover {
          transform: translateY(-2px);
          border-color: #B9924A;
          color: #0B216B;
          box-shadow: 0 6px 18px rgba(20, 43, 74, 0.08);
        }

        .bookshelf-cta-arrow {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bookshelf-browse-cta:hover .bookshelf-cta-arrow {
          transform: translateX(4px);
        }

        /* ------------------------------------------------------------------
           RESPONSIVE BREAKPOINTS: Tablet & Mobile Precision
           ------------------------------------------------------------------ */
        @media (max-width: 1024px) {
          .bookshelf-left-prop-anchor {
            display: none;
          }
          .bookshelf-reel {
            padding-left: 16px;
          }
          .bookshelf-foliage-tr {
            width: 180px;
          }
        }

        @media (max-width: 768px) {
          .cinematic-bookshelf-root {
            padding: 40px 0 36px;
          }

          .bookshelf-header {
            margin-bottom: 18px;
          }

          .bookshelf-ctrls-top {
            display: none;
          }

          .bookshelf-reel {
            scroll-snap-type: x mandatory;
            padding: 12px 16px 16px;
            gap: 16px;
          }

          .bookshelf-item-card {
            width: 82vw;
            max-width: 290px;
            scroll-snap-align: center;
          }

          .bookshelf-book-container.is-3d-cutout {
            width: 200px;
            height: 275px;
          }

          .bookshelf-book-container.is-hardcover-mock {
            width: 195px;
            height: 275px;
          }

          .bookshelf-bottom-bar {
            margin-top: 18px;
          }

          .bookshelf-browse-cta {
            width: 100%;
            max-width: 320px;
            justify-content: center;
          }
        }

        /* Respect Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .bookshelf-item-card,
          .bookshelf-arrow-btn,
          .bookshelf-browse-cta,
          .bookshelf-bookmark-btn {
            transition: none !important;
            transform: none !important;
          }
          .bookshelf-reel {
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
};

