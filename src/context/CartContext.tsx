// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Shared Cart Context & Persistent State Management
// ==============================================================================

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { CartItem } from '../types/cart';

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  buyNowItem: CartItem | null;
  toastMessage: string | null;
  addToCart: (item: Omit<CartItem, 'id' | 'lineTotal'>, quantity?: number) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  setBuyNowItem: (item: CartItem | null) => void;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'medhankar_cart_items_v2';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Failed to restore saved cart:', err);
    }
    return [];
  });

  const [buyNowItem, setBuyNowItem] = useState<CartItem | null>(() => {
    try {
      const saved = sessionStorage.getItem('medhankar_buynow_item');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart items to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.warn('Failed to persist cart items:', err);
    }
  }, [items]);

  // Sync buyNowItem to sessionStorage
  useEffect(() => {
    try {
      if (buyNowItem) {
        sessionStorage.setItem('medhankar_buynow_item', JSON.stringify(buyNowItem));
      } else {
        sessionStorage.removeItem('medhankar_buynow_item');
      }
    } catch {
      // ignore
    }
  }, [buyNowItem]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  /**
   * Add a book edition to the cart. If identical book + format + finish + dedication
   * already exists in cart, increments quantity instead of creating a duplicate line.
   */
  const addToCart = (item: Omit<CartItem, 'id' | 'lineTotal'>, quantity = 1) => {
    const qty = Math.max(1, quantity);
    const finishKey = item.coverFinish || 'standard';
    const dedicationKey = item.dedication ? item.dedication.trim().slice(0, 15) : 'none';
    const uniqueId = `${item.bookId}-${item.format}-${finishKey}-${dedicationKey}`;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((it) => it.id === uniqueId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        const existing = updated[existingIndex];
        const nextQty = existing.quantity + qty;
        updated[existingIndex] = {
          ...existing,
          quantity: nextQty,
          lineTotal: existing.unitPrice * nextQty,
        };
        return updated;
      }

      const newItem: CartItem = {
        ...item,
        id: uniqueId,
        quantity: qty,
        lineTotal: item.unitPrice * qty,
      };
      return [...prevItems, newItem];
    });

    showToast(`Added "${item.title}" (${item.formatLabel}) to your cart`);
  };

  /**
   * Update quantity of a specific cart item line
   */
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((it) => {
        if (it.id === itemId) {
          return {
            ...it,
            quantity: newQuantity,
            lineTotal: it.unitPrice * newQuantity,
          };
        }
        return it;
      })
    );
  };

  /**
   * Remove a line from cart
   */
  const removeFromCart = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((it) => it.id !== itemId));
    showToast('Item removed from cart');
  };

  /**
   * Empty the entire cart
   */
  const clearCart = () => {
    setItems([]);
  };

  // Aggregates
  const cartCount = items.reduce((acc, it) => acc + it.quantity, 0);
  const subtotal = items.reduce((acc, it) => acc + it.lineTotal, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        subtotal,
        buyNowItem,
        toastMessage,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        setBuyNowItem,
        showToast,
      }}
    >
      {children}

      {/* Floating Apple-Style Toast Notification */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="medhankar-cart-toast"
          style={{
            position: 'fixed',
            bottom: '28px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            padding: '12px 22px',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.28), 0 2px 6px rgba(0, 0, 0, 0.08)',
            zIndex: 9999,
            animation: 'toastSpringIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              display: 'inline-block',
            }}
          />
          <span>{toastMessage}</span>
        </aside>
      )}

      <style>{`
        @keyframes toastSpringIn {
          from {
            opacity: 0;
            transform: translate(-50%, 16px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
        }
      `}</style>
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
