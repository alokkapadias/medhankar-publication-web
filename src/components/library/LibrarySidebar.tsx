// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Authenticated Library Navigation Sidebar
// ==============================================================================

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass,
  Book,
  Smartphone,
  Headphones,
  Bookmark,
  ShoppingBag,
  LogOut,
  Library as LibraryIcon,
} from 'lucide-react';
import { SITE_CONFIG } from '../../lib/config';
import { useAuth } from '../../context/AuthContext';
import { useSavedBooks } from '../../context/SavedBooksContext';
import { maskPhoneNumber } from '../../lib/supabase';

export type LibraryTab =
  | 'discover'
  | 'all-books'
  | 'ebooks'
  | 'audiobooks'
  | 'my-library'
  | 'saved'
  | 'orders';

interface LibrarySidebarProps {
  currentTab: LibraryTab;
  onSelectTab: (tab: LibraryTab) => void;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

export const LibrarySidebar: React.FC<LibrarySidebarProps> = ({
  currentTab,
  onSelectTab,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}) => {
  const { user, signOut } = useAuth();
  const { savedCount } = useSavedBooks();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'all-books', label: 'All Books', icon: Book },
    { id: 'ebooks', label: 'E-books', icon: Smartphone },
    { id: 'audiobooks', label: 'Audiobooks', icon: Headphones },
    { id: 'my-library', label: 'My Library', icon: LibraryIcon },
    { id: 'saved', label: 'Saved Books', icon: Bookmark, badge: savedCount > 0 ? savedCount : null },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, note: 'Commerce Beta' },
  ];

  const handleTabClick = (id: string) => {
    onSelectTab(id as LibraryTab);
    if (onCloseMobileDrawer) onCloseMobileDrawer();
  };

  return (
    <aside
      style={{
        width: isMobileDrawer ? '100%' : '260px',
        backgroundColor: 'var(--color-white)',
        borderRight: isMobileDrawer ? 'none' : '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: '24px 16px',
        flexShrink: 0,
      }}
    >
      <div>
        {/* Brand Link */}
        <Link
          to="/"
          style={{
            display: 'block',
            marginBottom: '28px',
            paddingLeft: '12px',
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '1.15rem',
              letterSpacing: '0.08em',
              color: 'var(--color-deep-navy)',
              display: 'block',
            }}
          >
            {SITE_CONFIG.brandName}
          </span>
          <span
            style={{
              fontSize: '0.625rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-primary-blue)',
              fontWeight: 600,
            }}
          >
            Library Destination
          </span>
        </Link>

        {/* Navigation list */}
        <nav aria-label="Library Navigation" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                id={`library-tab-${item.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  backgroundColor: active ? 'var(--color-light-blue)' : 'transparent',
                  color: active ? 'var(--color-primary-blue)' : 'var(--color-text-secondary)',
                  fontWeight: active ? 600 : 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={17} color={active ? 'var(--color-primary-blue)' : 'var(--color-text-secondary)'} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== null && item.badge !== undefined && (
                  <span
                    className="badge badge-blue"
                    style={{ fontSize: '0.6875rem', padding: '1px 6px' }}
                  >
                    {item.badge}
                  </span>
                )}

                {item.note && (
                  <span
                    style={{
                      fontSize: '0.65rem',
                      color: 'var(--color-text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {item.note}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User profile & sign-out bottom box */}
      <div
        style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '16px',
          marginTop: '20px',
        }}
      >
        <div
          style={{
            padding: '10px 12px',
            backgroundColor: 'var(--color-bg-subtle)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '10px',
          }}
        >
          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--color-text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 600,
            }}
          >
            Signed in as
          </div>
          <div
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-deep-navy)',
              marginTop: '2px',
            }}
          >
            {user?.phone ? maskPhoneNumber(user.phone) : 'Demo Reader'}
          </div>
          {user?.isDemoUser && (
            <span
              className="badge badge-amber"
              style={{ fontSize: '0.625rem', marginTop: '4px', padding: '1px 5px' }}
            >
              Evaluation Demo
            </span>
          )}
        </div>

        <button
          onClick={handleSignOut}
          id="library-signout-btn"
          className="btn btn-ghost btn-sm w-full"
          style={{
            justifyContent: 'flex-start',
            color: 'var(--color-error)',
            fontSize: '0.8125rem',
            padding: '8px 12px',
          }}
        >
          <LogOut size={15} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
