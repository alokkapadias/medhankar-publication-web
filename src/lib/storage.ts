// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Local Storage Repository & Preferences Abstraction
// ==============================================================================

import type { CookiePreferences, SavedBook } from '../types';

const SAVED_BOOKS_STORAGE_KEY = 'medhankar_saved_books_v1';
const COOKIE_PREFS_STORAGE_KEY = 'medhankar_cookie_preferences_v1';
const DEMO_USER_SESSION_KEY = 'medhankar_demo_session_v1';

// -----------------------------------------------------------------------------
// Saved Books Repository
// -----------------------------------------------------------------------------
export const savedBooksRepository = {
  getSavedBooks(userPhone: string): SavedBook[] {
    try {
      const data = localStorage.getItem(SAVED_BOOKS_STORAGE_KEY);
      if (!data) return [];
      const all: SavedBook[] = JSON.parse(data);
      return all.filter((item) => item.userPhone === userPhone);
    } catch {
      return [];
    }
  },

  isBookSaved(bookId: string, userPhone: string): boolean {
    const list = this.getSavedBooks(userPhone);
    return list.some((item) => item.bookId === bookId);
  },

  toggleSaveBook(bookId: string, userPhone: string): boolean {
    try {
      const raw = localStorage.getItem(SAVED_BOOKS_STORAGE_KEY);
      const all: SavedBook[] = raw ? JSON.parse(raw) : [];

      const existsIndex = all.findIndex(
        (item) => item.bookId === bookId && item.userPhone === userPhone
      );

      if (existsIndex >= 0) {
        all.splice(existsIndex, 1);
        localStorage.setItem(SAVED_BOOKS_STORAGE_KEY, JSON.stringify(all));
        return false; // Removed
      } else {
        all.push({
          bookId,
          userPhone,
          savedAt: new Date().toISOString(),
        });
        localStorage.setItem(SAVED_BOOKS_STORAGE_KEY, JSON.stringify(all));
        return true; // Added
      }
    } catch (err) {
      console.error('Failed to toggle saved book:', err);
      return false;
    }
  },
};

// -----------------------------------------------------------------------------
// Cookie Consent Preferences
// -----------------------------------------------------------------------------
export const cookieConsentRepository = {
  getPreferences(): CookiePreferences | null {
    try {
      const data = localStorage.getItem(COOKIE_PREFS_STORAGE_KEY);
      if (!data) return null;
      return JSON.parse(data);
    } catch {
      return null;
    }
  },

  savePreferences(prefs: CookiePreferences): void {
    try {
      localStorage.setItem(COOKIE_PREFS_STORAGE_KEY, JSON.stringify(prefs));
    } catch (err) {
      console.error('Failed to save cookie preferences:', err);
    }
  },
};

// -----------------------------------------------------------------------------
// Demo Auth Session Management (Isolated for local testing)
// -----------------------------------------------------------------------------
export interface DemoSession {
  phone: string;
  signedInAt: string;
}

export const demoSessionRepository = {
  getSession(): DemoSession | null {
    try {
      const data = sessionStorage.getItem(DEMO_USER_SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setSession(phone: string): void {
    try {
      const payload: DemoSession = {
        phone,
        signedInAt: new Date().toISOString(),
      };
      sessionStorage.setItem(DEMO_USER_SESSION_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error('Failed to persist demo session:', err);
    }
  },

  clearSession(): void {
    try {
      sessionStorage.removeItem(DEMO_USER_SESSION_KEY);
    } catch (err) {
      console.error('Failed to clear demo session:', err);
    }
  },
};
