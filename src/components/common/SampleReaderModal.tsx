// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Digital Reader Sample Modal
// ==============================================================================

import React, { useState, useEffect } from 'react';
import { X, BookOpen, ZoomIn, ZoomOut, Volume2 } from 'lucide-react';
import type { Book } from '../../types';

interface SampleReaderModalProps {
  book: Book | null;
  onClose: () => void;
}

export const SampleReaderModal: React.FC<SampleReaderModalProps> = ({ book, onClose }) => {
  const [fontSize, setFontSize] = useState<number>(18);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!book) return null;

  const excerpt = book.sampleExcerpt || {
    chapterTitle: 'Sample Preview',
    content: [
      'This title is catalogued for editorial publication. An expanded digital excerpt will be made available upon completion of typesetting.',
    ],
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reader-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-content"
        style={{
          maxWidth: '720px',
          height: '85vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FCFAF6', // warm archival paper tint
          borderColor: '#E6E0D2',
        }}
      >
        {/* Reader Top Bar */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid #EBE4D5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F7F3E9',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookOpen size={18} color="var(--color-primary-blue)" />
            <div>
              <div
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 600,
                }}
              >
                Medhankar Reader Preview
              </div>
              <h2
                id="reader-title"
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--color-deep-navy)',
                }}
              >
                {book.title}
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Font size adjustments */}
            <button
              onClick={() => setFontSize((s) => Math.max(14, s - 2))}
              className="btn btn-ghost btn-sm"
              title="Decrease text size"
              aria-label="Decrease text size"
              style={{ padding: '6px' }}
            >
              <ZoomOut size={16} />
            </button>
            <button
              onClick={() => setFontSize((s) => Math.min(26, s + 2))}
              className="btn btn-ghost btn-sm"
              title="Increase text size"
              aria-label="Increase text size"
              style={{ padding: '6px' }}
            >
              <ZoomIn size={16} />
            </button>

            {book.sampleAudioAvailable && (
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`btn btn-sm ${isPlayingAudio ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.75rem', padding: '6px 10px' }}
              >
                <Volume2 size={14} />
                {isPlayingAudio ? 'Audio playing (demo)' : 'Audio sample'}
              </button>
            )}

            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm"
              aria-label="Close reader"
              style={{ padding: '6px', marginLeft: '8px' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Reader Book Content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '40px 48px',
            color: '#282C34',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginBottom: '36px',
              borderBottom: '1px solid #EBE4D5',
              paddingBottom: '24px',
            }}
          >
            <span
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-primary-blue)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '6px',
              }}
            >
              By {book.author.name}
            </span>
            <h3
              className="font-serif"
              style={{
                fontSize: '1.75rem',
                color: 'var(--color-deep-navy)',
                fontWeight: 500,
                lineHeight: 1.25,
              }}
            >
              {excerpt.chapterTitle}
            </h3>
          </div>

          <div
            className="font-serif"
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: 1.8,
              maxWidth: '580px',
              margin: '0 auto',
            }}
          >
            {excerpt.content.map((paragraph, index) => (
              <p
                key={index}
                style={{
                  marginBottom: '1.6em',
                  textIndent: index > 0 ? '1.5em' : '0',
                  color: '#24292E',
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Reader Footer Notice */}
          <div
            style={{
              marginTop: '48px',
              paddingTop: '20px',
              borderTop: '1px solid #EBE4D5',
              textAlign: 'center',
              fontSize: '0.8125rem',
              color: 'var(--color-text-secondary)',
            }}
          >
            <p>
              Excerpt from <em>{book.title}</em>. Official publication rights reserved by Medhankar
              Graphics and Publications Private Limited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
