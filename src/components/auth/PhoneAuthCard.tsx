// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Screen 1: Phone Number Authentication Input Card
// ==============================================================================

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowLeft, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { normalizePhoneNumber } from '../../lib/supabase';
import { SITE_CONFIG } from '../../lib/config';

interface PhoneAuthCardProps {
  onSubmitPhone: (e164Phone: string) => Promise<void>;
  isLoading: boolean;
  error?: string | null;
  onClearError?: () => void;
  isDemoMode?: boolean;
}

export const PhoneAuthCard: React.FC<PhoneAuthCardProps> = ({
  onSubmitPhone,
  isLoading,
  error,
  onClearError,
  isDemoMode = false,
}) => {
  const [countryCode, setCountryCode] = useState<string>('+91');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onClearError) onClearError();
    setValidationError(null);
    // Allow digits, spaces, and hyphens
    const val = e.target.value.replace(/[^\d\s-]/g, '');
    setPhoneNumber(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digitsOnly = phoneNumber.replace(/\D/g, '');

    // Validation for phone numbers
    if (countryCode === '+91') {
      if (digitsOnly.length !== 10) {
        setValidationError('Please enter a valid 10-digit Indian mobile number.');
        return;
      }
      if (!/^[6-9]/.test(digitsOnly)) {
        setValidationError('Indian mobile numbers must start with 6, 7, 8, or 9.');
        return;
      }
    } else {
      if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        setValidationError('Please enter a valid international mobile number.');
        return;
      }
    }

    const fullNormalized = normalizePhoneNumber(digitsOnly, countryCode);
    await onSubmitPhone(fullNormalized);
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--color-white)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        padding: '36px 32px',
        boxShadow: 'var(--shadow-md)',
        maxWidth: '440px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{ marginBottom: '8px' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '1.25rem',
              letterSpacing: '0.08em',
              color: 'var(--color-deep-navy)',
            }}
          >
            {SITE_CONFIG.brandName}
          </span>
        </div>
        <h1
          style={{
            fontSize: '1.5rem',
            color: 'var(--color-deep-navy)',
            fontWeight: 600,
            marginBottom: '6px',
          }}
        >
          Welcome to Medhankar
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Sign in to continue to your library.
        </p>

        {isDemoMode && (
          <div
            style={{
              marginTop: '12px',
              display: 'inline-block',
              backgroundColor: 'var(--color-light-blue)',
              color: 'var(--color-primary-blue)',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            Evaluation Demo Mode Enabled
          </div>
        )}
      </div>

      {/* Error Feedback */}
      {(error || validationError) && (
        <div
          role="alert"
          style={{
            backgroundColor: 'var(--color-error-bg)',
            border: '1px solid var(--color-error-border)',
            color: 'var(--color-error)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 14px',
            fontSize: '0.8125rem',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>{error || validationError}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="auth-phone-input" className="form-label">
            Mobile Number
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              aria-label="Country Code"
              className="form-select"
              style={{ width: '100px', flexShrink: 0 }}
            >
              <option value="+91">🇮🇳 +91 (IN)</option>
              <option value="+1">🇺🇸 +1 (US)</option>
              <option value="+44">🇬🇧 +44 (UK)</option>
              <option value="+971">🇦🇪 +971 (AE)</option>
              <option value="+65">🇸🇬 +65 (SG)</option>
            </select>

            <div style={{ position: 'relative', width: '100%' }}>
              <input
                id="auth-phone-input"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder={countryCode === '+91' ? '98765 43210' : 'Mobile number'}
                autoComplete="tel"
                className="form-input"
                style={{ paddingLeft: '38px' }}
                disabled={isLoading}
                required
              />
              <Phone
                size={16}
                color="var(--color-text-muted)"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
              />
            </div>
          </div>
          <span className="form-hint">
            We will send a one-time verification code via SMS to this number.
          </span>
        </div>

        <button
          type="submit"
          disabled={isLoading || !phoneNumber.trim()}
          className="btn btn-primary w-full"
          id="auth-continue-btn"
          style={{ padding: '0.75rem', marginTop: '12px' }}
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Sending code...</span>
            </>
          ) : (
            <>
              <span>Continue</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      {/* Terms & Privacy Footnote */}
      <div
        style={{
          marginTop: '24px',
          textAlign: 'center',
          fontSize: '0.75rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.5,
        }}
      >
        By continuing, you agree to our{' '}
        <Link to="/terms" style={{ color: 'var(--color-primary-blue)', textDecoration: 'underline' }}>
          Terms of Use
        </Link>{' '}
        and{' '}
        <Link to="/privacy" style={{ color: 'var(--color-primary-blue)', textDecoration: 'underline' }}>
          Privacy Policy
        </Link>
        .
      </div>

      {/* Back to Home Link */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link
          to="/"
          style={{
            fontSize: '0.8125rem',
            color: 'var(--color-text-secondary)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <ArrowLeft size={14} />
          <span>Back to public home</span>
        </Link>
      </div>
    </div>
  );
};
