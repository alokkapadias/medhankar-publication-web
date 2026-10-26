// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Main Application Component
// ==============================================================================

import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SavedBooksProvider } from './context/SavedBooksContext';
import { CartProvider } from './context/CartContext';
import { MedhankarLoadingScreen } from './components/common/MedhankarLoadingScreen';
import { router } from './app/router';

export function App() {
  return (
    <AuthProvider>
      <SavedBooksProvider>
        <CartProvider>
          <MedhankarLoadingScreen />
          <RouterProvider router={router} />
        </CartProvider>
      </SavedBooksProvider>
    </AuthProvider>
  );
}

export default App;
