// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Screen 2: OTP Verification Card
// ==============================================================================

import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Check, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { maskPhoneNumber } from '../../lib/supabase';
import { SITE_CONFIG } from '../../lib/config';

interface OtpVerifyCardProps {
  phone: string;
  onVerifyOtp: (token: string) => Promise<void>;
  onResendOtp: () => Promise<void>;
  onEditPhone: () => void;
  isLoading: boolean;
  error?: string | null;
  onClearError?: () => void;
  isDemoMode?: boolean;
}

export const OtpVerifyCard: React.FC<OtpVerifyCardProps> = ({
  phone,
  onVerifyOtp,
  onResendOtp,
  onEditPhone,
  isLoading,
  error,
  onClearError,
  isDemoMode = false,
}) => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [cooldown, setCooldown] = useState<number>(SITE_CONFIG.auth.resendCooldownSeconds);
  const [isResending, setIsResending] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Focus the first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleDigitChange = (index: number, value: string) => {
    if (onClearError) onClearError();

    // Handle multi-character paste (e.g. user pasted 6-digit code)
    if (value.length > 1) {
      const pastedDigits = value.replace(/\D/g, '').slice(0, 6).split('');
      const newDigits = [...digits];
      pastedDigits.forEach((char, i) => {
        if (i < 6) newDigits[i] = char;
      });
      setDigits(newDigits);
      const nextFocus = Math.min(5, pastedDigits.length);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const cleaned = value.replace(/\D/g, '');
    const newDigits = [...digits];
    newDigits[index] = cleaned;
    setDigits(newDigits);

    // Auto-advance to next input if digit entered
    if (cleaned && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = digits.join('');
    if (token.length !== 6) return;
    await onVerifyOtp(token);
  };

  const handleResend = async () => {
    if (cooldown > 0 || isResending) return;
    setIsResending(true);
    await onResendOtp();
    setIsResending(false);
    setCooldown(SITE_CONFIG.auth.resendCooldownSeconds);
  };

  const isComplete = digits.every((d) => d.length === 1);

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
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1
          style={{
            fontSize: '1.45rem',
            color: 'var(--color-deep-navy)',
            fontWeight: 600,
            marginBottom: '6px',
          }}
        >
          Verify your number
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
          Enter the 6-digit verification code sent to{' '}
          <strong style={{ color: 'var(--color-text-primary)' }}>{maskPhoneNumber(phone)}</strong>
        </p>
        <button
          onClick={onEditPhone}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-primary-blue)',
            fontSize: '0.8125rem',
            fontWeight: 500,
            cursor: 'pointer',
            marginTop: '4px',
            textDecoration: 'underline',
          }}
        >
          Edit phone number
        </button>

        {isDemoMode && (
          <div
            style={{
              marginTop: '12px',
              backgroundColor: 'var(--color-light-blue)',
              color: 'var(--color-primary-blue)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          >
            Demo Mode: Enter any 6 digits (e.g. <code>123456</code>) to proceed.
          </div>
        )}
      </div>

      {/* Error Feedback */}
      {error && (
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
          <span>{error}</span>
        </div>
      )}

      {/* 6-Digit OTP Form */}
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '24px',
          }}
        >
          {digits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={digit}
              onChange={(e) => handleDigitChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              disabled={isLoading}
              aria-label={`Digit ${idx + 1}`}
              id={`otp-digit-${idx}`}
              style={{
                width: '46px',
                height: '52px',
                fontSize: '1.25rem',
                fontWeight: 600,
                textAlign: 'center',
                backgroundColor: 'var(--color-white)',
                border: digit ? '2px solid var(--color-primary-blue)' : '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-text-primary)',
                transition: 'all var(--transition-fast)',
                outline: 'none',
              }}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading || !isComplete}
          className="btn btn-primary w-full"
          id="auth-verify-btn"
          style={{ padding: '0.75rem' }}
        >
          {isLoading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Verifying code...</span>
            </>
          ) : (
            <>
              <Check size={16} />
              <span>Verify & Continue</span>
            </>
          )}
        </button>
      </form>

      {/* Resend Cooldown Section */}
      <div
        style={{
          marginTop: '24px',
          textAlign: 'center',
          fontSize: '0.8125rem',
          color: 'var(--color-text-secondary)',
        }}
      >
        {cooldown > 0 ? (
          <span>
            Didn't receive the SMS? Resend code in{' '}
            <strong style={{ color: 'var(--color-deep-navy)' }}>{cooldown}s</strong>
          </span>
        ) : (
          <button
            onClick={handleResend}
            disabled={isResending}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-primary-blue)',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <RefreshCw size={13} className={isResending ? 'animate-spin' : ''} />
            <span>Resend verification code</span>
          </button>
        )}
      </div>

      {/* Back button */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={onEditPhone}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '0.8125rem',
            color: 'var(--color-text-secondary)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={14} />
          <span>Change phone number</span>
        </button>
      </div>
    </div>
  );
};
