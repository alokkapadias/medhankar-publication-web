// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// About the Publishing House (/about)
// ==============================================================================

import React from 'react';
import { Link } from 'react-router-dom';
import { Printer, BookOpen, Compass, ArrowRight } from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { DemoModeBanner } from '../components/common/DemoModeBanner';
import { SITE_CONFIG } from '../lib/config';

export const AboutPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <DemoModeBanner />
      <Navbar />

      <main style={{ flex: 1, backgroundColor: 'var(--color-bg-main)' }}>
        {/* Editorial Hero */}
        <section
          style={{
            padding: '80px 0 64px',
            backgroundColor: 'var(--color-white)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="container" style={{ maxWidth: '840px', textAlign: 'center' }}>
            <span className="eyebrow">About the House</span>
            <h1 className="headline-hero" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', marginBottom: '20px' }}>
              Crafting Enduring Books &amp; Ideas
            </h1>
            <p className="subheadline" style={{ fontSize: '1.15rem', lineHeight: 1.6 }}>
              {SITE_CONFIG.legalName} is an independent publishing and graphic printing press
              dedicated to literary clarity, material craftsmanship, and reader discovery.
            </p>
          </div>
        </section>

        {/* Section: Heritage & Philosophy */}
        <section style={{ padding: '72px 0', borderBottom: '1px solid var(--color-border)' }}>
          <div className="container" style={{ maxWidth: '840px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <h2 className="headline-section" style={{ fontSize: '1.8rem', marginBottom: '14px' }}>
                  The Union of Editorial Vision &amp; Printing Craft
                </h2>
                <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
                  A book is more than assembled prose; it is a physical and intellectual artifact. At
                  Medhankar, we understand the intimate relationship between the weight of a sentence
                  and the tactile feel of paper stock under a reader's fingers.
                </p>
                <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                  By combining deep roots in commercial graphics and printing with a dedicated
                  editorial imprint, our house ensures that authors receive direct manufacturing
                  integrity—from baseline typographic grids to binding tolerances.
                </p>
              </div>

              {/* Pillars Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '24px',
                  marginTop: '16px',
                }}
              >
                <div className="card" style={{ padding: '24px' }}>
                  <Printer size={24} color="var(--color-primary-blue)" style={{ marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--color-deep-navy)', marginBottom: '6px' }}>
                    Manufacturing Precision
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                    Offset calibration, archival papers, and binding choices driven by printing
                    expertise rather than outsourced guesswork.
                  </p>
                </div>

                <div className="card" style={{ padding: '24px' }}>
                  <BookOpen size={24} color="var(--color-primary-blue)" style={{ marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--color-deep-navy)', marginBottom: '6px' }}>
                    Dual Publishing Pathways
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                    Thoughtful traditional publication alongside transparent, author-led self-publishing
                    services.
                  </p>
                </div>

                <div className="card" style={{ padding: '24px' }}>
                  <Compass size={24} color="var(--color-primary-blue)" style={{ marginBottom: '12px' }} />
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--color-deep-navy)', marginBottom: '6px' }}>
                    Digital Access Ecosystem
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                    Connecting physical publications with our proprietary Medhankar Library viewer,
                    phone authentication, and preview chapters.
                  </p>
                </div>
              </div>

              {/* Corporate Identity Box */}
              <div
                style={{
                  backgroundColor: 'var(--color-white)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  padding: '28px',
                  marginTop: '20px',
                }}
              >
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-deep-navy)', marginBottom: '10px' }}>
                  Corporate Registration &amp; Governance
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
                  The company operates under the registered name <strong>{SITE_CONFIG.legalName}</strong>. Official publishing facilities, printing units, and corporate registries are located in India.
                </p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                  For corporate, institutional, or printing enquiries, reach out through our official communications desk at{' '}
                  <a href={`mailto:${SITE_CONFIG.contact.officialEnquiryEmail}`}>
                    {SITE_CONFIG.contact.officialEnquiryEmail}
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ padding: '72px 0', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '640px' }}>
            <h2 className="headline-section" style={{ marginBottom: '12px' }}>
              Collaborate With Us
            </h2>
            <p className="subheadline" style={{ marginBottom: '28px' }}>
              Whether you are an author with a manuscript or a partner seeking quality printing, we
              welcome your enquiry.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary">
                <span>Contact Our Publishing Desk</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/library" className="btn btn-secondary">
                <span>Explore the Library</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
