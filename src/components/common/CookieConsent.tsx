// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Refined Cookie Consent Banner & Preferences Modal
// ==============================================================================

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Sliders, X, Check } from 'lucide-react';
import { cookieConsentRepository } from '../../lib/storage';
import type { CookiePreferences } from '../../types';

export const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);

  // Modal custom state
  const [allowAnalytics, setAllowAnalytics] = useState<boolean>(false);
  const [allowFunctional, setAllowFunctional] = useState<boolean>(true);

  useEffect(() => {
    const existing = cookieConsentRepository.getPreferences();
    if (!existing) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const prefs: CookiePreferences = {
      type: 'all',
      necessary: true,
      analytics: true,
      functional: true,
      updatedAt: new Date().toISOString(),
    };
    cookieConsentRepository.savePreferences(prefs);
    setShowBanner(false);
  };

  const handleNecessaryOnly = () => {
    const prefs: CookiePreferences = {
      type: 'necessary',
      necessary: true,
      analytics: false,
      functional: false,
      updatedAt: new Date().toISOString(),
    };
    cookieConsentRepository.savePreferences(prefs);
    setShowBanner(false);
  };

  const handleSaveCustom = () => {
    const prefs: CookiePreferences = {
      type: 'custom',
      necessary: true,
      analytics: allowAnalytics,
      functional: allowFunctional,
      updatedAt: new Date().toISOString(),
    };
    cookieConsentRepository.savePreferences(prefs);
    setShowSettingsModal(false);
    setShowBanner(false);
  };

  if (!showBanner && !showSettingsModal) {
    return null;
  }

  return (
    <>
      {/* Bottom Sticky Cookie Banner */}
      {showBanner && !showSettingsModal && (
        <aside
          role="region"
          aria-label="Cookie consent banner"
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            right: '20px',
            maxWidth: '820px',
            margin: '0 auto',
            zIndex: 900,
            backgroundColor: 'var(--color-white)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            padding: '20px 24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div style={{ flex: '1 1 360px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '6px',
              }}
            >
              <ShieldCheck size={18} color="var(--color-primary-blue)" />
              <span
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--color-deep-navy)',
                }}
              >
                Privacy & Cookie Preferences
              </span>
            </div>
            <p
              style={{
                fontSize: '0.8125rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.5,
              }}
            >
              Medhankar uses essential cookies to ensure safe phone authentication and library
              sessions. We do not run advertising or third-party tracking scripts.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => setShowSettingsModal(true)}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.8125rem' }}
            >
              <Sliders size={14} />
              Customize
            </button>
            <button
              onClick={handleNecessaryOnly}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '0.8125rem' }}
            >
              Necessary Only
            </button>
            <button
              onClick={handleAcceptAll}
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.8125rem' }}
            >
              <Check size={14} />
              Accept All
            </button>
          </div>
        </aside>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title">
          <div className="modal-content" style={{ maxWidth: '520px', padding: '28px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '16px',
              }}
            >
              <div>
                <h3
                  id="cookie-settings-title"
                  style={{
                    fontSize: '1.2rem',
                    color: 'var(--color-deep-navy)',
                    fontWeight: 600,
                  }}
                >
                  Cookie Settings
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                  Choose which cookies you allow on Medhankar Publications.
                </p>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="btn btn-ghost btn-sm"
                style={{ padding: '6px' }}
                aria-label="Close settings"
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '20px 0' }}>
              {/* Essential */}
              <div
                style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Strictly Necessary</span>
                  <span className="badge badge-green">Always Required</span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                  Essential for Supabase phone OTP authentication, session persistence, and security tokens.
                </p>
              </div>

              {/* Functional */}
              <div
                style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-white)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block' }}>
                    Functional & Reader Preferences
                  </span>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                    Saves bookmarked books and reader text-size preferences locally.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={allowFunctional}
                  onChange={(e) => setAllowFunctional(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary-blue)' }}
                />
              </div>

              {/* Analytics */}
              <div
                style={{
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-white)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block' }}>
                    Anonymous Performance Telemetry
                  </span>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                    Provides aggregate, anonymous page-load metrics to improve reader experience.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={allowAnalytics}
                  onChange={(e) => setAllowAnalytics(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary-blue)' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button onClick={handleSaveCustom} className="btn btn-primary btn-sm">
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
