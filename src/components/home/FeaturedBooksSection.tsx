// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Featured Books Showcase Section
// Dynamic 3D Scale & Depth Display matching User Reference Screenshot Exactly
// ==============================================================================

import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';

interface FeaturedBookItem {
  id: string;
  title: string;
  subtitle?: string;
  authorName: string;
  authorAvatar: string;
  coverImage: string;
  rating: number;
  badge?: string;
}

const FEATURED_BOOKS_DATA: FeaturedBookItem[] = [
  {
    id: 'feat-1',
    title: 'Whispers of the Heart',
    subtitle: 'From Shadows to Light',
    authorName: 'Valbona',
    authorAvatar: '/covers/featured/avatar-valbona.jpg',
    coverImage: '/covers/featured/whispers-of-the-heart.jpg',
    rating: 5,
  },
  {
    id: 'feat-2',
    title: 'Navigating Turbulence',
    subtitle: 'An Analysis of Airline Failures 2019-2023',
    authorName: 'Adiel',
    authorAvatar: '/covers/featured/avatar-adiel.jpg',
    coverImage: '/covers/featured/navigating-turbulence.jpg',
    rating: 5,
  },
  {
    id: 'feat-3',
    title: 'Your Journey to the Top',
    subtitle: 'Proven Best Approach to Accelerate Your Career Progression',
    authorName: 'Richard',
    authorAvatar: '/covers/featured/avatar-richard.jpg',
    coverImage: '/covers/featured/journey-to-the-top.jpg',
    rating: 5,
  },
  {
    id: 'feat-4',
    title: 'A Land of Their Own',
    subtitle: 'A Documentary Historical Novel',
    authorName: 'Paul',
    authorAvatar: '/covers/featured/avatar-paul.jpg',
    coverImage: '/covers/featured/land-of-their-own.jpg',
    rating: 5,
    badge: 'SALE!',
  },
  {
    id: 'feat-5',
    title: 'She for Her',
    subtitle: 'A powerful story of love, support, and friendship',
    authorName: 'Rashmi',
    authorAvatar: '/covers/featured/avatar-rashmi.jpg',
    coverImage: '/covers/featured/she-for-her.jpg',
    rating: 5,
  },
];

export const FeaturedBooksSection: React.FC = () => {
  // Center book is index 2 ("Your Journey to the Top") by default
  const [activeIndex, setActiveIndex] = useState<number>(2);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="featured-showcase-section" aria-labelledby="featured-books-title">
      <div className="featured-showcase-container">
        {/* Centered Editorial Heading matching reference */}
        <div className="featured-showcase-header">
          <h2 id="featured-books-title" className="featured-showcase-title">
            Featured Books
          </h2>
        </div>

        {/* 5-Book Cover Display with 3D Depth & Center Elevation */}
        <div className="featured-books-row" role="region" aria-label="Featured Books Showcase">
          {FEATURED_BOOKS_DATA.map((book, index) => {
            const isCenter = index === activeIndex;
            const distance = Math.abs(index - activeIndex);

            return (
              <div
                key={book.id}
                onClick={() => setActiveIndex(index)}
                className={`featured-book-card ${isCenter ? 'is-active-center' : ''} dist-${distance}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveIndex(index);
                  }
                }}
                aria-label={`${book.title} by ${book.authorName}`}
              >
                {/* Book Cover Container */}
                <div className="featured-cover-wrapper">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="featured-cover-img"
                    loading="lazy"
                  />

                  {/* Top-Right "SALE!" Ribbon Badge if applicable */}
                  {book.badge && (
                    <span className="featured-sale-badge" aria-label="On Sale">
                      {book.badge}
                    </span>
                  )}

                  {/* Realistic Book Spine Edge Depth */}
                  <div className="featured-cover-spine-edge" aria-hidden="true" />
                  <div className="featured-cover-shine" aria-hidden="true" />
                </div>

                {/* Author Info & Star Rating Footer */}
                <div className="featured-author-meta">
                  <img
                    src={book.authorAvatar}
                    alt={book.authorName}
                    className="featured-author-avatar"
                    loading="lazy"
                  />
                  <div className="featured-author-details">
                    <span className="featured-book-by-label">Book by</span>
                    <h3 className="featured-author-name">{book.authorName}</h3>
                    {/* 5 Rating Stars */}
                    <div className="featured-star-rating" aria-label="5 out of 5 stars">
                      {'★'.repeat(book.rating)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Back to Top Button (matching blue circle in Image 2) */}
      <button
        type="button"
        onClick={scrollToTop}
        className="featured-back-to-top-btn"
        aria-label="Scroll to top of page"
        title="Back to Top"
      >
        <ChevronUp size={20} strokeWidth={2.4} />
      </button>

      {/* Pure Scoped CSS matching Image 2 */}
      <style>{`
        .featured-showcase-section {
          position: relative;
          width: 100%;
          background: #FFFFFF;
          padding: clamp(60px, 7vw, 90px) 0 clamp(70px, 8vw, 100px);
          box-sizing: border-box;
          border-top: 1px solid #F1ECE1;
          overflow: hidden;
        }

        .featured-showcase-container {
          width: 100%;
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 clamp(16px, 3.5vw, 40px);
          box-sizing: border-box;
        }

        .featured-showcase-header {
          text-align: center;
          margin-bottom: clamp(36px, 5vw, 56px);
        }

        .featured-showcase-title {
          font-family: 'Newsreader', Georgia, 'Mukta', serif;
          font-size: clamp(2rem, 3.6vw, 3rem);
          font-weight: 600;
          color: #263238;
          margin: 0;
          letter-spacing: -0.015em;
        }

        /* 5-Book Layout Row */
        .featured-books-row {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: clamp(14px, 2.2vw, 32px);
          flex-wrap: nowrap;
          overflow-x: auto;
          overflow-y: visible;
          padding: 48px 10px 24px;
          box-sizing: border-box;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .featured-books-row::-webkit-scrollbar {
          display: none;
        }

        /* Book Card Item */
        .featured-book-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.3s ease,
                      opacity 0.3s ease;
          user-select: none;
          outline: none;
        }

        /* Side Books Sizing */
        .featured-book-card {
          width: clamp(170px, 15vw, 215px);
          transform: translateY(0) scale(0.96);
          opacity: 0.92;
        }

        .featured-book-card:hover {
          transform: translateY(-6px) scale(0.99);
          opacity: 1;
        }

        /* Center Book Hero Scale: 25% larger, elevated shadow, commanding presence */
        .featured-book-card.is-active-center {
          width: clamp(230px, 20vw, 295px);
          transform: translateY(-16px) scale(1.12);
          opacity: 1;
          z-index: 10;
        }

        .featured-book-card.is-active-center:hover {
          transform: translateY(-20px) scale(1.14);
        }

        /* Cover Image Wrapper */
        .featured-cover-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1.48;
          border-radius: 4px;
          overflow: hidden;
          background: #111827;
          box-shadow: 0 10px 24px -4px rgba(15, 23, 42, 0.16),
                      0 4px 10px rgba(0, 0, 0, 0.08);
          transition: box-shadow 0.35s ease;
        }

        .featured-book-card.is-active-center .featured-cover-wrapper {
          box-shadow: 0 24px 48px -8px rgba(15, 23, 42, 0.32),
                      0 10px 20px rgba(0, 0, 0, 0.12);
          border-radius: 5px;
        }

        .featured-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* SALE! Badge */
        .featured-sale-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: #0284C7;
          color: #FFFFFF;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          padding: 4px 10px;
          border-bottom-left-radius: 6px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          z-index: 5;
        }

        /* Book Spine Simulation */
        .featured-cover-spine-edge {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 10px;
          background: linear-gradient(90deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.1) 60%, transparent 100%);
          pointer-events: none;
        }

        .featured-cover-shine {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15);
          pointer-events: none;
        }

        /* Author Meta Block */
        .featured-author-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 14px;
          width: 100%;
          justify-content: flex-start;
          padding-left: 4px;
          box-sizing: border-box;
        }

        .featured-book-card.is-active-center .featured-author-meta {
          margin-top: 18px;
          justify-content: center;
        }

        .featured-author-avatar {
          width: clamp(28px, 2.8vw, 36px);
          height: clamp(28px, 2.8vw, 36px);
          border-radius: 50%;
          object-fit: cover;
          border: 1.5px solid #FFFFFF;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
          flex-shrink: 0;
        }

        .featured-book-card.is-active-center .featured-author-avatar {
          width: 40px;
          height: 40px;
        }

        .featured-author-details {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1.15;
        }

        .featured-book-by-label {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 0.72rem;
          color: #718096;
          font-weight: 500;
        }

        .featured-author-name {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 0.95rem;
          font-weight: 700;
          color: #2D3748;
          margin: 1px 0 3px;
        }

        /* 5-Star Rating in Gold */
        .featured-star-rating {
          font-size: 0.85rem;
          color: #FBBF24;
          letter-spacing: 2px;
          line-height: 1;
        }

        /* Floating Back to Top Button */
        .featured-back-to-top-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #0284C7;
          color: #FFFFFF;
          border: none;
          box-shadow: 0 6px 18px rgba(2, 132, 199, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 999;
          transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.2s ease,
                      box-shadow 0.22s ease;
        }

        .featured-back-to-top-btn:hover {
          transform: translateY(-3px) scale(1.08);
          background: #0369A1;
          box-shadow: 0 8px 22px rgba(2, 132, 199, 0.45);
        }

        .featured-back-to-top-btn:active {
          transform: scale(0.95);
        }

        /* Responsive Breakpoints */
        @media (max-width: 900px) {
          .featured-books-row {
            justify-content: flex-start;
            padding-left: 20px;
            padding-right: 20px;
          }

          .featured-book-card {
            width: 170px;
          }

          .featured-book-card.is-active-center {
            width: 210px;
            transform: translateY(-8px) scale(1.06);
          }
        }
      `}</style>
    </section>
  );
};
