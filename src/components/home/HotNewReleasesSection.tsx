// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// HOT NEW RELEASES SECTION — PURE APPLE iOS INFLUENCED MINIMALIST SHOWCASE
// Rebuilt to match User Reference Image 1 with refined spring micro-animations
// ==============================================================================

import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DEMO_BOOKS } from '../../data/demoBooks';
import { BookPurchaseActions } from '../common/BookPurchaseActions';

interface ReleaseBook {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  badge?: string;
  year?: string;
}

const HOT_NEW_RELEASES: ReleaseBook[] = [
  {
    id: 'lanka-prophecy',
    title: 'Lanka: The Prophecy of the Bloodline',
    author: 'Prakash Mohandas',
    coverImage: '/covers/releases/lanka-prophecy.png',
    badge: 'Bestseller',
  },
  {
    id: 'engineer-multi-millionaire',
    title: 'Engineer to Multi-Millionaire',
    author: 'Hanumesh Srinivas',
    coverImage: '/covers/releases/engineer-multi-millionaire.png',
    badge: 'Popular',
  },
  {
    id: '98-days-of-nila',
    title: '98 Days of Nila',
    author: 'Devakee Rahalkar',
    coverImage: '/covers/releases/98-days-of-nila.png',
    badge: 'Inspiring',
  },
  {
    id: 'who-killed-damini',
    title: 'Who Killed Damini?',
    author: 'Soudia Parveen',
    coverImage: '/covers/releases/who-killed-damini.png',
    badge: 'Mystery',
  },
  {
    id: 'whispers-into-screams',
    title: 'Whispers, That Turn into Screams',
    author: 'Ankit Shetty',
    coverImage: '/covers/releases/whispers-into-screams.png',
    badge: 'Thriller',
  },
  {
    id: 'untold-legends-kurukshetra',
    title: 'Untold Legends of Kurukshetra',
    author: 'Trishanth Acharya',
    coverImage: '/covers/releases/untold-legends-kurukshetra.png',
    badge: 'Mythology',
  },
];

interface HotNewReleasesSectionProps {
  onSelectBook?: (book: ReleaseBook) => void;
}

export const HotNewReleasesSection: React.FC<HotNewReleasesSectionProps> = ({ onSelectBook }) => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const amount = direction === 'left' ? -360 : 360;
    scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    setTimeout(checkScroll, 350);
  };

  const handleBookClick = (book: ReleaseBook) => {
    if (onSelectBook) {
      onSelectBook(book);
    }
    navigate(`/books/${book.id}`);
  };

  return (
    <section className="ios-releases-root" id="releases" aria-label="Hot New Releases">
      <div className="ios-releases-container">
        {/* Section Header */}
        <div className="ios-releases-header">
          <div className="ios-releases-header-left">
            <h2 className="ios-releases-title">
              Hot New Releases
            </h2>
            <div className="ios-releases-accent-dot" />
          </div>

          {/* iOS-Style Minimal Navigation Controls */}
          <div className="ios-releases-controls" aria-label="Carousel Navigation">
            <button
              type="button"
              className={`ios-nav-btn ${!canScrollLeft ? 'is-disabled' : ''}`}
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous Releases"
            >
              <ChevronLeft size={18} strokeWidth={2.2} />
            </button>
            <button
              type="button"
              className={`ios-nav-btn ${!canScrollRight ? 'is-disabled' : ''}`}
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Next Releases"
            >
              <ChevronRight size={18} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* Horizontal Books Shelf / Reel */}
        <div
          className="ios-releases-reel"
          ref={scrollContainerRef}
          onScroll={checkScroll}
        >
          {HOT_NEW_RELEASES.map((book, index) => {
            const isHovered = activeHoverId === book.id;
            const fullBook = DEMO_BOOKS.find((b) => b.id === book.id || b.slug === book.id);
            return (
              <div
                key={book.id}
                className="ios-book-card-item"
                onMouseEnter={() => setActiveHoverId(book.id)}
                onMouseLeave={() => setActiveHoverId(null)}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/* 3D Apple Book Cover Container */}
                <div
                  className={`ios-book-cover-wrap ${isHovered ? 'is-hovered' : ''}`}
                  onClick={() => handleBookClick(book)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${book.title}`}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Subtle Top Specular Lighting */}
                  <div className="ios-book-sheen" />
                  
                  {/* Left Spine Shadow / Fold */}
                  <div className="ios-book-spine-depth" />

                  {/* Book Image */}
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="ios-book-cover-img"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/covers/monsoon.jpg';
                    }}
                  />

                  {/* Ground Contact Shadow */}
                  <div className="ios-book-contact-shadow" />
                </div>

                {/* Book Title Centered Below Cover */}
                <div className="ios-book-caption">
                  <h3
                    className="ios-book-title"
                    title={book.title}
                    onClick={() => handleBookClick(book)}
                    role="button"
                    tabIndex={0}
                    style={{ cursor: 'pointer' }}
                  >
                    {book.title}
                  </h3>
                  <p className="ios-book-author">
                    {book.author}
                  </p>
                  {fullBook?.samplePrice?.paperback && (
                    <div
                      style={{
                        marginTop: '6px',
                        display: 'inline-block',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: '#B45309',
                        backgroundColor: '#FFFBEB',
                        padding: '2px 7px',
                        borderRadius: '4px',
                        border: '1px solid #FDE68A',
                      }}
                    >
                      {fullBook.samplePrice.paperback}
                    </div>
                  )}
                </div>

                {/* Primary: Buy Now | Secondary: Add to Cart */}
                {fullBook && (
                  <div
                    style={{ width: '100%', marginTop: 'auto' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <BookPurchaseActions book={fullBook} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Embedded High-Performance iOS CSS Styling */}
      <style>{`
        .ios-releases-root {
          width: 100%;
          background: #FFFFFF;
          padding: clamp(36px, 5vw, 64px) 0 clamp(40px, 6vw, 68px);
          position: relative;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Inter', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .ios-releases-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(16px, 4vw, 36px);
        }

        /* Header Layout */
        .ios-releases-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: clamp(24px, 3.5vw, 36px);
          padding: 0 4px;
        }

        .ios-releases-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ios-releases-title {
          font-size: clamp(22px, 3vw, 30px);
          font-weight: 700;
          letter-spacing: -0.025em;
          color: #0F172A;
          margin: 0;
          font-family: inherit;
        }

        .ios-releases-accent-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0284C7, #0B216B);
          opacity: 0.85;
          margin-top: 4px;
        }

        /* iOS Controls */
        .ios-releases-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ios-nav-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #F1F5F9;
          border: 1px solid rgba(226, 232, 240, 0.8);
          color: #1E293B;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          outline: none;
        }

        .ios-nav-btn:hover:not(:disabled) {
          background: #0F172A;
          color: #FFFFFF;
          border-color: #0F172A;
          transform: scale(1.06);
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
        }

        .ios-nav-btn:active:not(:disabled) {
          transform: scale(0.94);
        }

        .ios-nav-btn.is-disabled,
        .ios-nav-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          pointer-events: none;
        }

        /* Reel Layout */
        .ios-releases-reel {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: clamp(14px, 2vw, 24px);
          width: 100%;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-snap-type: x mandatory;
          padding: 8px 4px 20px;
        }

        .ios-releases-reel::-webkit-scrollbar {
          display: none;
        }

        /* Responsive reel for smaller viewports */
        @media (max-width: 1024px) {
          .ios-releases-reel {
            display: flex;
            gap: 20px;
            padding-bottom: 24px;
          }

          .ios-book-card-item {
            flex: 0 0 clamp(160px, 32vw, 195px);
            scroll-snap-align: start;
          }
        }

        /* Book Card Item */
        .ios-book-card-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          user-select: none;
          position: relative;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .ios-book-card-item:active {
          transform: scale(0.97);
        }

        /* 3D Apple Book Cover Wrap */
        .ios-book-cover-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 152 / 230;
          border-radius: 6px;
          overflow: hidden;
          background: #F8FAFC;
          box-shadow:
            0 4px 14px -2px rgba(15, 23, 42, 0.12),
            0 2px 6px -1px rgba(15, 23, 42, 0.08),
            0 0 0 1px rgba(15, 23, 42, 0.04);
          transition: 
            transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: center bottom;
          will-change: transform, box-shadow;
        }

        .ios-book-cover-wrap.is-hovered {
          transform: translateY(-9px) scale(1.03);
          box-shadow:
            0 22px 32px -8px rgba(15, 23, 42, 0.22),
            0 10px 16px -4px rgba(15, 23, 42, 0.12),
            0 0 0 1px rgba(15, 23, 42, 0.06);
        }

        .ios-book-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: filter 0.4s ease;
        }

        /* Spine Depth (Subtle Book Fold on Left Edge) */
        .ios-book-spine-depth {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 8px;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.28) 0%,
            rgba(0, 0, 0, 0.12) 40%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* Apple Glass Specular Sheen */
        .ios-book-sheen {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            125deg,
            rgba(255, 255, 255, 0.32) 0%,
            rgba(255, 255, 255, 0.08) 35%,
            transparent 65%
          );
          pointer-events: none;
          z-index: 3;
          opacity: 0.8;
          transition: opacity 0.3s ease;
        }

        .ios-book-cover-wrap.is-hovered .ios-book-sheen {
          opacity: 1;
        }

        /* Ground Contact Shadow */
        .ios-book-contact-shadow {
          position: absolute;
          bottom: 0;
          left: 5%;
          right: 5%;
          height: 12px;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.45) 0%, transparent 75%);
          filter: blur(4px);
          opacity: 0.6;
          pointer-events: none;
          transform: translateY(6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .ios-book-cover-wrap.is-hovered .ios-book-contact-shadow {
          opacity: 0.85;
          transform: translateY(10px) scale(0.95);
        }

        /* Book Caption Below Cover */
        .ios-book-caption {
          margin-top: 14px;
          width: 100%;
          text-align: center;
          padding: 0 4px;
        }

        .ios-book-title {
          font-size: clamp(13px, 1.1vw, 14.5px);
          font-weight: 500;
          line-height: 1.32;
          color: #0F172A;
          margin: 0 0 3px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.2s ease;
        }

        .ios-book-card-item:hover .ios-book-title {
          color: #0284C7;
        }

        .ios-book-author {
          font-size: 12px;
          font-weight: 400;
          color: #64748B;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </section>
  );
};
