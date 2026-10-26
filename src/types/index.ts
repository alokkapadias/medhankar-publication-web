// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Core Type Definitions & Domain Models
// ==============================================================================

export type BookFormat = 'paperback' | 'hardcover' | 'ebook' | 'audiobook';

export type Genre =
  | 'Philosophy & Thought'
  | 'Literature & Fiction'
  | 'Business & Leadership'
  | 'Essays & Commentary'
  | 'Poetry & Reflections'
  | 'Creative Arts & Design';

export interface Author {
  id: string;
  name: string;
  bio?: string;
  location?: string;
}

export interface Book {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  author: Author;
  description: string;
  synopsisLong?: string;
  genre: Genre;
  language: string;
  availableFormats: BookFormat[];
  publicationStatus: 'Available' | 'Forthcoming' | 'Catalog Preview';
  isbn?: string;
  pageCount?: number;
  publicationYear?: number;
  coverImageUrl?: string;
  coverPalette: {
    background: string;
    text: string;
    accent: string;
    pattern?: 'geometric' | 'minimal' | 'monsoon' | 'editorial' | 'arch' | 'classic';
  };
  sampleExcerpt?: {
    chapterTitle: string;
    content: string[];
  };
  sampleAudioAvailable?: boolean;
  sampleAudioDuration?: string;
  /**
   * Sample pricing note: Explicitly labelled as demo catalogue data until official pricing is connected
   */
  samplePrice?: {
    paperback?: string;
    ebook?: string;
    hardcover?: string;
  };
}

export interface SavedBook {
  bookId: string;
  savedAt: string;
  userPhone: string;
}

export interface UserProfile {
  id: string;
  phone: string;
  email?: string;
  createdAt: string;
  isDemoUser?: boolean;
  displayName?: string;
}

export type PublishingType = 'traditional' | 'self';

export interface PublishingEnquiry {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  publishingType: PublishingType;
  bookTitle: string;
  genre: string;
  manuscriptStatus: 'concept' | 'first-draft' | 'completed' | 'previously-published';
  approxWordCount?: string;
  synopsis: string;
  targetServices?: string[];
  createdAt?: string;
}

export type CookiePreferenceType = 'all' | 'necessary' | 'custom';

export interface CookiePreferences {
  type: CookiePreferenceType;
  necessary: boolean; // Always true
  analytics: boolean;
  functional: boolean;
  updatedAt: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        background?: string;
        speed?: string | number;
        loop?: boolean;
        autoplay?: boolean;
        style?: React.CSSProperties;
        className?: string;
      };
    }
  }
}

