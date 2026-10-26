// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Terms of Use Placeholder (Requiring Legal Review) (/terms)
// ==============================================================================

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { DemoModeBanner } from '../components/common/DemoModeBanner';
import { SITE_CONFIG } from '../lib/config';

export const TermsPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <DemoModeBanner />
      <Navbar />

      <main style={{ flex: 1, backgroundColor: 'var(--color-bg-main)', padding: '64px 0 88px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="eyebrow">Legal &amp; Governance</span>
            <h1 className="headline-hero" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', marginBottom: '14px' }}>
              Terms of Use
            </h1>
            <p className="subheadline">
              Governing use of digital services and publication offerings for {SITE_CONFIG.legalName}.
            </p>
          </div>

          {/* Legal Review Notice */}
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: 'var(--color-warning-bg)',
              border: '1px solid var(--color-warning-border)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              marginBottom: '32px',
              color: 'var(--color-warning)',
              fontSize: '0.875rem',
            }}
          >
            <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong>Business &amp; Legal Review Placeholder</strong>
              <p style={{ marginTop: '4px', lineHeight: 1.5 }}>
                The terms below represent provisional operational principles for this digital release.
                Formal contractual agreements, commercial terms of sale, and publication deeds will be
                ratified by company legal counsel prior to commerce activation.
              </p>
            </div>
          </div>

          <div
            className="card"
            style={{
              padding: '40px',
              backgroundColor: 'var(--color-white)',
              display: 'flex',
              flexDirection: 'column',
              gap: '28px',
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--color-deep-navy)', marginBottom: '10px' }}>
                1. Acceptance of Platform Terms
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                By accessing this digital platform, creating an account via mobile phone verification,
                or exploring the Medhankar Library, you agree to comply with standard acceptable use
                practices and applicable laws of India.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--color-deep-navy)', marginBottom: '10px' }}>
                2. Digital Catalogue &amp; Demonstration Content
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                Titles, sample excerpts, and pricing indicators currently labelled as demonstration
                content are presented for user interface evaluation and catalogue testing. Official
                book releases and authorized purchasing terms will be designated in future updates.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--color-deep-navy)', marginBottom: '10px' }}>
                3. Publishing Agreements vs. Website Terms
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                Nothing on this website constitutes a binding offer to publish, accept, or distribute
                a manuscript. All traditional publishing arrangements and self-publishing service
                engagements require an executed written contract specifying rights, schedules, and
                remuneration.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--color-deep-navy)', marginBottom: '10px' }}>
                4. Governing Law &amp; Jurisdiction
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                These terms and any operational disputes arising from the use of this website shall be
                governed by and construed in accordance with the laws of India, subject to the exclusive
                jurisdiction of courts in the state of company incorporation.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
