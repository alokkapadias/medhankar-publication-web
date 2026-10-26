// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Shopping Cart Page (/cart)
// Clean, Editorial, Apple-inspired layout
// ==============================================================================

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/pricing';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, cartCount, subtotal, updateQuantity, removeFromCart, clearCart } = useCart();

  const shippingEstimate = subtotal >= 499 || items.every((i) => i.isDigital) ? 0 : 50;
  const grandTotal = subtotal + shippingEstimate;

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="medhankar-cart-page-root">
      <Navbar />

      <main className="medhankar-cart-page-main">
        <div className="medhankar-cart-container">
          {/* Header & Breadcrumb */}
          <div className="cart-header-row">
            <div>
              <nav aria-label="Breadcrumb" className="cart-breadcrumb">
                <Link to="/" className="cart-breadcrumb-link">Home</Link>
                <span className="cart-breadcrumb-sep">&rsaquo;</span>
                <span className="cart-breadcrumb-current">Shopping Cart</span>
              </nav>
              <h1 className="cart-main-title">
                Your Shopping Cart{' '}
                <span className="cart-count-badge">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </span>
              </h1>
            </div>

            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="cart-clear-btn"
                aria-label="Clear all items in cart"
              >
                Clear Cart
              </button>
            )}
          </div>

          {/* ================================================================
              EMPTY CART STATE
              ================================================================ */}
          {items.length === 0 ? (
            <div className="cart-empty-card" role="region" aria-label="Empty Shopping Cart">
              <div className="empty-icon-circle">
                <ShoppingBag size={38} strokeWidth={1.5} color="#2563EB" />
              </div>
              <h2 className="empty-title">Your library bag is empty</h2>
              <p className="empty-subtext">
                Explore our curated catalogue of literature, philosophy, historical novels, and business writings to begin adding titles to your personal collection.
              </p>
              <Link to="/#releases" className="empty-explore-btn">
                <span>Explore Books</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            /* ================================================================
                FILLED CART 2-COLUMN LAYOUT
                Left: Items List | Right: Order Summary Sticky Card
                ================================================================ */
            <div className="cart-layout-grid">
              {/* Items List */}
              <div className="cart-items-column">
                <div className="cart-items-list" role="list">
                  {items.map((item) => (
                    <article key={item.id} className="cart-item-row" role="listitem">
                      {/* Book Cover Thumbnail */}
                      <Link to={`/books/${item.slug}`} className="cart-item-cover-anchor">
                        <img
                          src={item.coverImageUrl}
                          alt={item.title}
                          className="cart-item-cover-img"
                          loading="lazy"
                        />
                      </Link>

                      {/* Info & Customization */}
                      <div className="cart-item-info">
                        <div className="cart-item-top">
                          <span className="cart-item-format-tag">
                            {item.formatLabel}
                            {item.isDigital && ' (Digital)'}
                          </span>
                          <h3 className="cart-item-title">
                            <Link to={`/books/${item.slug}`} className="cart-item-title-link">
                              {item.title}
                            </Link>
                          </h3>
                          <p className="cart-item-author">By {item.authorName}</p>
                        </div>

                        {/* Customization Badges */}
                        {(item.coverFinish || item.dedication) && (
                          <div className="cart-customization-badges">
                            {item.coverFinish && (
                              <span className="customization-chip">
                                Finish: <strong>{item.coverFinish.charAt(0).toUpperCase() + item.coverFinish.slice(1)}</strong>
                              </span>
                            )}
                            {item.dedication && (
                              <span className="customization-chip dedication-chip">
                                <Sparkles size={11} color="#2563EB" />
                                <span>&ldquo;{item.dedication}&rdquo;</span>
                              </span>
                            )}
                          </div>
                        )}

                        {/* Mobile Stepper + Price Row */}
                        <div className="cart-item-actions-mobile">
                          <div className="item-qty-stepper">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="qty-btn"
                              aria-label="Decrease quantity"
                            >
                              &minus;
                            </button>
                            <span className="qty-number">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="qty-btn"
                              aria-label="Increase quantity"
                            >
                              &#43;
                            </button>
                          </div>

                          <div className="item-price-block">
                            <span className="unit-price-note">{formatPrice(item.unitPrice)} each</span>
                            <strong className="line-total-price">{formatPrice(item.lineTotal)}</strong>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="item-remove-btn"
                            aria-label={`Remove ${item.title} from cart`}
                            title="Remove"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Desktop Stepper */}
                      <div className="cart-desktop-stepper">
                        <div className="item-qty-stepper">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="qty-btn"
                            aria-label="Decrease quantity"
                          >
                            &minus;
                          </button>
                          <span className="qty-number">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="qty-btn"
                            aria-label="Increase quantity"
                          >
                            &#43;
                          </button>
                        </div>
                      </div>

                      {/* Desktop Price */}
                      <div className="cart-desktop-price">
                        <strong className="line-total-price">{formatPrice(item.lineTotal)}</strong>
                        <span className="unit-price-note">{formatPrice(item.unitPrice)} each</span>
                      </div>

                      {/* Desktop Remove */}
                      <div className="cart-desktop-remove">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="item-remove-btn"
                          aria-label={`Remove ${item.title} from cart`}
                          title="Remove item"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="cart-bottom-nav">
                  <Link to="/" className="cart-continue-link">
                    <ArrowLeft size={16} />
                    <span>Continue Browsing Books</span>
                  </Link>
                </div>
              </div>

              {/* Order Summary Column */}
              <div className="cart-summary-column">
                <aside className="cart-summary-card" aria-label="Order Summary">
                  <h2 className="summary-title">Order Summary</h2>

                  <div className="summary-rows">
                    <div className="summary-row">
                      <span className="summary-label">Items Subtotal</span>
                      <span className="summary-val">{formatPrice(subtotal)}</span>
                    </div>

                    <div className="summary-row">
                      <span className="summary-label">Estimated Delivery</span>
                      <span className="summary-val">
                        {shippingEstimate === 0 ? (
                          <span style={{ color: '#059669', fontWeight: 600 }}>FREE</span>
                        ) : (
                          formatPrice(shippingEstimate)
                        )}
                      </span>
                    </div>

                    {shippingEstimate === 0 && subtotal >= 499 && (
                      <p className="free-shipping-note">
                        &bull; Congratulations! You qualify for Free Standard Delivery.
                      </p>
                    )}

                    <div className="summary-divider" />

                    <div className="summary-row summary-total-row">
                      <span className="summary-total-label">Total Amount</span>
                      <span className="summary-total-val">{formatPrice(grandTotal)}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleProceedToCheckout}
                    className="cart-checkout-btn"
                    id="proceed-to-checkout-btn"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={18} strokeWidth={2.2} />
                  </button>

                  <div className="cart-trust-indicators">
                    <div className="trust-indicator-item">
                      <ShieldCheck size={16} color="#2563EB" />
                      <span>Authentic publications typeset &amp; printed by Medhankar</span>
                    </div>
                    <div className="trust-indicator-item">
                      <Truck size={16} color="#2563EB" />
                      <span>Tracked courier delivery with tamper-proof packaging</span>
                    </div>
                    <div className="trust-indicator-item">
                      <RotateCcw size={16} color="#2563EB" />
                      <span>Hassle-free 7-day replacement guarantee</span>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Scoped CSS */}
      <style>{`
        .medhankar-cart-page-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #F8FAFC;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif;
        }

        .medhankar-cart-page-main {
          flex: 1;
          padding: 32px 0 80px;
        }

        .medhankar-cart-container {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 clamp(16px, 3.5vw, 36px);
          box-sizing: border-box;
        }

        .cart-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 28px;
          padding-bottom: 18px;
          border-bottom: 1px solid #E2E8F0;
        }

        .cart-breadcrumb {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          color: #64748B;
          margin-bottom: 6px;
        }

        .cart-breadcrumb-link {
          color: #64748B;
          text-decoration: none;
        }

        .cart-breadcrumb-link:hover {
          color: #2563EB;
        }

        .cart-breadcrumb-sep {
          color: #94A3B8;
        }

        .cart-breadcrumb-current {
          color: #0F172A;
          font-weight: 500;
        }

        .cart-main-title {
          font-size: clamp(1.6rem, 2.5vw, 2.1rem);
          font-weight: 700;
          color: #0F172A;
          margin: 0;
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .cart-count-badge {
          font-size: 0.95rem;
          font-weight: 500;
          color: #64748B;
        }

        .cart-clear-btn {
          background: none;
          border: none;
          color: #DC2626;
          font-size: 0.825rem;
          font-weight: 600;
          cursor: pointer;
          padding: 6px 0;
        }

        .cart-clear-btn:hover {
          text-decoration: underline;
        }

        /* Empty Cart Card */
        .cart-empty-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 64px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
        }

        .empty-icon-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #EFF6FF;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .empty-title {
          font-size: 1.45rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 10px;
        }

        .empty-subtext {
          font-size: 0.925rem;
          color: #64748B;
          max-width: 480px;
          line-height: 1.6;
          margin: 0 0 28px;
        }

        .empty-explore-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 48px;
          padding: 0 24px;
          border-radius: 12px;
          background: #2563EB;
          color: #FFFFFF;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.28);
          transition: all 0.2s ease;
        }

        .empty-explore-btn:hover {
          background: #1D4ED8;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(37, 99, 235, 0.35);
        }

        /* Cart Grid Layout */
        .cart-layout-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 32px;
          align-items: start;
        }

        .cart-items-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cart-items-list {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
        }

        .cart-item-row {
          display: flex;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #F1F5F9;
          gap: 20px;
        }

        .cart-item-row:last-child {
          border-bottom: none;
        }

        .cart-item-cover-anchor {
          flex: 0 0 76px;
          aspect-ratio: 136 / 195;
          border-radius: 6px;
          overflow: hidden;
          background: #F1F5F9;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
        }

        .cart-item-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .cart-item-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cart-item-format-tag {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #2563EB;
          letter-spacing: 0.04em;
        }

        .cart-item-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0;
          line-height: 1.3;
        }

        .cart-item-title-link {
          color: inherit;
          text-decoration: none;
        }

        .cart-item-title-link:hover {
          color: #2563EB;
        }

        .cart-item-author {
          font-size: 0.8125rem;
          color: #64748B;
          margin: 0;
        }

        .cart-customization-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }

        .customization-chip {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          border-radius: 6px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          font-size: 0.725rem;
          color: #475569;
        }

        .dedication-chip {
          background: #EFF6FF;
          border-color: #BFDBFE;
          color: #1E40AF;
          font-style: italic;
        }

        .cart-item-actions-mobile {
          display: none;
        }

        /* Desktop Stepper */
        .cart-desktop-stepper {
          flex: 0 0 100px;
        }

        .item-qty-stepper {
          display: inline-flex;
          align-items: center;
          border: 1.5px solid #CBD5E1;
          border-radius: 8px;
          overflow: hidden;
          background: #FFFFFF;
        }

        .qty-btn {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: #F8FAFC;
          color: #0F172A;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .qty-btn:hover {
          background: #E2E8F0;
        }

        .qty-number {
          padding: 0 10px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #0F172A;
        }

        /* Desktop Price */
        .cart-desktop-price {
          flex: 0 0 100px;
          text-align: right;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .line-total-price {
          font-size: 1.05rem;
          font-weight: 700;
          color: #0F172A;
        }

        .unit-price-note {
          font-size: 0.75rem;
          color: #64748B;
        }

        /* Desktop Remove */
        .cart-desktop-remove {
          flex: 0 0 36px;
          text-align: right;
        }

        .item-remove-btn {
          background: none;
          border: none;
          color: #94A3B8;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: all 0.15s ease;
        }

        .item-remove-btn:hover {
          color: #DC2626;
          background: #FEE2E2;
        }

        .cart-bottom-nav {
          padding: 4px 0;
        }

        .cart-continue-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #2563EB;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
        }

        .cart-continue-link:hover {
          text-decoration: underline;
        }

        /* Summary Column */
        .cart-summary-column {
          position: sticky;
          top: 96px;
        }

        .cart-summary-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 18px;
          padding: 24px;
          box-shadow: 0 10px 28px -4px rgba(15, 23, 42, 0.06);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .summary-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0F172A;
          margin: 0;
        }

        .summary-rows {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          color: #475569;
        }

        .summary-val {
          font-weight: 600;
          color: #0F172A;
        }

        .free-shipping-note {
          font-size: 0.75rem;
          color: #059669;
          margin: -4px 0 0;
        }

        .summary-divider {
          height: 1px;
          background: #E2E8F0;
          margin: 6px 0;
        }

        .summary-total-row {
          font-size: 1.15rem;
        }

        .summary-total-label {
          font-weight: 700;
          color: #0F172A;
        }

        .summary-total-val {
          font-weight: 800;
          color: #2563EB;
        }

        .cart-checkout-btn {
          width: 100%;
          height: 50px;
          border-radius: 12px;
          background: #2563EB;
          color: #FFFFFF;
          border: none;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.28);
          transition: all 0.2s ease;
        }

        .cart-checkout-btn:hover {
          background: #1D4ED8;
          transform: translateY(-1px);
          box-shadow: 0 6px 18px rgba(37, 99, 235, 0.35);
        }

        .cart-trust-indicators {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 16px;
          border-top: 1px solid #F1F5F9;
        }

        .trust-indicator-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.775rem;
          line-height: 1.45;
          color: #64748B;
        }

        /* Responsive Mobile Layout */
        @media (max-width: 860px) {
          .cart-layout-grid {
            grid-template-columns: 1fr;
          }

          .cart-summary-column {
            position: static;
          }

          .cart-desktop-stepper,
          .cart-desktop-price,
          .cart-desktop-remove {
            display: none;
          }

          .cart-item-actions-mobile {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 12px;
            padding-top: 10px;
            border-top: 1px solid #F1F5F9;
            width: 100%;
          }

          .cart-item-row {
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};
