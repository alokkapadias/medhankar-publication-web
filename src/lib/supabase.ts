// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Supabase Authentication & Client Integration
// ==============================================================================

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const isDemoAuthAllowed =
  import.meta.env.VITE_ENABLE_DEMO_AUTH === 'true' || import.meta.env.DEV;

export function isSupabaseConfigured(): boolean {
  if (!supabaseUrl || !supabaseAnonKey) {
    return false;
  }
  // Check for unedited placeholder templates
  if (
    supabaseUrl.includes('your-project.supabase.co') ||
    supabaseAnonKey.includes('your-supabase-publishable-key') ||
    supabaseAnonKey.includes('your-anon-publishable-key')
  ) {
    return false;
  }
  return true;
}

let clientInstance: SupabaseClient | null = null;

if (isSupabaseConfigured()) {
  try {
    clientInstance = createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
  }
}

export const supabase = clientInstance;

/**
 * Normalizes phone numbers to standard E.164 format.
 * Defaults to Indian prefix (+91) if not explicitly prefixed with '+'.
 */
export function normalizePhoneNumber(rawNumber: string, defaultCountry = '+91'): string {
  // Strip whitespace, hyphens, and parenthesis
  const cleaned = rawNumber.replace(/[\s\-()]/g, '');

  if (cleaned.startsWith('+')) {
    return cleaned;
  }

  // If starts with 0 and 10 digits follow, strip 0 and prepend default country
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    return `${defaultCountry}${cleaned.slice(1)}`;
  }

  // Prepend default country code if missing
  return `${defaultCountry}${cleaned}`;
}

/**
 * Masks phone number for privacy display (e.g., "+91 ••••• ••890")
 */
export function maskPhoneNumber(phone: string): string {
  if (!phone || phone.length < 8) return phone;
  const visibleLast = phone.slice(-3);
  const prefix = phone.slice(0, 4);
  return `${prefix} ••••• ••${visibleLast}`;
}
