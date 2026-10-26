// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Saved Books Context & Hook
// ==============================================================================

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { savedBooksRepository } from '../lib/storage';
import type { SavedBook } from '../types';

interface SavedBooksContextType {
  savedBooks: SavedBook[];
  isBookSaved: (bookId: string) => boolean;
  toggleSaveBook: (bookId: string) => boolean;
  savedCount: number;
}

const SavedBooksContext = createContext<SavedBooksContextType | undefined>(undefined);

export const SavedBooksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [savedBooks, setSavedBooks] = useState<SavedBook[]>([]);

  const userPhone = user?.phone || 'anonymous_guest';

  useEffect(() => {
    if (user?.phone) {
      const current = savedBooksRepository.getSavedBooks(user.phone);
      setSavedBooks(current);
    } else {
      setSavedBooks([]);
    }
  }, [user?.phone]);

  const isBookSaved = (bookId: string): boolean => {
    return savedBooks.some((item) => item.bookId === bookId);
  };

  const toggleSaveBook = (bookId: string): boolean => {
    const isNowSaved = savedBooksRepository.toggleSaveBook(bookId, userPhone);
    const updated = savedBooksRepository.getSavedBooks(userPhone);
    setSavedBooks(updated);
    return isNowSaved;
  };

  return (
    <SavedBooksContext.Provider
      value={{
        savedBooks,
        isBookSaved,
        toggleSaveBook,
        savedCount: savedBooks.length,
      }}
    >
      {children}
    </SavedBooksContext.Provider>
  );
};

export const useSavedBooks = (): SavedBooksContextType => {
  const context = useContext(SavedBooksContext);
  if (!context) {
    throw new Error('useSavedBooks must be used within a SavedBooksProvider');
  }
  return context;
};
