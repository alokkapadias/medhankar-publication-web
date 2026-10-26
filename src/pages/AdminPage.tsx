// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Admin Portal: Live Hero Slider & Content Manager
// Cloudinary Media Upload + Firebase Firestore Real-Time Synchronization
// ==============================================================================

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Upload,
  Save,
  Plus,
  Trash2,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Eye,
  LogOut,
  BookOpen,
  Palette,
  Lock,
  Copy,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { uploadImageToCloudinary } from '../lib/cloudinary';
import {
  subscribeHeroSlides,
  saveHeroSlide,
  deleteHeroSlide,
  seedDefaultHeroSlides,
  DEFAULT_HERO_SLIDES,
  type HeroSlideData,
} from '../services/heroSlidesService';
import { DEMO_BOOKS } from '../data/demoBooks';

export const AdminPage: React.FC = () => {
  const { user, signInWithEmail, signUpWithEmail, signOut } = useAuth();

  // Slides State
  const [slides, setSlides] = useState<HeroSlideData[]>(DEFAULT_HERO_SLIDES);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  // Edit Buffer for the currently selected slide
  const [currentEdit, setCurrentEdit] = useState<HeroSlideData>(DEFAULT_HERO_SLIDES[0]);

  // Upload States
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploadingBg, setIsUploadingBg] = useState<boolean>(false);
  const [bgUploadProgress, setBgUploadProgress] = useState<number>(0);

  // Save States & Alerts
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [saveErrorMsg, setSaveErrorMsg] = useState<string | null>(null);
  const [copiedRules, setCopiedRules] = useState<boolean>(false);

  // Admin Credentials provided for Firebase Auth
  const [loginEmail, setLoginEmail] = useState<string>('admin@medhankarpublication.com');
  const [loginPassword, setLoginPassword] = useState<string>('Medhankarpub@5u');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Subscribe to real-time Firestore updates
  useEffect(() => {
    const unsubscribe = subscribeHeroSlides(
      (data) => {
        if (data && data.length > 0) {
          setSlides(data);
          // Keep current edit synced
          setCurrentEdit((prev) => {
            const matched = data.find((s) => s.id === prev.id);
            return matched || data[0];
          });
        }
      },
      (err) => {
        console.warn('Firestore subscription fallback:', err);
      }
    );

    return () => unsubscribe();
  }, []);

  // Update active slide edit buffer when tab changes
  const handleSelectSlide = (index: number) => {
    setActiveSlideIndex(index);
    if (slides[index]) {
      setCurrentEdit({ ...slides[index] });
    }
  };

  // Form field change handler
  const handleFieldChange = (field: keyof HeroSlideData, value: any) => {
    setCurrentEdit((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Upload Book Image to Cloudinary
  const handleBookImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    setUploadProgress(10);
    setSaveErrorMsg(null);

    try {
      const secureUrl = await uploadImageToCloudinary(file, (percent) => {
        setUploadProgress(percent);
      });
      handleFieldChange('bookImage', secureUrl);
      setSaveSuccessMsg('Image uploaded to Cloudinary! Click "Save Slide to Firestore" to persist.');
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    } catch (err: any) {
      setSaveErrorMsg(err.message || 'Cloudinary upload failed.');
    } finally {
      setIsUploadingImage(false);
      setUploadProgress(0);
      e.target.value = '';
    }
  };

  // Upload Custom Background Image to Cloudinary
  const handleBgImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingBg(true);
    setBgUploadProgress(10);
    setSaveErrorMsg(null);

    try {
      const secureUrl = await uploadImageToCloudinary(file, (percent) => {
        setBgUploadProgress(percent);
      });
      handleFieldChange('backgroundImage', secureUrl);
      setSaveSuccessMsg('Background image uploaded to Cloudinary!');
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    } catch (err: any) {
      setSaveErrorMsg(err.message || 'Background upload failed.');
    } finally {
      setIsUploadingBg(false);
      setBgUploadProgress(0);
      e.target.value = '';
    }
  };

  // Save current slide to Firestore
  const handleSaveCurrentSlide = async () => {
    setIsSaving(true);
    setSaveSuccessMsg(null);
    setSaveErrorMsg(null);

    try {
      await saveHeroSlide(currentEdit);
      setSaveSuccessMsg(`Slide "${currentEdit.titleLine2 || currentEdit.id}" saved to Firestore successfully! Live changes are now visible on the website.`);
      setTimeout(() => setSaveSuccessMsg(null), 5000);
    } catch (err: any) {
      console.error('Error saving slide:', err);
      setSaveErrorMsg(err.message || 'Failed to save to Firestore. Check permissions.');
    } finally {
      setIsSaving(false);
    }
  };

  // Add new slide
  const handleAddNewSlide = async () => {
    const newId = `slide-${Date.now()}`;
    const newSlide: HeroSlideData = {
      id: newId,
      orderIndex: slides.length,
      badge: 'NEW RELEASE',
      titleLine1: 'नई पुस्तक की',
      titleLine2: 'शीर्षक',
      tagline: 'यहाँ अपनी पुस्तक का संक्षिप्त और सुरुचिपूर्ण विवरण लिखें।',
      bookSlug: DEMO_BOOKS[0]?.slug || 'vaishali-ki-amrapali',
      bookImage: '/book-on-pedestal.png',
      isPreRendered3D: true,
      paperbackPrice: '₹499',
      digitalPrice: '₹249',
      backgroundColor: '',
      backgroundImage: '',
    };

    setIsSaving(true);
    try {
      await saveHeroSlide(newSlide);
      setCurrentEdit(newSlide);
      setActiveSlideIndex(slides.length);
      setSaveSuccessMsg('New slide added to Firestore!');
      setTimeout(() => setSaveSuccessMsg(null), 3000);
    } catch (err: any) {
      setSaveErrorMsg(err.message || 'Failed to create slide.');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete current slide
  const handleDeleteSlide = async (slideId: string) => {
    if (slides.length <= 1) {
      alert('You must have at least one slide in the hero showcase.');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this slide from Firestore?')) {
      return;
    }

    setIsSaving(true);
    try {
      await deleteHeroSlide(slideId);
      const remaining = slides.filter((s) => s.id !== slideId);
      setSlides(remaining);
      setActiveSlideIndex(0);
      setCurrentEdit(remaining[0] || DEFAULT_HERO_SLIDES[0]);
      setSaveSuccessMsg('Slide removed from Firestore.');
      setTimeout(() => setSaveSuccessMsg(null), 3000);
    } catch (err: any) {
      setSaveErrorMsg(err.message || 'Failed to delete slide.');
    } finally {
      setIsSaving(false);
    }
  };

  // Seed default slides into Firestore
  const handleSeedDefaults = async () => {
    if (!window.confirm('Reset/Seed default slides into Firestore? This will restore the official reference slides.')) {
      return;
    }
    setIsSaving(true);
    try {
      await seedDefaultHeroSlides();
      setSaveSuccessMsg('Default slides successfully seeded to Firestore!');
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    } catch (err: any) {
      setSaveErrorMsg(err.message || 'Failed to seed default slides.');
    } finally {
      setIsSaving(false);
    }
  };

  // Copy Firestore Security Rules to clipboard
  const copyFirestoreRules = () => {
    const rulesCode = `rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // 1. Hero Slides Collection (Public read, Admin write)
    match /hero_slides/{slideId} {
      allow read: if true;
      allow write: if request.auth != null && (
        request.auth.token.email == 'admin@medhankarpublication.com' ||
        request.auth.token.email == 'admin@medhankarpublications.com'
      );
    }

    // 2. Default Access (Authenticated write, public read)
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}`;
    navigator.clipboard.writeText(rulesCode);
    setCopiedRules(true);
    setTimeout(() => setCopiedRules(false), 3000);
  };

  // Handle Login with auto-create fallback if user doesn't exist yet
  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);
    let res = await signInWithEmail(loginEmail, loginPassword);
    if (!res.success) {
      // If user does not exist in Firebase Auth yet, automatically register the admin account
      const signUpRes = await signUpWithEmail(loginEmail, loginPassword);
      if (signUpRes.success) {
        res = { success: true };
      } else {
        setLoginError(res.error || signUpRes.error || 'Authentication failed. Please verify credentials.');
      }
    }
    setIsLoggingIn(false);
  };

  // Quick Admin Access with automatic Firebase Auth session
  const handleQuickAdminAccess = async () => {
    setIsLoggingIn(true);
    let res = await signInWithEmail('admin@medhankarpublication.com', 'Medhankarpub@5u');
    if (!res.success) {
      await signUpWithEmail('admin@medhankarpublication.com', 'Medhankarpub@5u');
    }
    sessionStorage.setItem('medhankar_admin_override', 'true');
    setIsLoggingIn(false);
  };

  const hasAdminOverride = sessionStorage.getItem('medhankar_admin_override') === 'true';
  const isAuthenticated = Boolean(user) || hasAdminOverride;

  return (
    <div className="medhankar-admin-root">
      {/* Top Navigation Bar */}
      <header className="medhankar-admin-header">
        <div className="medhankar-admin-header-inner">
          <div className="medhankar-admin-brand">
            <Link to="/" className="medhankar-admin-logo-link">
              <span className="medhankar-admin-logo-title">MEDHANKAR</span>
              <span className="medhankar-admin-logo-badge">ADMIN PORTAL</span>
            </Link>
          </div>

          <div className="medhankar-admin-nav-actions">
            <Link to="/" className="medhankar-admin-btn-secondary" title="View Live Website">
              <ExternalLink size={15} />
              <span>Live Website</span>
            </Link>

            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  sessionStorage.removeItem('medhankar_admin_override');
                  signOut();
                }}
                className="medhankar-admin-btn-logout"
                title="Sign Out"
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            ) : null}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="medhankar-admin-main">
        {!isAuthenticated ? (
          /* Firebase Auth Login Card */
          <div className="medhankar-admin-login-wrapper">
            <div className="medhankar-admin-login-card">
              <div className="medhankar-admin-lock-icon">
                <Lock size={32} />
              </div>
              <h2 className="medhankar-admin-login-title">Medhankar Administration</h2>
              <p className="medhankar-admin-login-desc">
                Sign in with Firebase to modify hero banners, upload Cloudinary assets, and synchronize Firestore content.
              </p>

              {loginError && (
                <div className="medhankar-alert-error">
                  <AlertCircle size={16} />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="medhankar-admin-form">
                <div className="medhankar-form-group">
                  <label>Admin Email</label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@medhankarpublications.com"
                    required
                  />
                </div>

                <div className="medhankar-form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="medhankar-btn-primary medhankar-fullwidth"
                >
                  {isLoggingIn ? 'Verifying with Firebase...' : 'Sign In with Firebase'}
                </button>
              </form>

              <div className="medhankar-admin-divider">
                <span>OR</span>
              </div>

              {/* Instant Admin Access Button */}
              <button
                type="button"
                onClick={handleQuickAdminAccess}
                className="medhankar-btn-accent medhankar-fullwidth"
              >
                <ShieldCheck size={18} />
                <span>One-Click Admin Access</span>
              </button>
            </div>
          </div>
        ) : (
          /* Admin Dashboard: Hero Slider & Cloudinary/Firestore Management */
          <div className="medhankar-dashboard-content">
            {/* Alert Messages */}
            {saveSuccessMsg && (
              <div className="medhankar-alert-success">
                <CheckCircle2 size={18} />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            {saveErrorMsg && (
              <div className="medhankar-alert-error" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <AlertCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{saveErrorMsg}</div>
                  {saveErrorMsg.toLowerCase().includes('permission') && (
                    <div style={{ marginTop: '8px', fontSize: '0.84rem', lineHeight: 1.5, color: '#7F1D1D' }}>
                      <p style={{ margin: '0 0 6px 0' }}>
                        Firebase Firestore Security Rules currently have <code>allow read, write: if false;</code>, which blocks client writes.
                      </p>
                      <button
                        type="button"
                        onClick={copyFirestoreRules}
                        style={{
                          background: '#991B1B',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '6px 14px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          marginTop: '4px',
                        }}
                      >
                        {copiedRules ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedRules ? 'Copied to Clipboard!' : 'Copy Recommended Firestore Rules'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Dashboard Title Bar */}
            <div className="medhankar-dash-topbar">
              <div>
                <h1 className="medhankar-dash-heading">Hero Showcase Management</h1>
                <p className="medhankar-dash-subheading">
                  Synchronized with Cloudinary (<code className="medhankar-code">tqachgfb</code>) & Firebase Firestore (<code className="medhankar-code">hero_slides</code>).
                </p>
              </div>

              <div className="medhankar-dash-actions">
                <button
                  type="button"
                  onClick={handleSeedDefaults}
                  disabled={isSaving}
                  className="medhankar-btn-outline"
                  title="Restore standard demonstration slides"
                >
                  <RefreshCw size={15} />
                  <span>Restore Defaults</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddNewSlide}
                  disabled={isSaving}
                  className="medhankar-btn-accent"
                >
                  <Plus size={16} />
                  <span>Add New Slide</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveCurrentSlide}
                  disabled={isSaving}
                  className="medhankar-btn-primary"
                >
                  <Save size={16} />
                  <span>{isSaving ? 'Saving to Firestore...' : 'Save to Firestore'}</span>
                </button>
              </div>
            </div>

            {/* Slide Navigation Tabs */}
            <div className="medhankar-slide-tabs-bar">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectSlide(idx)}
                  className={`medhankar-slide-tab ${idx === activeSlideIndex ? 'is-active' : ''}`}
                >
                  <div className="medhankar-tab-thumb-box">
                    <img
                      src={s.bookImage || '/book-on-pedestal.png'}
                      alt=""
                      className="medhankar-tab-thumb"
                    />
                  </div>
                  <div className="medhankar-tab-info">
                    <span className="medhankar-tab-number">Slide {idx + 1}</span>
                    <span className="medhankar-tab-title">{s.titleLine2 || 'Untitled'}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Editor & Live Preview Grid */}
            <div className="medhankar-editor-layout">
              {/* Left Column: Edit Form */}
              <div className="medhankar-editor-card">
                <div className="medhankar-editor-header">
                  <div className="medhankar-editor-header-text">
                    <h3>Edit Slide {activeSlideIndex + 1}</h3>
                    <span>ID: {currentEdit.id}</span>
                  </div>

                  {slides.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteSlide(currentEdit.id)}
                      className="medhankar-btn-danger"
                      title="Delete this slide"
                    >
                      <Trash2 size={15} />
                      <span>Delete</span>
                    </button>
                  )}
                </div>

                <div className="medhankar-form-grid">
                  {/* Badge Text */}
                  <div className="medhankar-form-group">
                    <label>Badge Text</label>
                    <input
                      type="text"
                      value={currentEdit.badge}
                      onChange={(e) => handleFieldChange('badge', e.target.value)}
                      placeholder="e.g. FEATURED BOOK"
                    />
                  </div>

                  {/* Book Catalog Slug */}
                  <div className="medhankar-form-group">
                    <label>Catalog Book Slug</label>
                    <select
                      value={currentEdit.bookSlug}
                      onChange={(e) => handleFieldChange('bookSlug', e.target.value)}
                    >
                      {DEMO_BOOKS.map((b) => (
                        <option key={b.slug} value={b.slug}>
                          {b.title} ({b.slug})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Hindi Title Line 1 */}
                  <div className="medhankar-form-group">
                    <label>Hindi Title Line 1 (Sub-title)</label>
                    <input
                      type="text"
                      value={currentEdit.titleLine1}
                      onChange={(e) => handleFieldChange('titleLine1', e.target.value)}
                      placeholder="e.g. वैशाली की"
                    />
                  </div>

                  {/* Hindi Title Line 2 */}
                  <div className="medhankar-form-group">
                    <label>Hindi Title Line 2 (Primary Display)</label>
                    <input
                      type="text"
                      value={currentEdit.titleLine2}
                      onChange={(e) => handleFieldChange('titleLine2', e.target.value)}
                      placeholder="e.g. आम्रपाली"
                    />
                  </div>

                  {/* Tagline / Description */}
                  <div className="medhankar-form-group medhankar-col-span-2">
                    <label>Supporting Description (Tagline)</label>
                    <textarea
                      rows={2}
                      value={currentEdit.tagline}
                      onChange={(e) => handleFieldChange('tagline', e.target.value)}
                      placeholder="e.g. इतिहास, संस्कृति और आम्रपाली की अनकही गाथा।"
                    />
                  </div>

                  {/* --------------------------------------------------------
                      CLOUDINARY IMAGE UPLOAD SECTION
                      -------------------------------------------------------- */}
                  <div className="medhankar-form-group medhankar-col-span-2 medhankar-upload-section">
                    <label className="medhankar-upload-label">
                      <ImageIcon size={16} />
                      <span>Book Artwork (Direct Cloudinary Upload)</span>
                    </label>

                    <div className="medhankar-upload-container">
                      <div className="medhankar-upload-preview">
                        <img
                          src={currentEdit.bookImage || '/book-on-pedestal.png'}
                          alt="Preview"
                          className="medhankar-upload-img"
                        />
                      </div>

                      <div className="medhankar-upload-controls">
                        <label className="medhankar-upload-btn">
                          <Upload size={16} />
                          <span>{isUploadingImage ? `Uploading (${uploadProgress}%)...` : 'Upload from Device to Cloudinary'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleBookImageUpload}
                            disabled={isUploadingImage}
                            style={{ display: 'none' }}
                          />
                        </label>

                        {isUploadingImage && (
                          <div className="medhankar-progress-box">
                            <div
                              className="medhankar-progress-fill"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        )}

                        <div className="medhankar-url-input-box">
                          <span className="medhankar-url-prefix">URL:</span>
                          <input
                            type="text"
                            value={currentEdit.bookImage}
                            onChange={(e) => handleFieldChange('bookImage', e.target.value)}
                            placeholder="https://res.cloudinary.com/tqachgfb/..."
                            className="medhankar-url-field"
                          />
                        </div>

                        <label className="medhankar-checkbox-row">
                          <input
                            type="checkbox"
                            checked={currentEdit.isPreRendered3D}
                            onChange={(e) => handleFieldChange('isPreRendered3D', e.target.checked)}
                          />
                          <span>Artwork is 3D Isolated PNG (Pedestal/Transparent)</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* --------------------------------------------------------
                      BACKGROUND CUSTOMIZATION SECTION
                      -------------------------------------------------------- */}
                  <div className="medhankar-form-group medhankar-col-span-2 medhankar-bg-section">
                    <label className="medhankar-upload-label">
                      <Palette size={16} />
                      <span>Slide Background Styling (Optional)</span>
                    </label>

                    <div className="medhankar-bg-controls">
                      <div className="medhankar-bg-presets">
                        <span className="medhankar-preset-label">Quick Presets:</span>
                        <button
                          type="button"
                          className="medhankar-preset-btn"
                          onClick={() => handleFieldChange('backgroundColor', '')}
                        >
                          Default Apple Blueprint
                        </button>
                        <button
                          type="button"
                          className="medhankar-preset-btn"
                          onClick={() => handleFieldChange('backgroundColor', 'linear-gradient(135deg, #F0FDF4 0%, #E0F2FE 100%)')}
                        >
                          Mint Studio
                        </button>
                        <button
                          type="button"
                          className="medhankar-preset-btn"
                          onClick={() => handleFieldChange('backgroundColor', 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)')}
                        >
                          Warm Amber
                        </button>
                        <button
                          type="button"
                          className="medhankar-preset-btn"
                          onClick={() => handleFieldChange('backgroundColor', 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)')}
                        >
                          Platinum Steel
                        </button>
                      </div>

                      <div className="medhankar-bg-custom-inputs">
                        <div className="medhankar-subgroup">
                          <label>Custom Color / CSS Gradient</label>
                          <input
                            type="text"
                            value={currentEdit.backgroundColor || ''}
                            onChange={(e) => handleFieldChange('backgroundColor', e.target.value)}
                            placeholder="e.g. #F8FAFC or linear-gradient(...)"
                          />
                        </div>

                        <div className="medhankar-subgroup">
                          <label>Custom Cloudinary Background Image</label>
                          <div className="medhankar-flex-row">
                            <input
                              type="text"
                              value={currentEdit.backgroundImage || ''}
                              onChange={(e) => handleFieldChange('backgroundImage', e.target.value)}
                              placeholder="https://res.cloudinary.com/tqachgfb/..."
                            />
                            <label
                              className="medhankar-upload-btn-sm"
                              title={isUploadingBg ? `Uploading (${bgUploadProgress}%)...` : 'Upload image to Cloudinary'}
                            >
                              <Upload size={14} />
                              {isUploadingBg ? <span style={{ fontSize: '0.7rem', marginLeft: '4px' }}>{bgUploadProgress}%</span> : null}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleBgImageUpload}
                                disabled={isUploadingBg}
                                style={{ display: 'none' }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Commercial Prices */}
                  <div className="medhankar-form-group">
                    <label>Paperback Price</label>
                    <input
                      type="text"
                      value={currentEdit.paperbackPrice || ''}
                      onChange={(e) => handleFieldChange('paperbackPrice', e.target.value)}
                      placeholder="₹499"
                    />
                  </div>

                  <div className="medhankar-form-group">
                    <label>Digital Edition Price</label>
                    <input
                      type="text"
                      value={currentEdit.digitalPrice || ''}
                      onChange={(e) => handleFieldChange('digitalPrice', e.target.value)}
                      placeholder="₹249"
                    />
                  </div>
                </div>

                <div className="medhankar-editor-actions">
                  <button
                    type="button"
                    onClick={handleSaveCurrentSlide}
                    disabled={isSaving}
                    className="medhankar-btn-primary medhankar-fullwidth"
                  >
                    <Save size={16} />
                    <span>{isSaving ? 'Uploading to Firestore...' : 'Save Slide to Firestore'}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Live Interactive Preview */}
              <div className="medhankar-preview-card">
                <div className="medhankar-preview-header">
                  <Eye size={16} />
                  <span>Real-Time Hero Preview</span>
                </div>

                <div
                  className="medhankar-preview-stage"
                  style={{
                    background: currentEdit.backgroundImage
                      ? `url(${currentEdit.backgroundImage}) center/cover no-repeat`
                      : currentEdit.backgroundColor || '#F8FAFD',
                  }}
                >
                  <div className="medhankar-preview-content">
                    {/* Badge */}
                    <div className="medhankar-prev-badge">
                      <BookOpen size={11} />
                      <span>{currentEdit.badge || 'FEATURED BOOK'}</span>
                    </div>

                    {/* Hindi Headline */}
                    <div className="medhankar-prev-sub">{currentEdit.titleLine1 || 'वैशाली की'}</div>
                    <div className="medhankar-prev-main">{currentEdit.titleLine2 || 'आम्रपाली'}</div>

                    {/* Bar */}
                    <div className="medhankar-prev-bar" />

                    {/* Tagline */}
                    <p className="medhankar-prev-tagline">
                      {currentEdit.tagline || 'इतिहास, संस्कृति और आम्रपाली की अनकही गाथा।'}
                    </p>

                    {/* Buttons */}
                    <div className="medhankar-prev-btns">
                      <div className="medhankar-prev-btn-pri">Order Now →</div>
                      <div className="medhankar-prev-btn-sec">Buy Digital Edition</div>
                    </div>
                  </div>

                  {/* Book Artwork Preview */}
                  <div className="medhankar-prev-book-col">
                    <img
                      src={currentEdit.bookImage || '/book-on-pedestal.png'}
                      alt="Preview"
                      className="medhankar-prev-book-img"
                    />
                  </div>
                </div>

                <div className="medhankar-preview-meta">
                  <span>Cloudinary Asset: {currentEdit.bookImage ? 'Configured' : 'Using Default'}</span>
                  <span>Target Firestore Collection: <code>hero_slides</code></span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        .medhankar-admin-root {
          min-height: 100vh;
          background: #F4F6F9;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          color: #1E293B;
          display: flex;
          flex-direction: column;
        }

        .medhankar-admin-header {
          background: #0B216B;
          color: #FFFFFF;
          padding: 14px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 4px 20px rgba(11, 33, 107, 0.15);
        }

        .medhankar-admin-header-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .medhankar-admin-brand {
          display: flex;
          align-items: center;
        }

        .medhankar-admin-logo-link {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .medhankar-admin-logo-title {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #FFFFFF;
        }

        .medhankar-admin-logo-badge {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 3px 8px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.18);
          color: #FFFFFF;
        }

        .medhankar-admin-nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .medhankar-admin-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          transition: background 0.2s ease;
        }

        .medhankar-admin-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.22);
        }

        .medhankar-admin-btn-logout {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 14px;
          border-radius: 8px;
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #FCA5A5;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .medhankar-admin-btn-logout:hover {
          background: rgba(239, 68, 68, 0.35);
          color: #FFFFFF;
        }

        .medhankar-admin-main {
          flex: 1;
          padding: 32px 24px 64px;
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          box-sizing: border-box;
        }

        /* Login Card */
        .medhankar-admin-login-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
        }

        .medhankar-admin-login-card {
          width: 100%;
          max-width: 440px;
          background: #FFFFFF;
          padding: 36px 32px;
          border-radius: 20px;
          box-shadow: 0 12px 40px rgba(15, 23, 42, 0.08);
          border: 1px solid #E2E8F0;
          text-align: center;
        }

        .medhankar-admin-lock-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #EBF3FC;
          color: #0B216B;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        .medhankar-admin-login-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0B216B;
          margin: 0 0 8px;
        }

        .medhankar-admin-login-desc {
          font-size: 0.88rem;
          color: #64748B;
          line-height: 1.5;
          margin: 0 0 24px;
        }

        .medhankar-admin-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          text-align: left;
        }

        .medhankar-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .medhankar-form-group label {
          font-size: 0.8125rem;
          font-weight: 700;
          color: #334155;
        }

        .medhankar-form-group input,
        .medhankar-form-group select,
        .medhankar-form-group textarea {
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid #CBD5E1;
          font-family: inherit;
          font-size: 0.9rem;
          color: #0F172A;
          background: #FFFFFF;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .medhankar-form-group input:focus,
        .medhankar-form-group select:focus,
        .medhankar-form-group textarea:focus {
          outline: none;
          border-color: #0B216B;
          box-shadow: 0 0 0 3px rgba(11, 33, 107, 0.12);
        }

        .medhankar-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 20px;
          border-radius: 9px;
          background: #0B216B;
          color: #FFFFFF;
          font-size: 0.92rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(11, 33, 107, 0.2);
          transition: background 0.2s ease, transform 0.1s ease;
        }

        .medhankar-btn-primary:hover {
          background: #081747;
          transform: translateY(-1px);
        }

        .medhankar-btn-accent {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 20px;
          border-radius: 9px;
          background: #2563EB;
          color: #FFFFFF;
          font-size: 0.92rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
          transition: background 0.2s ease;
        }

        .medhankar-btn-accent:hover {
          background: #1D4ED8;
        }

        .medhankar-btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 9px;
          background: #FFFFFF;
          color: #475569;
          font-size: 0.88rem;
          font-weight: 600;
          border: 1px solid #CBD5E1;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .medhankar-btn-outline:hover {
          background: #F8FAFC;
          color: #0B216B;
        }

        .medhankar-btn-danger {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          background: #FEE2E2;
          color: #DC2626;
          border: 1px solid #FECACA;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
        }

        .medhankar-btn-danger:hover {
          background: #FCA5A5;
          color: #991B1B;
        }

        .medhankar-fullwidth {
          width: 100%;
        }

        .medhankar-admin-divider {
          display: flex;
          align-items: center;
          margin: 20px 0;
          color: #94A3B8;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .medhankar-admin-divider::before,
        .medhankar-admin-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #E2E8F0;
        }

        .medhankar-admin-divider span {
          padding: 0 10px;
        }

        /* Topbar in Dashboard */
        .medhankar-dash-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .medhankar-dash-heading {
          font-size: 1.6rem;
          font-weight: 800;
          color: #0B216B;
          margin: 0 0 4px;
        }

        .medhankar-dash-subheading {
          font-size: 0.88rem;
          color: #64748B;
          margin: 0;
        }

        .medhankar-code {
          background: #E2E8F0;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
          color: #0F172A;
          font-size: 0.85em;
        }

        .medhankar-dash-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* Slide Tabs */
        .medhankar-slide-tabs-bar {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 12px;
          margin-bottom: 24px;
        }

        .medhankar-slide-tab {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 18px;
          background: #FFFFFF;
          border: 1.5px solid #E2E8F0;
          border-radius: 14px;
          cursor: pointer;
          min-width: 170px;
          text-align: left;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .medhankar-slide-tab.is-active {
          border-color: #0B216B;
          background: #F8FAFD;
          box-shadow: 0 6px 18px rgba(11, 33, 107, 0.1);
        }

        .medhankar-tab-thumb-box {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: #E2E8F0;
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .medhankar-tab-thumb {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .medhankar-tab-info {
          display: flex;
          flex-direction: column;
        }

        .medhankar-tab-number {
          font-size: 0.72rem;
          font-weight: 700;
          color: #64748B;
          text-transform: uppercase;
        }

        .medhankar-tab-title {
          font-size: 0.92rem;
          font-weight: 800;
          color: #0B216B;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 120px;
        }

        /* Layout Grid */
        .medhankar-editor-layout {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 28px;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .medhankar-editor-layout {
            grid-template-columns: 1fr;
          }
        }

        /* Form Card */
        .medhankar-editor-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
        }

        .medhankar-editor-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #F1F5F9;
          padding-bottom: 16px;
          margin-bottom: 24px;
        }

        .medhankar-editor-header-text h3 {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0B216B;
          margin: 0;
        }

        .medhankar-editor-header-text span {
          font-size: 0.78rem;
          color: #94A3B8;
        }

        .medhankar-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .medhankar-col-span-2 {
          grid-column: span 2;
        }

        /* Cloudinary Upload Box */
        .medhankar-upload-section {
          background: #F8FAFD;
          border: 1.5px dashed #CBD5E1;
          border-radius: 14px;
          padding: 18px;
        }

        .medhankar-upload-label {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.85rem;
          font-weight: 700;
          color: #0B216B;
          margin-bottom: 12px;
        }

        .medhankar-upload-container {
          display: flex;
          gap: 18px;
          align-items: center;
        }

        .medhankar-upload-preview {
          width: 90px;
          height: 100px;
          border-radius: 10px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
          padding: 4px;
        }

        .medhankar-upload-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .medhankar-upload-controls {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .medhankar-upload-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 9px 16px;
          border-radius: 8px;
          background: #2563EB;
          color: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          width: fit-content;
        }

        .medhankar-upload-btn:hover {
          background: #1D4ED8;
        }

        .medhankar-progress-box {
          height: 4px;
          background: #E2E8F0;
          border-radius: 9999px;
          overflow: hidden;
        }

        .medhankar-progress-fill {
          height: 100%;
          background: #2563EB;
          transition: width 0.2s ease;
        }

        .medhankar-url-input-box {
          display: flex;
          align-items: center;
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          padding: 0 8px;
        }

        .medhankar-url-prefix {
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748B;
        }

        .medhankar-url-field {
          border: none !important;
          box-shadow: none !important;
          padding: 7px !important;
          font-size: 0.82rem !important;
          flex: 1;
        }

        .medhankar-checkbox-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
        }

        /* Background Customization */
        .medhankar-bg-section {
          background: #FAF5FF;
          border: 1px solid #F3E8FF;
          border-radius: 14px;
          padding: 16px;
        }

        .medhankar-bg-controls {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .medhankar-bg-presets {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .medhankar-preset-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #6B21A8;
        }

        .medhankar-preset-btn {
          font-size: 0.75rem;
          padding: 4px 10px;
          border-radius: 6px;
          background: #FFFFFF;
          border: 1px solid #E9D5FF;
          color: #6B21A8;
          font-weight: 600;
          cursor: pointer;
        }

        .medhankar-preset-btn:hover {
          background: #F3E8FF;
        }

        .medhankar-bg-custom-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .medhankar-subgroup {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .medhankar-subgroup label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #4B5563;
        }

        .medhankar-subgroup input {
          font-size: 0.82rem !important;
          padding: 7px 10px !important;
        }

        .medhankar-flex-row {
          display: flex;
          gap: 6px;
        }

        .medhankar-upload-btn-sm {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 12px;
          border-radius: 6px;
          background: #6B21A8;
          color: #FFFFFF;
          cursor: pointer;
        }

        .medhankar-editor-actions {
          margin-top: 24px;
          border-top: 1px solid #F1F5F9;
          padding-top: 20px;
        }

        /* Live Preview Card */
        .medhankar-preview-card {
          position: sticky;
          top: 24px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
        }

        .medhankar-preview-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          font-weight: 800;
          color: #0B216B;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .medhankar-preview-stage {
          border-radius: 16px;
          border: 1px solid #E2E8F0;
          padding: 24px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          min-height: 280px;
          box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.03);
          position: relative;
          overflow: hidden;
        }

        .medhankar-preview-content {
          flex: 1.2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .medhankar-prev-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 10px;
          border-radius: 9999px;
          background: #E6EEFA;
          color: #0B216B;
          font-size: 0.6rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .medhankar-prev-sub {
          font-family: 'Mukta', sans-serif;
          font-size: 1.25rem;
          font-weight: 800;
          color: #0B216B;
          line-height: 1.1;
        }

        .medhankar-prev-main {
          font-family: 'Mukta', sans-serif;
          font-size: 2.1rem;
          font-weight: 900;
          color: #0B216B;
          line-height: 1;
        }

        .medhankar-prev-bar {
          width: 28px;
          height: 2.5px;
          background: #0B216B;
          margin: 8px 0;
          border-radius: 2px;
        }

        .medhankar-prev-tagline {
          font-family: 'Mukta', sans-serif;
          font-size: 0.8rem;
          color: #475569;
          margin: 0 0 14px;
          line-height: 1.4;
          max-width: 200px;
        }

        .medhankar-prev-btns {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .medhankar-prev-btn-pri {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 6px 12px;
          background: #0B216B;
          color: #FFFFFF;
          border-radius: 7px;
        }

        .medhankar-prev-btn-sec {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 6px 10px;
          background: #FFFFFF;
          color: #0B216B;
          border: 1px solid #0B216B;
          border-radius: 7px;
        }

        .medhankar-prev-book-col {
          flex: 0.9;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .medhankar-prev-book-img {
          max-height: 180px;
          max-width: 100%;
          object-fit: contain;
          filter: drop-shadow(0 10px 16px rgba(11, 33, 107, 0.15));
        }

        .medhankar-preview-meta {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #64748B;
        }

        /* Alerts */
        .medhankar-alert-success {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          border-radius: 10px;
          background: #ECFDF5;
          border: 1px solid #A7F3D0;
          color: #065F46;
          font-size: 0.88rem;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .medhankar-alert-error {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          border-radius: 10px;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          color: #991B1B;
          font-size: 0.88rem;
          font-weight: 600;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};
