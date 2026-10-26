// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Site & Company Configuration
// Note: Official legal details, verified contact addresses, and registrations
// should be updated here once officially provided by company management.
// ==============================================================================

export const SITE_CONFIG = {
  brandName: 'MEDHANKAR',
  brandSubtitle: 'Graphics & Publications',
  legalName: 'MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED',
  tagline: 'Every book begins with an idea.',
  heroDescription:
    'Discover thoughtful reads, explore new authors, and find the right publishing path for your next book.',

  // Navigation Links
  navLinks: [
    { label: 'Books', href: '/#books' },
    { label: 'Self-Publishing', href: '/publishing/self-publishing' },
    { label: 'Traditional Publishing', href: '/publishing/traditional-publishing' },
    { label: 'About', href: '/about' },
  ],

  // Footer Links
  footerLinks: {
    publishing: [
      { label: 'Self-Publishing Services', href: '/publishing/self-publishing' },
      { label: 'Traditional Editorial Route', href: '/publishing/traditional-publishing' },
      { label: 'Publishing Enquiry', href: '/contact' },
    ],
    discover: [
      { label: 'Explore Books', href: '/#books' },
      { label: 'Medhankar Library', href: '/library' },
      { label: 'Sign In / Register', href: '/auth' },
    ],
    company: [
      { label: 'About the House', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' },
      { label: 'Admin Portal', href: '/admin' },
    ],
  },

  // Contact details: Set to honest placeholders awaiting business verification
  contact: {
    officialEnquiryEmail: 'enquiries@medhankarpublications.com', // Configurable official contact
    editorialEmail: 'editorial@medhankarpublications.com',
    supportPhone: '+91 (Awaiting Official Publishing Office Details)',
    locationNote: 'Registered office and publication facilities in India.',
    businessHours: 'Monday – Friday, 10:00 AM – 6:00 PM IST',
  },

  // Supabase & Auth config settings
  auth: {
    defaultCountryCode: '+91',
    otpLength: 6,
    resendCooldownSeconds: 60,
  },
};
