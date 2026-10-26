// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Authenticated Medhankar Library Screen
// ==============================================================================

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Bookmark,
  ShoppingBag,
  Info,
  BookOpen,
  Filter,
} from 'lucide-react';
import { LibrarySidebar, type LibraryTab } from '../components/library/LibrarySidebar';
import { LibraryHeader } from '../components/library/LibraryHeader';
import { BookCard } from '../components/library/BookCard';
import { SampleReaderModal } from '../components/common/SampleReaderModal';
import { DemoModeBanner } from '../components/common/DemoModeBanner';
import { DEMO_BOOKS } from '../data/demoBooks';
import { useSavedBooks } from '../context/SavedBooksContext';
import type { Book as BookType } from '../types';

export const LibraryPage: React.FC = () => {
  const { savedBooks, isBookSaved } = useSavedBooks();
  const [searchParams] = useSearchParams();
  const initialGenre = searchParams.get('genre') || 'All';

  const [currentTab, setCurrentTab] = useState<LibraryTab>('discover');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>(initialGenre);
  const [activeReaderBook, setActiveReaderBook] = useState<BookType | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const genres = ['All', 'Philosophy & Thought', 'Literature & Fiction', 'Business & Leadership', 'Essays & Commentary'];

  // Filter books based on search query, current tab, and genre
  const filteredBooks = useMemo(() => {
    return DEMO_BOOKS.filter((b) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = b.title.toLowerCase().includes(q);
        const matchesAuthor = b.author.name.toLowerCase().includes(q);
        const matchesGenre = b.genre.toLowerCase().includes(q);
        if (!matchesTitle && !matchesAuthor && !matchesGenre) return false;
      }

      // 2. Genre Filter
      if (selectedGenre !== 'All' && b.genre !== selectedGenre) {
        return false;
      }

      // 3. Tab Filter
      if (currentTab === 'ebooks') {
        return b.availableFormats.includes('ebook');
      }
      if (currentTab === 'audiobooks') {
        return b.availableFormats.includes('audiobook') || b.sampleAudioAvailable;
      }
      if (currentTab === 'saved') {
        return isBookSaved(b.id);
      }
      if (currentTab === 'my-library') {
        // "My Library" distinguishes owned titles from catalogue.
        // In the initial release, users start with no purchased entitlements.
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedGenre, currentTab, savedBooks]);

  const getTabTitle = () => {
    switch (currentTab) {
      case 'discover':
        return 'Discover Catalogue';
      case 'all-books':
        return 'All Publications';
      case 'ebooks':
        return 'Digital E-Books';
      case 'audiobooks':
        return 'Audiobooks & Narrations';
      case 'my-library':
        return 'My Owned Library';
      case 'saved':
        return 'Saved & Bookmarked';
      case 'orders':
        return 'Order History';
      default:
        return 'Medhankar Library';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <DemoModeBanner />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Desktop Sidebar */}
        <div style={{ display: 'none' }} className="library-desktop-sidebar">
          <LibrarySidebar
            currentTab={currentTab}
            onSelectTab={(tab) => setCurrentTab(tab)}
          />
        </div>

        {/* Mobile Sidebar Drawer Modal */}
        {isMobileSidebarOpen && (
          <div
            className="modal-overlay"
            style={{ justifyContent: 'flex-start', padding: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsMobileSidebarOpen(false);
            }}
          >
            <div style={{ width: '280px', height: '100%', backgroundColor: 'var(--color-white)' }}>
              <LibrarySidebar
                currentTab={currentTab}
                onSelectTab={(tab) => setCurrentTab(tab)}
                isMobileDrawer
                onCloseMobileDrawer={() => setIsMobileSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <LibraryHeader
            title={getTabTitle()}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
            onSelectSavedTab={() => setCurrentTab('saved')}
          />

          <main style={{ flex: 1, overflowY: 'auto', padding: '32px 28px', backgroundColor: 'var(--color-bg-main)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              {/* Tab specific top banner */}
              {currentTab === 'discover' && (
                <div
                  style={{
                    backgroundColor: 'var(--color-white)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px 28px',
                    marginBottom: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  <div>
                    <span className="eyebrow">Digital Reading Product</span>
                    <h2
                      className="font-serif"
                      style={{ fontSize: '1.45rem', color: 'var(--color-deep-navy)', marginBottom: '6px' }}
                    >
                      Welcome to Medhankar Library
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', maxWidth: '580px' }}>
                      Browse editorial publications, preview sample chapters, bookmark favourites, and
                      experience reading designed with typographic restraint.
                    </p>
                  </div>
                </div>
              )}

              {/* Genre Filter Bar (for catalogue tabs) */}
              {currentTab !== 'orders' && currentTab !== 'my-library' && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginBottom: '24px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <Filter size={15} color="var(--color-text-secondary)" />
                    {genres.map((g) => (
                      <button
                        key={g}
                        onClick={() => setSelectedGenre(g)}
                        className={`btn btn-sm ${selectedGenre === g ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                      >
                        {g}
                      </button>
                    ))}
                  </div>

                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                    Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'title' : 'titles'}
                  </div>
                </div>
              )}

              {/* Tab Content Rendering */}
              {currentTab === 'orders' ? (
                /* Orders Tab - Honest Commerce Beta notice */
                <div
                  className="card"
                  style={{
                    textAlign: 'center',
                    padding: '64px 32px',
                    maxWidth: '560px',
                    margin: '40px auto',
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-light-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                    }}
                  >
                    <ShoppingBag size={26} color="var(--color-primary-blue)" />
                  </div>
                  <h3
                    className="font-serif"
                    style={{ fontSize: '1.35rem', color: 'var(--color-deep-navy)', marginBottom: '10px' }}
                  >
                    No orders placed yet
                  </h3>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '24px',
                    }}
                  >
                    Commerce and physical print fulfilment are being integrated progressively. Books in
                    this release are available for sample reading and digital browsing.
                  </p>
                  <button
                    onClick={() => setCurrentTab('discover')}
                    className="btn btn-primary btn-sm"
                  >
                    <span>Browse Discover Catalogue</span>
                  </button>
                </div>
              ) : currentTab === 'my-library' ? (
                /* My Library Tab - Distinguishes owned from public catalogue */
                <div
                  className="card"
                  style={{
                    textAlign: 'center',
                    padding: '64px 32px',
                    maxWidth: '560px',
                    margin: '40px auto',
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-bg-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                    }}
                  >
                    <BookOpen size={26} color="var(--color-deep-navy)" />
                  </div>
                  <h3
                    className="font-serif"
                    style={{ fontSize: '1.35rem', color: 'var(--color-deep-navy)', marginBottom: '10px' }}
                  >
                    Your digital bookshelf is empty
                  </h3>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '24px',
                    }}
                  >
                    You have not acquired any digital books yet. Titles in the public catalogue can be
                    previewed via the Discover tab or saved to your bookmarks.
                  </p>
                  <button
                    onClick={() => setCurrentTab('discover')}
                    className="btn btn-primary btn-sm"
                  >
                    <span>Explore Sample Titles</span>
                  </button>
                </div>
              ) : currentTab === 'saved' && filteredBooks.length === 0 ? (
                /* Empty Saved Books State */
                <div
                  className="card"
                  style={{
                    textAlign: 'center',
                    padding: '64px 32px',
                    maxWidth: '560px',
                    margin: '40px auto',
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-light-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                    }}
                  >
                    <Bookmark size={26} color="var(--color-primary-blue)" />
                  </div>
                  <h3
                    className="font-serif"
                    style={{ fontSize: '1.35rem', color: 'var(--color-deep-navy)', marginBottom: '10px' }}
                  >
                    No saved books yet
                  </h3>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '24px',
                    }}
                  >
                    Click the bookmark icon on any book card to save titles for quick access in your
                    reading list.
                  </p>
                  <button
                    onClick={() => setCurrentTab('discover')}
                    className="btn btn-secondary btn-sm"
                  >
                    <span>Discover Books</span>
                  </button>
                </div>
              ) : filteredBooks.length === 0 ? (
                /* Search No Results State */
                <div
                  className="card"
                  style={{
                    textAlign: 'center',
                    padding: '48px 24px',
                    maxWidth: '480px',
                    margin: '40px auto',
                  }}
                >
                  <Info size={28} color="var(--color-text-muted)" style={{ margin: '0 auto 16px' }} />
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--color-deep-navy)', marginBottom: '6px' }}>
                    No books found
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                    No titles matched your search query or filter criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedGenre('All');
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                /* Book Grid */
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '24px',
                  }}
                >
                  {filteredBooks.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      onReadSample={(b) => setActiveReaderBook(b)}
                    />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Reader Modal */}
      <SampleReaderModal
        book={activeReaderBook}
        onClose={() => setActiveReaderBook(null)}
      />

      <style>{`
        @media (min-width: 840px) {
          .library-desktop-sidebar { display: flex !important; }
        }
      `}</style>
    </div>
  );
};
