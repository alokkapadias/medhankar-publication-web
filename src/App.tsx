// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Main Application Component
// ==============================================================================

import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SavedBooksProvider } from './context/SavedBooksContext';
import { CartProvider } from './context/CartContext';
import { CookieConsent } from './components/common/CookieConsent';
import { MedhankarLoadingScreen } from './components/common/MedhankarLoadingScreen';
import { router } from './app/router';

export function App() {
  return (
    <AuthProvider>
      <SavedBooksProvider>
        <CartProvider>
          <MedhankarLoadingScreen />
          <RouterProvider router={router} />
          <CookieConsent />
        </CartProvider>
      </SavedBooksProvider>
    </AuthProvider>
  );
}

export default App;
