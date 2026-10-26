// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// CURATED GENRE ROWS SECTION — SUSPENSE & THRILLER + NON-FICTION / SELF HELP
// Rebuilt to match User Reference Image 2 with iOS Spring Interactions
// ==============================================================================

import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CuratedBook {
  id: string;
  title: string;
  author: string;
  coverImage: string;
}

interface GenreRowData {
  title: string;
  subtitle?: string;
  books: CuratedBook[];
}

const THRILLER_BOOKS: CuratedBook[] = [
  {
    id: 'suicider-thriller',
    title: 'Suicider The Thriller Mystery',
    author: 'Rajul Ratna',
    coverImage: '/covers/curated/suicider-thriller.png',
  },
  {
    id: 'saindhavbhavan-accident',
    title: 'Saindhavbhavan And A Mysterious Accident',
    author: 'Ranga Sai Komaragiri',
    coverImage: '/covers/curated/saindhavbhavan-accident.png',
  },
  {
    id: 'blight-of-ivory',
    title: 'Blight of the Ivory',
    author: 'Yudhisthir Singh',
    coverImage: '/covers/curated/blight-of-ivory.png',
  },
  {
    id: 'thicker-than-blood',
    title: 'Thicker Than Blood',
    author: "Nivedita 'Ramendu' Shukla",
    coverImage: '/covers/curated/thicker-than-blood.png',
  },
  {
    id: 'white-coat-red-heart',
    title: 'White Coat, Red Heart',
    author: 'Ashwinikumar Aiyangar',
    coverImage: '/covers/curated/white-coat-red-heart.png',
  },
  {
    id: 'hanmon',
    title: 'Hanmon',
    author: 'S. V. Bhat',
    coverImage: '/covers/curated/hanmon.png',
  },
];

const NON_FICTION_BOOKS: CuratedBook[] = [
  {
    id: 'wisdom-of-balance',
    title: 'The Wisdom of Balance',
    author: 'Swapnil Kamat',
    coverImage: '/covers/curated/wisdom-of-balance.png',
  },
  {
    id: 'invoke-inner-wisdom',
    title: 'Invoke Inner Wisdom-Empower Self',
    author: 'Yatin Samant',
    coverImage: '/covers/curated/invoke-inner-wisdom.png',
  },
  {
    id: 'yoga-business-ethics',
    title: 'Yoga for Business Ethics',
    author: 'Dr. Vikas Chothe',
    coverImage: '/covers/curated/yoga-business-ethics.png',
  },
  {
    id: 'panchatantra-yogasutra',
    title: 'Panchatantra and Yogasutra',
    author: 'Dr. Vikas Chothe',
    coverImage: '/covers/curated/panchatantra-yogasutra.png',
  },
  {
    id: 'marriage-where-soup-is-better',
    title: 'Marriage-Where Soup Is Better Than Dessert',
    author: 'Kumar Madhurendra Kishor',
    coverImage: '/covers/curated/marriage-where-soup-is-better.png',
  },
  {
    id: 'deliciously-alone',
    title: 'Deliciously Alone',
    author: 'San Rachna',
    coverImage: '/covers/curated/deliciously-alone.png',
  },
];

const GENRE_ROWS: GenreRowData[] = [
  {
    title: 'Suspense & Thriller Novels',
    subtitle: 'High-stakes investigations, psychological thrillers, and mysteries',
    books: THRILLER_BOOKS,
  },
  {
    title: 'Top Reads in Non-Fiction/ Self Help',
    subtitle: 'Life philosophy, mindfulness, career mastery, and inner balance',
    books: NON_FICTION_BOOKS,
  },
];

interface CuratedGenreRowsSectionProps {
  onSelectBook?: (book: CuratedBook) => void;
}

export const CuratedGenreRowsSection: React.FC<CuratedGenreRowsSectionProps> = ({ onSelectBook }) => {
  return (
    <section className="ios-curated-root" aria-label="Curated Genre Collections">
      <div className="ios-curated-container">
        {GENRE_ROWS.map((row, rowIndex) => (
          <GenreRowBlock
            key={row.title}
            rowData={row}
            rowIndex={rowIndex}
            onSelectBook={onSelectBook}
          />
        ))}
      </div>

      <style>{`
        .ios-curated-root {
          width: 100%;
          background: #FFFFFF;
          padding: 10px 0 clamp(48px, 6vw, 76px);
          position: relative;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Inter', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .ios-curated-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(16px, 4vw, 36px);
          display: flex;
          flex-direction: column;
          gap: clamp(42px, 5.5vw, 68px);
        }

        /* Row Block */
        .ios-row-block {
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        /* Header Layout */
        .ios-row-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: clamp(20px, 3vw, 28px);
          padding: 0 4px;
        }

        .ios-row-title-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ios-row-title {
          font-size: clamp(20px, 2.7vw, 26px);
          font-weight: 700;
          letter-spacing: -0.022em;
          color: #0F172A;
          margin: 0;
          font-family: inherit;
        }

        .ios-row-accent-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #64748B;
          opacity: 0.7;
          margin-top: 3px;
        }

        /* Controls */
        .ios-row-controls {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ios-genre-nav-btn {
          width: 36px;
          height: 36px;
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

        .ios-genre-nav-btn:hover:not(:disabled) {
          background: #0F172A;
          color: #FFFFFF;
          border-color: #0F172A;
          transform: scale(1.06);
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
        }

        .ios-genre-nav-btn:active:not(:disabled) {
          transform: scale(0.94);
        }

        .ios-genre-nav-btn.is-disabled,
        .ios-genre-nav-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          pointer-events: none;
        }

        /* Reel Layout */
        .ios-row-reel {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: clamp(14px, 2vw, 24px);
          width: 100%;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-snap-type: x mandatory;
          padding: 8px 4px 18px;
        }

        .ios-row-reel::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 1024px) {
          .ios-row-reel {
            display: flex;
            gap: 18px;
            padding-bottom: 22px;
          }

          .ios-curated-card {
            flex: 0 0 clamp(150px, 30vw, 185px);
            scroll-snap-align: start;
          }
        }

        /* Card Layout */
        .ios-curated-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          user-select: none;
          position: relative;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .ios-curated-card:active {
          transform: scale(0.97);
        }

        /* Cover Container */
        .ios-curated-cover-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 136 / 208;
          border-radius: 5px;
          overflow: hidden;
          background: #F8FAFC;
          box-shadow:
            0 4px 12px -2px rgba(15, 23, 42, 0.11),
            0 2px 5px -1px rgba(15, 23, 42, 0.07),
            0 0 0 1px rgba(15, 23, 42, 0.04);
          transition: 
            transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: center bottom;
          will-change: transform, box-shadow;
        }

        .ios-curated-cover-wrap.is-hovered {
          transform: translateY(-8px) scale(1.03);
          box-shadow:
            0 20px 28px -6px rgba(15, 23, 42, 0.20),
            0 8px 14px -3px rgba(15, 23, 42, 0.10),
            0 0 0 1px rgba(15, 23, 42, 0.06);
        }

        .ios-curated-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Spine Depth Gradient */
        .ios-curated-spine {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 7px;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.26) 0%,
            rgba(0, 0, 0, 0.1) 40%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* Glass Specular Sheen */
        .ios-curated-sheen {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            125deg,
            rgba(255, 255, 255, 0.28) 0%,
            rgba(255, 255, 255, 0.06) 35%,
            transparent 65%
          );
          pointer-events: none;
          z-index: 3;
          opacity: 0.75;
          transition: opacity 0.3s ease;
        }

        .ios-curated-cover-wrap.is-hovered .ios-curated-sheen {
          opacity: 1;
        }

        /* Contact Shadow */
        .ios-curated-shadow {
          position: absolute;
          bottom: 0;
          left: 6%;
          right: 6%;
          height: 10px;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4) 0%, transparent 75%);
          filter: blur(4px);
          opacity: 0.55;
          pointer-events: none;
          transform: translateY(5px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .ios-curated-cover-wrap.is-hovered .ios-curated-shadow {
          opacity: 0.8;
          transform: translateY(9px) scale(0.95);
        }

        /* Caption Text Below Cover (Matches Reference Image 2) */
        .ios-curated-caption {
          margin-top: 13px;
          width: 100%;
          text-align: center;
          padding: 0 4px;
        }

        .ios-curated-title {
          font-size: clamp(12.5px, 1.05vw, 14px);
          font-weight: 500;
          line-height: 1.32;
          color: #0F172A;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.2s ease;
        }

        .ios-curated-card:hover .ios-curated-title {
          color: #0284C7;
        }
      `}</style>
    </section>
  );
};

interface GenreRowBlockProps {
  rowData: GenreRowData;
  rowIndex: number;
  onSelectBook?: (book: CuratedBook) => void;
}

const GenreRowBlock: React.FC<GenreRowBlockProps> = ({ rowData, onSelectBook }) => {
  const reelRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  const checkScroll = () => {
    if (!reelRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = reelRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!reelRef.current) return;
    const amount = direction === 'left' ? -340 : 340;
    reelRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    setTimeout(checkScroll, 350);
  };

  const handleBookClick = (e: React.MouseEvent, book: CuratedBook) => {
    e.preventDefault();
    if (onSelectBook) {
      onSelectBook(book);
    }
  };

  return (
    <div className="ios-row-block">
      {/* Row Header */}
      <div className="ios-row-header">
        <div className="ios-row-title-wrap">
          <h2 className="ios-row-title">{rowData.title}</h2>
          <div className="ios-row-accent-dot" />
        </div>

        {/* Minimal Controls */}
        <div className="ios-row-controls">
          <button
            type="button"
            className={`ios-genre-nav-btn ${!canScrollLeft ? 'is-disabled' : ''}`}
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label={`Previous in ${rowData.title}`}
          >
            <ChevronLeft size={17} strokeWidth={2.2} />
          </button>
          <button
            type="button"
            className={`ios-genre-nav-btn ${!canScrollRight ? 'is-disabled' : ''}`}
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label={`Next in ${rowData.title}`}
          >
            <ChevronRight size={17} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* Row Reel */}
      <div className="ios-row-reel" ref={reelRef} onScroll={checkScroll}>
        {rowData.books.map((book) => {
          const isHovered = activeHoverId === book.id;
          return (
            <div
              key={book.id}
              className="ios-curated-card"
              onMouseEnter={() => setActiveHoverId(book.id)}
              onMouseLeave={() => setActiveHoverId(null)}
              onClick={(e) => handleBookClick(e, book)}
            >
              {/* Cover Wrap */}
              <div className={`ios-curated-cover-wrap ${isHovered ? 'is-hovered' : ''}`}>
                <div className="ios-curated-sheen" />
                <div className="ios-curated-spine" />
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="ios-curated-cover-img"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/covers/monsoon.jpg';
                  }}
                />
                <div className="ios-curated-shadow" />
              </div>

              {/* Caption Below Cover */}
              <div className="ios-curated-caption">
                <h3 className="ios-curated-title" title={book.title}>
                  {book.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
