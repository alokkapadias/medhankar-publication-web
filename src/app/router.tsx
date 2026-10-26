// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Application Router & Route Protections
// ==============================================================================

import React from 'react';
import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { AuthPage } from '../pages/AuthPage';
import { LibraryPage } from '../pages/LibraryPage';
import { TraditionalPublishingPage } from '../pages/TraditionalPublishingPage';
import { SelfPublishingPage } from '../pages/SelfPublishingPage';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { PrivacyPage } from '../pages/PrivacyPage';
import { TermsPage } from '../pages/TermsPage';
import { AdminPage } from '../pages/AdminPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { BookDetailPage } from '../pages/BookDetailPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { useAuth } from '../context/AuthContext';

/**
 * Restrained loading indicator during initial session restoration
 */
const SessionLoadingScreen: React.FC = () => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--color-bg-main)',
    }}
  >
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '3px solid var(--color-border)',
          borderTopColor: 'var(--color-primary-blue)',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 12px',
        }}
      />
      <div
        style={{
          fontSize: '0.75rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-deep-navy)',
          fontWeight: 700,
        }}
      >
        MEDHANKAR
      </div>
    </div>
  </div>
);

/**
 * Guard for public Home: If authenticated, redirect to /library.
 * Avoids flashing landing page while session loads.
 */
const HomeRoute: React.FC = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <SessionLoadingScreen />;
  }
  if (user) {
    return <Navigate to="/library" replace />;
  }
  return <HomePage />;
};

/**
 * Protected Route for /library: If unauthenticated, redirect to /auth preserving destination.
 */
const ProtectedLibraryRoute: React.FC = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <SessionLoadingScreen />;
  }

  if (!user) {
    const redirectUrl = `/auth?redirect=${encodeURIComponent(location.pathname)}`;
    return <Navigate to={redirectUrl} replace />;
  }

  return <LibraryPage />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeRoute />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/library',
    element: <ProtectedLibraryRoute />,
  },
  {
    path: '/books/:slug',
    element: <BookDetailPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
  },
  {
    path: '/publishing/self-publishing',
    element: <SelfPublishingPage />,
  },
  {
    path: '/publishing/traditional-publishing',
    element: <TraditionalPublishingPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/privacy',
    element: <PrivacyPage />,
  },
  {
    path: '/terms',
    element: <TermsPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
