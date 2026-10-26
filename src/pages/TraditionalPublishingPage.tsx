// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Traditional Publishing Route & Submission Guidelines
// ==============================================================================

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { DemoModeBanner } from '../components/common/DemoModeBanner';

export const TraditionalPublishingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Does Medhankar accept unagented manuscript submissions?',
      a: 'Yes, we accept proposals directly from authors as well as literary representatives. Manuscripts are evaluated based on editorial merit, thematic depth, and alignment with our catalogue priorities.',
    },
    {
      q: 'Is publication guaranteed upon submission of a proposal?',
      a: 'No. Traditional publishing involves a selective editorial evaluation. Only a limited number of works that meet our catalogue standards and commercial considerations are accepted for publication agreements.',
    },
    {
      q: 'How are royalties and rights handled under traditional contracts?',
      a: 'Specific copyright terms, territorial distribution licenses, subsidiary rights, and royalty percentages are explicitly stipulated in the formal publishing agreement executed between the author and Medhankar.',
    },
    {
      q: 'What is the expected timeline from proposal review to printing?',
      a: 'Review timelines vary depending on editorial queues. If accepted, copyediting, typographic design, proofs, and printing generally span several months to ensure production quality.',
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
            <span className="eyebrow">Editorial Imprint</span>
            <h1 className="headline-hero" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', marginBottom: '18px' }}>
              Traditional Editorial Publishing
            </h1>
            <p className="subheadline" style={{ fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '720px', margin: '0 auto 32px' }}>
              A curated partnership where our editorial board collaborates closely with selected authors
              to refine, design, manufacture, and present lasting works of literature and ideas.
            </p>
            <Link to="/contact" className="btn btn-primary btn-lg" id="trad-start-enquiry-hero-btn">
              <span>Submit Manuscript Proposal</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* Section: Who Should Consider */}
        <section style={{ padding: '72px 0', borderBottom: '1px solid var(--color-border)' }}>
          <div className="container" style={{ maxWidth: '960px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span className="eyebrow">Alignment &amp; Focus</span>
              <h2 className="headline-section">Who may consider this route</h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              <div className="card" style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-deep-navy)', marginBottom: '8px' }}>
                  Writers Seeking Editorial Collaboration
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Authors who desire in-depth structural editing, sentence-level polish, and rigorous
                  proofreading guided by an experienced editorial press.
                </p>
              </div>

              <div className="card" style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-deep-navy)', marginBottom: '8px' }}>
                  Works of Enduring Depth
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Non-fiction essays, philosophical inquiry, literary fiction, and thoughtful regional
                  narratives crafted to stand the test of time rather than transient trends.
                </p>
              </div>

              <div className="card" style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-deep-navy)', marginBottom: '8px' }}>
                  Complete Manufacturing Support
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Projects where the publishing house undertakes typography, bespoke cover art,
                  high-standard printing, binding, and agreed distribution pathways.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Proposal Materials Checklist */}
        <section
          style={{
            padding: '72px 0',
            backgroundColor: 'var(--color-white)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="container" style={{ maxWidth: '880px' }}>
            <div style={{ marginBottom: '40px' }}>
              <span className="eyebrow">Submission Criteria</span>
              <h2 className="headline-section" style={{ marginBottom: '12px' }}>
                Typical materials requested for evaluation
              </h2>
              <p className="subheadline">
                To evaluate your work fairly, our editorial board typically requests the following
                components in your initial enquiry:
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'var(--color-bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '32px',
                border: '1px solid var(--color-border)',
              }}
            >
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '18px',
                }}
              >
                {[
                  {
                    title: 'Book Synopsis (1–2 pages)',
                    desc: 'A succinct overview of the narrative arc, central argument, target readership, and distinctive premise.',
                  },
                  {
                    title: 'Sample Chapters',
                    desc: 'First two to three consecutive chapters (typically 3,000 to 5,000 words) reflecting your finalized prose style.',
                  },
                  {
                    title: 'Chapter Outline / Table of Contents',
                    desc: 'Complete overview of sections, demonstrating narrative cadence or structural progression.',
                  },
                  {
                    title: 'Author Biography & Publishing Background',
                    desc: 'Background information, prior publications (if any), and your connection to the subject matter.',
                  },
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={18} color="var(--color-primary-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ fontSize: '0.9375rem', color: 'var(--color-deep-navy)', display: 'block' }}>
                        {item.title}
                      </strong>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                        {item.desc}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section: Editorial Process Stages */}
        <section style={{ padding: '72px 0', borderBottom: '1px solid var(--color-border)' }}>
          <div className="container" style={{ maxWidth: '880px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span className="eyebrow">From Manuscript to Press</span>
              <h2 className="headline-section">Potential stages of the publishing journey</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { stage: 'Stage 1: Editorial Evaluation', desc: 'Initial reading by our editors. Works of promise proceed to peer review and board review.' },
                { stage: 'Stage 2: Publishing Agreement', desc: 'If accepted, an agreement details rights, territory, production standards, and royalty terms.' },
                { stage: 'Stage 3: Developmental & Copyediting', desc: 'Detailed line-by-line editorial polish, proof queries, and stylistic harmonization.' },
                { stage: 'Stage 4: Typesetting & Cover Design', desc: 'Custom grid design, font selection, spine calculation, and foil/emboss specifications.' },
                { stage: 'Stage 5: Proof Approval & Printing', desc: 'Author verification of final printer proofs before offset production commences.' },
                { stage: 'Stage 6: Catalogue Release & Distribution', desc: 'Book launch, metadata registration, and distribution across agreed channels.' },
              ].map((st, idx) => (
                <div
                  key={idx}
                  className="card"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '18px',
                    padding: '20px 24px',
                  }}
                >
                  <span
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-light-blue)',
                      color: 'var(--color-primary-blue)',
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}
                  </span>
                  <div>
                    <h3 style={{ fontSize: '1rem', color: 'var(--color-deep-navy)', marginBottom: '4px' }}>
                      {st.stage}
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
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
              <span className="eyebrow">Common Questions</span>
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
              Ready to submit your proposal?
            </h2>
            <p className="subheadline" style={{ marginBottom: '28px' }}>
              Send an overview of your manuscript to our editorial desk.
            </p>
            <Link to="/contact" className="btn btn-primary btn-lg" id="trad-contact-cta-btn">
              <span>Start an Editorial Enquiry</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
