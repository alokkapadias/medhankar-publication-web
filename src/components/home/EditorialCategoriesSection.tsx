// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Editorial Categories Section — Refined Apple-Inspired Book Genre Showcase
// Matching the Reference Aesthetic: Mythology, Science, Biography & Autobiography
// ==============================================================================

import React from 'react';
import { Landmark, Atom, Feather, ArrowRight } from 'lucide-react';

interface EditorialCategoriesSectionProps {
  onSelectCategory?: (genre: string) => void;
}

interface CategoryCardItem {
  id: string;
  title: string;
  description: string;
  genre: string;
  theme: 'mythology' | 'science' | 'biography';
  icon: React.ReactNode;
  accentColor: string;
  watermark: React.ReactNode;
}

export const EditorialCategoriesSection: React.FC<EditorialCategoriesSectionProps> = ({
  onSelectCategory,
}) => {
  const categories: CategoryCardItem[] = [
    {
      id: 'mythology',
      title: 'Mythology',
      description: 'Explore ancient stories, legends and timeless wisdom',
      genre: 'Literature & Fiction',
      theme: 'mythology',
      icon: <Landmark size={26} strokeWidth={1.75} />,
      accentColor: '#9A6B2F',
      watermark: (
        /* Intricate Temple & Shikhara Silhouette Watermark */
        <svg
          viewBox="0 0 240 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="editorial-cat-watermark"
          aria-hidden="true"
        >
          <g opacity="0.18">
            {/* Mountain / Mist Background Contour */}
            <path
              d="M0 220C40 200 90 205 140 180C190 155 220 170 240 160V220H0Z"
              fill="#D4A76A"
            />
            {/* Majestic Temple Shikhara Spire */}
            <path
              d="M170 40L172 20H174L176 40L185 65H161L170 40Z"
              fill="#C49354"
            />
            <path
              d="M155 70L173 50L191 70H155Z"
              fill="#B88544"
            />
            <path
              d="M150 72H196V88H150V72Z"
              fill="#C49354"
            />
            <path
              d="M144 90H202V110H144V90Z"
              fill="#B88544"
            />
            <path
              d="M138 112H208V138H138V112Z"
              fill="#C49354"
            />
            <path
              d="M130 140H216V172H130V140Z"
              fill="#B88544"
            />
            <path
              d="M120 174H226V220H120V174Z"
              fill="#C49354"
            />
            {/* Kalasha & Dhvaja flag atop spire */}
            <path d="M173 10V20M173 10L184 14L173 17" stroke="#A87232" strokeWidth="2" strokeLinecap="round" />
            {/* Surrounding Mandapa pavilions */}
            <path
              d="M210 160L222 145L234 160H210V220H234"
              fill="#D4A76A"
              opacity="0.8"
            />
          </g>
        </svg>
      ),
    },
    {
      id: 'science',
      title: 'Science',
      description: 'Explore discoveries, innovations and the world around us',
      genre: 'Philosophy & Thought',
      theme: 'science',
      icon: <Atom size={28} strokeWidth={1.75} />,
      accentColor: '#1D4ED8',
      watermark: (
        /* Celestial Planet & Orbital Rings Watermark */
        <svg
          viewBox="0 0 240 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="editorial-cat-watermark"
          aria-hidden="true"
        >
          <g opacity="0.22">
            {/* Celestial Planet Sphere */}
            <circle cx="170" cy="110" r="48" fill="url(#planetGrad)" />
            {/* Planet Shading Crescent */}
            <path
              d="M170 62C196.5 62 218 83.5 218 110C218 136.5 196.5 158 170 158C162 158 154.5 156 148 152.5C164.5 147 176 130 176 110C176 90 164.5 73 148 67.5C154.5 64 162 62 170 62Z"
              fill="#60A5FA"
              opacity="0.6"
            />
            {/* Major Orbital Ring */}
            <ellipse
              cx="170"
              cy="110"
              rx="76"
              ry="26"
              transform="rotate(-24 170 110)"
              stroke="#3B82F6"
              strokeWidth="3.5"
              strokeDasharray="160 12"
            />
            {/* Secondary Orbital Ring */}
            <ellipse
              cx="170"
              cy="110"
              rx="92"
              ry="32"
              transform="rotate(-24 170 110)"
              stroke="#93C5FD"
              strokeWidth="1.75"
              strokeOpacity="0.7"
            />
            {/* Orbiting Satellite Node */}
            <circle cx="236" cy="92" r="4.5" fill="#2563EB" />
            <circle cx="106" cy="130" r="3" fill="#60A5FA" />
            {/* Background Constellation Dust */}
            <circle cx="210" cy="45" r="2" fill="#3B82F6" />
            <circle cx="130" cy="55" r="1.5" fill="#60A5FA" />
            <circle cx="120" cy="180" r="2" fill="#3B82F6" />
          </g>
          <defs>
            <radialGradient id="planetGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(150 90) rotate(45) scale(65)">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="65%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1E40AF" />
            </radialGradient>
          </defs>
        </svg>
      ),
    },
    {
      id: 'biography',
      title: 'Biography & Autobiography',
      description: 'Real lives, inspiring journeys and extraordinary minds',
      genre: 'Essays & Commentary',
      theme: 'biography',
      icon: <Feather size={26} strokeWidth={1.75} />,
      accentColor: '#9A3412',
      watermark: (
        /* Vintage Book Stack & Quill Silhouette Watermark */
        <svg
          viewBox="0 0 240 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="editorial-cat-watermark"
          aria-hidden="true"
        >
          <g opacity="0.2">
            {/* Bottom Book */}
            <path
              d="M130 180L185 165L235 178L180 195L130 180Z"
              fill="#EA580C"
            />
            <path
              d="M130 180V196L180 211V195L130 180Z"
              fill="#C2410C"
            />
            <path
              d="M180 211L235 194V178L180 195V211Z"
              fill="#FDBA74"
            />
            {/* Middle Book */}
            <path
              d="M138 158L190 144L236 156L184 171L138 158Z"
              fill="#FB923C"
            />
            <path
              d="M138 158V172L184 186V171L138 158Z"
              fill="#EA580C"
            />
            <path
              d="M184 186L236 170V156L184 171V186Z"
              fill="#FED7AA"
            />
            {/* Top Book */}
            <path
              d="M146 136L195 124L238 135L189 148L146 136Z"
              fill="#F97316"
            />
            <path
              d="M146 136V149L189 162V148L146 136Z"
              fill="#C2410C"
            />
            <path
              d="M189 162L238 148V135L189 148V162Z"
              fill="#FFEDD5"
            />
            {/* Graceful Quill Feather extending upward */}
            <path
              d="M216 45C216 45 200 70 192 105C186 130 184 145 184 145C184 145 192 135 204 115C214 98 224 75 224 48C224 45 220 44 216 45Z"
              fill="#C2410C"
            />
            <path
              d="M184 145C190 120 205 85 220 45"
              stroke="#7C2D12"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        </svg>
      ),
    },
  ];

  const handleCardClick = (genre: string) => {
    if (onSelectCategory) {
      onSelectCategory(genre);
    } else {
      const el = document.getElementById('releases');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="categories"
      className="editorial-categories-root"
      aria-labelledby="editorial-categories-heading"
    >
      {/* Subtle Ambient Background Orbs */}
      <div className="editorial-cat-ambient editorial-cat-ambient-left" aria-hidden="true" />
      <div className="editorial-cat-ambient editorial-cat-ambient-right" aria-hidden="true" />

      {/* Editorial Botanical Ambient Shadows matching reference */}
      <svg
        className="editorial-cat-foliage editorial-cat-foliage-tr"
        viewBox="0 0 320 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g opacity="0.14" filter="blur(6px)">
          <path d="M320 0C280 40 240 70 210 120C180 170 190 230 170 280" stroke="#1E293B" strokeWidth="3" />
          <path d="M260 50C240 30 200 45 190 70C205 75 235 70 260 50Z" fill="#1E293B" />
          <path d="M240 90C220 75 180 90 175 115C190 118 220 110 240 90Z" fill="#1E293B" />
          <path d="M220 135C200 125 160 140 160 165C175 165 205 155 220 135Z" fill="#1E293B" />
          <path d="M200 180C180 175 145 190 150 215C165 212 190 200 200 180Z" fill="#1E293B" />
        </g>
      </svg>
      <svg
        className="editorial-cat-foliage editorial-cat-foliage-bl"
        viewBox="0 0 320 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g opacity="0.12" filter="blur(7px)">
          <path d="M0 280C40 240 80 210 110 160C140 110 130 50 150 0" stroke="#1E293B" strokeWidth="3" />
          <path d="M60 230C80 250 120 235 130 210C115 205 85 210 60 230Z" fill="#1E293B" />
          <path d="M80 190C100 205 140 190 145 165C130 162 100 170 80 190Z" fill="#1E293B" />
          <path d="M100 145C120 155 160 140 160 115C145 115 115 125 100 145Z" fill="#1E293B" />
        </g>
      </svg>

      <div className="editorial-categories-container">
        {/* ==================================================================
            SECTION HEADER: Centered Eyebrow, Editorial Title & Subtitle
            ================================================================== */}
        <header className="editorial-categories-header">
          {/* Eyebrow Label with Balanced Divider Rules */}
          <div className="editorial-cat-eyebrow-wrapper">
            <span className="editorial-cat-line" aria-hidden="true" />
            <span className="editorial-cat-eyebrow">EXPLORE CATEGORIES</span>
            <span className="editorial-cat-line" aria-hidden="true" />
          </div>

          {/* Main Title: Deep Navy Luxury Serif */}
          <h2 id="editorial-categories-heading" className="editorial-cat-title">
            Discover Books by Interest
          </h2>

          {/* Muted Blue-Gray Supporting Description */}
          <p className="editorial-cat-subtitle">
            Explore our carefully curated collections across different genres and find books that
            inspire, educate and empower.
          </p>
        </header>

        {/* ==================================================================
            CATEGORY CARDS: Exactly 3 Sophisticated Editorial Pastel Cards
            ================================================================== */}
        <div className="editorial-categories-grid">
          {categories.map((cat, idx) => (
            <article
              key={cat.id}
              className={`editorial-card editorial-card-${cat.theme}`}
              onClick={() => handleCardClick(cat.genre)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(cat.genre);
                }
              }}
              style={{ animationDelay: `${idx * 110}ms` }}
              aria-label={`Explore ${cat.title} category: ${cat.description}`}
            >
              {/* Background Thematic Watermark Illustration */}
              {cat.watermark}

              {/* Soft Layered Translucent Wave Contour */}
              <div className={`editorial-card-wave-contour editorial-wave-${cat.theme}`} aria-hidden="true" />

              {/* Top Row: Circular Halo Icon Container */}
              <div className="editorial-card-top">
                <div className={`editorial-card-icon-halo editorial-halo-${cat.theme}`}>
                  <span className="editorial-card-icon">{cat.icon}</span>
                </div>
              </div>

              {/* Bottom Row: Typography & Arrow Action */}
              <div className="editorial-card-bottom">
                <div className="editorial-card-text">
                  <h3 className="editorial-card-title">{cat.title}</h3>
                  <p className="editorial-card-desc">{cat.description}</p>
                </div>

                <div
                  className={`editorial-card-arrow-btn editorial-arrow-${cat.theme}`}
                  aria-hidden="true"
                >
                  <ArrowRight size={17} strokeWidth={2.4} className="editorial-arrow-icon" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ====================================================================
          SCOPED STYLES: Pure Vanilla CSS with Curated Pastel Palette
          ==================================================================== */}
      <style>{`
        .editorial-categories-root {
          position: relative;
          width: 100%;
          background: #FFFFFF;
          background: radial-gradient(circle at 50% 20%, #FFFFFF 0%, #FAF8F5 65%, #F4EFE6 100%);
          padding: clamp(60px, 8vw, 96px) 24px;
          box-sizing: border-box;
          overflow: hidden;
          border-top: 1px solid rgba(226, 232, 240, 0.7);
          border-bottom: 1px solid rgba(226, 232, 240, 0.7);
        }

        /* Ambient Lighting Halos matching reference */
        .editorial-cat-ambient {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }

        .editorial-cat-ambient-left {
          top: 15%;
          left: -8%;
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(254, 243, 199, 0.45) 0%, transparent 70%);
        }

        .editorial-cat-ambient-right {
          bottom: 10%;
          right: -6%;
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, rgba(219, 234, 254, 0.45) 0%, transparent 70%);
        }

        /* Editorial Botanical Ambient Shadows matching reference */
        .editorial-cat-foliage {
          position: absolute;
          pointer-events: none;
          z-index: 0;
          width: 320px;
          height: 280px;
        }

        .editorial-cat-foliage-tr {
          top: -20px;
          right: -20px;
        }

        .editorial-cat-foliage-bl {
          bottom: -20px;
          left: -20px;
        }

        .editorial-categories-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
        }

        /* ------------------------------------------------------------------
           SECTION HEADER
           ------------------------------------------------------------------ */
        .editorial-categories-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: clamp(36px, 5vw, 54px);
        }

        .editorial-cat-eyebrow-wrapper {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 14px;
        }

        .editorial-cat-line {
          width: 36px;
          height: 1px;
          background: #CBD5E1;
        }

        .editorial-cat-eyebrow {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          color: #475569;
          text-transform: uppercase;
        }

        .editorial-cat-title {
          font-family: 'Newsreader', Georgia, 'Mukta', serif;
          font-size: clamp(2.1rem, 4.2vw, 3.25rem);
          font-weight: 700;
          color: #0B216B;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin: 0 0 14px;
        }

        .editorial-cat-subtitle {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: clamp(0.92rem, 1.3vw, 1.05rem);
          font-weight: 500;
          color: #64748B;
          line-height: 1.6;
          max-width: 620px;
          margin: 0;
        }

        /* ------------------------------------------------------------------
           GRID OF 3 CATEGORY CARDS
           ------------------------------------------------------------------ */
        .editorial-categories-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(20px, 2.5vw, 32px);
          width: 100%;
        }

        /* Base Card Styling */
        .editorial-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 250px;
          padding: 30px 28px 24px;
          border-radius: 26px;
          border: 1.5px solid transparent;
          box-shadow: 0 8px 26px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          cursor: pointer;
          overflow: hidden;
          user-select: none;
          box-sizing: border-box;
          opacity: 0;
          animation: editorialCardEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.28s ease;
        }

        @keyframes editorialCardEnter {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .editorial-card:hover {
          transform: translateY(-5px);
        }

        .editorial-card:active {
          transform: scale(0.985);
        }

        .editorial-card:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px rgba(11, 33, 107, 0.35);
        }

        /* ------------------------------------------------------------------
           THEMATIC COLORWAYS (MATCHING REFERENCE EXACTLY)
           ------------------------------------------------------------------ */
        /* Card 1: Mythology (Soft Warm Ivory & Sepia-Gold) */
        .editorial-card-mythology {
          background: linear-gradient(145deg, rgba(255, 253, 248, 0.96) 0%, rgba(253, 248, 238, 0.92) 100%);
          border-color: rgba(235, 222, 203, 0.85);
        }

        .editorial-card-mythology:hover {
          border-color: rgba(217, 119, 6, 0.45);
          box-shadow: 0 16px 36px rgba(180, 130, 40, 0.12), 0 2px 6px rgba(0, 0, 0, 0.03);
        }

        .editorial-halo-mythology {
          background: radial-gradient(circle at 40% 40%, #FFFDF7 0%, #FEF3C7 65%, #FDE68A 100%);
          border: 1.5px solid rgba(245, 158, 11, 0.28);
          box-shadow: 0 4px 16px rgba(245, 158, 11, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.9);
          color: #9A6B2F;
        }

        .editorial-arrow-mythology {
          color: #9A6B2F;
          border-color: rgba(217, 119, 6, 0.25);
        }

        /* Card 2: Science (Soft Sky-Ice Blue & Royal Indigo) */
        .editorial-card-science {
          background: linear-gradient(145deg, rgba(248, 251, 255, 0.96) 0%, rgba(238, 245, 254, 0.92) 100%);
          border-color: rgba(200, 222, 252, 0.85);
        }

        .editorial-card-science:hover {
          border-color: rgba(37, 99, 235, 0.45);
          box-shadow: 0 16px 36px rgba(37, 99, 235, 0.12), 0 2px 6px rgba(0, 0, 0, 0.03);
        }

        .editorial-halo-science {
          background: radial-gradient(circle at 40% 40%, #FFFFFF 0%, #DBEAFE 65%, #BFDBFE 100%);
          border: 1.5px solid rgba(37, 99, 235, 0.25);
          box-shadow: 0 4px 16px rgba(37, 99, 235, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.9);
          color: #1D4ED8;
        }

        .editorial-arrow-science {
          color: #1D4ED8;
          border-color: rgba(37, 99, 235, 0.25);
        }

        /* Card 3: Biography & Autobiography (Soft Warm Blush & Terracotta Sepia) */
        .editorial-card-biography {
          background: linear-gradient(145deg, rgba(255, 250, 248, 0.96) 0%, rgba(254, 244, 240, 0.92) 100%);
          border-color: rgba(254, 218, 206, 0.85);
        }

        .editorial-card-biography:hover {
          border-color: rgba(234, 88, 12, 0.45);
          box-shadow: 0 16px 36px rgba(234, 88, 12, 0.12), 0 2px 6px rgba(0, 0, 0, 0.03);
        }

        .editorial-halo-biography {
          background: radial-gradient(circle at 40% 40%, #FFFFFF 0%, #FFE4DD 65%, #FED7AA 100%);
          border: 1.5px solid rgba(234, 88, 12, 0.25);
          box-shadow: 0 4px 16px rgba(234, 88, 12, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.9);
          color: #9A3412;
        }

        .editorial-arrow-biography {
          color: #9A3412;
          border-color: rgba(234, 88, 12, 0.25);
        }

        /* ------------------------------------------------------------------
           CARD INNER WAVE CONTOURS
           ------------------------------------------------------------------ */
        .editorial-card-wave-contour {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          border-radius: 26px;
        }

        .editorial-wave-mythology {
          background: radial-gradient(circle at 15% 25%, rgba(255, 253, 248, 0.85) 0%, rgba(254, 243, 199, 0.2) 50%, transparent 80%);
        }

        .editorial-wave-science {
          background: radial-gradient(circle at 15% 25%, rgba(255, 255, 255, 0.9) 0%, rgba(219, 234, 254, 0.2) 50%, transparent 80%);
        }

        .editorial-wave-biography {
          background: radial-gradient(circle at 15% 25%, rgba(255, 255, 255, 0.9) 0%, rgba(254, 215, 200, 0.2) 50%, transparent 80%);
        }

        /* ------------------------------------------------------------------
           CARD ELEMENTS: Halo Icon, Watermark, Typography, Arrow
           ------------------------------------------------------------------ */
        .editorial-card-top {
          position: relative;
          z-index: 2;
          margin-bottom: 24px;
        }

        .editorial-card-icon-halo {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .editorial-card:hover .editorial-card-icon-halo {
          transform: scale(1.06);
        }

        .editorial-card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Subtle Watermark Positioned in Right Background */
        .editorial-cat-watermark {
          position: absolute;
          right: -10px;
          bottom: -10px;
          width: 190px;
          height: 190px;
          pointer-events: none;
          z-index: 1;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
        }

        .editorial-card:hover .editorial-cat-watermark {
          transform: scale(1.05) translate(-4px, -2px);
          opacity: 0.28;
        }

        /* Bottom Row Content */
        .editorial-card-bottom {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
        }

        .editorial-card-text {
          flex: 1;
        }

        .editorial-card-title {
          font-family: 'Newsreader', Georgia, 'Mukta', serif;
          font-size: 1.35rem;
          font-weight: 700;
          color: #0B216B;
          letter-spacing: -0.01em;
          line-height: 1.2;
          margin: 0 0 6px;
          transition: color 0.2s ease;
        }

        .editorial-card:hover .editorial-card-title {
          color: #081747;
        }

        .editorial-card-desc {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #64748B;
          line-height: 1.5;
          margin: 0;
          max-width: 220px;
        }

        /* Circular Arrow Button */
        .editorial-card-arrow-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 3px 10px rgba(15, 23, 42, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.2s ease,
                      box-shadow 0.2s ease;
        }

        .editorial-card:hover .editorial-card-arrow-btn {
          background: #FFFFFF;
          box-shadow: 0 6px 16px rgba(15, 23, 42, 0.1);
        }

        .editorial-arrow-icon {
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .editorial-card:hover .editorial-arrow-icon {
          transform: translateX(4px);
        }

        /* ------------------------------------------------------------------
           RESPONSIVE BREAKPOINTS (TABLET & MOBILE)
           ------------------------------------------------------------------ */
        @media (max-width: 1024px) {
          .editorial-categories-grid {
            gap: 18px;
          }

          .editorial-card {
            padding: 24px 20px 20px;
            min-height: 230px;
          }

          .editorial-card-title {
            font-size: 1.2rem;
          }

          .editorial-card-desc {
            font-size: 0.775rem;
          }
        }

        /* Mobile Layout: Clean vertical stack with comfortable touch targets */
        @media (max-width: 768px) {
          .editorial-categories-root {
            padding: 48px 18px;
          }

          .editorial-categories-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            max-width: 440px;
            margin: 0 auto;
          }

          .editorial-card {
            min-height: 190px;
            padding: 24px 22px 20px;
            border-radius: 22px;
          }

          .editorial-card-top {
            margin-bottom: 18px;
          }

          .editorial-card-icon-halo {
            width: 56px;
            height: 56px;
          }

          .editorial-cat-watermark {
            width: 150px;
            height: 150px;
            right: -6px;
            bottom: -6px;
          }

          .editorial-card-title {
            font-size: 1.25rem;
          }

          .editorial-card-desc {
            max-width: 260px;
          }
        }

        /* Accessibility: Respect Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .editorial-card {
            animation: none !important;
            opacity: 1 !important;
            transition: none !important;
          }

          .editorial-card:hover {
            transform: none !important;
          }

          .editorial-card-icon-halo,
          .editorial-cat-watermark,
          .editorial-arrow-icon {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};
