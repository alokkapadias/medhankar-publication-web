// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Supabase Phone Authentication Setup Guide & Documentation
// ==============================================================================

import React, { useState } from 'react';
import { KeyRound, ShieldAlert, CheckCircle2, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

interface SupabaseSetupGuideProps {
  onEnableDemoMode?: () => void;
}

export const SupabaseSetupGuide: React.FC<SupabaseSetupGuideProps> = ({ onEnableDemoMode }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isDltExpanded, setIsDltExpanded] = useState<boolean>(false);

  const envSample = `VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
VITE_ENABLE_DEMO_AUTH=true`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(envSample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px',
        boxShadow: 'var(--shadow-sm)',
        maxWidth: '560px',
        margin: '0 auto',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-light-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <KeyRound size={20} color="var(--color-primary-blue)" />
        </div>
        <div>
          <h3 style={{ fontSize: '1.05rem', color: 'var(--color-deep-navy)', fontWeight: 600 }}>
            Supabase Phone OTP Setup Required
          </h3>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
            Real SMS authentication requires connected credentials.
          </p>
        </div>
      </div>

      <p
        style={{
          fontSize: '0.875rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.55,
          marginBottom: '16px',
        }}
      >
        To enable production SMS delivery to Indian mobile subscribers, add your Supabase project keys to your local{' '}
        <code>.env</code> file or your Netlify Site Configuration environment variables:
      </p>

      {/* Code Snippet */}
      <div
        style={{
          backgroundColor: '#1E293B',
          color: '#E2E8F0',
          borderRadius: 'var(--radius-md)',
          padding: '14px',
          fontSize: '0.8125rem',
          fontFamily: 'monospace',
          position: 'relative',
          marginBottom: '16px',
        }}
      >
        <button
          onClick={copyToClipboard}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#FFFFFF',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '0.75rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
          aria-label="Copy environment variables"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        <pre style={{ margin: 0, overflowX: 'auto', lineHeight: 1.6 }}>{envSample}</pre>
      </div>

      {/* Indian Messaging & DLT Compliance Accordion */}
      <div
        style={{
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '20px',
          overflow: 'hidden',
        }}
      >
        <button
          onClick={() => setIsDltExpanded(!isDltExpanded)}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'var(--color-bg-subtle)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--color-deep-navy)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={16} color="var(--color-warning)" />
            <span>Indian SMS & TRAI DLT Compliance Checklist</span>
          </div>
          {isDltExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {isDltExpanded && (
          <div style={{ padding: '14px 16px', fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            <p style={{ marginBottom: '8px' }}>
              For SMS delivery within India (+91), the Telecom Regulatory Authority of India (TRAI) mandates:
            </p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li>
                <strong>Principal Entity (PE) Registration:</strong> Register company entity on telecom DLT portals (e.g., Jio, Airtel, Vodafone Idea).
              </li>
              <li>
                <strong>Header/Sender ID:</strong> Register a 6-character sender header (e.g., <code>MDHNKR</code>).
              </li>
              <li>
                <strong>Content Template:</strong> Register the explicit OTP message format with TRAI approval.
              </li>
              <li>
                <strong>SMS Gateway in Supabase:</strong> Connect your registered Twilio or custom SMS provider credentials inside <em>Supabase Authentication &gt; Providers &gt; Phone</em>.
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Demonstration Mode Alternative Action */}
      {onEnableDemoMode && (
        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-light-blue)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(36, 87, 197, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} color="var(--color-primary-blue)" />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-deep-navy)' }}>
              Interactive Demonstration Mode
            </span>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
            You can evaluate the complete user interface, phone input validation, OTP verification screen, and the authenticated Medhankar Library using local demo authentication.
          </p>
          <button
            onClick={onEnableDemoMode}
            className="btn btn-primary btn-sm"
            style={{ alignSelf: 'flex-start', marginTop: '6px' }}
            id="enable-demo-mode-btn"
          >
            Continue with Demonstration Mode
          </button>
        </div>
      )}
    </div>
  );
};
