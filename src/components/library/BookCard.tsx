// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Cinematic Book Card Component (Matching Editorial Showcase Standards)
// ==============================================================================

import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookOpen, Volume2, ArrowRight } from 'lucide-react';
import { BookCover } from '../common/BookCover';
import { BookPurchaseActions } from '../common/BookPurchaseActions';
import { useSavedBooks } from '../../context/SavedBooksContext';
import type { Book } from '../../types';

interface BookCardProps {
  book: Book;
  onReadSample?: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onReadSample }) => {
  const { isBookSaved, toggleSaveBook } = useSavedBooks();
  const saved = isBookSaved(book.id);

  return (
    <article
      className="card card-hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px',
        borderRadius: 'var(--radius-lg)',
        position: 'relative',
        height: '100%',
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--color-border)',
        boxShadow: '0 4px 14px rgba(20, 45, 82, 0.05)',
      }}
    >
      <div>
        {/* Book Cover Container with Bookmark */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '14px',
            position: 'relative',
          }}
        >
          <Link to={`/books/${book.slug}`} aria-label={`View details for ${book.title}`}>
            <BookCover book={book} size="md" />
          </Link>

          {/* iOS Bookmark Button */}
          <button
            onClick={() => toggleSaveBook(book.id)}
            aria-label={saved ? 'Remove bookmark' : 'Bookmark book'}
            title={saved ? 'Saved' : 'Save book'}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: saved ? 'var(--color-primary-blue)' : 'var(--color-text-secondary)',
              boxShadow: '0 2px 8px rgba(20, 45, 82, 0.1)',
              transition: 'all 0.2s cubic-bezier(0.32, 0.72, 0, 1)',
            }}
          >
            <Bookmark size={15} fill={saved ? 'var(--color-primary-blue)' : 'none'} />
          </button>
        </div>

        {/* Category Pill and Format Info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '6px',
            marginBottom: '8px',
          }}
        >
          <span
            className="badge badge-gray"
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              padding: '2px 8px',
              backgroundColor: '#F1F5F9',
              color: 'var(--color-deep-navy)',
            }}
          >
            {book.genre.split('&')[0].trim()}
          </span>

          {book.sampleAudioAvailable && (
            <span
              className="badge"
              style={{
                fontSize: '0.65rem',
                backgroundColor: 'var(--color-light-blue)',
                color: 'var(--color-primary-blue)',
                padding: '2px 6px',
              }}
            >
              <Volume2 size={10} />
              Audio
            </span>
          )}
        </div>

        {/* Book Title */}
        <h3
          className="font-serif"
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.25,
            fontWeight: 600,
            color: 'var(--color-deep-navy)',
            marginBottom: '4px',
          }}
        >
          <Link
            to={`/books/${book.slug}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            {book.title}
          </Link>
        </h3>

        {/* Author Name */}
        <div
          style={{
            fontSize: '0.8rem',
            color: 'var(--color-text-secondary)',
            marginBottom: '10px',
            fontWeight: 500,
          }}
        >
          By {book.author.name}
        </div>
      </div>

      {/* Pricing Tag & Details Action */}
      <div
        style={{
          borderTop: '1px solid var(--color-border-subtle)',
          paddingTop: '12px',
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
        }}
      >
        <div>
          {book.samplePrice?.paperback && (
            <span
              style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#B45309', // Warm golden-amber price tag like screenshot
                backgroundColor: '#FFFBEB',
                padding: '3px 8px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid #FDE68A',
                display: 'inline-block',
              }}
            >
              {book.samplePrice.paperback}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {onReadSample && (
            <button
              onClick={() => onReadSample(book)}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.75rem', padding: '5px 8px' }}
              title="Read sample chapter"
            >
              <BookOpen size={13} />
              <span>Read</span>
            </button>
          )}

          <Link
            to={`/books/${book.slug}`}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.75rem', padding: '5px 10px' }}
          >
            <span>Details</span>
            <ArrowRight size={11} />
          </Link>
        </div>
      </div>

      {/* Primary: Buy Now | Secondary: Add to Cart */}
      <BookPurchaseActions book={book} />
    </article>
  );
};
