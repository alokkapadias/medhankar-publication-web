// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Book Details & Purchasing Experience (/books/:slug)
// Matches Reference Screenshot: Editorial 3-Column Desktop + Native Mobile Layout
// ==============================================================================

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Bookmark,
  Share2,
  Check,
  ChevronDown,
  ChevronUp,
  Globe,
  FileText,
  Layers,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { SampleReaderModal } from '../components/common/SampleReaderModal';
import { BookCard } from '../components/library/BookCard';
import { getBookBySlug, DEMO_BOOKS } from '../data/demoBooks';
import { useSavedBooks } from '../context/SavedBooksContext';
import { useCart } from '../context/CartContext';
import { getAvailableEditions, formatPrice, isDigitalFormat } from '../utils/pricing';
import type { BookFormat } from '../types';
import type { CoverFinish } from '../types/cart';

export const BookDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isBookSaved, toggleSaveBook } = useSavedBooks();
  const { addToCart, setBuyNowItem } = useCart();

  const [isReaderOpen, setIsReaderOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [selectedFormat, setSelectedFormat] = useState<BookFormat>('hardcover');
  const [coverFinish, setCoverFinish] = useState<CoverFinish>('matte');
  const [dedication, setDedication] = useState<string>('');
  const [isPersonaliseOpen, setIsPersonaliseOpen] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'about' | 'author' | 'shipping'>('about');

  const book = slug ? getBookBySlug(slug) : undefined;

  if (!book) {
    return (
      <div className="medhankar-book-not-found-page">
        <Navbar />
        <main className="container" style={{ flex: 1, padding: '100px 24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', color: '#0F172A', marginBottom: '16px' }}>
            Book Not Found
          </h1>
          <p style={{ color: '#64748B', marginBottom: '28px' }}>
            The requested title does not exist in our publication catalogue.
          </p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Return to Catalogue</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const saved = isBookSaved(book.id);
  const editions = getAvailableEditions(book);
  const currentEdition = editions.find((e) => e.format === selectedFormat) || editions[0];
  const unitPrice = currentEdition ? currentEdition.price : 450;
  const totalPrice = unitPrice * quantity;
  const isDigital = isDigitalFormat(selectedFormat);

  // Suggested / related books in the same genre
  const relatedBooks = DEMO_BOOKS.filter((b) => b.id !== book.id && b.genre === book.genre).slice(0, 3);
  const fallbackRelated = relatedBooks.length > 0 ? relatedBooks : DEMO_BOOKS.filter((b) => b.id !== book.id).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddToCart = () => {
    addToCart(
      {
        bookId: book.id,
        slug: book.slug,
        title: book.title,
        subtitle: book.subtitle,
        authorName: book.author.name,
        coverImageUrl: book.coverImageUrl || '/covers/architecture.jpg',
        format: selectedFormat,
        formatLabel: currentEdition.label,
        coverFinish: isDigital ? undefined : coverFinish,
        dedication: dedication.trim() ? dedication.trim() : undefined,
        unitPrice,
        quantity,
        isDigital,
      },
      quantity
    );
  };

  const handleBuyNow = () => {
    const buyNowPayload = {
      id: `buynow-${book.id}-${selectedFormat}`,
      bookId: book.id,
      slug: book.slug,
      title: book.title,
      subtitle: book.subtitle,
      authorName: book.author.name,
      coverImageUrl: book.coverImageUrl || '/covers/architecture.jpg',
      format: selectedFormat,
      formatLabel: currentEdition.label,
      coverFinish: isDigital ? undefined : coverFinish,
      dedication: dedication.trim() ? dedication.trim() : undefined,
      unitPrice,
      quantity,
      lineTotal: totalPrice,
      isDigital,
    };
    setBuyNowItem(buyNowPayload);
    navigate(`/checkout?bookId=${encodeURIComponent(book.id)}&format=${encodeURIComponent(selectedFormat)}`);
  };

  return (
    <div className="medhankar-book-detail-root">
      <Navbar />

      <main className="medhankar-book-detail-main">
        <div className="medhankar-book-container">
          {/* Top Breadcrumbs & Back Navigation */}
          <nav aria-label="Breadcrumb" className="medhankar-breadcrumb-bar">
            <div className="medhankar-breadcrumb-trail">
              <Link to="/" className="breadcrumb-link">Books</Link>
              <span className="breadcrumb-separator">&rsaquo;</span>
              <span className="breadcrumb-link">{book.genre.split('&')[0].trim()}</span>
              <span className="breadcrumb-separator">&rsaquo;</span>
              <span className="breadcrumb-current" aria-current="page">{book.title}</span>
            </div>

            <div className="medhankar-breadcrumb-actions">
              <button
                type="button"
                onClick={() => toggleSaveBook(book.id)}
                className={`breadcrumb-icon-btn ${saved ? 'is-saved' : ''}`}
                title={saved ? 'Bookmarked' : 'Bookmark book'}
                aria-label={saved ? 'Remove bookmark' : 'Bookmark book'}
              >
                <Bookmark size={16} fill={saved ? '#2563EB' : 'none'} color={saved ? '#2563EB' : '#64748B'} />
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="breadcrumb-icon-btn"
                title="Share this book"
                aria-label="Share book link"
              >
                {copiedLink ? <Check size={16} color="#059669" /> : <Share2 size={16} color="#64748B Freeman" />}
              </button>
            </div>
          </nav>

          {/* ================================================================
              3-COLUMN EDITORIAL DESKTOP LAYOUT (MATCHING REFERENCE EXACTLY)
              Column 1: Book Gallery & Cover Preview
              Column 2: Book Title, Metadata & Description
              Column 3: Choose your edition & Purchase Customization Panel
              ================================================================ */}
          <div className="medhankar-book-layout-grid">
            {/* ------------------------------------------------------------
                COLUMN 1: Book Gallery & Cover Preview
                ------------------------------------------------------------ */}
            <div className="medhankar-gallery-col">
              <div className="medhankar-cover-card">
                <div className="medhankar-cover-wrapper">
                  <img
                    src={book.coverImageUrl || '/covers/architecture.jpg'}
                    alt={book.title}
                    className="medhankar-cover-img"
                    loading="eager"
                  />
                </div>
                <div className="medhankar-cover-caption">
                  <span className="caption-tag">BOOK COVER PREVIEW</span>
                  <button
                    type="button"
                    onClick={() => setIsReaderOpen(true)}
                    className="caption-sample-link"
                  >
                    View sample pages &rarr;
                  </button>
                </div>
              </div>

              {/* About this book section */}
              <div className="medhankar-about-book-box">
                <div className="about-book-tabs">
                  <button
                    type="button"
                    className={`about-tab-btn ${activeTab === 'about' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('about')}
                  >
                    About this book
                  </button>
                  <button
                    type="button"
                    className={`about-tab-btn ${activeTab === 'author' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('author')}
                  >
                    Author
                  </button>
                  <button
                    type="button"
                    className={`about-tab-btn ${activeTab === 'shipping' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('shipping')}
                  >
                    Shipping & returns
                  </button>
                </div>

                <div className="about-book-body">
                  {activeTab === 'about' && (
                    <p className="about-text">
                      {book.synopsisLong || book.description}
                    </p>
                  )}
                  {activeTab === 'author' && (
                    <div className="about-author-box">
                      <h4 className="author-name-heading">{book.author.name}</h4>
                      <p className="about-text">
                        {book.author.bio || 'Distinguished author and scholar published under Medhankar Graphics and Publications Private Limited.'}
                      </p>
                      {book.author.location && (
                        <span className="author-location-chip">&bull; {book.author.location}</span>
                      )}
                    </div>
                  )}
                  {activeTab === 'shipping' && (
                    <div className="about-shipping-box">
                      <div className="shipping-policy-row">
                        <Truck size={15} color="#2563EB" />
                        <span>Pan-India courier delivery in 3&ndash;5 business days. Free delivery on orders above ₹499.</span>
                      </div>
                      <div className="shipping-policy-row">
                        <RotateCcw size={15} color="#2563EB" />
                        <span>Hassle-free 7-day replacement guarantee for damaged or defective copies.</span>
                      </div>
                      <div className="shipping-policy-row">
                        <ShieldCheck size={15} color="#2563EB" />
                        <span>Directly typeset, printed, and dispatched by Medhankar Publications Pune.</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="medhankar-more-details-row">
                  <span className="more-details-label">MORE DETAILS</span>
                  <div className="more-details-links">
                    <button type="button" onClick={() => setActiveTab('author')}>Author</button>
                    <span>&bull;</span>
                    <button type="button" onClick={() => setActiveTab('about')}>Edition</button>
                    <span>&bull;</span>
                    <button type="button" onClick={() => setActiveTab('shipping')}>Shipping &amp; returns</button>
                  </div>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------
                COLUMN 2: Book Information (Center)
                ------------------------------------------------------------ */}
            <div className="medhankar-info-col">
              {/* Category Pill Tag */}
              <div className="info-genre-pill">
                <span>{book.genre.split('&')[0].trim()}</span>
              </div>

              {/* Book Title (H1) */}
              <h1 className="info-book-title">{book.title}</h1>

              {/* Author Attribution */}
              <div className="info-author-row">
                <span>By</span> <strong>{book.author.name}</strong>
              </div>

              {/* Subtitle / Edition Summary */}
              <div className="info-metadata-summary">
                {book.language} &bull; {book.genre.split('&')[0].trim()} &bull; Print &amp; digital editions
              </div>

              {/* Short Blurb */}
              <p className="info-book-blurb">
                {book.description}
              </p>

              {/* 3 Iconic Spec Badges: Length, Language, Book Size */}
              <div className="info-spec-badges-row">
                <div className="spec-badge-item">
                  <FileText size={18} className="spec-icon" />
                  <div className="spec-meta">
                    <strong>{book.pageCount || 298} pages</strong>
                    <span>Length</span>
                  </div>
                </div>

                <div className="spec-badge-item">
                  <Globe size={18} className="spec-icon" />
                  <div className="spec-meta">
                    <strong>{book.language || 'Hindi'}</strong>
                    <span>Language</span>
                  </div>
                </div>

                <div className="spec-badge-item">
                  <Layers size={18} className="spec-icon" />
                  <div className="spec-meta">
                    <strong>A5</strong>
                    <span>Book size</span>
                  </div>
                </div>
              </div>

              {/* Read Sample Action */}
              <div className="info-read-sample-area">
                <button
                  type="button"
                  onClick={() => setIsReaderOpen(true)}
                  className="info-read-sample-btn"
                  id="read-sample-cta-btn"
                >
                  <BookOpen size={17} strokeWidth={2.0} />
                  <span>Read sample</span>
                </button>
                <span className="info-edition-vary-text">
                  Edition details can vary by format.
                </span>
              </div>
            </div>

            {/* ------------------------------------------------------------
                COLUMN 3: Choose Your Edition & Customization Panel (Right)
                ------------------------------------------------------------ */}
            <div className="medhankar-purchase-col">
              <aside className="medhankar-purchase-card" aria-label="Book Purchasing Panel">
                <div className="purchase-card-header">
                  <h2 className="purchase-card-title">Choose your edition</h2>
                  <p className="purchase-card-subtitle">Select a format to see its price.</p>
                </div>

                {/* Format / Edition Selection Pills */}
                <div className="purchase-editions-grid" role="radiogroup" aria-label="Book Editions">
                  {editions.map((ed) => {
                    const isSelected = selectedFormat === ed.format;
                    return (
                      <button
                        key={ed.format}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        className={`edition-select-card ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => setSelectedFormat(ed.format)}
                      >
                        <span className="edition-format-name">{ed.label}</span>
                        <span className="edition-format-price">{formatPrice(ed.price)}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Personalise your copy (Collapsible accordion) */}
                <div className="personalise-accordion-block">
                  <button
                    type="button"
                    className="personalise-accordion-trigger"
                    onClick={() => setIsPersonaliseOpen(!isPersonaliseOpen)}
                    aria-expanded={isPersonaliseOpen}
                  >
                    <span className="accordion-title">
                      <Sparkles size={14} color="#2563EB" />
                      <span>Personalise your copy</span>
                    </span>
                    {isPersonaliseOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {isPersonaliseOpen && (
                    <div className="personalise-accordion-content">
                      {/* Physical Customization: Cover Finish */}
                      {!isDigital && (
                        <div className="customization-group">
                          <label className="customization-label">Cover finish</label>
                          <div className="cover-finish-options">
                            <label className={`finish-radio-pill ${coverFinish === 'matte' ? 'is-active' : ''}`}>
                              <input
                                type="radio"
                                name="coverFinish"
                                value="matte"
                                checked={coverFinish === 'matte'}
                                onChange={() => setCoverFinish('matte')}
                              />
                              <span>Matte</span>
                            </label>

                            <label className={`finish-radio-pill ${coverFinish === 'glossy' ? 'is-active' : ''}`}>
                              <input
                                type="radio"
                                name="coverFinish"
                                value="glossy"
                                checked={coverFinish === 'glossy'}
                                onChange={() => setCoverFinish('glossy')}
                              />
                              <span>Glossy</span>
                            </label>
                          </div>
                        </div>
                      )}

                      {/* Optional dedication message */}
                      <div className="customization-group">
                        <div className="dedication-header-row">
                          <label className="customization-label" htmlFor="dedication-input">
                            Optional dedication
                          </label>
                          <span className="char-counter">{dedication.length}/120</span>
                        </div>
                        <input
                          id="dedication-input"
                          type="text"
                          value={dedication}
                          maxLength={120}
                          onChange={(e) => setDedication(e.target.value)}
                          placeholder="Add a short personal message"
                          className="dedication-text-input"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Quantity Selector & Total Price Row */}
                <div className="purchase-qty-price-row">
                  <div className="qty-stepper-box">
                    <span className="qty-label">Quantity</span>
                    <div className="stepper-controls">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="stepper-btn"
                        aria-label="Decrease quantity"
                      >
                        &minus;
                      </button>
                      <span className="stepper-val">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                        className="stepper-btn"
                        aria-label="Increase quantity"
                      >
                        &#43;
                      </button>
                    </div>
                  </div>

                  <div className="total-price-box">
                    <span className="total-label">Total</span>
                    <strong className="total-amount">{formatPrice(totalPrice)}</strong>
                  </div>
                </div>

                {/* Primary & Secondary Actions */}
                <div className="purchase-cta-actions">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="btn-primary-add-cart"
                    id="book-detail-add-cart-btn"
                  >
                    Add to cart
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="btn-secondary-buy-now"
                    id="book-detail-buy-now-btn"
                  >
                    Buy now
                  </button>
                </div>

                {/* Trust Footer */}
                <div className="purchase-card-trust-footer">
                  <span>Delivery estimate shown at checkout</span>
                  <div className="trust-pills-row">
                    <span>&bull; Secure payment</span>
                    <span>&bull; Easy order tracking</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>

          {/* ================================================================
              RELATED BOOKS EXPLORATION
              ================================================================ */}
          <section className="medhankar-related-section" aria-labelledby="related-books-heading">
            <h3 id="related-books-heading" className="related-section-title">
              Readers also explored
            </h3>
            <div className="related-books-grid">
              {fallbackRelated.map((relBook) => (
                <BookCard key={relBook.id} book={relBook} onReadSample={() => setIsReaderOpen(true)} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {/* Digital Sample Excerpt Reader Modal */}
      {isReaderOpen && (
        <SampleReaderModal book={book} onClose={() => setIsReaderOpen(false)} />
      )}

      {/* ====================================================================
          SCOPED STYLES MATCHING THE REFERENCE DESIGN SYSTEM
          ==================================================================== */}
      <style>{`
        .medhankar-book-detail-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #FFFFFF;
          color: #0F172A;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif;
        }

        .medhankar-book-detail-main {
          flex: 1;
          background-color: #FFFFFF;
          padding: 24px 0 80px;
        }

        .medhankar-book-container {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 clamp(16px, 3.5vw, 36px);
          box-sizing: border-box;
        }

        /* ------------------------------------------------------------------
           BREADCRUMB BAR
           ------------------------------------------------------------------ */
        .medhankar-breadcrumb-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 24px;
          margin-bottom: 24px;
          border-bottom: 1px solid #F1F5F9;
        }

        .medhankar-breadcrumb-trail {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8125rem;
          color: #64748B;
        }

        .breadcrumb-link {
          color: #64748B;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .breadcrumb-link:hover {
          color: #2563EB;
        }

        .breadcrumb-separator {
          color: #94A3B8;
        }

        .breadcrumb-current {
          color: #0F172A;
          font-weight: 500;
        }

        .medhankar-breadcrumb-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .breadcrumb-icon-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid #E2E8F0;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .breadcrumb-icon-btn:hover {
          border-color: #2563EB;
          background: #EFF6FF;
        }

        /* ------------------------------------------------------------------
           3-COLUMN EDITORIAL DESKTOP GRID
           ------------------------------------------------------------------ */
        .medhankar-book-layout-grid {
          display: grid;
          grid-template-columns: minmax(260px, 310px) 1fr minmax(310px, 360px);
          gap: clamp(24px, 3.5vw, 44px);
          align-items: start;
          margin-bottom: 72px;
        }

        /* COLUMN 1: GALLERY & PREVIEW */
        .medhankar-gallery-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .medhankar-cover-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
        }

        .medhankar-cover-wrapper {
          width: 100%;
          aspect-ratio: 136 / 200;
          max-width: 250px;
          border-radius: 8px;
          overflow: hidden;
          background-color: #F8FAFC;
          box-shadow: 0 8px 24px -4px rgba(15, 23, 42, 0.14), 0 2px 6px rgba(0, 0, 0, 0.06);
          margin-bottom: 14px;
        }

        .medhankar-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .medhankar-cover-caption {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-align: center;
          width: 100%;
        }

        .caption-tag {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #94A3B8;
        }

        .caption-sample-link {
          background: none;
          border: none;
          color: #2563EB;
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          transition: color 0.15s ease;
        }

        .caption-sample-link:hover {
          text-decoration: underline;
        }

        /* About this book box */
        .medhankar-about-book-box {
          border-top: 1px solid #E2E8F0;
          padding-top: 18px;
        }

        .about-book-tabs {
          display: flex;
          gap: 14px;
          border-bottom: 1.5px solid #F1F5F9;
          margin-bottom: 12px;
          padding-bottom: 4px;
        }

        .about-tab-btn {
          background: none;
          border: none;
          padding: 4px 0 6px;
          font-size: 0.825rem;
          font-weight: 600;
          color: #64748B;
          cursor: pointer;
          position: relative;
          transition: color 0.15s ease;
        }

        .about-tab-btn.is-active {
          color: #2563EB;
          border-bottom: 2px solid #2563EB;
          margin-bottom: -5.5px;
        }

        .about-text {
          font-size: 0.8125rem;
          line-height: 1.6;
          color: #475569;
          margin: 0;
        }

        .about-author-box,
        .about-shipping-box {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .author-name-heading {
          font-size: 0.9rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0;
        }

        .author-location-chip {
          font-size: 0.75rem;
          color: #64748B;
        }

        .shipping-policy-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.775rem;
          line-height: 1.45;
          color: #475569;
        }

        .medhankar-more-details-row {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .more-details-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #94A3B8;
        }

        .more-details-links {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          color: #64748B;
        }

        .more-details-links button {
          background: none;
          border: none;
          padding: 0;
          color: #64748B;
          font-size: inherit;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .more-details-links button:hover {
          color: #2563EB;
        }

        /* ------------------------------------------------------------------
           COLUMN 2: BOOK INFORMATION (CENTER)
           ------------------------------------------------------------------ */
        .medhankar-info-col {
          display: flex;
          flex-direction: column;
        }

        .info-genre-pill {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          border-radius: 9999px;
          background: #EFF6FF;
          color: #2563EB;
          font-size: 0.725rem;
          font-weight: 600;
          width: fit-content;
          margin-bottom: 12px;
          letter-spacing: 0.02em;
        }

        .info-book-title {
          font-size: clamp(1.75rem, 2.5vw, 2.25rem);
          font-weight: 700;
          color: #0F172A;
          line-height: 1.22;
          margin: 0 0 8px;
          letter-spacing: -0.02em;
        }

        .info-author-row {
          font-size: 0.95rem;
          color: #475569;
          margin-bottom: 8px;
        }

        .info-author-row strong {
          color: #0F172A;
          font-weight: 600;
        }

        .info-metadata-summary {
          font-size: 0.775rem;
          color: #64748B;
          margin-bottom: 18px;
        }

        .info-book-blurb {
          font-size: 0.9rem;
          line-height: 1.65;
          color: #334155;
          margin: 0 0 24px;
        }

        /* Spec Badges Row */
        .info-spec-badges-row {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 16px 0;
          border-top: 1px solid #F1F5F9;
          border-bottom: 1px solid #F1F5F9;
          margin-bottom: 24px;
        }

        .spec-badge-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .spec-icon {
          color: #64748B;
        }

        .spec-meta {
          display: flex;
          flex-direction: column;
        }

        .spec-meta strong {
          font-size: 0.85rem;
          font-weight: 600;
          color: #0F172A;
        }

        .spec-meta span {
          font-size: 0.725rem;
          color: #64748B;
        }

        /* Read Sample Button */
        .info-read-sample-area {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .info-read-sample-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 40px;
          padding: 0 18px;
          border-radius: 9px;
          background: #FFFFFF;
          border: 1.5px solid #2563EB;
          color: #2563EB;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          width: fit-content;
          transition: all 0.18s ease;
        }

        .info-read-sample-btn:hover {
          background: #2563EB;
          color: #FFFFFF;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.2);
        }

        .info-edition-vary-text {
          font-size: 0.725rem;
          color: #94A3B8;
        }

        /* ------------------------------------------------------------------
           COLUMN 3: PURCHASE & CUSTOMIZATION CARD (RIGHT)
           ------------------------------------------------------------------ */
        .medhankar-purchase-col {
          position: sticky;
          top: 88px;
        }

        .medhankar-purchase-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 18px;
          padding: 22px 20px;
          box-shadow:
            0 12px 30px -4px rgba(15, 23, 42, 0.06),
            0 2px 6px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .purchase-card-header {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .purchase-card-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0;
        }

        .purchase-card-subtitle {
          font-size: 0.775rem;
          color: #64748B;
          margin: 0;
        }

        /* Editions Grid (Paperback, Hardcover, eBook) */
        .purchase-editions-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .edition-select-card {
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 9px;
          padding: 10px 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          cursor: pointer;
          transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .edition-select-card:hover {
          border-color: #93C5FD;
          background: #F8FAFC;
        }

        .edition-select-card.is-selected {
          border-color: #2563EB;
          background: #EFF6FF;
          box-shadow: 0 0 0 1px #2563EB inset;
        }

        .edition-format-name {
          font-size: 0.75rem;
          font-weight: 500;
          color: #475569;
        }

        .edition-select-card.is-selected .edition-format-name {
          color: #1E3A8A;
          font-weight: 600;
        }

        .edition-format-price {
          font-size: 0.85rem;
          font-weight: 700;
          color: #0F172A;
        }

        .edition-select-card.is-selected .edition-format-price {
          color: #2563EB;
        }

        /* Personalise your copy Accordion */
        .personalise-accordion-block {
          border-top: 1px solid #F1F5F9;
          padding-top: 12px;
        }

        .personalise-accordion-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: none;
          border: none;
          padding: 4px 0;
          cursor: pointer;
          color: #0F172A;
        }

        .accordion-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #1E293B;
        }

        .personalise-accordion-content {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .customization-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .customization-label {
          font-size: 0.725rem;
          font-weight: 600;
          color: #64748B;
        }

        .cover-finish-options {
          display: flex;
          gap: 8px;
        }

        .finish-radio-pill {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border: 1px solid #E2E8F0;
          border-radius: 7px;
          font-size: 0.775rem;
          color: #334155;
          cursor: pointer;
          transition: all 0.15s ease;
          background: #FFFFFF;
        }

        .finish-radio-pill.is-active {
          border-color: #2563EB;
          background: #EFF6FF;
          color: #1E3A8A;
          font-weight: 600;
        }

        .dedication-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .char-counter {
          font-size: 0.65rem;
          color: #94A3B8;
        }

        .dedication-text-input {
          width: 100%;
          height: 38px;
          padding: 0 12px;
          border: 1px solid #CBD5E1;
          border-radius: 8px;
          font-size: 0.8rem;
          color: #0F172A;
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.15s ease;
        }

        .dedication-text-input:focus {
          border-color: #2563EB;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
        }

        /* Quantity & Total Price Row */
        .purchase-qty-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-top: 1px solid #F1F5F9;
        }

        .qty-stepper-box {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .qty-label {
          font-size: 0.75rem;
          color: #64748B;
        }

        .stepper-controls {
          display: inline-flex;
          align-items: center;
          border: 1px solid #CBD5E1;
          border-radius: 7px;
          overflow: hidden;
          background: #FFFFFF;
        }

        .stepper-btn {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: #F8FAFC;
          color: #0F172A;
          font-size: 0.95rem;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .stepper-btn:hover:not(:disabled) {
          background: #E2E8F0;
        }

        .stepper-btn:disabled {
          color: #CBD5E1;
          cursor: not-allowed;
        }

        .stepper-val {
          padding: 0 10px;
          font-size: 0.825rem;
          font-weight: 600;
          color: #0F172A;
        }

        .total-price-box {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .total-label {
          font-size: 0.75rem;
          color: #64748B;
        }

        .total-amount {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0F172A;
        }

        /* CTA Actions */
        .purchase-cta-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .btn-primary-add-cart {
          width: 100%;
          height: 46px;
          background-color: #2563EB;
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          font-size: 0.925rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
        }

        .btn-primary-add-cart:hover {
          background-color: #1D4ED8;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(37, 99, 235, 0.32);
        }

        .btn-primary-add-cart:active {
          transform: translateY(0);
        }

        .btn-secondary-buy-now {
          width: 100%;
          height: 36px;
          background: none;
          border: none;
          color: #2563EB;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.15s ease;
        }

        .btn-secondary-buy-now:hover {
          color: #1D4ED8;
        }

        /* Trust Footer */
        .purchase-card-trust-footer {
          border-top: 1px solid #F1F5F9;
          padding-top: 12px;
          text-align: center;
          font-size: 0.725rem;
          line-height: 1.5;
          color: #64748B;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .trust-pills-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #64748B;
        }

        /* ------------------------------------------------------------------
           RELATED BOOKS EXPLORATION
           ------------------------------------------------------------------ */
        .medhankar-related-section {
          border-top: 1px solid #F1F5F9;
          padding-top: 48px;
        }

        .related-section-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 24px;
        }

        .related-books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
        }

        /* ------------------------------------------------------------------
           MOBILE RESPONSIVENESS (MATCHING THE MOBILE MOCKUP)
           ------------------------------------------------------------------ */
        @media (max-width: 900px) {
          .medhankar-book-layout-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .medhankar-purchase-col {
            position: static;
          }

          .medhankar-cover-card {
            border: none;
            padding: 0;
            box-shadow: none;
          }

          .medhankar-cover-wrapper {
            max-width: 220px;
            margin: 0 auto 12px;
          }

          .info-book-title {
            font-size: 1.6rem;
          }

          .info-spec-badges-row {
            gap: 12px;
          }

          .spec-badge-item {
            gap: 6px;
          }
        }
      `}</style>
    </div>
  );
};
