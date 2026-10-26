// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Self-Publishing Services & Author-Led Guide
// ==============================================================================

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  Printer,
  Palette,
  BookOpen,
  FileCheck2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { DemoModeBanner } from '../components/common/DemoModeBanner';

export const SelfPublishingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const services = [
    {
      icon: Palette,
      title: 'Cover Design & Spine Engineering',
      desc: 'Bespoke front, spine, and back cover designs calculated precisely to your chosen paper stock thickness and trim dimensions.',
    },
    {
      icon: BookOpen,
      title: 'Interior Typesetting & Typography',
      desc: 'Professional page layout, running heads, chapter openers, margin discipline, and typographic font pairing.',
    },
    {
      icon: FileCheck2,
      title: 'Copyediting & Proofreading',
      desc: 'Detailed grammar, punctuation, cadence, and typographical correction to deliver clean, error-free reading.',
    },
    {
      icon: Printer,
      title: 'Printing & Quality Binding',
      desc: 'Access to high-grade offset and digital printing with options for paperback perfect binding, hardcover section-sewn cases, and foil stamping.',
    },
    {
      icon: Layers,
      title: 'E-Book & Digital Formatting',
      desc: 'Reflowable EPUB preparation and print-replica PDF layouts ready for digital readers and library viewing.',
    },
    {
      icon: ShieldCheck,
      title: 'Production Oversight & Quality Control',
      desc: 'Physical proof approval, ink-density inspections, and direct batch dispatch to your specified address.',
    },
  ];

  const faqs = [
    {
      q: 'Do I retain 100% of my intellectual property and copyright?',
      a: 'Yes. In self-publishing service agreements with Medhankar, you retain complete copyright, editorial control, and all future adaptation rights to your work.',
    },
    {
      q: 'How is pricing determined for self-publishing services?',
      a: 'Pricing is based strictly on your chosen scope—such as manuscript word count for editing, page complexity for typesetting, print run quantity, paper specifications, and binding style. We provide custom quotations tailored to your exact specifications rather than fixed generic packages.',
    },
    {
      q: 'Can I choose only printing without editing or design services?',
      a: 'Yes. Our services are modular. If you already have finished print-ready PDF files prepared according to printer specifications, our press can handle printing and binding directly.',
    },
    {
      q: 'What formats can you manufacture?',
      a: 'We manufacture standard paperbacks, deluxe hardcovers with dust jackets, staple-bound brochures, and digital format files (EPUB and PDF).',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <DemoModeBanner />
      <Navbar />

      <main style={{ flex: 1, backgroundColor: 'var(--color-bg-main)' }}>
        {/* Editorial Hero */}
        <section
          style={{
            padding: '72px 0 64px',
            backgroundColor: 'var(--color-white)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="container" style={{ maxWidth: '880px', textAlign: 'center' }}>
            <span className="eyebrow">Author-Led Services</span>
            <h1 className="headline-hero" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', marginBottom: '18px' }}>
              Professional Self-Publishing Services
            </h1>
            <p className="subheadline" style={{ fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '720px', margin: '0 auto 32px' }}>
              Retain complete creative control and copyright while leveraging Medhankar’s printing
              heritage, interior typesetting, and cover design expertise.
            </p>
            <Link to="/contact" className="btn btn-navy btn-lg" id="self-enquiry-hero-btn">
              <span>Request a Publishing Quotation</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* Section: The Author's Role */}
        <section style={{ padding: '72px 0', borderBottom: '1px solid var(--color-border)' }}>
          <div className="container" style={{ maxWidth: '960px' }}>
            <div style={{ textAlign: 'center', marginBottom: '44px' }}>
              <span className="eyebrow">Creative Ownership</span>
              <h2 className="headline-section">The Author's Freedom &amp; Control</h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              <div className="card" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Check size={18} color="var(--color-success)" />
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--color-deep-navy)' }}>
                    Total Rights Retention
                  </h3>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  You maintain 100% ownership of your text, characters, adaptations, and commercial
                  earnings without assigning perpetual publishing licenses.
                </p>
              </div>

              <div className="card" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Check size={18} color="var(--color-success)" />
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--color-deep-navy)' }}>
                    Author-Guided Vision
                  </h3>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  You approve cover art concepts, typographic hierarchies, paper textures, and final
                  proofs before anything goes to press.
                </p>
              </div>

              <div className="card" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Check size={18} color="var(--color-success)" />
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--color-deep-navy)' }}>
                    Tailored Run Quantities
                  </h3>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Print quantities calibrated to your needs—from short limited batches for private
                  circles to commercial print runs for broad reach.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Available Services */}
        <section
          style={{
            padding: '72px 0',
            backgroundColor: 'var(--color-white)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
              <span className="eyebrow">Modular Services</span>
              <h2 className="headline-section" style={{ marginBottom: '12px' }}>
                Craftsmanship at every stage
              </h2>
              <p className="subheadline">
                Select only the services your project requires.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '28px',
              }}
            >
              {services.map((srv, idx) => {
                const Icon = srv.icon;
                return (
                  <div key={idx} className="card" style={{ padding: '28px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-light-blue)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px',
                      }}
                    >
                      <Icon size={20} color="var(--color-primary-blue)" />
                    </div>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--color-deep-navy)', marginBottom: '8px' }}>
                      {srv.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                      {srv.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section: Transparent Scope & Pricing Policy */}
        <section style={{ padding: '72px 0', borderBottom: '1px solid var(--color-border)' }}>
          <div className="container" style={{ maxWidth: '840px' }}>
            <div
              className="card"
              style={{
                padding: '36px',
                backgroundColor: 'var(--color-white)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h3
                className="font-serif"
                style={{ fontSize: '1.45rem', color: 'var(--color-deep-navy)', marginBottom: '14px' }}
              >
                Scope &amp; Pricing Transparency
              </h3>
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.65,
                  marginBottom: '16px',
                }}
              >
                Medhankar does not market inflated or rigid "one-size-fits-all" bundles with hidden
                costs. Because book projects differ in page count, paper caliper, binding technique,
                and editorial requirements, all service agreements are scoped item-by-item:
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                  backgroundColor: 'var(--color-bg-subtle)',
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '20px',
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--color-deep-navy)', display: 'block' }}>
                    1. Editorial Polish
                  </strong>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                    Calculated per word count based on required editing depth.
                  </span>
                </div>
                <div>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--color-deep-navy)', display: 'block' }}>
                    2. Typesetting &amp; Design
                  </strong>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                    Priced on layout complexity, tables, illustrations, and cover art.
                  </span>
                </div>
                <div>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--color-deep-navy)', display: 'block' }}>
                    3. Manufacturing &amp; Print
                  </strong>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                    Based on exact paper stock weight, binding, and quantity ordered.
                  </span>
                </div>
              </div>

              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                You will receive a clear, line-item quotation prior to committing to any production work.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Frequently Asked Questions */}
        <section
          style={{
            padding: '72px 0',
            backgroundColor: 'var(--color-white)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="container" style={{ maxWidth: '800px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="eyebrow">Author Inquiries</span>
              <h2 className="headline-section">Frequently Asked Questions</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    style={{
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      backgroundColor: 'var(--color-white)',
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      style={{
                        width: '100%',
                        padding: '18px 20px',
                        background: 'none',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        color: 'var(--color-deep-navy)',
                      }}
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    {isOpen && (
                      <div
                        style={{
                          padding: '0 20px 18px',
                          fontSize: '0.875rem',
                          color: 'var(--color-text-secondary)',
                          lineHeight: 1.6,
                        }}
                      >
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section: Enquiry CTA */}
        <section style={{ padding: '80px 0', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '640px' }}>
            <h2 className="headline-section" style={{ marginBottom: '14px' }}>
              Ready to bring your book to life?
            </h2>
            <p className="subheadline" style={{ marginBottom: '28px' }}>
              Tell us your target specifications and our production desk will prepare a transparent
              quotation.
            </p>
            <Link to="/contact" className="btn btn-navy btn-lg" id="self-contact-cta-btn">
              <span>Start a Self-Publishing Enquiry</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
