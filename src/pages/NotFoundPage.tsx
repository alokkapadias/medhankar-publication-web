// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// 404 Not Found Page
// ==============================================================================

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';

export const NotFoundPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
          backgroundColor: 'var(--color-bg-main)',
        }}
      >
        <div className="card" style={{ maxWidth: '520px', textAlign: 'center', padding: '48px 32px' }}>
          <span
            className="eyebrow"
            style={{ fontSize: '0.9rem', marginBottom: '8px' }}
          >
            404 — Page Not Found
          </span>
          <h1
            className="font-serif"
            style={{ fontSize: '2rem', color: 'var(--color-deep-navy)', marginBottom: '14px' }}
          >
            An unwritten chapter
          </h1>
          <p
            style={{
              fontSize: '0.9375rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
              marginBottom: '32px',
            }}
          >
            The page you requested could not be located. It may have been moved, updated, or does not
            exist in this publication edition.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary btn-sm">
              <ArrowLeft size={15} />
              <span>Return Home</span>
            </Link>
            <Link to="/library" className="btn btn-secondary btn-sm">
              <Compass size={15} />
              <span>Browse Library</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
