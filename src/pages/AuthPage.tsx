// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// PURE USER REGISTRATION & LOGIN FLOW (APPLE iOS NATIVE APP STYLE)
// Features: 
// 1. Multi-Step iOS Registration (Name -> Gmail -> Password -> Create Account)
// 2. Direct Cloud Firestore Profile Persistence (tracks purchases, payments & books)
// 3. Cinematic Kuku FM Sliding Bookshelf Background with Delicate Studio Flash Aura
// 4. Medhankar iOS Loading Screen upon successful account creation & login
// ==============================================================================

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  Mail,
  KeyRound,
  User as UserIcon,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MedhankarLoadingScreen } from '../components/common/MedhankarLoadingScreen';

// Rich literary covers collection for the Kuku FM background columns
const KUKU_COVERS: string[] = [
  '/covers/releases/lanka-prophecy.png',
  '/covers/releases/engineer-multi-millionaire.png',
  '/covers/releases/98-days-of-nila.png',
  '/covers/releases/who-killed-damini.png',
  '/covers/releases/whispers-into-screams.png',
  '/covers/releases/untold-legends-kurukshetra.png',
  '/covers/curated/suicider-thriller.png',
  '/covers/curated/saindhavbhavan-accident.png',
  '/covers/curated/blight-of-ivory.png',
  '/covers/curated/thicker-than-blood.png',
  '/covers/curated/white-coat-red-heart.png',
  '/covers/curated/hanmon.png',
  '/covers/curated/wisdom-of-balance.png',
  '/covers/curated/invoke-inner-wisdom.png',
  '/covers/curated/yoga-business-ethics.png',
  '/covers/curated/panchatantra-yogasutra.png',
  '/covers/curated/marriage-where-soup-is-better.png',
  '/covers/curated/deliciously-alone.png',
  '/covers/featured/whispers-of-the-heart.jpg',
  '/covers/featured/navigating-turbulence.jpg',
  '/covers/featured/journey-to-the-top.jpg',
  '/covers/featured/she-for-her.jpg',
  '/covers/featured/land-of-their-own.jpg',
  '/covers/monsoon.jpg',
  '/covers/quietly.jpg',
  '/covers/letters.jpg',
  '/covers/architecture.jpg',
  '/covers/decisions.jpg',
  '/covers/entrepreneur.jpg',
];

// Left overflow columns (fill left blank screen edge)
const COL_L6 = [KUKU_COVERS[2], KUKU_COVERS[8], KUKU_COVERS[14], KUKU_COVERS[20], KUKU_COVERS[26]];
const COL_L5 = [KUKU_COVERS[9], KUKU_COVERS[15], KUKU_COVERS[21], KUKU_COVERS[27], KUKU_COVERS[3]];
const COL_L4 = [KUKU_COVERS[16], KUKU_COVERS[22], KUKU_COVERS[28], KUKU_COVERS[4], KUKU_COVERS[10]];
const COL_L3 = [KUKU_COVERS[23], KUKU_COVERS[0], KUKU_COVERS[7], KUKU_COVERS[13], KUKU_COVERS[19]];
const COL_L2 = [KUKU_COVERS[1], KUKU_COVERS[8], KUKU_COVERS[15], KUKU_COVERS[22], KUKU_COVERS[25]];
const COL_L1 = [KUKU_COVERS[6], KUKU_COVERS[12], KUKU_COVERS[18], KUKU_COVERS[24], KUKU_COVERS[2]];

// Core center columns (preserves the exact look and book sequence behind the card)
const COLUMN_1 = [KUKU_COVERS[0], KUKU_COVERS[6], KUKU_COVERS[12], KUKU_COVERS[18], KUKU_COVERS[24]];
const COLUMN_2 = [KUKU_COVERS[1], KUKU_COVERS[7], KUKU_COVERS[13], KUKU_COVERS[19], KUKU_COVERS[25]];
const COLUMN_3 = [KUKU_COVERS[2], KUKU_COVERS[8], KUKU_COVERS[14], KUKU_COVERS[20], KUKU_COVERS[26]];
const COLUMN_4 = [KUKU_COVERS[3], KUKU_COVERS[9], KUKU_COVERS[15], KUKU_COVERS[21], KUKU_COVERS[27]];
const COLUMN_5 = [KUKU_COVERS[4], KUKU_COVERS[10], KUKU_COVERS[16], KUKU_COVERS[22], KUKU_COVERS[28]];
const COLUMN_6 = [KUKU_COVERS[5], KUKU_COVERS[11], KUKU_COVERS[17], KUKU_COVERS[23], KUKU_COVERS[0]];

// Right overflow columns (fill right blank screen edge)
const COL_R1 = [KUKU_COVERS[11], KUKU_COVERS[17], KUKU_COVERS[23], KUKU_COVERS[5], KUKU_COVERS[27]];
const COL_R2 = [KUKU_COVERS[14], KUKU_COVERS[20], KUKU_COVERS[26], KUKU_COVERS[6], KUKU_COVERS[12]];
const COL_R3 = [KUKU_COVERS[7], KUKU_COVERS[13], KUKU_COVERS[19], KUKU_COVERS[25], KUKU_COVERS[1]];
const COL_R4 = [KUKU_COVERS[21], KUKU_COVERS[27], KUKU_COVERS[3], KUKU_COVERS[9], KUKU_COVERS[15]];
const COL_R5 = [KUKU_COVERS[28], KUKU_COVERS[4], KUKU_COVERS[10], KUKU_COVERS[16], KUKU_COVERS[22]];
const COL_R6 = [KUKU_COVERS[5], KUKU_COVERS[11], KUKU_COVERS[17], KUKU_COVERS[23], KUKU_COVERS[24]];

// Unified list of 18 columns with alternating marquee speeds
const ALL_SHELF_COLUMNS = [
  // Left side extra columns (fill left edge completely)
  { id: 'cl-6', covers: COL_L6, speed: 'col-speed-up-2', pcOnly: true },
  { id: 'cl-5', covers: COL_L5, speed: 'col-speed-down-1', pcOnly: true },
  { id: 'cl-4', covers: COL_L4, speed: 'col-speed-up-3', pcOnly: true },
  { id: 'cl-3', covers: COL_L3, speed: 'col-speed-down-2', pcOnly: true },
  { id: 'cl-2', covers: COL_L2, speed: 'col-speed-up-1', pcOnly: true },
  { id: 'cl-1', covers: COL_L1, speed: 'col-speed-down-3', pcOnly: true },
  // Center core columns
  { id: 'c-1', covers: COLUMN_1, speed: 'col-speed-up-1', pcOnly: false },
  { id: 'c-2', covers: COLUMN_2, speed: 'col-speed-down-1', pcOnly: false },
  { id: 'c-3', covers: COLUMN_3, speed: 'col-speed-up-2', pcOnly: false },
  { id: 'c-4', covers: COLUMN_4, speed: 'col-speed-down-2', pcOnly: false },
  { id: 'c-5', covers: COLUMN_5, speed: 'col-speed-up-3', pcOnly: false },
  { id: 'c-6', covers: COLUMN_6, speed: 'col-speed-down-3', pcOnly: false },
  // Right side extra columns (fill right edge completely)
  { id: 'cr-1', covers: COL_R1, speed: 'col-speed-up-2', pcOnly: true },
  { id: 'cr-2', covers: COL_R2, speed: 'col-speed-down-1', pcOnly: true },
  { id: 'cr-3', covers: COL_R3, speed: 'col-speed-up-3', pcOnly: true },
  { id: 'cr-4', covers: COL_R4, speed: 'col-speed-down-2', pcOnly: true },
  { id: 'cr-5', covers: COL_R5, speed: 'col-speed-up-1', pcOnly: true },
  { id: 'cr-6', covers: COL_R6, speed: 'col-speed-down-3', pcOnly: true },
];

export const AuthPage: React.FC = () => {
  const { user, isLoading: isAuthLoading, signInWithEmail, signUpWithEmail } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/library';

  // Mode: 'register' (Multi-Step iOS Onboarding) vs 'login' (Direct Sign In)
  // Default to register if query param ?mode=register, else default to 'register' per user request
  const initialMode = searchParams.get('mode') === 'login' ? 'login' : 'register';
  const [authMode, setAuthMode] = useState<'register' | 'login'>(initialMode);

  // Multi-step Registration States:
  // Step 1: Name -> Step 2: Gmail -> Step 3: Password -> Complete
  const [regStep, setRegStep] = useState<1 | 2 | 3>(1);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Login Form States
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false);

  // State Management
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showIosLoading, setShowIosLoading] = useState<boolean>(false);

  // Cinematic Step Transition & Loading States
  const [isStepTransitioning, setIsStepTransitioning] = useState<boolean>(false);
  const [transitionLabel, setTransitionLabel] = useState<string>('');
  const [slideDirection, setSlideDirection] = useState<'forward' | 'backward'>('forward');

  // Input Focus Refs
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const loginEmailRef = useRef<HTMLInputElement>(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (!isAuthLoading && user && !showIosLoading) {
      navigate(redirectTarget, { replace: true });
    }
  }, [user, isAuthLoading, navigate, redirectTarget, showIosLoading]);

  // Auto-focus input according to registration step
  useEffect(() => {
    if (authMode === 'register' && !isStepTransitioning) {
      if (regStep === 1) {
        setTimeout(() => nameInputRef.current?.focus(), 120);
      } else if (regStep === 2) {
        setTimeout(() => emailInputRef.current?.focus(), 120);
      } else if (regStep === 3) {
        setTimeout(() => passwordInputRef.current?.focus(), 120);
      }
    } else if (authMode === 'login') {
      setTimeout(() => loginEmailRef.current?.focus(), 120);
    }
  }, [authMode, regStep, isStepTransitioning]);

  // ----------------------------------------------------------------------------
  // STEP 1 HANDLER: Name Validation & Cinematic Advance to Step 2
  // ----------------------------------------------------------------------------
  const handleNameStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStepTransitioning) return;
    setAuthError(null);
    const trimmed = fullName.trim();
    if (!trimmed || trimmed.length < 2) {
      setAuthError('Please enter your full name (minimum 2 characters).');
      return;
    }

    // Trigger Cinematic Loading on Button & Progress Pill
    setIsStepTransitioning(true);
    setTransitionLabel('Setting up profile...');
    setSlideDirection('forward');

    setTimeout(() => {
      setRegStep(2);
      setIsStepTransitioning(false);
      setTransitionLabel('');
    }, 450);
  };

  // ----------------------------------------------------------------------------
  // STEP 2 HANDLER: Gmail Validation & Cinematic Advance to Step 3
  // ----------------------------------------------------------------------------
  const handleEmailStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStepTransitioning) return;
    setAuthError(null);
    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed || !emailRegex.test(trimmed)) {
      setAuthError('Please enter a valid Gmail / Email address.');
      return;
    }

    // Trigger Cinematic Loading on Button & Progress Pill
    setIsStepTransitioning(true);
    setTransitionLabel('Securing your account...');
    setSlideDirection('forward');

    setTimeout(() => {
      setRegStep(3);
      setIsStepTransitioning(false);
      setTransitionLabel('');
    }, 450);
  };

  // ----------------------------------------------------------------------------
  // STEP 3 HANDLER: Password & Final Registration -> Save to Firestore -> Login
  // ----------------------------------------------------------------------------
  const handleFinalRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!password || password.length < 6) {
      setAuthError('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Create User in Firebase Auth & Persist profile in Firestore
      const res = await signUpWithEmail(email.trim().toLowerCase(), password, fullName.trim());

      if (!res.success) {
        setIsSubmitting(false);
        setAuthError(res.error || 'Failed to create account. Please check your details.');
        return;
      }

      // 2. Trigger the Official Medhankar iOS Loading Screen
      setShowIosLoading(true);
    } catch (err: unknown) {
      setIsSubmitting(false);
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setAuthError(msg);
    }
  };

  // ----------------------------------------------------------------------------
  // LOGIN HANDLER: Direct Sign In with Email & Password
  // ----------------------------------------------------------------------------
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const cleanEmail = loginEmail.trim().toLowerCase();
    if (!cleanEmail) {
      setAuthError('Please enter your registered Gmail address.');
      return;
    }
    if (!loginPassword) {
      setAuthError('Please enter your password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await signInWithEmail(cleanEmail, loginPassword);
      if (!res.success) {
        setIsSubmitting(false);
        setAuthError(res.error || 'Invalid credentials. Please verify your email and password.');
        return;
      }

      // Trigger iOS Loading Screen for smooth entrance
      setShowIosLoading(true);
    } catch (err: unknown) {
      setIsSubmitting(false);
      const msg = err instanceof Error ? err.message : 'Login failed.';
      setAuthError(msg);
    }
  };

  // Callback when MedhankarLoadingScreen completes
  const handleLoadingComplete = () => {
    navigate(redirectTarget, { replace: true });
  };

  return (
    <div className="ios-auth-stage">
      {/* Full-Screen iOS Loading Screen on Successful Auth */}
      {showIosLoading && (
        <MedhankarLoadingScreen onComplete={handleLoadingComplete} minDuration={1800} />
      )}

      {/* ====================================================================
          TOP APPLICATION BAR (Pure, Minimal, No Clutter)
          ==================================================================== */}
      <header className="ios-auth-header">
        <Link to="/" className="ios-auth-logo-link" aria-label="Medhankar Publication Home">
          <img
            src="/medhankar-logo.png"
            alt="Medhankar Publication"
            className="ios-auth-logo-img"
          />
        </Link>

        {/* Toggle between Register and Login */}
        <div className="ios-auth-header-right">
          {authMode === 'register' ? (
            <button
              type="button"
              className="ios-header-toggle-btn"
              onClick={() => {
                setAuthMode('login');
                setAuthError(null);
              }}
            >
              Sign In
            </button>
          ) : (
            <button
              type="button"
              className="ios-header-toggle-btn"
              onClick={() => {
                setAuthMode('register');
                setRegStep(1);
                setAuthError(null);
              }}
            >
              Create Account
            </button>
          )}
        </div>
      </header>

      {/* ====================================================================
          CINEMATIC KUKU-FM ANGLED SLIDING BOOK COLUMNS (BACKGROUND)
          Smooth infinite marquee animations with alternating speeds
          ==================================================================== */}
      <div className="kuku-shelf-viewport" aria-hidden="true">
        {ALL_SHELF_COLUMNS.map((col) => (
          <div
            key={col.id}
            className={`kuku-book-col ${col.speed} ${col.pcOnly ? 'kuku-pc-only-col' : ''}`}
          >
            <div className="kuku-col-track">
              {[...col.covers, ...col.covers].map((src, i) => (
                <div key={`${col.id}-${i}`} className="kuku-cover-tile">
                  <img src={src} alt="" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Delicate Studio Flash & Softbox Aura (Subtle Luminous Studio Flash) */}
      <div className="kuku-soft-flash-aura" aria-hidden="true" />
      <div className="kuku-studio-sunbeam" aria-hidden="true" />
      <div className="kuku-ambient-overlay" aria-hidden="true" />

      {/* ====================================================================
          FLOATING CENTER CARD (Apple iOS Native App Experience)
          ==================================================================== */}
      <main className="ios-card-stage">
        <div className="ios-auth-card">
          {/* Top Brand & Title Bar */}
          <div className="ios-card-top-branding">
            <img
              src="/medhankar-logo.png"
              alt="Medhankar"
              className="ios-card-brand-logo"
            />
          </div>

          {/* Error Feedback Banner */}
          {authError && (
            <div className="ios-auth-error-banner" role="alert">
              <AlertCircle size={16} className="ios-error-icon" />
              <span>{authError}</span>
            </div>
          )}

          {/* ================================================================
              FLOW A: MULTI-STEP REGISTRATION (1: Name -> 2: Gmail -> 3: Pass)
              ================================================================ */}
          {authMode === 'register' && (
            <div className="ios-stepper-container">
              {/* iOS Step Progress Pill Indicators with Cinematic Shimmer */}
              <div className={`ios-step-progress-row ${isStepTransitioning ? 'is-loading' : ''}`}>
                <div className={`ios-step-pill ${regStep >= 1 ? 'is-active' : ''}`} />
                <div className={`ios-step-pill ${regStep >= 2 ? 'is-active' : ''}`} />
                <div className={`ios-step-pill ${regStep >= 3 ? 'is-active' : ''}`} />
              </div>

              {/* Step Navigation Bar (Back Arrow & Step Counter) */}
              <div className="ios-step-meta-row">
                {regStep > 1 ? (
                  <button
                    type="button"
                    className="ios-step-back-btn"
                    disabled={isStepTransitioning || isSubmitting}
                    onClick={() => {
                      if (isStepTransitioning || isSubmitting) return;
                      setAuthError(null);
                      setSlideDirection('backward');
                      setRegStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3) : 1));
                    }}
                  >
                    <ArrowLeft size={15} strokeWidth={2.4} />
                    <span>Back</span>
                  </button>
                ) : (
                  <div className="ios-step-chip">
                    <Sparkles size={13} color="#2563EB" />
                    <span>New Reader</span>
                  </div>
                )}

                <span className="ios-step-counter-text">
                  Step {regStep} of 3
                </span>
              </div>

              {/* ------------------------------------------------------------
                  STEP 1: FULL NAME
                  ------------------------------------------------------------ */}
              {regStep === 1 && (
                <form
                  onSubmit={handleNameStepSubmit}
                  className={`ios-step-form ${slideDirection === 'forward' ? 'ios-slide-forward' : 'ios-slide-backward'}`}
                >
                  <div className="ios-step-header">
                    <h1 className="ios-step-headline">What is your name?</h1>
                    <p className="ios-step-subtext">
                      This will appear on your personalized library card, reading dashboard, and certificates.
                    </p>
                  </div>

                  <div className="ios-input-group">
                    <label className="ios-input-label" htmlFor="reg-name-input">Full Name</label>
                    <div className="ios-input-wrapper">
                      <UserIcon size={19} className="ios-input-icon" />
                      <input
                        id="reg-name-input"
                        ref={nameInputRef}
                        type="text"
                        disabled={isStepTransitioning}
                        value={fullName}
                        onChange={(e) => {
                          setAuthError(null);
                          setFullName(e.target.value);
                        }}
                        placeholder="e.g. Rahul Sharma"
                        autoComplete="name"
                        required
                        className="ios-text-field"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={fullName.trim().length < 2 || isStepTransitioning}
                    className={`ios-action-btn ${isStepTransitioning ? 'is-loading' : ''}`}
                  >
                    {isStepTransitioning ? (
                      <>
                        <span className="ios-button-spinner" aria-hidden="true" />
                        <span>{transitionLabel || 'Setting up profile...'}</span>
                      </>
                    ) : (
                      <>
                        <span>Continue</span>
                        <ArrowRight size={18} strokeWidth={2.4} />
                      </>
                    )}
                  </button>

                  <div className="ios-toggle-footer">
                    <span>Already registered?</span>{' '}
                    <button
                      type="button"
                      disabled={isStepTransitioning}
                      className="ios-inline-link"
                      onClick={() => {
                        setAuthMode('login');
                        setAuthError(null);
                      }}
                    >
                      Sign in here
                    </button>
                  </div>
                </form>
              )}

              {/* ------------------------------------------------------------
                  STEP 2: GMAIL / EMAIL ADDRESS
                  ------------------------------------------------------------ */}
              {regStep === 2 && (
                <form
                  onSubmit={handleEmailStepSubmit}
                  className={`ios-step-form ${slideDirection === 'forward' ? 'ios-slide-forward' : 'ios-slide-backward'}`}
                >
                  <div className="ios-step-header">
                    <h1 className="ios-step-headline">What is your Gmail?</h1>
                    <p className="ios-step-subtext">
                      We'll link your purchased books, invoices, and reading sync to this address.
                    </p>
                  </div>

                  {/* Summary of Name from Step 1 */}
                  <div className="ios-user-badge-preview">
                    <div className="ios-user-badge-avatar">
                      {fullName.charAt(0).toUpperCase()}
                    </div>
                    <span className="ios-user-badge-name">{fullName}</span>
                  </div>

                  <div className="ios-input-group">
                    <label className="ios-input-label" htmlFor="reg-email-input">Gmail / Email Address</label>
                    <div className="ios-input-wrapper">
                      <Mail size={19} className="ios-input-icon" />
                      <input
                        id="reg-email-input"
                        ref={emailInputRef}
                        type="email"
                        disabled={isStepTransitioning}
                        value={email}
                        onChange={(e) => {
                          setAuthError(null);
                          setEmail(e.target.value);
                        }}
                        placeholder="name@gmail.com"
                        autoComplete="email"
                        autoCapitalize="none"
                        required
                        className="ios-text-field"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!email.trim() || !email.includes('@') || isStepTransitioning}
                    className={`ios-action-btn ${isStepTransitioning ? 'is-loading' : ''}`}
                  >
                    {isStepTransitioning ? (
                      <>
                        <span className="ios-button-spinner" aria-hidden="true" />
                        <span>{transitionLabel || 'Securing your account...'}</span>
                      </>
                    ) : (
                      <>
                        <span>Continue</span>
                        <ArrowRight size={18} strokeWidth={2.4} />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* ------------------------------------------------------------
                  STEP 3: SECURE PASSWORD & CLOUD REGISTRATION
                  ------------------------------------------------------------ */}
              {regStep === 3 && (
                <form
                  onSubmit={handleFinalRegister}
                  className={`ios-step-form ${slideDirection === 'forward' ? 'ios-slide-forward' : 'ios-slide-backward'}`}
                >
                  <div className="ios-step-header">
                    <h1 className="ios-step-headline">Create a password</h1>
                    <p className="ios-step-subtext">
                      Must be at least 6 characters to securely protect your account and purchases.
                    </p>
                  </div>

                  {/* Summary Profile Chip */}
                  <div className="ios-profile-summary-box">
                    <div className="ios-summary-row">
                      <UserIcon size={14} color="#64748B" />
                      <span className="ios-summary-val">{fullName}</span>
                    </div>
                    <div className="ios-summary-row">
                      <Mail size={14} color="#64748B" />
                      <span className="ios-summary-val">{email}</span>
                    </div>
                  </div>

                  <div className="ios-input-group">
                    <label className="ios-input-label" htmlFor="reg-pass-input">Password</label>
                    <div className="ios-input-wrapper">
                      <KeyRound size={19} className="ios-input-icon" />
                      <input
                        id="reg-pass-input"
                        ref={passwordInputRef}
                        type={showPassword ? 'text' : 'password'}
                        disabled={isSubmitting}
                        value={password}
                        onChange={(e) => {
                          setAuthError(null);
                          setPassword(e.target.value);
                        }}
                        placeholder="Minimum 6 characters"
                        required
                        minLength={6}
                        className="ios-text-field"
                      />
                      <button
                        type="button"
                        className="ios-eye-toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    <div className="ios-pass-hint-row">
                      <CheckCircle2
                        size={14}
                        color={password.length >= 6 ? '#10B981' : '#94A3B8'}
                      />
                      <span style={{ color: password.length >= 6 ? '#059669' : '#64748B' }}>
                        At least 6 characters
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || password.length < 6}
                    className={`ios-action-btn ${isSubmitting ? 'is-loading' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="ios-button-spinner" aria-hidden="true" />
                        <span>Creating account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Account & Join Library</span>
                        <ArrowRight size={18} strokeWidth={2.4} />
                      </>
                    )}
                  </button>

                  <p className="ios-legal-disclaimer">
                    By creating an account, your data will be securely synchronized to Cloud Firestore. You agree to our{' '}
                    <Link to="/terms" className="ios-legal-link">Terms</Link> and{' '}
                    <Link to="/privacy" className="ios-legal-link">Privacy Policy</Link>.
                  </p>
                </form>
              )}
            </div>
          )}

          {/* ================================================================
              FLOW B: DIRECT USER SIGN IN (Existing Reader Accounts)
              ================================================================ */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="ios-login-form">
              <div className="ios-step-header">
                <h1 className="ios-step-headline">Welcome Back</h1>
                <p className="ios-step-subtext">
                  Sign in with your registered Gmail to access your purchased books and reading library.
                </p>
              </div>

              <div className="ios-input-group">
                <label className="ios-input-label" htmlFor="login-email-input">Gmail / Email</label>
                <div className="ios-input-wrapper">
                  <Mail size={19} className="ios-input-icon" />
                  <input
                    id="login-email-input"
                    ref={loginEmailRef}
                    type="email"
                    value={loginEmail}
                    onChange={(e) => {
                      setAuthError(null);
                      setLoginEmail(e.target.value);
                    }}
                    placeholder="name@gmail.com"
                    autoComplete="email"
                    autoCapitalize="none"
                    required
                    className="ios-text-field"
                  />
                </div>
              </div>

              <div className="ios-input-group">
                <label className="ios-input-label" htmlFor="login-pass-input">Password</label>
                <div className="ios-input-wrapper">
                  <KeyRound size={19} className="ios-input-icon" />
                  <input
                    id="login-pass-input"
                    type={showLoginPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => {
                      setAuthError(null);
                      setLoginPassword(e.target.value);
                    }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="ios-text-field"
                  />
                  <button
                    type="button"
                    className="ios-eye-toggle-btn"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                  >
                    {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !loginEmail.trim() || !loginPassword}
                className={`ios-action-btn ${isSubmitting ? 'is-loading' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <span className="ios-button-spinner" aria-hidden="true" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Library</span>
                    <ArrowRight size={18} strokeWidth={2.4} />
                  </>
                )}
              </button>

              <div className="ios-toggle-footer">
                <span>Don't have an account yet?</span>{' '}
                <button
                  type="button"
                  className="ios-inline-link"
                  onClick={() => {
                    setAuthMode('register');
                    setRegStep(1);
                    setAuthError(null);
                  }}
                >
                  Create one now
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* ====================================================================
          HIGH-PERFORMANCE APPLE iOS STYLING & ANIMATIONS
          ==================================================================== */}
      <style>{`
        .ios-auth-stage {
          position: relative;
          min-height: 100vh;
          min-height: 100dvh;
          width: 100%;
          background: #FDFEFF;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        /* ------------------------------------------------------------------
           TOP HEADER
           ------------------------------------------------------------------ */
        .ios-auth-header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(16px, 4vw, 44px);
          z-index: 40;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0) 100%);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .ios-auth-logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .ios-auth-logo-img {
          height: 38px;
          width: auto;
          object-fit: contain;
        }

        .ios-auth-header-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ios-header-toggle-btn {
          background: #FFFFFF;
          border: 1.5px solid #2563EB;
          color: #2563EB;
          border-radius: 9999px;
          padding: 7px 18px;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .ios-header-toggle-btn:hover {
          background: #2563EB;
          color: #FFFFFF;
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
          transform: scale(1.03);
        }

        .ios-header-toggle-btn:active {
          transform: scale(0.97);
        }

        /* ------------------------------------------------------------------
           KUKU FM ANGLED BACKGROUND SLIDER (FULL EDGE-TO-EDGE DISPLAY)
           ------------------------------------------------------------------ */
        .kuku-shelf-viewport {
          position: absolute;
          inset: -45% -45% -45% -45%;
          transform: rotate(-9.5deg) skewX(-1.5deg) scale(1.15);
          display: flex;
          gap: clamp(16px, 1.8vw, 22px);
          justify-content: center;
          pointer-events: none;
          z-index: 1;
          opacity: 1;
          filter: contrast(1.05) saturate(1.08);
        }

        .kuku-book-col {
          flex: 0 0 clamp(130px, 14vw, 175px);
          height: 100%;
          overflow: hidden;
          position: relative;
        }

        .kuku-col-track {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          will-change: transform;
        }

        .kuku-cover-tile {
          width: 100%;
          aspect-ratio: 136 / 208;
          border-radius: 8px;
          overflow: hidden;
          background: #F1F5F9;
          box-shadow:
            0 8px 20px -4px rgba(15, 23, 42, 0.18),
            0 2px 6px rgba(15, 23, 42, 0.08);
          position: relative;
        }

        .kuku-cover-tile img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .col-speed-up-1 .kuku-col-track {
          animation: kukuSlideUp 46s linear infinite;
        }
        .col-speed-down-1 .kuku-col-track {
          animation: kukuSlideDown 54s linear infinite;
        }
        .col-speed-up-2 .kuku-col-track {
          animation: kukuSlideUp 42s linear infinite;
        }
        .col-speed-down-2 .kuku-col-track {
          animation: kukuSlideDown 50s linear infinite;
        }
        .col-speed-up-3 .kuku-col-track {
          animation: kukuSlideUp 48s linear infinite;
        }
        .col-speed-down-3 .kuku-col-track {
          animation: kukuSlideDown 56s linear infinite;
        }

        @keyframes kukuSlideUp {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(0, -50%, 0); }
        }

        @keyframes kukuSlideDown {
          0% { transform: translate3d(0, -50%, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        /* Delicate Luminous Flash Glow Aura (Centered Behind Floating Card) */
        .kuku-soft-flash-aura {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: clamp(520px, 62vw, 900px);
          height: clamp(480px, 60vh, 780px);
          border-radius: 50%;
          background: radial-gradient(
            ellipse 65% 60% at 50% 50%,
            rgba(255, 255, 255, 0.85) 0%,
            rgba(255, 255, 255, 0.50) 36%,
            rgba(238, 246, 255, 0.20) 65%,
            transparent 85%
          );
          filter: blur(28px);
          -webkit-filter: blur(28px);
          pointer-events: none;
          z-index: 2;
        }

        .kuku-studio-sunbeam {
          position: absolute;
          top: -15%;
          left: 15%;
          width: 70%;
          height: 130%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0.20) 0%,
            rgba(255, 255, 255, 0.06) 35%,
            rgba(240, 248, 255, 0.10) 60%,
            transparent 85%
          );
          transform: rotate(-12deg);
          pointer-events: none;
          z-index: 2;
        }

        .kuku-ambient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.03) 50%,
            rgba(240, 246, 255, 0.12) 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* ------------------------------------------------------------------
           FLOATING CENTER CARD
           ------------------------------------------------------------------ */
        .ios-card-stage {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 16px 36px;
          width: 100%;
        }

        .ios-auth-card {
          width: 100%;
          max-width: 460px;
          background: #FFFFFF;
          border-radius: 28px;
          padding: clamp(26px, 4vw, 36px) clamp(22px, 4vw, 36px);
          box-shadow:
            0 30px 80px -15px rgba(11, 33, 107, 0.18),
            0 12px 30px -6px rgba(15, 23, 42, 0.10),
            0 0 45px rgba(255, 255, 255, 0.92),
            0 0 0 1px rgba(226, 232, 240, 0.95);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: iosCardSpring 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes iosCardSpring {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .ios-card-top-branding {
          text-align: center;
          margin-bottom: 20px;
        }

        .ios-card-brand-logo {
          height: 44px;
          width: auto;
          object-fit: contain;
        }

        /* Error Banner */
        .ios-auth-error-banner {
          display: flex;
          align-items: center;
          gap: 9px;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          color: #B91C1C;
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 13px;
          margin-bottom: 16px;
          animation: iosShake 0.3s ease;
        }

        @keyframes iosShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }

        /* ------------------------------------------------------------------
           STEPPER PROGRESS SYSTEM
           ------------------------------------------------------------------ */
        .ios-stepper-container {
          display: flex;
          flex-direction: column;
        }

        .ios-step-progress-row {
          display: flex;
          gap: 6px;
          width: 100%;
          margin-bottom: 14px;
        }

        .ios-step-pill {
          flex: 1;
          height: 4px;
          border-radius: 9999px;
          background: #E2E8F0;
          transition: all 0.35s ease;
        }

        .ios-step-pill.is-active {
          background: #2563EB;
        }

        .ios-step-progress-row.is-loading .ios-step-pill.is-active {
          background: linear-gradient(90deg, #2563EB 0%, #93C5FD 50%, #2563EB 100%);
          background-size: 200% 100%;
          animation: pillShimmer 0.8s linear infinite;
          box-shadow: 0 0 10px rgba(37, 99, 235, 0.4);
        }

        @keyframes pillShimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }

        .ios-step-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .ios-step-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: none;
          border: none;
          color: #2563EB;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          padding: 4px 0;
          transition: transform 0.15s ease;
        }

        .ios-step-back-btn:hover {
          transform: translateX(-2px);
        }

        .ios-step-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #EFF6FF;
          color: #2563EB;
          padding: 3px 10px;
          border-radius: 9999px;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .ios-step-counter-text {
          font-size: 12px;
          font-weight: 600;
          color: #64748B;
        }

        /* Step Headers */
        .ios-step-header {
          margin-bottom: 20px;
        }

        .ios-step-headline {
          font-size: clamp(21px, 2.8vw, 25px);
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.02em;
          margin: 0 0 6px;
          line-height: 1.25;
        }

        .ios-step-subtext {
          font-size: 13.5px;
          line-height: 1.45;
          color: #64748B;
          margin: 0;
        }

        /* User Profile Preview Badge (Step 2) */
        .ios-user-badge-preview {
          display: flex;
          align-items: center;
          gap: 9px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 8px 12px;
          margin-bottom: 16px;
        }

        .ios-user-badge-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #2563EB;
          color: #FFFFFF;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ios-user-badge-name {
          font-size: 13.5px;
          font-weight: 600;
          color: #1E293B;
        }

        /* Profile Summary Box (Step 3) */
        .ios-profile-summary-box {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }

        .ios-summary-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ios-summary-val {
          font-size: 13px;
          font-weight: 600;
          color: #334155;
        }

        /* Inputs & Form Groups */
        .ios-step-form,
        .ios-login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ios-input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ios-input-label {
          font-size: 12.5px;
          font-weight: 600;
          color: #334155;
          letter-spacing: -0.01em;
        }

        .ios-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .ios-input-icon {
          position: absolute;
          left: 15px;
          color: #94A3B8;
          pointer-events: none;
        }

        .ios-text-field {
          width: 100%;
          height: 52px;
          padding: 0 44px 0 46px;
          border: 1.5px solid #CBD5E1;
          border-radius: 14px;
          font-size: 15.5px;
          font-weight: 500;
          color: #0F172A;
          background: #FFFFFF;
          outline: none;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-sizing: border-box;
          font-family: inherit;
        }

        .ios-text-field:focus {
          border-color: #2563EB;
          box-shadow: 0 0 0 3.5px rgba(37, 99, 235, 0.12);
        }

        .ios-eye-toggle-btn {
          position: absolute;
          right: 14px;
          background: none;
          border: none;
          color: #64748B;
          cursor: pointer;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.15s ease;
        }

        .ios-eye-toggle-btn:hover {
          color: #0F172A;
        }

        .ios-pass-hint-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          margin-top: 2px;
          padding-left: 2px;
        }

        /* Action Buttons */
        .ios-action-btn {
          width: 100%;
          height: 52px;
          background: #2563EB;
          color: #FFFFFF;
          border: none;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 16px rgba(37, 99, 235, 0.28);
          outline: none;
          margin-top: 4px;
        }

        .ios-action-btn:hover:not(:disabled) {
          background: #1D4ED8;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.36);
        }

        .ios-action-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .ios-action-btn:disabled {
          background: #93C5FD;
          cursor: not-allowed;
          box-shadow: none;
        }

        .ios-action-btn.is-loading {
          background: linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #3B82F6 100%);
          background-size: 200% 200%;
          animation: btnGradientPulse 1.2s ease infinite;
          cursor: wait !important;
          box-shadow: 0 4px 20px rgba(37, 99, 235, 0.45);
        }

        @keyframes btnGradientPulse {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .ios-button-spinner {
          width: 17px;
          height: 17px;
          border: 2.2px solid rgba(255, 255, 255, 0.35);
          border-top-color: #FFFFFF;
          border-radius: 50%;
          animation: iosSpin 0.65s linear infinite;
          display: inline-block;
          flex-shrink: 0;
        }

        @keyframes iosSpin {
          to { transform: rotate(360deg); }
        }

        /* Fluid Step Transitions (Apple iOS Spring Motion) */
        .ios-slide-forward {
          animation: iosSlideForward 0.38s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .ios-slide-backward {
          animation: iosSlideBackward 0.38s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes iosSlideForward {
          0% {
            opacity: 0;
            transform: translate3d(28px, 0, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes iosSlideBackward {
          0% {
            opacity: 0;
            transform: translate3d(-28px, 0, 0);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        /* Toggle Footers */
        .ios-toggle-footer {
          text-align: center;
          font-size: 13.5px;
          color: #475569;
          margin-top: 6px;
        }

        .ios-inline-link {
          background: none;
          border: none;
          color: #2563EB;
          font-weight: 600;
          font-size: 13.5px;
          cursor: pointer;
          padding: 0;
          transition: color 0.15s ease;
        }

        .ios-inline-link:hover {
          color: #1D4ED8;
          text-decoration: underline;
        }

        .ios-legal-disclaimer {
          text-align: center;
          font-size: 11.5px;
          line-height: 1.5;
          color: #64748B;
          margin: 4px 0 0;
        }

        .ios-legal-link {
          color: #2563EB;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        /* ------------------------------------------------------------------
           MOBILE RESPONSIVENESS (Native iOS Mobile App Look)
           ------------------------------------------------------------------ */
        @media (max-width: 768px) {
          .kuku-pc-only-col {
            display: none;
          }

          .ios-auth-header {
            padding: 0 16px;
            height: 60px;
          }

          .ios-auth-logo-img {
            height: 32px;
          }

          .kuku-shelf-viewport {
            transform: rotate(-7deg) skewX(-1deg) scale(1.15);
            inset: -15% -25% -15% -25%;
            gap: 14px;
            opacity: 0.85;
          }

          .kuku-book-col {
            flex: 0 0 115px;
          }

          .ios-card-stage {
            padding: 72px 14px 20px;
            align-items: flex-end; /* Native iOS bottom-docked card look */
          }

          .ios-auth-card {
            border-radius: 26px;
            padding: 24px 18px 22px;
            box-shadow:
              0 20px 50px -10px rgba(11, 33, 107, 0.22),
              0 0 0 1px rgba(226, 232, 240, 0.95);
          }

          .ios-card-brand-logo {
            height: 38px;
          }

          .ios-step-headline {
            font-size: 21px;
          }

          .ios-text-field {
            height: 48px;
            font-size: 15px;
          }

          .ios-action-btn {
            height: 48px;
            font-size: 15.5px;
          }
        }
      `}</style>
    </div>
  );
};
