// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Reusable Book Purchase Actions (Buy Now & Add to Cart)
// ==============================================================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Zap, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { getEditionPrice, getFormatLabel, isDigitalFormat } from '../../utils/pricing';
import type { Book, BookFormat } from '../../types';
import type { CoverFinish } from '../../types/cart';

interface BookPurchaseActionsProps {
  book: Book;
  selectedFormat?: BookFormat;
  selectedCoverFinish?: CoverFinish;
  dedication?: string;
  quantity?: number;
  layout?: 'card' | 'detail' | 'compact';
  className?: string;
}

export const BookPurchaseActions: React.FC<BookPurchaseActionsProps> = ({
  book,
  selectedFormat,
  selectedCoverFinish,
  dedication,
  quantity = 1,
  layout = 'card',
  className = '',
}) => {
  const navigate = useNavigate();
  const { addToCart, setBuyNowItem } = useCart();
  const [isAddedFeedback, setIsAddedFeedback] = useState<boolean>(false);

  // Default to Paperback or first available format
  const format: BookFormat =
    selectedFormat ||
    (book.availableFormats && book.availableFormats.includes('paperback')
      ? 'paperback'
      : book.availableFormats?.[0] || 'paperback');

  const unitPrice = getEditionPrice(book, format);
  const isDigital = isDigitalFormat(format);
  const formatLabel = getFormatLabel(format);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(
      {
        bookId: book.id,
        slug: book.slug,
        title: book.title,
        subtitle: book.subtitle,
        authorName: book.author.name,
        coverImageUrl: book.coverImageUrl || '/covers/architecture.jpg',
        format,
        formatLabel,
        coverFinish: isDigital ? undefined : selectedCoverFinish || 'matte',
        dedication: dedication ? dedication.trim() : undefined,
        unitPrice,
        quantity,
        isDigital,
      },
      quantity
    );

    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 1500);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const buyNowPayload = {
      id: `buynow-${book.id}-${format}`,
      bookId: book.id,
      slug: book.slug,
      title: book.title,
      subtitle: book.subtitle,
      authorName: book.author.name,
      coverImageUrl: book.coverImageUrl || '/covers/architecture.jpg',
      format,
      formatLabel,
      coverFinish: isDigital ? undefined : selectedCoverFinish || 'matte',
      dedication: dedication ? dedication.trim() : undefined,
      unitPrice,
      quantity,
      lineTotal: unitPrice * quantity,
      isDigital,
    };

    setBuyNowItem(buyNowPayload);
    navigate(`/checkout?bookId=${encodeURIComponent(book.id)}&format=${encodeURIComponent(format)}`);
  };

  if (layout === 'detail') {
    return (
      <div className={`medhankar-purchase-actions-detail ${className}`}>
        <button
          type="button"
          onClick={handleAddToCart}
          className="btn-add-to-cart-detail"
          id={`add-to-cart-${book.id}`}
        >
          {isAddedFeedback ? (
            <>
              <Check size={18} strokeWidth={2.5} />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <ShoppingCart size={18} strokeWidth={2.0} />
              <span>Add to cart</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          className="btn-buy-now-detail"
          id={`buy-now-${book.id}`}
        >
          <span>Buy now</span>
        </button>

        <style>{`
          .medhankar-purchase-actions-detail {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
          }
          .btn-add-to-cart-detail {
            width: 100%;
            height: 48px;
            background-color: #2563EB;
            color: #FFFFFF;
            border: none;
            border-radius: 10px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
          }
          .btn-add-to-cart-detail:hover {
            background-color: #1D4ED8;
            transform: translateY(-1px);
            box-shadow: 0 6px 18px rgba(37, 99, 235, 0.32);
          }
          .btn-add-to-cart-detail:active {
            transform: translateY(0);
          }
          .btn-buy-now-detail {
            width: 100%;
            height: 40px;
            background: none;
            color: #2563EB;
            border: none;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.15s ease;
            text-decoration: underline;
            text-underline-offset: 3px;
          }
          .btn-buy-now-detail:hover {
            color: #1D4ED8;
          }
        `}</style>
      </div>
    );
  }

  // Card Layout (Used on BookCard, Bookshelf, Listings)
  return (
    <div className={`medhankar-book-card-actions ${className}`}>
      {/* Primary: Buy Now */}
      <button
        type="button"
        onClick={handleBuyNow}
        className="btn-card-buy-now"
        title={`Buy "${book.title}" Now`}
        aria-label={`Buy "${book.title}" Now`}
      >
        <Zap size={13} strokeWidth={2.4} />
        <span>Buy Now</span>
      </button>

      {/* Secondary: Add to Cart */}
      <button
        type="button"
        onClick={handleAddToCart}
        className={`btn-card-add-cart ${isAddedFeedback ? 'is-added' : ''}`}
        title={`Add "${book.title}" to Cart`}
        aria-label={`Add "${book.title}" to Cart`}
      >
        {isAddedFeedback ? (
          <>
            <Check size={13} strokeWidth={2.4} />
            <span>Added</span>
          </>
        ) : (
          <>
            <ShoppingCart size={13} strokeWidth={2.0} />
            <span>Add to Cart</span>
          </>
        )}
      </button>

      <style>{`
        .medhankar-book-card-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          width: 100%;
          margin-top: 10px;
        }

        .btn-card-buy-now {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          height: 34px;
          padding: 0 10px;
          border-radius: 7px;
          font-size: 0.775rem;
          font-weight: 600;
          background-color: #142D52;
          color: #FFFFFF;
          border: 1px solid #142D52;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.18s ease;
        }

        .btn-card-buy-now:hover {
          background-color: #2563EB;
          border-color: #2563EB;
          box-shadow: 0 3px 10px rgba(37, 99, 235, 0.25);
          transform: translateY(-1px);
        }

        .btn-card-buy-now:active {
          transform: translateY(0);
        }

        .btn-card-add-cart {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          height: 34px;
          padding: 0 8px;
          border-radius: 7px;
          font-size: 0.775rem;
          font-weight: 600;
          background-color: #FFFFFF;
          color: #142D52;
          border: 1.2px solid #CBD5E1;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.18s ease;
        }

        .btn-card-add-cart:hover {
          border-color: #142D52;
          background-color: #F8FAFC;
          color: #0F172A;
        }

        .btn-card-add-cart.is-added {
          background-color: #ECFDF5;
          border-color: #10B981;
          color: #059669;
        }

        @media (max-width: 480px) {
          .medhankar-book-card-actions {
            grid-template-columns: 1fr;
            gap: 5px;
          }
          .btn-card-buy-now,
          .btn-card-add-cart {
            height: 33px;
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};
