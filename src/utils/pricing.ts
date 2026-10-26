// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Book Pricing Calculations & Edition Resolvers
// ==============================================================================

import type { Book, BookFormat } from '../types';
import type { BookEditionOption } from '../types/cart';

/**
 * Safely parse a currency string (e.g. "₹499.00", "₹299", "450") into a clean number.
 */
export function parsePrice(priceValue: string | number | undefined, fallback = 499): number {
  if (typeof priceValue === 'number') {
    return isNaN(priceValue) ? fallback : priceValue;
  }
  if (!priceValue || typeof priceValue !== 'string') {
    return fallback;
  }
  const clean = priceValue.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(clean);
  return isNaN(parsed) ? fallback : parsed;
}

/**
 * Format a number into standard Indian Rupee currency string (e.g. ₹450)
 */
export function formatPrice(amount: number): string {
  const rounded = Math.round(amount);
  return `₹${rounded.toLocaleString('en-IN')}`;
}

/**
 * Map BookFormat to a human-readable title
 */
export function getFormatLabel(format: BookFormat): string {
  switch (format) {
    case 'paperback':
      return 'Paperback';
    case 'hardcover':
      return 'Hardcover';
    case 'ebook':
      return 'eBook';
    case 'audiobook':
      return 'Audiobook';
    default:
      return 'Standard Edition';
  }
}

/**
 * Check if an edition is digital (does not require physical delivery)
 */
export function isDigitalFormat(format: BookFormat): boolean {
  return format === 'ebook' || format === 'audiobook';
}

/**
 * Resolve the real unit price for a specific edition of a book
 */
export function getEditionPrice(book: Book, format: BookFormat): number {
  if (format === 'paperback') {
    return parsePrice(book.samplePrice?.paperback, 299);
  }
  if (format === 'hardcover') {
    return parsePrice(book.samplePrice?.hardcover, 450);
  }
  if (format === 'ebook') {
    return parsePrice(book.samplePrice?.ebook, 149);
  }
  if (format === 'audiobook') {
    return parsePrice(book.samplePrice?.ebook, 199);
  }
  return 299;
}

/**
 * Return all available editions for a given book based on its catalogue configuration
 */
export function getAvailableEditions(book: Book): BookEditionOption[] {
  const formats = book.availableFormats && book.availableFormats.length > 0
    ? book.availableFormats
    : (['paperback', 'hardcover', 'ebook'] as BookFormat[]);

  return formats.map((fmt) => ({
    format: fmt,
    label: getFormatLabel(fmt),
    price: getEditionPrice(book, fmt),
    available: true,
    isDigital: isDigitalFormat(fmt),
    description:
      fmt === 'paperback'
        ? 'Premium softcover with acid-free book paper'
        : fmt === 'hardcover'
        ? 'Collector cloth-bound hardback with foil stamping'
        : fmt === 'ebook'
        ? 'Instant digital EPUB & PDF for all devices'
        : 'High-fidelity audio narrated edition',
  }));
}
