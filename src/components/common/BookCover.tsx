// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Cinematic Editorial Book Cover Component
// ==============================================================================

import React, { useState } from 'react';
import type { Book } from '../../types';

interface BookCoverProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showShadow?: boolean;
}

export const BookCover: React.FC<BookCoverProps> = ({
  book,
  size = 'md',
  className = '',
  showShadow = true,
}) => {
  const [imageError, setImageError] = useState(false);
  const { title, subtitle, author, coverPalette, coverImageUrl } = book;

  // Proportions matching real physical published books (1 : 1.5 ratio)
  const sizeStyles = {
    sm: { width: '135px', height: '202px', padding: '12px', titleSize: '0.85rem' },
    md: { width: '195px', height: '292px', padding: '18px', titleSize: '1.125rem' },
    lg: { width: '270px', height: '405px', padding: '24px', titleSize: '1.45rem' },
  }[size];

  // If real image is present and has not errored, render photorealistic book cover with 3D spine depth
  if (coverImageUrl && !imageError) {
    return (
      <div
        className={`book-cover-wrapper ${className}`}
        style={{
          width: sizeStyles.width,
          height: sizeStyles.height,
          position: 'relative',
          borderRadius: '4px 8px 8px 4px',
          boxShadow: showShadow
            ? '0 16px 36px -8px rgba(20, 45, 82, 0.28), 0 4px 12px rgba(20, 45, 82, 0.12)'
            : 'none',
          overflow: 'hidden',
          flexShrink: 0,
          cursor: 'pointer',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          background: '#0D1E36',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
          if (showShadow) {
            e.currentTarget.style.boxShadow =
              '0 24px 44px -10px rgba(36, 87, 197, 0.32), 0 8px 18px rgba(20, 45, 82, 0.18)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          if (showShadow) {
            e.currentTarget.style.boxShadow =
              '0 16px 36px -8px rgba(20, 45, 82, 0.28), 0 4px 12px rgba(20, 45, 82, 0.12)';
          }
        }}
      >
        <img
          src={coverImageUrl}
          alt={title}
          onError={() => setImageError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          loading="lazy"
        />

        {/* Realistic Book Spine Shadow effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: '12px',
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, rgba(255,255,255,0.12) 75%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Soft edge highlight for book cover gloss */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '4px 8px 8px 4px',
            boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.15)',
            pointerEvents: 'none',
          }}
        />
      </div>
    );
  }

  // Fallback CSS Graphic Cover
  return (
    <div
      className={`book-cover-container ${className}`}
      style={{
        width: sizeStyles.width,
        height: sizeStyles.height,
        position: 'relative',
        borderRadius: '4px 8px 8px 4px',
        backgroundColor: coverPalette.background,
        color: coverPalette.text,
        boxShadow: showShadow
          ? '0 16px 36px -8px rgba(20, 45, 82, 0.24), 0 4px 12px rgba(20, 45, 82, 0.1)'
          : 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: sizeStyles.padding,
        overflow: 'hidden',
        userSelect: 'none',
        flexShrink: 0,
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Spine highlight */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '10px',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: `1px solid rgba(255,255,255,0.16)`,
          paddingBottom: '6px',
        }}
      >
        <span
          style={{
            fontSize: size === 'sm' ? '0.55rem' : '0.625rem',
            letterSpacing: '0.12em',
            fontWeight: 700,
            textTransform: 'uppercase',
            opacity: 0.9,
          }}
        >
          MEDHANKAR
        </span>
        <span style={{ fontSize: '0.58rem', opacity: 0.7 }}>
          {book.publicationYear || '2025'}
        </span>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <h3
          className="font-serif"
          style={{
            fontSize: sizeStyles.titleSize,
            lineHeight: 1.18,
            fontWeight: 600,
            color: coverPalette.text,
            marginBottom: '4px',
          }}
        >
          {title}
        </h3>

        {subtitle && size !== 'sm' && (
          <p
            style={{
              fontSize: '0.7rem',
              lineHeight: 1.25,
              opacity: 0.75,
              marginBottom: '8px',
              color: coverPalette.text,
            }}
          >
            {subtitle}
          </p>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '6px',
            borderTop: `1px solid rgba(255,255,255,0.14)`,
            marginTop: '4px',
          }}
        >
          <span style={{ fontSize: '0.72rem', fontWeight: 500, opacity: 0.9 }}>
            {author.name}
          </span>
          <span style={{ fontSize: '0.6rem', color: coverPalette.accent, fontWeight: 600 }}>
            {book.genre.split('&')[0].trim()}
          </span>
        </div>
      </div>
    </div>
  );
};
