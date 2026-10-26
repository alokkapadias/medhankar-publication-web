// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Contact & Publishing Enquiry Page (/contact)
// ==============================================================================

import React, { useState } from 'react';
import { Mail, MapPin, Send, AlertCircle, Clock } from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { DemoModeBanner } from '../components/common/DemoModeBanner';
import { SITE_CONFIG } from '../lib/config';
import type { PublishingEnquiry } from '../types';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<PublishingEnquiry>({
    fullName: '',
    email: '',
    phone: '',
    publishingType: 'traditional',
    bookTitle: '',
    genre: 'Philosophy & Thought',
    manuscriptStatus: 'completed',
    synopsis: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    success: boolean;
    message: string;
    isDemoOnly?: boolean;
  } | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      errs.phone = 'Please provide a valid phone number.';
    }
    if (!formData.bookTitle.trim()) errs.bookTitle = 'Book or working title is required.';
    if (!formData.synopsis.trim() || formData.synopsis.length < 20) {
      errs.synopsis = 'Please provide at least a brief summary (minimum 20 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate validation and check for real endpoint
    setTimeout(() => {
      setIsSubmitting(false);
      // Honest state feedback: no fake delivery claims
      setSubmissionStatus({
        success: true,
        isDemoOnly: true,
        message:
          'Enquiry Validated & Staged: All form fields passed client-side validation. Because a live submission API endpoint (e.g. Supabase Edge Function or transactional mailer) is pending configuration, your enquiry has not been delivered to an active inbox. Please contact editorial directly via email.',
      });
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <DemoModeBanner />
      <Navbar />

      <main style={{ flex: 1, backgroundColor: 'var(--color-bg-main)', padding: '64px 0 88px' }}>
        <div className="container" style={{ maxWidth: '1040px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 48px' }}>
            <span className="eyebrow">Editorial &amp; Printing Desk</span>
            <h1 className="headline-hero" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)', marginBottom: '14px' }}>
              Publishing Enquiry &amp; Contact
            </h1>
            <p className="subheadline">
              Tell us about your book or printing project. Our team reviews submissions and provides
              thoughtful guidance on the appropriate publishing pathway.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '48px',
              alignItems: 'flex-start',
            }}
          >
            {/* Left: Enquiry Form */}
            <div
              className="card"
              style={{
                padding: '36px',
                backgroundColor: 'var(--color-white)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h2
                style={{
                  fontSize: '1.25rem',
                  color: 'var(--color-deep-navy)',
                  fontWeight: 600,
                  marginBottom: '20px',
                }}
              >
                Manuscript &amp; Service Enquiry Form
              </h2>

              {submissionStatus && (
                <div
                  role="status"
                  style={{
                    backgroundColor: submissionStatus.isDemoOnly ? 'var(--color-warning-bg)' : 'var(--color-success-bg)',
                    border: `1px solid ${
                      submissionStatus.isDemoOnly ? 'var(--color-warning-border)' : 'var(--color-success-border)'
                    }`,
                    color: submissionStatus.isDemoOnly ? 'var(--color-warning)' : 'var(--color-success)',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '24px',
                    fontSize: '0.8125rem',
                    lineHeight: 1.55,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                  }}
                >
                  <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>{submissionStatus.isDemoOnly ? 'Configuration Required' : 'Success'}</strong>
                    <p style={{ marginTop: '4px' }}>{submissionStatus.message}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Publishing Pathway radio selector */}
                <div className="form-group">
                  <label className="form-label">Publishing Pathway</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, publishingType: 'traditional' })}
                      className={`btn btn-sm ${
                        formData.publishingType === 'traditional' ? 'btn-primary' : 'btn-secondary'
                      }`}
                      style={{ justifyContent: 'center' }}
                    >
                      Traditional Route
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, publishingType: 'self' })}
                      className={`btn btn-sm ${
                        formData.publishingType === 'self' ? 'btn-primary' : 'btn-secondary'
                      }`}
                      style={{ justifyContent: 'center' }}
                    >
                      Self-Publishing
                    </button>
                  </div>
                </div>

                {/* Name */}
                <div className="form-group">
                  <label htmlFor="enquiry-name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    id="enquiry-name"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Author or representative name"
                    className="form-input"
                  />
                  {errors.fullName && <span className="form-error">{errors.fullName}</span>}
                </div>

                {/* Email & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label htmlFor="enquiry-email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      id="enquiry-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="author@example.com"
                      className="form-input"
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="enquiry-phone" className="form-label">
                      Phone Number *
                    </label>
                    <input
                      id="enquiry-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="form-input"
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>
                </div>

                {/* Book Title */}
                <div className="form-group">
                  <label htmlFor="enquiry-title" className="form-label">
                    Book Title / Working Title *
                  </label>
                  <input
                    id="enquiry-title"
                    type="text"
                    value={formData.bookTitle}
                    onChange={(e) => setFormData({ ...formData, bookTitle: e.target.value })}
                    placeholder="e.g. The Architecture of Ideas"
                    className="form-input"
                  />
                  {errors.bookTitle && <span className="form-error">{errors.title}</span>}
                </div>

                {/* Genre & Manuscript Stage */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label htmlFor="enquiry-genre" className="form-label">
                      Genre
                    </label>
                    <select
                      id="enquiry-genre"
                      value={formData.genre}
                      onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                      className="form-select"
                    >
                      <option value="Philosophy & Thought">Philosophy &amp; Thought</option>
                      <option value="Literature & Fiction">Literature &amp; Fiction</option>
                      <option value="Business & Leadership">Business &amp; Leadership</option>
                      <option value="Essays & Commentary">Essays &amp; Commentary</option>
                      <option value="Poetry & Reflections">Poetry &amp; Reflections</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="enquiry-status" className="form-label">
                      Manuscript Stage
                    </label>
                    <select
                      id="enquiry-status"
                      value={formData.manuscriptStatus}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          manuscriptStatus: e.target.value as PublishingEnquiry['manuscriptStatus'],
                        })
                      }
                      className="form-select"
                    >
                      <option value="concept">Concept / Proposal Only</option>
                      <option value="first-draft">Draft in Progress</option>
                      <option value="completed">Completed Manuscript</option>
                      <option value="previously-published">Previously Published</option>
                    </select>
                  </div>
                </div>

                {/* Synopsis / Details */}
                <div className="form-group">
                  <label htmlFor="enquiry-synopsis" className="form-label">
                    Synopsis &amp; Project Requirements *
                  </label>
                  <textarea
                    id="enquiry-synopsis"
                    rows={4}
                    value={formData.synopsis}
                    onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                    placeholder="Provide a brief synopsis of your book, target readership, word count estimate, and services needed..."
                    className="form-textarea"
                  />
                  {errors.synopsis && <span className="form-error">{errors.synopsis}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full"
                  id="enquiry-submit-btn"
                  style={{ padding: '0.75rem', marginTop: '12px' }}
                >
                  <Send size={16} />
                  <span>{isSubmitting ? 'Validating...' : 'Submit Publishing Enquiry'}</span>
                </button>
              </form>
            </div>

            {/* Right: Verified Company Information */}
            <div>
              <div
                className="card"
                style={{
                  padding: '32px',
                  backgroundColor: 'var(--color-white)',
                  marginBottom: '24px',
                }}
              >
                <h3 style={{ fontSize: '1.15rem', color: 'var(--color-deep-navy)', marginBottom: '16px' }}>
                  Direct Editorial Desk
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <Mail size={18} color="var(--color-primary-blue)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block' }}>
                        General &amp; Publishing Inquiries
                      </span>
                      <a
                        href={`mailto:${SITE_CONFIG.contact.officialEnquiryEmail}`}
                        style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-deep-navy)' }}
                      >
                        {SITE_CONFIG.contact.officialEnquiryEmail}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <Mail size={18} color="var(--color-primary-blue)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block' }}>
                        Editorial Board Submissions
                      </span>
                      <a
                        href={`mailto:${SITE_CONFIG.contact.editorialEmail}`}
                        style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-deep-navy)' }}
                      >
                        {SITE_CONFIG.contact.editorialEmail}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <Clock size={18} color="var(--color-primary-blue)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block' }}>
                        Editorial Desk Hours
                      </span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
                        {SITE_CONFIG.contact.businessHours}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <MapPin size={18} color="var(--color-primary-blue)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', display: 'block' }}>
                        Jurisdiction &amp; Registry
                      </span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
                        {SITE_CONFIG.contact.locationNote}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Entity Card */}
              <div
                style={{
                  padding: '24px',
                  backgroundColor: 'var(--color-bg-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.8125rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                }}
              >
                <strong style={{ color: 'var(--color-deep-navy)', display: 'block', marginBottom: '4px' }}>
                  Official Corporate Entity:
                </strong>
                {SITE_CONFIG.legalName}
                <p style={{ marginTop: '8px' }}>
                  All publishing agreements, manuscript releases, and commercial contracts are issued
                  under the registered corporate entity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
