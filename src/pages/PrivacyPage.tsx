// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Privacy Information & Data Protection Policy (/privacy)
// ==============================================================================

import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { DemoModeBanner } from '../components/common/DemoModeBanner';
import { SITE_CONFIG } from '../lib/config';

export const PrivacyPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <DemoModeBanner />
      <Navbar />

      <main style={{ flex: 1, backgroundColor: 'var(--color-bg-main)', padding: '64px 0 88px' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="eyebrow">Privacy &amp; Data Protection</span>
            <h1 className="headline-hero" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', marginBottom: '14px' }}>
              Privacy Policy
            </h1>
            <p className="subheadline">
              How {SITE_CONFIG.legalName} collects, protects, and respects your reader and author
              information.
            </p>
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
                1. Overview &amp; Commitment
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                {SITE_CONFIG.legalName} ("Medhankar", "we", "us") values your privacy. We design our
                digital reading services, telephone verification mechanisms, and manuscript enquiry
                systems to collect only the minimal data necessary to fulfill genuine user requests.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--color-deep-navy)', marginBottom: '10px' }}>
                2. Phone Number &amp; OTP Authentication
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: '10px' }}>
                When you access the Medhankar Library, we authenticate your session using SMS one-time
                passwords (OTP) managed securely through Supabase Authentication.
              </p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                <li>Your phone number is used solely to generate authentication challenges and identify your library bookmarks.</li>
                <li>We do not sell, rent, or lease mobile numbers to third-party telemarketers or advertisers.</li>
                <li>OTP verification tokens are single-use, time-bound, and never exposed in client logs or browser storage.</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--color-deep-navy)', marginBottom: '10px' }}>
                3. Cookie Consent &amp; Local Storage
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.65, marginBottom: '10px' }}>
                We use browser localStorage exclusively for essential functional purposes:
              </p>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                <li>Maintaining authentication tokens across browser sessions.</li>
                <li>Storing your bookmarked titles and reader font preferences locally on your device.</li>
                <li>Persisting your explicit cookie consent settings.</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--color-deep-navy)', marginBottom: '10px' }}>
                4. Manuscript Submissions &amp; Intellectual Property
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                Manuscripts, synopses, and sample chapters submitted via our publishing enquiry desk
                remain the exclusive intellectual property of the author. Submissions are treated
                confidentially by our editorial board and are not shared with external entities.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--color-deep-navy)', marginBottom: '10px' }}>
                5. Contacting the Data Privacy Officer
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                For questions regarding data processing, deletion requests, or Indian Digital Personal
                Data Protection (DPDP) queries, contact our desk at{' '}
                <a href={`mailto:${SITE_CONFIG.contact.officialEnquiryEmail}`}>
                  {SITE_CONFIG.contact.officialEnquiryEmail}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
