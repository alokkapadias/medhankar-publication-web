// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Library Top Navigation Bar with Search
// ==============================================================================

import React from 'react';
import { Search, Menu, Bookmark, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSavedBooks } from '../../context/SavedBooksContext';

interface LibraryHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onToggleMobileSidebar: () => void;
  title: string;
  onSelectSavedTab: () => void;
}

export const LibraryHeader: React.FC<LibraryHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onToggleMobileSidebar,
  title,
  onSelectSavedTab,
}) => {
  const { user } = useAuth();
  const { savedCount } = useSavedBooks();

  return (
    <header
      style={{
        height: '70px',
        backgroundColor: 'var(--color-white)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        gap: '16px',
        position: 'sticky',
        top: 0,
        zIndex: 300,
      }}
    >
      {/* Left: Mobile Toggle & Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onToggleMobileSidebar}
          aria-label="Toggle Library Menu"
          className="library-mobile-toggle"
          style={{
            background: 'none',
            border: 'none',
            padding: '6px',
            cursor: 'pointer',
            color: 'var(--color-deep-navy)',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Menu size={22} />
        </button>

        <h1
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--color-deep-navy)',
            margin: 0,
          }}
        >
          {title}
        </h1>
      </div>

      {/* Middle: Real-time Search Box */}
      <div style={{ flex: '1 1 320px', maxWidth: '440px', position: 'relative' }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title or author..."
          className="form-input"
          id="library-search-input"
          style={{
            paddingLeft: '38px',
            paddingRight: searchQuery ? '32px' : '14px',
            height: '38px',
            fontSize: '0.875rem',
            backgroundColor: 'var(--color-bg-subtle)',
          }}
        />
        <Search
          size={16}
          color="var(--color-text-muted)"
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Right: Quick actions & Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={onSelectSavedTab}
          className="btn btn-secondary btn-sm"
          title="Saved books"
          aria-label="View saved books"
          style={{ padding: '6px 12px', fontSize: '0.8125rem' }}
        >
          <Bookmark size={14} color="var(--color-primary-blue)" />
          <span style={{ display: 'none' }} className="desktop-text">
            Saved
          </span>
          {savedCount > 0 && <span className="badge badge-blue">{savedCount}</span>}
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderLeft: '1px solid var(--color-border)',
            paddingLeft: '12px',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-deep-navy)',
              color: 'var(--color-white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
            }}
            title={user?.phone || 'Reader'}
          >
            M
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 840px) {
          .library-mobile-toggle { display: none !important; }
          .desktop-text { display: inline !important; }
        }
      `}</style>
    </header>
  );
};
