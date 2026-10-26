// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Premier iOS Top App Bar with Scroll-Dissolving Search & Amazon/Flipkart Interactive Search Screen
// ==============================================================================

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  Bookmark,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  FileText,
  Phone,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Mic,
  MessageSquare,
  ArrowLeft,
  TrendingUp,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSavedBooks } from '../../context/SavedBooksContext';
import { useCart } from '../../context/CartContext';
import { DEMO_BOOKS } from '../../data/demoBooks';

/**
 * Clean iOS SF-Symbols Style Person / Profile Icon matching Apple's official system icon
 * (Round head circle + smooth curved shoulders with flat rounded base)
 */
export const IosUserIcon: React.FC<{ size?: number; className?: string; strokeWidth?: number; color?: string }> = ({
  size = 22,
  className = '',
  strokeWidth = 1.9,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: 'block', margin: 'auto' }}
  >
    {/* Head circle */}
    <circle cx="12" cy="7.2" r="3.9" stroke={color} strokeWidth={strokeWidth} />
    {/* Torso outline with smooth curved shoulders & flat rounded base */}
    <path
      d="M5 20.2C5 16.3 8.1 13.5 12 13.5C15.9 13.5 19 16.3 19 20.2C19 20.65 18.65 21 18.2 21H5.8C5.35 21 5 20.65 5 20.2Z"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [mobileLegalOpen, setMobileLegalOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { user } = useAuth();
  const { savedCount } = useSavedBooks();
  const { cartCount } = useCart();

  // Trending & Suggested search keywords (Amazon/Flipkart style)
  const suggestedKeywords = [
    'Architecture of Ideas',
    'Meera Sen',
    'Philosophy & Thought',
    'Literature & Fiction',
    'Quietly Becoming',
    'The Thoughtful Entrepreneur',
    'Essays & Commentary',
    'Vikram Joshi',
    'Decisions',
    'Indian Editions',
  ];

  // Real-time search matching over DEMO_BOOKS catalogue
  const cleanQuery = searchQuery.trim().toLowerCase();
  const searchResults = cleanQuery
    ? DEMO_BOOKS.filter((b) => {
        const titleMatch = b.title.toLowerCase().includes(cleanQuery);
        const subMatch = b.subtitle ? b.subtitle.toLowerCase().includes(cleanQuery) : false;
        const authorMatch = b.author.name.toLowerCase().includes(cleanQuery);
        const genreMatch = b.genre.toLowerCase().includes(cleanQuery);
        const descMatch = b.description.toLowerCase().includes(cleanQuery);
        const isbnMatch = b.isbn ? b.isbn.toLowerCase().includes(cleanQuery) : false;
        return titleMatch || subMatch || authorMatch || genreMatch || descMatch || isbnMatch;
      })
    : [];

  // Track window scroll for signature iOS frosted glass blur and search pill dissolve
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setIsSearchModalOpen(false);
    setDropdownOpen(false);
  }, [location.pathname, location.hash]);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Standard non-intrusive body scroll lock (never freezes web or alters position)
  useEffect(() => {
    if (mobileMenuOpen || isSearchModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, isSearchModalOpen]);

  // Focus search input when modal opens
  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchModalOpen]);

  // Close search modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Web Speech API for voice search
  const handleVoiceSearch = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice search is not supported by your current browser. Please type to search.');
      return;
    }
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.interimResults = false;
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setSearchQuery(transcript);
        }
      };
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const isCurrent = (path: string) => {
    if (path === '/') return location.pathname === '/' && !location.hash;
    if (path.startsWith('/#')) return location.hash === path.substring(1);
    return location.pathname.startsWith(path);
  };

  const primaryNavLinks = [
    { label: 'Home', href: '/' },
    { label: 'Product Categories', href: '/#categories' },
    { label: 'Bulk Purchase', href: '/publishing/traditional-publishing' },
    { label: 'About Us', href: '/about' },
  ];

  const legalLinks = [
    { label: 'Return & Replacement', href: '/terms', icon: RotateCcw },
    { label: 'Contact Us', href: '/contact', icon: Phone },
    { label: 'Terms & Conditions', href: '/terms', icon: FileText },
    { label: 'Privacy Policy', href: '/privacy', icon: ShieldCheck },
  ];

  const isLegalActive = legalLinks.some((l) => isCurrent(l.href));

  return (
    <>
      <div className={`medhankar-navbar-wrapper ${isScrolled ? 'is-scrolled' : ''}`}>
        <header className={`medhankar-navbar-root ${isScrolled ? 'is-scrolled' : ''}`}>
          <div className="medhankar-navbar-inner">
            {/* Left: Official Medhankar Publication Brand Logo */}
            <Link
              to="/"
              className="medhankar-brand-anchor"
              aria-label="Medhankar Publication Home"
            >
              <img
                src="/medhankar-logo.png"
                alt="Medhankar Publication"
                className="medhankar-brand-img"
                loading="eager"
              />
            </Link>

            {/* Center: Desktop Navigation with Clean Primary Links + Legal Pages Dropdown */}
            <nav aria-label="Primary Navigation" className="medhankar-nav-center">
              {primaryNavLinks.map((item) => {
                const active = isCurrent(item.href);
                return item.href.startsWith('/#') ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`medhankar-nav-item ${active ? 'is-active' : ''}`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="medhankar-nav-active-bar" />}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`medhankar-nav-item ${active ? 'is-active' : ''}`}
                  >
                    <span>{item.label}</span>
                    {active && <span className="medhankar-nav-active-bar" />}
                  </Link>
                );
              })}

              {/* Desktop "Legal Pages" Dropdown Option */}
              <div
                className="medhankar-dropdown-container"
                ref={dropdownRef}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  type="button"
                  className={`medhankar-nav-item medhankar-dropdown-trigger ${isLegalActive || dropdownOpen ? 'is-active' : ''}`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <span>Legal Pages</span>
                  <ChevronDown
                    size={14}
                    className={`medhankar-chevron-icon ${dropdownOpen ? 'is-rotated' : ''}`}
                  />
                  {isLegalActive && <span className="medhankar-nav-active-bar" />}
                </button>

                {dropdownOpen && (
                  <div className="medhankar-dropdown-menu" role="menu">
                    <div className="medhankar-dropdown-header">
                      <span>Customer Support &amp; Legal Policies</span>
                    </div>
                    {legalLinks.map((subItem) => {
                      const Icon = subItem.icon;
                      const active = isCurrent(subItem.href);
                      return (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          className={`medhankar-dropdown-row ${active ? 'is-active' : ''}`}
                          role="menuitem"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <div className="medhankar-dropdown-icon-disc">
                            <Icon size={14} />
                          </div>
                          <span>{subItem.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>

            {/* Right Side Actions matching Reference Screenshots */}
            <div className="medhankar-nav-right">
              {/* 1. Search Icon (Desktop & Mobile) */}
              <button
                type="button"
                onClick={() => setIsSearchModalOpen(true)}
                aria-label="Search Catalogue"
                title="Search Catalogue"
                className="medhankar-nav-icon-btn"
              >
                <Search size={20} strokeWidth={2.0} />
              </button>

              {/* 2. Desktop-only Save / Bookmark */}
              <Link
                to="/library"
                aria-label="Saved Books"
                title="Saved Books"
                className="medhankar-nav-icon-btn medhankar-pc-only"
              >
                <Bookmark size={20} strokeWidth={2.0} />
                {savedCount > 0 && (
                  <span className="medhankar-bookmark-count-badge">{savedCount}</span>
                )}
              </Link>

              {/* 3. Desktop-only Profile / Account Icon */}
              <Link
                to={user ? '/library' : '/auth'}
                aria-label={user ? 'My Account' : 'Sign In'}
                title={user ? 'My Account' : 'Sign In'}
                className="medhankar-nav-icon-btn medhankar-pc-only"
              >
                <IosUserIcon size={21} strokeWidth={1.9} color="#0B216B" />
              </Link>

              {/* 4. Cart Icon (Desktop & Mobile with Solid Blue Circular Badge) */}
              <Link
                to="/cart"
                aria-label="Shopping Cart"
                title="Shopping Cart"
                className="medhankar-nav-icon-btn"
                id="header-cart-btn"
              >
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <ShoppingCart size={21} strokeWidth={1.9} />
                  {cartCount > 0 && (
                    <span className="medhankar-cart-badge">{cartCount}</span>
                  )}
                </div>
              </Link>

              {/* 5. Mobile Hamburger Menu Icon (Mobile Only) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="medhankar-nav-icon-btn medhankar-mobile-only"
                aria-label="Open Navigation Menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu size={22} strokeWidth={2.0} />
              </button>
            </div>
          </div>
        </header>
      </div>


      {/* =====================================================================
          AMAZON / FLIPKART STYLE INTERACTIVE LIVE SEARCH SCREEN
          Smooth animation, suggested keywords, real-time catalogue match
          ===================================================================== */}
      {isSearchModalOpen && (
        <div
          className="medhankar-search-screen-root"
          role="dialog"
          aria-modal="true"
          aria-label="Search Catalogue"
        >
          {/* Top Search App Bar */}
          <div className="medhankar-search-screen-header">
            <button
              type="button"
              onClick={() => setIsSearchModalOpen(false)}
              className="medhankar-search-back-btn"
              aria-label="Close search"
            >
              <ArrowLeft size={22} strokeWidth={2.2} />
            </button>

            <div className="medhankar-search-input-capsule">
              <Search size={18} className="medhankar-search-capsule-icon" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books, authors, genres..."
                className="medhankar-search-capsule-field"
                aria-label="Search query"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="medhankar-search-clear-btn"
                  aria-label="Clear query"
                >
                  <X size={16} />
                </button>
              )}
              <button
                type="button"
                onClick={handleVoiceSearch}
                className={`medhankar-search-mic-btn ${isListening ? 'is-listening' : ''}`}
                aria-label="Voice Search"
                title={isListening ? 'Listening...' : 'Voice Search'}
              >
                <Mic size={18} strokeWidth={2.0} />
              </button>
            </div>
          </div>

          {/* Search Body Content */}
          <div className="medhankar-search-screen-body">
            {/* 1. When searchQuery is empty: Show Trending Keywords & Fast Categories */}
            {!cleanQuery && (
              <div className="medhankar-search-discovery-stack">
                {/* Trending / Suggested Keywords */}
                <div className="medhankar-search-section">
                  <div className="medhankar-search-section-title">
                    <TrendingUp size={16} />
                    <span>Suggested Searches</span>
                  </div>
                  <div className="medhankar-search-chips-grid">
                    {suggestedKeywords.map((kw) => (
                      <button
                        key={kw}
                        type="button"
                        onClick={() => setSearchQuery(kw)}
                        className="medhankar-search-chip"
                      >
                        <Search size={12} color="#94A3B8" />
                        <span>{kw}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Categories */}
                <div className="medhankar-search-section">
                  <div className="medhankar-search-section-title">
                    <BookOpen size={16} />
                    <span>Browse By Category</span>
                  </div>
                  <div className="medhankar-search-categories-grid">
                    {[
                      { name: 'Philosophy & Thought', count: '2 Titles' },
                      { name: 'Literature & Fiction', count: '1 Title' },
                      { name: 'Business & Leadership', count: '1 Title' },
                      { name: 'Essays & Commentary', count: '1 Title' },
                    ].map((cat) => (
                      <button
                        key={cat.name}
                        type="button"
                        onClick={() => setSearchQuery(cat.name)}
                        className="medhankar-search-cat-card"
                      >
                        <span className="medhankar-search-cat-name">{cat.name}</span>
                        <span className="medhankar-search-cat-count">{cat.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct Help / WhatsApp Chat Support */}
                <div className="medhankar-search-help-card">
                  <div className="medhankar-search-help-text">
                    <strong>Looking for a specific publication or title?</strong>
                    <p>Our editorial &amp; catalogue desk is ready to help you find or publish it.</p>
                  </div>
                  <Link
                    to="/contact"
                    onClick={() => setIsSearchModalOpen(false)}
                    className="medhankar-search-help-btn"
                  >
                    <MessageSquare size={14} />
                    <span>Ask Desk</span>
                  </Link>
                </div>
              </div>
            )}

            {/* 2. When searchQuery has text: Show Real-Time Live Results or Empty State */}
            {cleanQuery && (
              <div className="medhankar-search-results-stack">
                {searchResults.length > 0 ? (
                  <>
                    <div className="medhankar-search-results-count">
                      <span>Found {searchResults.length} book{searchResults.length > 1 ? 's' : ''} in catalogue</span>
                    </div>

                    <div className="medhankar-search-results-list">
                      {searchResults.map((book) => (
                        <div
                          key={book.id}
                          onClick={() => {
                            setIsSearchModalOpen(false);
                          }}
                          className="medhankar-search-result-card"
                          role="button"
                          tabIndex={0}
                        >
                          {/* Book Cover Thumbnail */}
                          <div className="medhankar-search-thumb-box">
                            <img
                              src={book.coverImageUrl}
                              alt={book.title}
                              className="medhankar-search-thumb-img"
                              onError={(e) => {
                                (e.currentTarget as HTMLElement).style.display = 'none';
                              }}
                            />
                            <div className="medhankar-search-thumb-fallback">
                              <span>{book.title.slice(0, 1)}</span>
                            </div>
                          </div>

                          {/* Book Details */}
                          <div className="medhankar-search-card-info">
                            <h4 className="medhankar-search-card-title">{book.title}</h4>
                            {book.subtitle && (
                              <p className="medhankar-search-card-subtitle">{book.subtitle}</p>
                            )}
                            <p className="medhankar-search-card-author">by {book.author.name}</p>

                            <div className="medhankar-search-card-meta">
                              <span className="medhankar-search-genre-tag">{book.genre}</span>
                              <span className="medhankar-search-price-tag">
                                from {book.samplePrice?.paperback || '₹399.00'}
                              </span>
                            </div>
                          </div>

                          <ChevronRight size={18} className="medhankar-search-card-arrow" />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="medhankar-search-empty-state">
                    <div className="medhankar-search-empty-icon">
                      <Search size={36} strokeWidth={1.8} />
                    </div>
                    <h3 className="medhankar-search-empty-title">
                      No books found for &ldquo;{searchQuery}&rdquo;
                    </h3>
                    <p className="medhankar-search-empty-sub">
                      We couldn&apos;t find any matches in our catalogue. Try checking the spelling, or search by genre or author.
                    </p>

                    <div className="medhankar-search-empty-suggestions">
                      <p className="medhankar-empty-suggestions-label">Try searching for:</p>
                      <div className="medhankar-search-chips-grid" style={{ justifyContent: 'center' }}>
                        {['Architecture of Ideas', 'Meera Sen', 'Philosophy & Thought', 'Vikram Joshi'].map((kw) => (
                          <button
                            key={kw}
                            type="button"
                            onClick={() => setSearchQuery(kw)}
                            className="medhankar-search-chip"
                          >
                            <span>{kw}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          Mobile iOS Full-Screen Slider Drawer (Matching user's Image 1)
          Search Bar has been REMOVED as requested! Opens directly with list.
          ===================================================================== */}
      {mobileMenuOpen && (
        <div
          className="medhankar-drawer-fullscreen-root"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
        >
          {/* Top Bar with Brand Logo and Close Button */}
          <div className="medhankar-drawer-topbar">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="medhankar-drawer-brand"
              aria-label="Medhankar Publication Home"
            >
              <img
                src="/medhankar-logo.png"
                alt="Medhankar Publication"
                className="medhankar-drawer-brand-img"
              />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="medhankar-drawer-close-btn"
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={2.2} />
            </button>
          </div>

          {/* iOS Table View Menu List (Divided rows matching Image 1) */}
          <nav className="medhankar-drawer-nav-list" aria-label="Mobile Navigation List">
            <a
              href="/#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="medhankar-drawer-table-row"
            >
              <span>Categories</span>
              <ChevronRight size={18} className="medhankar-drawer-chevron" />
            </a>

            <a
              href="/#releases"
              onClick={() => setMobileMenuOpen(false)}
              className="medhankar-drawer-table-row"
            >
              <span>New Releases</span>
            </a>

            <a
              href="/#releases"
              onClick={() => setMobileMenuOpen(false)}
              className="medhankar-drawer-table-row"
            >
              <span>Bestsellers</span>
            </a>

            <a
              href="/#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="medhankar-drawer-table-row"
            >
              <span>Series</span>
            </a>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="medhankar-drawer-table-row"
            >
              <span>About us</span>
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="medhankar-drawer-table-row"
            >
              <span>Contact us</span>
            </Link>

            <Link
              to="/publishing/traditional-publishing"
              onClick={() => setMobileMenuOpen(false)}
              className="medhankar-drawer-table-row"
            >
              <span>Publish with us</span>
            </Link>

            {/* Saved Books & Cart items */}
            <Link
              to="/library"
              onClick={() => setMobileMenuOpen(false)}
              className="medhankar-drawer-table-row"
            >
              <span>Saved Books</span>
              {savedCount > 0 && <span className="medhankar-drawer-count-badge">{savedCount}</span>}
            </Link>

            <Link
              to="/library"
              onClick={() => setMobileMenuOpen(false)}
              className="medhankar-drawer-table-row"
            >
              <span>My Cart</span>
              {savedCount > 0 && <span className="medhankar-drawer-count-badge">{savedCount}</span>}
            </Link>

            {/* Legal Pages Accordion */}
            <div className="medhankar-drawer-accordion-group">
              <button
                type="button"
                className="medhankar-drawer-table-row medhankar-drawer-accordion-trigger"
                onClick={() => setMobileLegalOpen(!mobileLegalOpen)}
                aria-expanded={mobileLegalOpen}
              >
                <span>Legal &amp; Support Pages</span>
                <ChevronDown
                  size={18}
                  className={`medhankar-drawer-chevron ${mobileLegalOpen ? 'is-rotated' : ''}`}
                />
              </button>

              {mobileLegalOpen && (
                <div className="medhankar-drawer-accordion-content">
                  {legalLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="medhankar-drawer-accordion-row"
                      >
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Drawer Bottom Actions: "Let's Chat" button (matching Image 1) + Account Status */}
          <div className="medhankar-drawer-footer">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="medhankar-lets-chat-btn"
            >
              <MessageSquare size={16} strokeWidth={2.2} />
              <span>Let's Chat</span>
            </Link>

            {/* User Account / Sign In row */}
            <div className="medhankar-drawer-auth-row">
              <Link
                to={user ? '/library' : '/auth'}
                onClick={() => setMobileMenuOpen(false)}
                className="medhankar-drawer-auth-link"
              >
                <IosUserIcon size={19} strokeWidth={1.9} color="#1E293B" />
                <span>{user ? (user.phone || 'My Account') : 'Sign In / Register'}</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Scoped CSS for iOS Top App Bar & Full-Screen Slider Drawer */}
      <style>{`
        .medhankar-navbar-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          width: 100%;
          padding: 10px clamp(12px, 3.5vw, 40px) 0;
          box-sizing: border-box;
          pointer-events: none;
          transition: padding 0.32s cubic-bezier(0.16, 1, 0.3, 1),
                      top 0.32s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* When Scrolled: "upar sata hona chahiye" - attaches flush to top edge with 0 gap */
        .medhankar-navbar-wrapper.is-scrolled {
          top: 0;
          padding: 0;
        }

        .medhankar-navbar-root {
          pointer-events: auto;
          width: 100%;
          max-width: 1380px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 9999px;
          box-shadow: 0 6px 26px rgba(11, 33, 107, 0.05), 0 1px 3px rgba(11, 33, 107, 0.03);
          box-sizing: border-box;
          transition: max-width 0.32s cubic-bezier(0.16, 1, 0.3, 1),
                      border-radius 0.32s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.3s ease,
                      backdrop-filter 0.3s ease,
                      -webkit-backdrop-filter 0.3s ease,
                      box-shadow 0.3s ease,
                      border-color 0.3s ease;
        }

        /* Scrolled Top Bar: Full-width attached to the top, sleek bottom border & shadow */
        .medhankar-navbar-wrapper.is-scrolled .medhankar-navbar-root {
          max-width: 100%;
          width: 100%;
          border-radius: 0;
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: 1px solid rgba(226, 232, 240, 0.88);
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(28px) saturate(200%);
          -webkit-backdrop-filter: blur(28px) saturate(200%);
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.03);
        }

        .medhankar-navbar-inner {
          width: 100%;
          max-width: 100%;
          padding: 0 clamp(16px, 2.5vw, 32px);
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
          gap: 16px;
          transition: height 0.32s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .medhankar-navbar-wrapper.is-scrolled .medhankar-navbar-inner {
          height: 56px;
          max-width: 1380px;
          margin: 0 auto;
        }

        /* Brand Logo */
        .medhankar-brand-anchor {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          flex-shrink: 0;
          outline: none;
        }

        .medhankar-brand-img {
          display: block;
          height: 38px;
          width: auto;
          max-width: 220px;
          object-fit: contain;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .medhankar-brand-anchor:hover .medhankar-brand-img {
          transform: scale(1.02);
        }

        /* Center Nav Links */
        .medhankar-nav-center {
          display: none;
          align-items: center;
          gap: clamp(12px, 1.6vw, 24px);
          margin: 0 auto;
          flex-shrink: 1;
        }

        .medhankar-nav-item {
          position: relative;
          font-size: clamp(0.8125rem, 0.88vw, 0.875rem);
          font-weight: 500;
          color: #475569;
          padding: 8px 8px;
          text-decoration: none;
          white-space: nowrap;
          border-radius: 8px;
          transition: color 0.15s ease, background-color 0.15s ease;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
        }

        .medhankar-nav-item:hover {
          color: #142D52;
          background-color: rgba(241, 245, 249, 0.7);
        }

        .medhankar-nav-item.is-active {
          color: #142D52;
          font-weight: 700;
        }

        .medhankar-nav-active-bar {
          position: absolute;
          bottom: 0px;
          left: 8px;
          right: 8px;
          height: 2.5px;
          background: #142D52;
          border-radius: 9999px;
        }

        /* Dropdown Component */
        .medhankar-dropdown-container {
          position: relative;
          display: inline-block;
        }

        .medhankar-dropdown-trigger {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .medhankar-chevron-icon {
          color: #64748B;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .medhankar-chevron-icon.is-rotated {
          transform: rotate(180deg);
          color: #142D52;
        }

        .medhankar-dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(226, 232, 240, 0.95);
          border-radius: 14px;
          box-shadow: 0 16px 36px rgba(15, 23, 42, 0.12), 0 2px 6px rgba(15, 23, 42, 0.04);
          padding: 8px;
          min-width: 220px;
          z-index: 600;
          animation: dropdownFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .medhankar-dropdown-header {
          padding: 6px 12px 8px;
          font-size: 0.6875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #94A3B8;
          border-bottom: 1px solid #F1F5F9;
          margin-bottom: 4px;
        }

        .medhankar-dropdown-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: 9px;
          font-size: 0.84rem;
          font-weight: 500;
          color: #334155;
          text-decoration: none;
          transition: background-color 0.15s ease, color 0.15s ease;
        }

        .medhankar-dropdown-row:hover,
        .medhankar-dropdown-row.is-active {
          background-color: #F8FAFD;
          color: #2457C5;
        }

        .medhankar-dropdown-icon-disc {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #F1F5F9;
          color: #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .medhankar-dropdown-row:hover .medhankar-dropdown-icon-disc {
          background: #EEF4FF;
          color: #2457C5;
        }

        @keyframes dropdownFadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        /* Right Side: Clean Outline Icons (NO blue background disc) */
        .medhankar-nav-right {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
          margin-left: auto;
        }

        /* Standalone Icon Buttons */
        .medhankar-nav-icon-btn {
          width: 40px;
          height: 40px;
          aspect-ratio: 1 / 1;
          flex-shrink: 0;
          border-radius: 50%;
          color: #1E293B;
          background: transparent;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          border: none;
          cursor: pointer;
          padding: 0;
          margin: 0;
          box-sizing: border-box;
          position: relative;
          transition: background-color 0.15s ease, color 0.15s ease, transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .medhankar-nav-icon-btn svg {
          display: block;
          margin: auto;
          pointer-events: none;
        }

        .medhankar-nav-icon-btn:hover {
          background-color: rgba(241, 245, 249, 0.9);
          color: #0F172A;
          transform: scale(1.05);
        }

        .medhankar-nav-icon-btn:active {
          transform: scale(0.92);
        }

        /* Bookmark / Wishlist Count Badge */
        .medhankar-bookmark-count-badge {
          position: absolute;
          top: 3px;
          right: 3px;
          background: #DC2626;
          color: #FFFFFF;
          font-size: 0.625rem;
          font-weight: 800;
          min-width: 16px;
          height: 16px;
          padding: 0 3px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(220, 38, 38, 0.4);
          line-height: 1;
          box-sizing: border-box;
        }

        /* Cart Badge (Deep Navy Blue Solid Circle with White Number from Screenshots) */
        .medhankar-cart-badge {
          position: absolute;
          top: -6px;
          right: -8px;
          background: #0B216B;
          color: #FFFFFF;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          font-size: 0.65rem;
          font-weight: 800;
          min-width: 17px;
          height: 17px;
          padding: 0 4px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(11, 33, 107, 0.35);
          line-height: 1;
          box-sizing: border-box;
        }

        /* =====================================================================
           Row 2: Mobile iOS Search Capsule Pill (Smoothly DISSOLVES on Scroll)
           ===================================================================== */
        .medhankar-mobile-search-row {
          display: none;
          padding: 0 16px 12px 16px;
          width: 100%;
          box-sizing: border-box;
          max-height: 52px;
          opacity: 1;
          transform: translateY(0);
          overflow: hidden;
          transition: max-height 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.22s ease,
                      padding 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* When page is scrolled down: Dissolve completely so only Top Bar stays */
        .medhankar-navbar-root.is-scrolled .medhankar-mobile-search-row {
          max-height: 0;
          opacity: 0;
          padding-top: 0;
          padding-bottom: 0;
          margin-top: 0;
          transform: translateY(-8px);
          pointer-events: none;
        }

        .medhankar-mobile-search-pill {
          width: 100%;
          height: 38px;
          background: #ECEEF1;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          padding: 0 14px;
          gap: 10px;
          border: 1px solid rgba(0, 0, 0, 0.04);
          box-sizing: border-box;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          transition: background-color 0.15s ease, box-shadow 0.15s ease;
        }

        .medhankar-mobile-search-pill:hover,
        .medhankar-mobile-search-pill:active {
          background: #E2E5E9;
        }

        .medhankar-search-pill-icon {
          color: #64748B;
          flex-shrink: 0;
        }

        .medhankar-search-pill-placeholder {
          flex: 1;
          font-size: 0.86rem;
          color: #718096;
          font-weight: 400;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .medhankar-search-pill-mic {
          background: none;
          border: none;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1E293B;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 0.15s ease;
        }

        .medhankar-search-pill-mic:active {
          transform: scale(0.9);
        }

        /* =====================================================================
           AMAZON / FLIPKART STYLE INTERACTIVE FULL SCREEN SEARCH MODAL
           ===================================================================== */
        .medhankar-search-screen-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          background: #FFFFFF;
          z-index: 1000000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: searchFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes searchFadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .medhankar-search-screen-header {
          height: 60px;
          min-height: 60px;
          padding: 0 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid #ECECEC;
          background: #FFFFFF;
          box-sizing: border-box;
          flex-shrink: 0;
        }

        .medhankar-search-back-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: transparent;
          border: none;
          color: #1E293B;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: background-color 0.15s ease;
        }

        .medhankar-search-back-btn:hover {
          background-color: #F1F5F9;
        }

        .medhankar-search-input-capsule {
          flex: 1;
          height: 42px;
          background: #F1F3F5;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          padding: 0 14px;
          gap: 8px;
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-sizing: border-box;
        }

        .medhankar-search-capsule-icon {
          color: #64748B;
          flex-shrink: 0;
        }

        .medhankar-search-capsule-field {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-size: 0.92rem;
          color: #0F172A;
          font-family: inherit;
          min-width: 0;
        }

        .medhankar-search-capsule-field::placeholder {
          color: #94A3B8;
        }

        .medhankar-search-clear-btn {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #CBD5E1;
          color: #334155;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          padding: 0;
        }

        .medhankar-search-mic-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: transparent;
          border: none;
          color: #1E293B;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: color 0.15s ease, transform 0.15s ease;
        }

        .medhankar-search-mic-btn.is-listening {
          color: #DC2626;
          animation: pulseListening 1.2s infinite;
        }

        @keyframes pulseListening {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        .medhankar-search-screen-body {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          padding: 16px;
        }

        .medhankar-search-discovery-stack {
          display: flex;
          flex-direction: column;
          gap: 22px;
          max-width: 720px;
          margin: 0 auto;
        }

        .medhankar-search-section-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748B;
          margin-bottom: 10px;
        }

        .medhankar-search-chips-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .medhankar-search-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 9999px;
          font-size: 0.84rem;
          font-weight: 500;
          color: #334155;
          cursor: pointer;
          transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
        }

        .medhankar-search-chip:hover,
        .medhankar-search-chip:active {
          background: #EFF6FF;
          border-color: #BFDBFE;
          color: #1D4ED8;
          transform: translateY(-1px);
        }

        .medhankar-search-categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 10px;
        }

        .medhankar-search-cat-card {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          cursor: pointer;
          text-align: left;
          transition: background-color 0.15s ease, border-color 0.15s ease;
        }

        .medhankar-search-cat-card:hover,
        .medhankar-search-cat-card:active {
          background: #EEF4FF;
          border-color: #93C5FD;
        }

        .medhankar-search-cat-name {
          font-size: 0.86rem;
          font-weight: 700;
          color: #1E293B;
          line-height: 1.25;
        }

        .medhankar-search-cat-count {
          font-size: 0.72rem;
          color: #64748B;
          margin-top: 4px;
        }

        .medhankar-search-help-card {
          background: linear-gradient(135deg, #F8FAFC 0%, #EEF2F6 100%);
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-top: 4px;
        }

        .medhankar-search-help-text strong {
          display: block;
          font-size: 0.88rem;
          color: #0F172A;
        }

        .medhankar-search-help-text p {
          font-size: 0.78rem;
          color: #64748B;
          margin: 2px 0 0;
        }

        .medhankar-search-help-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #142D52;
          color: #FFFFFF;
          padding: 8px 14px;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          flex-shrink: 0;
          transition: background-color 0.15s ease;
        }

        .medhankar-search-help-btn:hover {
          background: #1E40AF;
        }

        /* Search Results List */
        .medhankar-search-results-stack {
          max-width: 720px;
          margin: 0 auto;
        }

        .medhankar-search-results-count {
          font-size: 0.82rem;
          font-weight: 600;
          color: #64748B;
          margin-bottom: 12px;
          padding-left: 2px;
        }

        .medhankar-search-results-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .medhankar-search-result-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          cursor: pointer;
          transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
        }

        .medhankar-search-result-card:hover,
        .medhankar-search-result-card:active {
          border-color: #93C5FD;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.08);
          transform: translateY(-1px);
        }

        .medhankar-search-thumb-box {
          width: 58px;
          height: 84px;
          border-radius: 6px;
          overflow: hidden;
          background: #142D52;
          flex-shrink: 0;
          position: relative;
          box-shadow: 0 3px 8px rgba(15, 23, 42, 0.15);
        }

        .medhankar-search-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .medhankar-search-thumb-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 1.2rem;
          background: #142D52;
        }

        .medhankar-search-card-info {
          flex: 1;
          min-width: 0;
        }

        .medhankar-search-card-title {
          font-size: 0.94rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .medhankar-search-card-subtitle {
          font-size: 0.76rem;
          color: #64748B;
          margin: 2px 0 0;
          line-height: 1.3;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .medhankar-search-card-author {
          font-size: 0.8rem;
          color: #334155;
          font-weight: 500;
          margin: 4px 0 0;
        }

        .medhankar-search-card-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 6px;
        }

        .medhankar-search-genre-tag {
          font-size: 0.7rem;
          font-weight: 600;
          background: #EFF6FF;
          color: #2563EB;
          padding: 2px 7px;
          border-radius: 6px;
        }

        .medhankar-search-price-tag {
          font-size: 0.84rem;
          font-weight: 700;
          color: #059669;
        }

        .medhankar-search-card-arrow {
          color: #CBD5E1;
          flex-shrink: 0;
        }

        /* Empty Search State */
        .medhankar-search-empty-state {
          padding: 40px 16px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .medhankar-search-empty-icon {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: #F1F5F9;
          color: #94A3B8;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .medhankar-search-empty-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0;
        }

        .medhankar-search-empty-sub {
          font-size: 0.85rem;
          color: #64748B;
          max-width: 380px;
          margin: 8px auto 20px;
          line-height: 1.45;
        }

        .medhankar-search-empty-suggestions {
          width: 100%;
          max-width: 440px;
        }

        .medhankar-empty-suggestions-label {
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #94A3B8;
          margin-bottom: 8px;
        }

        /* =====================================================================
           Mobile iOS Full-Screen Slider Drawer (Matching user's Image 1)
           ===================================================================== */
        .medhankar-drawer-fullscreen-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          background: #FFFFFF;
          z-index: 999999;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          animation: drawerSlideInRight 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes drawerSlideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        /* Top Bar of Drawer */
        .medhankar-drawer-topbar {
          height: 56px;
          min-height: 56px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #ECECEC;
          background: #FFFFFF;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .medhankar-drawer-brand {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
        }

        .medhankar-drawer-brand-img {
          height: 30px;
          width: auto;
          max-width: 150px;
          object-fit: contain;
        }

        .medhankar-drawer-close-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: transparent;
          color: #1E293B;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background-color 0.15s ease, transform 0.15s ease;
        }

        .medhankar-drawer-close-btn:hover {
          background-color: #F1F5F9;
        }

        .medhankar-drawer-close-btn:active {
          transform: scale(0.92);
        }

        /* iOS Table View Menu List (Divided rows matching Image 1) */
        .medhankar-drawer-nav-list {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .medhankar-drawer-table-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 20px;
          border-bottom: 1px solid #ECECEC;
          color: #1E293B;
          font-size: 0.95rem;
          font-weight: 500;
          text-decoration: none;
          background: #FFFFFF;
          transition: background-color 0.12s ease;
        }

        .medhankar-drawer-table-row:active {
          background-color: #F8FAFC;
        }

        .medhankar-drawer-chevron {
          color: #94A3B8;
          flex-shrink: 0;
          transition: transform 0.18s ease;
        }

        .medhankar-drawer-chevron.is-rotated {
          transform: rotate(180deg);
          color: #1E293B;
        }

        .medhankar-drawer-count-badge {
          background: #DC2626;
          color: #FFFFFF;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 9999px;
        }

        /* Accordion in Drawer */
        .medhankar-drawer-accordion-group {
          display: flex;
          flex-direction: column;
        }

        .medhankar-drawer-accordion-trigger {
          cursor: pointer;
          width: 100%;
          border: none;
          border-bottom: 1px solid #ECECEC;
          font-family: inherit;
        }

        .medhankar-drawer-accordion-content {
          background: #F8FAFC;
          display: flex;
          flex-direction: column;
        }

        .medhankar-drawer-accordion-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          border-bottom: 1px solid #F1F5F9;
          color: #475569;
          font-size: 0.88rem;
          font-weight: 500;
          text-decoration: none;
          transition: background-color 0.12s ease;
        }

        .medhankar-drawer-accordion-row:hover,
        .medhankar-drawer-accordion-row:active {
          background-color: #EEF2F6;
          color: #1E293B;
        }

        /* Drawer Bottom Actions: Let's Chat Button (matching Image 1) + Account Status */
        .medhankar-drawer-footer {
          padding: 24px 20px 40px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: auto;
        }

        .medhankar-lets-chat-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          align-self: flex-start;
          background: #262626;
          color: #FFFFFF;
          padding: 10px 18px;
          border-radius: 9999px;
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: background-color 0.15s ease, transform 0.15s ease;
        }

        .medhankar-lets-chat-btn:hover {
          background: #000000;
          transform: translateY(-1px);
        }

        .medhankar-lets-chat-btn:active {
          transform: scale(0.96);
        }

        .medhankar-drawer-auth-row {
          padding-top: 12px;
          border-top: 1px solid #ECECEC;
        }

        .medhankar-drawer-auth-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #1E293B;
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          padding: 4px 0;
        }

        /* =====================================================================
           Responsive Breakpoints
           ===================================================================== */
        /* PC View (>= 992px): Logo + Center Nav Links + Right Icons (Search, Save, Profile, Cart) */
        @media (min-width: 992px) {
          .medhankar-nav-center { display: flex !important; }
          .medhankar-pc-only { display: inline-flex !important; }
          .medhankar-mobile-only { display: none !important; }
        }

        /* Mobile View (< 992px): Compact floating pill with Logo + Right Icons (Search, Cart, Menu) */
        @media (max-width: 991px) {
          .medhankar-navbar-wrapper {
            top: 8px;
            padding: 0 12px;
          }
          .medhankar-navbar-root {
            border-radius: 9999px;
            background: rgba(255, 255, 255, 0.86);
            box-shadow: 0 6px 20px rgba(11, 33, 107, 0.07);
          }
          .medhankar-nav-center { display: none !important; }
          .medhankar-pc-only { display: none !important; }
          .medhankar-mobile-only { display: inline-flex !important; }
          .medhankar-navbar-inner {
            height: 52px;
            padding: 0 14px;
          }
          .medhankar-brand-img {
            height: 28px;
            max-width: 145px;
          }
        }
      `}</style>
    </>
  );
};
