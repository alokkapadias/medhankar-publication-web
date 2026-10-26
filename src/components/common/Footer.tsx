// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Corporate & Publishing House Footer
// ==============================================================================

import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../../lib/config';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-deep-navy)',
        color: 'var(--color-white)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        marginTop: 'auto',
      }}
    >
      <div className="container" style={{ padding: '64px 24px 40px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Brand & Legal Entity Column */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ marginBottom: '16px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '1.35rem',
                  letterSpacing: '0.08em',
                  color: 'var(--color-white)',
                  display: 'block',
                }}
              >
                {SITE_CONFIG.brandName}
              </span>
              <span
                style={{
                  fontSize: '0.6875rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.65)',
                  fontWeight: 500,
                }}
              >
                {SITE_CONFIG.brandSubtitle}
              </span>
            </div>

            <p
              style={{
                fontSize: '0.875rem',
                color: 'rgba(255, 255, 255, 0.72)',
                lineHeight: 1.6,
                marginBottom: '16px',
              }}
            >
              Independent publishing, printing craftsmanship, and thoughtful digital access for readers and authors.
            </p>

            <div
              style={{
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.5)',
                lineHeight: 1.5,
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                paddingTop: '12px',
              }}
            >
              <strong style={{ color: 'rgba(255, 255, 255, 0.85)', display: 'block', marginBottom: '2px' }}>
                Legal Entity:
              </strong>
              {SITE_CONFIG.legalName}
            </div>
          </div>

          {/* Publishing Links */}
          <div>
            <h4
              style={{
                fontSize: '0.8125rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(255, 255, 255, 0.55)',
                fontWeight: 600,
                marginBottom: '16px',
              }}
            >
              Publishing Pathways
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SITE_CONFIG.footerLinks.publishing.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.75)',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reader & Catalogue */}
          <div>
            <h4
              style={{
                fontSize: '0.8125rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(255, 255, 255, 0.55)',
                fontWeight: 600,
                marginBottom: '16px',
              }}
            >
              Readers & Catalogue
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SITE_CONFIG.footerLinks.discover.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.75)',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Governance */}
          <div>
            <h4
              style={{
                fontSize: '0.8125rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'rgba(255, 255, 255, 0.55)',
                fontWeight: 600,
                marginBottom: '16px',
              }}
            >
              Company & Notice
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SITE_CONFIG.footerLinks.company.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255, 255, 255, 0.75)',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            fontSize: '0.8125rem',
            color: 'rgba(255, 255, 255, 0.55)',
          }}
        >
          <div>
            © {currentYear} {SITE_CONFIG.legalName}. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link
              to="/privacy"
              style={{ color: 'rgba(255, 255, 255, 0.55)', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.55)')}
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link
              to="/terms"
              style={{ color: 'rgba(255, 255, 255, 0.55)', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.55)')}
            >
              Terms of Use
            </Link>
            <span>•</span>
            <Link
              to="/admin"
              id="footer-admin-portal-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                color: 'rgba(255, 255, 255, 0.85)',
                textDecoration: 'none',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '3px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 700,
                border: '1px solid rgba(255, 255, 255, 0.15)',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
              }}
            >
              <ShieldCheck size={13} />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
