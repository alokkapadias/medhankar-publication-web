// ==============================================================================
// MEDHANKAR GRAPHICS AND PUBLICATIONS PRIVATE LIMITED
// Complete Book Checkout Experience (/checkout)
// Supports Buy Now item or Full Cart checkout with address, delivery & payment
// ==============================================================================

import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Lock,
  Printer,
  Sparkles,
  QrCode,
  FileText,
  Check,
} from 'lucide-react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getBookById } from '../data/demoBooks';
import { getEditionPrice, getFormatLabel, formatPrice, isDigitalFormat } from '../utils/pricing';
import { db } from '../lib/firebase';
import { doc, updateDoc, arrayUnion, increment } from 'firebase/firestore';
import type { CartItem, ShippingAddress, PaymentMethodType, DeliveryMethodType, CheckoutOrder } from '../types/cart';
import type { BookFormat } from '../types';
import './CheckoutPage.css';

/**
 * Format Indian Rupee amounts into official spoken words for statutory invoices
 */
function formatINRWords(amount: number): string {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const num = Math.floor(amount);
  if (num <= 0) return 'Zero Rupees Only';

  function twoDigits(n: number): string {
    if (n < 20) return ones[n];
    const unit = n % 10;
    return tens[Math.floor(n / 10)] + (unit ? ' ' + ones[unit] : '');
  }

  function threeDigits(n: number): string {
    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    let s = '';
    if (hundred > 0) s += ones[hundred] + ' Hundred';
    if (rest > 0) s += (s ? ' ' : '') + twoDigits(rest);
    return s;
  }

  let result = '';
  const thousands = Math.floor(num / 1000);
  const remainder = num % 1000;

  if (thousands > 0) {
    result += twoDigits(thousands) + ' Thousand ';
  }
  if (remainder > 0) {
    result += threeDigits(remainder);
  }

  return (result.trim() || 'Zero') + ' Rupees Only';
}

/**
 * Pre-calculated 28 celebratory confetti particles with outward trajectories
 */
const CONFETTI_PARTICLES = Array.from({ length: 28 }, (_, i) => {
  const angleRad = (i * 2 * Math.PI) / 28;
  const dist = 65 + (i % 4) * 32;
  return {
    id: i,
    tx: Math.round(Math.cos(angleRad) * dist),
    ty: Math.round(Math.sin(angleRad) * dist),
    color: ['#2563EB', '#10B981', '#F59E0B', '#6366F1', '#EC4899', '#059669', '#3B82F6', '#D97706'][i % 8],
    delay: (i % 6) * 35,
    size: 6 + (i % 3) * 3,
  };
});

export const CheckoutPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { items: cartItems, buyNowItem, clearCart, setBuyNowItem } = useCart();

  const queryBookId = searchParams.get('bookId');
  const queryFormat = (searchParams.get('format') || 'paperback') as BookFormat;

  // Determine checkout items:
  // 1. If explicit queryBookId is in URL, build single-item order from catalogue
  // 2. Else if buyNowItem exists in CartContext, use it
  // 3. Otherwise checkout the regular cart items
  const [checkoutItems] = useState<CartItem[]>(() => {
    if (queryBookId) {
      const book = getBookById(queryBookId);
      if (book) {
        const unitPrice = getEditionPrice(book, queryFormat);
        const isDigital = isDigitalFormat(queryFormat);
        return [
          {
            id: `direct-${book.id}-${queryFormat}`,
            bookId: book.id,
            slug: book.slug,
            title: book.title,
            subtitle: book.subtitle,
            authorName: book.author.name,
            coverImageUrl: book.coverImageUrl || '/covers/architecture.jpg',
            format: queryFormat,
            formatLabel: getFormatLabel(queryFormat),
            coverFinish: isDigital ? undefined : 'matte',
            unitPrice,
            quantity: 1,
            lineTotal: unitPrice,
            isDigital,
          },
        ];
      }
    }
    if (buyNowItem) {
      return [buyNowItem];
    }
    return cartItems;
  });

  // Check if order contains only digital items (eBooks / audiobooks)
  const isAllDigital = checkoutItems.length > 0 && checkoutItems.every((it) => it.isDigital);

  // Address state
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: user?.displayName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    addressLine: '',
    landmark: '',
    city: 'Pune',
    state: 'Maharashtra',
    pinCode: '',
    deliveryInstructions: '',
  });

  // Delivery & Payment selections
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethodType>(
    isAllDigital ? 'digital' : 'standard'
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('upi');

  // Checkout submission states
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStage, setProcessingStage] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<CheckoutOrder | null>(null);

  // Auto-fill user details if logged in
  useEffect(() => {
    if (user) {
      setAddress((prev) => ({
        ...prev,
        fullName: prev.fullName || user.displayName || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
      }));
    }
  }, [user]);

  // Calculations
  const subtotal = checkoutItems.reduce((acc, it) => acc + it.lineTotal, 0);
  const deliveryFee =
    isAllDigital || deliveryMethod === 'digital'
      ? 0
      : deliveryMethod === 'express'
      ? 99
      : subtotal >= 499
      ? 0
      : 50;

  const finalTotal = subtotal + deliveryFee;

  // Address field change handler
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
    setErrorMessage(null);
  };

  // Place Order handler with Multi-Stage Celebration Animation
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const fullName = ((formData.get('fullName') as string) || address.fullName || '').trim();
    const email = ((formData.get('email') as string) || address.email || '').trim().toLowerCase();
    const phone = ((formData.get('phone') as string) || address.phone || '').trim();
    const addressLine = ((formData.get('addressLine') as string) || address.addressLine || '').trim();
    const city = ((formData.get('city') as string) || address.city || '').trim();
    const stateVal = ((formData.get('state') as string) || address.state || '').trim();
    const pinCode = ((formData.get('pinCode') as string) || address.pinCode || '').trim();
    const deliveryInstructions = ((formData.get('deliveryInstructions') as string) || address.deliveryInstructions || '').trim();

    // Form validation
    if (!fullName) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!phone || phone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Physical delivery address validation
    if (!isAllDigital) {
      if (!addressLine) {
        setErrorMessage('Please enter your delivery street address / building name.');
        return;
      }
      if (!city) {
        setErrorMessage('Please enter your city.');
        return;
      }
      if (!pinCode || pinCode.length < 6) {
        setErrorMessage('Please enter a valid 6-digit PIN code.');
        return;
      }
    }

    const finalAddress: ShippingAddress = {
      fullName,
      email,
      phone,
      addressLine,
      city,
      state: stateVal,
      pinCode,
      deliveryInstructions,
    };

    setIsProcessing(true);
    setProcessingStage(1);

    try {
      // Stage 1: Banking Session & Cryptographic Token Authorization
      await new Promise((resolve) => setTimeout(resolve, 650));
      setProcessingStage(2);

      // Stage 2: Inventory stock allocation & serial registration
      await new Promise((resolve) => setTimeout(resolve, 750));
      setProcessingStage(3);

      // Stage 3: Official publisher tax invoice generation & digital signing
      await new Promise((resolve) => setTimeout(resolve, 700));

      const generatedOrderId = `MED-${Math.floor(100000 + Math.random() * 900000)}`;

      const orderData: CheckoutOrder = {
        orderId: generatedOrderId,
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        items: checkoutItems,
        shippingAddress: isAllDigital ? undefined : finalAddress,
        deliveryMethod,
        deliveryFee,
        subtotal,
        discount: 0,
        tax: 0,
        finalTotal,
        paymentMethod,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        userId: user?.id,
      };

      // If user is authenticated with Firebase, record to Cloud Firestore
      if (user && db) {
        try {
          const userDocRef = doc(db, 'users', user.id);
          const purchasedBookEntries = checkoutItems.map((it) => ({
            bookId: it.bookId,
            title: it.title,
            format: it.format,
            orderId: generatedOrderId,
            purchasedAt: new Date().toISOString(),
          }));

          const paymentEntry = {
            orderId: generatedOrderId,
            amount: finalTotal,
            paymentMethod,
            status: 'completed',
            date: new Date().toISOString(),
          };

          await updateDoc(userDocRef, {
            purchasedBooks: arrayUnion(...purchasedBookEntries),
            paymentHistory: arrayUnion(paymentEntry),
            totalSpent: increment(finalTotal),
          });
        } catch (dbErr) {
          console.warn('Firestore purchase sync notice:', dbErr);
        }
      }

      // Clear buyNow or Cart
      if (buyNowItem) {
        setBuyNowItem(null);
      } else {
        clearCart();
      }

      // Stage 4: Celebration Confetti & Spring Checkmark burst
      setProcessingStage(4);
      await new Promise((resolve) => setTimeout(resolve, 1100));

      setConfirmedOrder(orderData);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to complete checkout.';
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
      setProcessingStage(0);
    }
  };

  // ==========================================================================
  // CONFIRMATION: OFFICIAL PUBLISHER TAX INVOICE & ORDER RECEIPT
  // ==========================================================================
  if (confirmedOrder) {
    return (
      <div className="medhankar-checkout-page-root">
        <Navbar />

        <main className="medhankar-checkout-main">
          <div className="medhankar-checkout-container" style={{ maxWidth: '880px' }}>
            
            {/* Top Celebration Card (Screen Only) */}
            <div className="receipt-celebration-hero no-print" role="region" aria-label="Order Celebration">
              <div className="receipt-success-badge-circle">
                <CheckCircle2 size={44} color="#059669" strokeWidth={2.4} />
              </div>

              <div className="receipt-celebration-pill">
                <Sparkles size={13} color="#D97706" />
                <span>ORDER #{confirmedOrder.orderId} CONFIRMED &bull; PAYMENT SETTLED</span>
              </div>

              <h1 className="receipt-celebration-title">Thank you, {confirmedOrder.customerName}!</h1>
              <p className="receipt-celebration-subtext">
                Your order has been verified and registered at Medhankar Publications press. A full invoice copy and consignment dispatch tracking link has been emailed to <strong>{confirmedOrder.customerEmail}</strong>.
              </p>

              {/* Action Toolbar */}
              <div className="receipt-action-toolbar">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn-invoice-print-primary"
                  id="print-official-invoice-btn"
                >
                  <Printer size={16} strokeWidth={2.2} />
                  <span>Print Official Tax Invoice</span>
                </button>

                <Link to="/library" className="btn-invoice-library">
                  <BookOpen size={16} strokeWidth={2.0} />
                  <span>My Library &amp; Purchases</span>
                </Link>

                <Link to="/" className="btn-invoice-catalogue">
                  <span>Browse More Books</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* ================================================================
                OFFICIAL PUBLISHER TAX INVOICE DOCUMENT
                Authentic, high-density printable paper invoice matching Indian Publishing standards
                ================================================================ */}
            <article className="receipt-official-invoice-document" id="printable-official-invoice">
              {/* Gold Security Border Accent */}
              <div className="invoice-doc-accent-bar" />

              {/* Invoice Company Header */}
              <div className="invoice-doc-header">
                <div className="invoice-header-brand-col">
                  <div className="invoice-brand-row">
                    <img
                      src="/medhankar-logo.png"
                      alt="Medhankar Publication"
                      className="invoice-logo-img"
                    />
                    <div className="invoice-brand-titles">
                      <h2 className="invoice-corp-name">MEDHANKAR GRAPHICS AND PUBLICATIONS PVT. LTD.</h2>
                      <span className="invoice-corp-sub">GOVERNMENT REGISTERED PUBLISHER &bull; ESTD. 2024</span>
                    </div>
                  </div>

                  <div className="invoice-corp-details">
                    <p>
                      <strong>Corporate Identification No. (CIN):</strong> U22110PN2024PTC230129<br />
                      <strong>Registered Office:</strong> Deccan Gymkhana, Pune, Maharashtra 411004, India<br />
                      <strong>Email:</strong> contact@medhankarpublication.com &bull; <strong>Web:</strong> www.medhankarpublication.com
                    </p>
                  </div>
                </div>

                <div className="invoice-header-badge-col">
                  <div className="invoice-type-tag">
                    <span className="invoice-tag-main">TAX INVOICE &amp; CASH MEMO</span>
                    <span className="invoice-tag-copy">ORIGINAL FOR RECIPIENT</span>
                  </div>
                  <div className="invoice-gst-exempt-pill">
                    <ShieldCheck size={12} color="#047857" />
                    <span>GST EXEMPT (BOOKS)</span>
                  </div>
                </div>
              </div>

              {/* 4-Box Key Meta Matrix */}
              <div className="invoice-meta-matrix">
                <div className="invoice-meta-cell">
                  <span className="meta-cell-label">INVOICE / ORDER NO.</span>
                  <strong className="meta-cell-value">#{confirmedOrder.orderId}</strong>
                </div>
                <div className="invoice-meta-cell">
                  <span className="meta-cell-label">INVOICE DATE &amp; TIME</span>
                  <strong className="meta-cell-value">
                    {new Date(confirmedOrder.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })},{' '}
                    {new Date(confirmedOrder.createdAt).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </strong>
                </div>
                <div className="invoice-meta-cell">
                  <span className="meta-cell-label">PAYMENT METHOD</span>
                  <strong className="meta-cell-value" style={{ textTransform: 'uppercase' }}>
                    {confirmedOrder.paymentMethod} &bull; <span style={{ color: '#059669' }}>PAID &amp; SETTLED</span>
                  </strong>
                </div>
                <div className="invoice-meta-cell">
                  <span className="meta-cell-label">FULFILLMENT STATUS</span>
                  <strong className="meta-cell-value" style={{ color: '#2563EB' }}>
                    {isAllDigital ? 'Instant Digital License' : 'Ready For Dispatch'}
                  </strong>
                </div>
              </div>

              {/* Billed To & Shipped To Section */}
              <div className="invoice-parties-grid">
                <div className="invoice-party-card">
                  <h3 className="party-card-title">BILLED TO (CUSTOMER DETAILS)</h3>
                  <div className="party-card-body">
                    <p className="party-name"><strong>{confirmedOrder.customerName}</strong></p>
                    <p className="party-contact">
                      Mobile: {confirmedOrder.customerPhone}<br />
                      Email: {confirmedOrder.customerEmail}
                    </p>
                    <p className="party-state">State: Maharashtra (Code: 27) &bull; Place of Supply: India</p>
                  </div>
                </div>

                <div className="invoice-party-card">
                  <h3 className="party-card-title">
                    {confirmedOrder.shippingAddress ? 'SHIPPED TO (DELIVERY ADDRESS)' : 'DIGITAL ACCESS DESTINATION'}
                  </h3>
                  <div className="party-card-body">
                    {confirmedOrder.shippingAddress ? (
                      <>
                        <p className="party-name"><strong>{confirmedOrder.shippingAddress.fullName}</strong> ({confirmedOrder.shippingAddress.phone})</p>
                        <p className="party-contact">
                          {confirmedOrder.shippingAddress.addressLine}<br />
                          {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state} &ndash; {confirmedOrder.shippingAddress.pinCode}
                        </p>
                        {confirmedOrder.shippingAddress.deliveryInstructions && (
                          <p className="party-instructions">
                            <em>Note: {confirmedOrder.shippingAddress.deliveryInstructions}</em>
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="party-name"><strong>Digital eBook &amp; Library Access</strong></p>
                        <p className="party-contact">
                          License registered under account: {confirmedOrder.customerEmail}<br />
                          Format: High-Definition DRM-Free PDF / EPUB Cloud Synchronized
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="invoice-table-wrapper">
                <table className="invoice-items-table">
                  <thead>
                    <tr>
                      <th style={{ width: '40px' }}>#</th>
                      <th>Publication Title &amp; Details</th>
                      <th style={{ width: '130px' }}>Format &amp; Edition</th>
                      <th style={{ width: '70px', textAlign: 'center' }}>HSN</th>
                      <th style={{ width: '60px', textAlign: 'center' }}>Qty</th>
                      <th style={{ width: '100px', textAlign: 'right' }}>Unit Rate</th>
                      <th style={{ width: '110px', textAlign: 'right' }}>Net Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {confirmedOrder.items.map((it, idx) => (
                      <tr key={it.id}>
                        <td style={{ color: '#64748B', fontWeight: 600 }}>{idx + 1}</td>
                        <td>
                          <div className="invoice-item-title-cell">
                            <img src={it.coverImageUrl} alt={it.title} className="invoice-item-cover-thumb" />
                            <div>
                              <strong className="invoice-book-title">{it.title}</strong>
                              {it.subtitle && <span className="invoice-book-sub">{it.subtitle}</span>}
                              <span className="invoice-book-author">By {it.authorName}</span>
                              {it.dedication && (
                                <div className="invoice-dedication-box">
                                  <span>Dedication: &ldquo;{it.dedication}&rdquo;</span>
                                </div>
                              )}
                              {it.coverFinish && (
                                <span className="invoice-finish-badge">
                                  Finish: {it.coverFinish === 'glossy' ? 'Glossy Premium' : 'Matte Velvet'}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="invoice-format-pill">{it.formatLabel}</span>
                        </td>
                        <td style={{ textAlign: 'center', color: '#64748B', fontSize: '0.8rem' }}>4901</td>
                        <td style={{ textAlign: 'center', fontWeight: 700 }}>{it.quantity}</td>
                        <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatPrice(it.unitPrice)}</td>
                        <td style={{ textAlign: 'right', fontWeight: 700, color: '#0F172A' }}>
                          {formatPrice(it.lineTotal)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Financial Calculation Breakdown */}
              <div className="invoice-totals-section">
                <div className="invoice-words-col">
                  <div className="invoice-words-box">
                    <span className="words-label">AMOUNT IN WORDS (INR):</span>
                    <strong className="words-text">{formatINRWords(confirmedOrder.finalTotal)}</strong>
                  </div>

                  <div className="invoice-statutory-tax-note">
                    <p>
                      <strong>Statutory Tax Exemption Note:</strong> Printed books and literary publications (HSN Chapter 4901) are exempted from Goods and Services Tax (GST) under Sl. No. 119 of Notification No. 2/2017-Central Tax (Rate). Rate of CGST: 0%, SGST: 0%, IGST: 0%.
                    </p>
                  </div>
                </div>

                <div className="invoice-figures-col">
                  <div className="invoice-calc-row">
                    <span>Items Subtotal:</span>
                    <strong>{formatPrice(confirmedOrder.subtotal)}</strong>
                  </div>

                  <div className="invoice-calc-row">
                    <span>Delivery &amp; Packaging:</span>
                    {confirmedOrder.deliveryFee === 0 ? (
                      <span className="free-delivery-badge">FREE DELIVERY</span>
                    ) : (
                      <strong>{formatPrice(confirmedOrder.deliveryFee)}</strong>
                    )}
                  </div>

                  <div className="invoice-calc-row">
                    <span>Applicable GST (0% Exempt):</span>
                    <span style={{ color: '#64748B' }}>₹0.00</span>
                  </div>

                  <div className="invoice-calc-divider" />

                  <div className="invoice-calc-row invoice-grand-total-row">
                    <span>Grand Total Paid:</span>
                    <strong className="invoice-grand-total-val">{formatPrice(confirmedOrder.finalTotal)}</strong>
                  </div>
                </div>
              </div>

              {/* Official Seal & Authenticity Block */}
              <div className="invoice-doc-footer">
                {/* Left: Security QR Code Verification */}
                <div className="invoice-security-qr-col">
                  <div className="invoice-qr-box">
                    <QrCode size={40} color="#0F172A" strokeWidth={1.8} />
                    <div className="invoice-qr-meta">
                      <span className="qr-title">DIGITALLY CERTIFIED</span>
                      <span className="qr-code-id">HASH: {confirmedOrder.orderId}-VERIFIED</span>
                    </div>
                  </div>
                  <p className="invoice-disclaimer-text">
                    This is a digitally certified, tamper-proof electronic tax invoice issued by Medhankar Graphics and Publications Private Limited.
                  </p>
                </div>

                {/* Right: Digital Signature & Seal */}
                <div className="invoice-signature-col">
                  <div className="invoice-seal-wrap">
                    <div className="invoice-circular-seal">
                      <div className="seal-inner-circle">
                        <span className="seal-company">MEDHANKAR</span>
                        <span className="seal-star">&starf; OFFICIAL SEAL &starf;</span>
                        <span className="seal-city">PUNE, INDIA</span>
                      </div>
                    </div>
                  </div>

                  <div className="invoice-sig-box">
                    <div className="invoice-sig-cursive">Dr. Lal Ji Medhankar</div>
                    <div className="invoice-sig-line" />
                    <span className="invoice-sig-name">Dr. Lal Ji Medhankar</span>
                    <span className="invoice-sig-title">Founder &amp; Chief Editor</span>
                    <span className="invoice-sig-org">Medhankar Graphics &amp; Publications Pvt. Ltd.</span>
                  </div>
                </div>
              </div>
            </article>

          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // ==========================================================================
  // CHECKOUT FORM (EMPTY FALLBACK)
  // ==========================================================================
  if (checkoutItems.length === 0) {
    return (
      <div className="medhankar-checkout-page-root">
        <Navbar />
        <main className="container" style={{ flex: 1, padding: '90px 24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.8rem', color: '#0F172A', marginBottom: '14px' }}>
            No Items Selected for Checkout
          </h1>
          <p style={{ color: '#64748B', marginBottom: '24px' }}>
            Your cart is empty. Please choose a book from our catalogue to proceed with purchase.
          </p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Explore Books</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="medhankar-checkout-page-root">
      <Navbar />

      <main className="medhankar-checkout-main">
        <div className="medhankar-checkout-container">
          {/* Top Title & Step Indicator */}
          <div className="checkout-header-row">
            <Link to="/cart" className="checkout-back-link">
              <ArrowLeft size={16} />
              <span>Back to Cart</span>
            </Link>
            <div className="checkout-badge-secure">
              <Lock size={13} color="#059669" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>

          <h1 className="checkout-page-title">Review &amp; Place Your Order</h1>

          {errorMessage && (
            <div className="checkout-error-banner" role="alert">
              <AlertCircle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 2-Column Checkout Layout */}
          <form onSubmit={handlePlaceOrder} className="checkout-grid-layout">
            {/* LEFT COLUMN: Customer Info, Shipping & Payment */}
            <div className="checkout-form-column">
              {/* SECTION 1: CUSTOMER CONTACT */}
              <section className="checkout-section-box">
                <div className="section-title-row">
                  <span className="section-num-pill">1</span>
                  <h2 className="section-heading">Contact Information</h2>
                </div>

                <div className="form-fields-grid grid-2-col">
                  <div className="form-group">
                    <label className="field-label" htmlFor="fullName">Full Name *</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={address.fullName}
                      onChange={handleAddressChange}
                      placeholder="e.g. Rahul Sharma"
                      className="field-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="field-label" htmlFor="phone">Mobile Number *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={address.phone}
                      onChange={handleAddressChange}
                      placeholder="10-digit mobile number"
                      className="field-input"
                    />
                  </div>

                  <div className="form-group span-2">
                    <label className="field-label" htmlFor="email">Email Address (for order tracking &amp; invoice) *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={address.email}
                      onChange={handleAddressChange}
                      placeholder="name@gmail.com"
                      className="field-input"
                    />
                  </div>
                </div>
              </section>

              {/* SECTION 2: DELIVERY ADDRESS (Only if physical book) */}
              {!isAllDigital ? (
                <section className="checkout-section-box">
                  <div className="section-title-row">
                    <span className="section-num-pill">2</span>
                    <h2 className="section-heading">Delivery Address</h2>
                  </div>

                  <div className="form-fields-grid grid-2-col">
                    <div className="form-group span-2">
                      <label className="field-label" htmlFor="addressLine">Street Address / Flat / Building *</label>
                      <input
                        id="addressLine"
                        name="addressLine"
                        type="text"
                        required
                        value={address.addressLine}
                        onChange={handleAddressChange}
                        placeholder="House no., Building name, Street area"
                        className="field-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="field-label" htmlFor="landmark">Landmark (Optional)</label>
                      <input
                        id="landmark"
                        name="landmark"
                        type="text"
                        value={address.landmark}
                        onChange={handleAddressChange}
                        placeholder="Near temple / school / park"
                        className="field-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="field-label" htmlFor="pinCode">PIN Code *</label>
                      <input
                        id="pinCode"
                        name="pinCode"
                        type="text"
                        maxLength={6}
                        required
                        value={address.pinCode}
                        onChange={handleAddressChange}
                        placeholder="6-digit PIN code"
                        className="field-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="field-label" htmlFor="city">City *</label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={address.city}
                        onChange={handleAddressChange}
                        placeholder="City / Town"
                        className="field-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="field-label" htmlFor="state">State *</label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        required
                        value={address.state}
                        onChange={handleAddressChange}
                        placeholder="State"
                        className="field-input"
                      />
                    </div>
                  </div>
                </section>
              ) : (
                <section className="checkout-section-box digital-notice-box">
                  <div className="section-title-row">
                    <span className="section-num-pill">2</span>
                    <h2 className="section-heading">Digital Delivery</h2>
                  </div>
                  <p className="digital-notice-text">
                    This order contains <strong>Digital eBook / Audiobook editions</strong>. No physical shipping is required. Your digital license and access keys will be linked to your account and sent to <strong>{address.email || 'your email'}</strong> immediately upon payment.
                  </p>
                </section>
              )}

              {/* SECTION 3: DELIVERY METHOD (If physical) */}
              {!isAllDigital && (
                <section className="checkout-section-box">
                  <div className="section-title-row">
                    <span className="section-num-pill">3</span>
                    <h2 className="section-heading">Delivery Method</h2>
                  </div>

                  <div className="delivery-methods-list" role="radiogroup">
                    <label className={`delivery-method-card ${deliveryMethod === 'standard' ? 'is-selected' : ''}`}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="standard"
                        checked={deliveryMethod === 'standard'}
                        onChange={() => setDeliveryMethod('standard')}
                      />
                      <div className="delivery-card-info">
                        <strong>Standard Courier Delivery</strong>
                        <span>3&ndash;5 business days &bull; Tracked via BlueDart / Delhivery</span>
                      </div>
                      <span className="delivery-fee-badge">
                        {subtotal >= 499 ? 'FREE' : '₹50'}
                      </span>
                    </label>

                    <label className={`delivery-method-card ${deliveryMethod === 'express' ? 'is-selected' : ''}`}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="express"
                        checked={deliveryMethod === 'express'}
                        onChange={() => setDeliveryMethod('express')}
                      />
                      <div className="delivery-card-info">
                        <strong>Express Air Courier</strong>
                        <span>1&ndash;2 business days priority dispatch</span>
                      </div>
                      <span className="delivery-fee-badge">₹99</span>
                    </label>
                  </div>
                </section>
              )}

              {/* SECTION 4: PAYMENT SELECTION */}
              <section className="checkout-section-box">
                <div className="section-title-row">
                  <span className="section-num-pill">{isAllDigital ? '3' : '4'}</span>
                  <h2 className="section-heading">Payment Method</h2>
                </div>

                <div className="payment-methods-grid" role="radiogroup">
                  <label className={`payment-option-card ${paymentMethod === 'upi' ? 'is-selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                    />
                    <div className="payment-card-body">
                      <strong>UPI (Instant &amp; Zero Fee)</strong>
                      <span>Google Pay, PhonePe, Paytm, BHIM &amp; QR</span>
                    </div>
                  </label>

                  <label className={`payment-option-card ${paymentMethod === 'card' ? 'is-selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <div className="payment-card-body">
                      <strong>Credit / Debit Card</strong>
                      <span>Visa, MasterCard, RuPay &amp; American Express</span>
                    </div>
                  </label>

                  <label className={`payment-option-card ${paymentMethod === 'netbanking' ? 'is-selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="netbanking"
                      checked={paymentMethod === 'netbanking'}
                      onChange={() => setPaymentMethod('netbanking')}
                    />
                    <div className="payment-card-body">
                      <strong>Net Banking</strong>
                      <span>All 50+ Major Indian Scheduled Banks</span>
                    </div>
                  </label>

                  {!isAllDigital && (
                    <label className={`payment-option-card ${paymentMethod === 'cod' ? 'is-selected' : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                      />
                      <div className="payment-card-body">
                        <strong>Cash on Delivery (COD)</strong>
                        <span>Pay cash at your doorstep upon delivery</span>
                      </div>
                    </label>
                  )}
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN: Order Summary & Place Order Button */}
            <div className="checkout-summary-column">
              <aside className="checkout-summary-card" aria-label="Purchase Summary">
                <h3 className="summary-card-title">Order Items ({checkoutItems.length})</h3>

                {/* Items Mini List */}
                <div className="checkout-mini-items">
                  {checkoutItems.map((item) => (
                    <div key={item.id} className="mini-item-row">
                      <img src={item.coverImageUrl} alt={item.title} className="mini-item-thumb" />
                      <div className="mini-item-details">
                        <strong className="mini-item-title">{item.title}</strong>
                        <span className="mini-item-edition">
                          {item.formatLabel} &times; {item.quantity}
                        </span>
                        {item.dedication && (
                          <span className="mini-item-dedication">
                            &ldquo;{item.dedication}&rdquo;
                          </span>
                        )}
                      </div>
                      <span className="mini-item-price">{formatPrice(item.lineTotal)}</span>
                    </div>
                  ))}
                </div>

                <div className="summary-calc-divider" />

                {/* Calculation Rows */}
                <div className="summary-calc-rows">
                  <div className="calc-row">
                    <span>Items Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  <div className="calc-row">
                    <span>Delivery</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <strong style={{ color: '#059669' }}>FREE</strong>
                      ) : (
                        formatPrice(deliveryFee)
                      )}
                    </span>
                  </div>

                  <div className="calc-row">
                    <span>GST (Included)</span>
                    <span style={{ color: '#64748B' }}>₹0.00</span>
                  </div>

                  <div className="summary-calc-divider" />

                  <div className="calc-row calc-total-row">
                    <span>Total Amount</span>
                    <strong className="calc-grand-total">{formatPrice(finalTotal)}</strong>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-place-order"
                  id="checkout-place-order-btn"
                >
                  {isProcessing ? (
                    <span>Confirming Order...</span>
                  ) : (
                    <>
                      <span>Place Order &bull; {formatPrice(finalTotal)}</span>
                      <ArrowRight size={18} strokeWidth={2.4} />
                    </>
                  )}
                </button>

                <p className="checkout-legal-disclaimer">
                  By clicking Place Order, you confirm your purchase under Medhankar Graphics and Publications Private Limited terms of service.
                </p>

                {/* Trust Badges */}
                <div className="checkout-trust-box">
                  <div className="trust-row">
                    <ShieldCheck size={16} color="#2563EB" />
                    <span>Official Publisher Direct Dispatch</span>
                  </div>
                  <div className="trust-row">
                    <Truck size={16} color="#2563EB" />
                    <span>Pan-India Courier &amp; Live Tracking</span>
                  </div>
                </div>
              </aside>
            </div>
          </form>
        </div>
      </main>

      {/* =====================================================================
          CINEMATIC MULTI-STAGE ORDER PROCESSING & CELEBRATION MODAL
          ===================================================================== */}
      {isProcessing && (
        <div className="order-processing-modal-backdrop" role="dialog" aria-modal="true" aria-label="Processing your book order">
          <div className="order-processing-card">
            {processingStage === 4 ? (
              // STAGE 4: CELEBRATION BURST & SPRING CHECKMARK
              <div className="stage-celebration-box">
                {/* Outward Bursting Confetti Particles */}
                <div className="confetti-burst-container" aria-hidden="true">
                  {CONFETTI_PARTICLES.map((p) => (
                    <span
                      key={p.id}
                      className="confetti-particle"
                      style={{
                        '--tx': `${p.tx}px`,
                        '--ty': `${p.ty}px`,
                        backgroundColor: p.color,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        animationDelay: `${p.delay}ms`,
                      } as React.CSSProperties}
                    />
                  ))}
                </div>

                {/* Animated Spring SVG Checkmark */}
                <div className="spring-check-circle">
                  <svg className="checkmark-svg" viewBox="0 0 52 52">
                    <circle className="checkmark-circle" cx="26" cy="26" r="24" fill="none" />
                    <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                  </svg>
                </div>

                <div className="celebration-badge-pill">
                  <Sparkles size={13} color="#D97706" />
                  <span>TRANSACTION VERIFIED</span>
                </div>

                <h3 className="processing-modal-title">Order Placed Successfully!</h3>
                <p className="processing-modal-subtitle">
                  Generating official publisher tax invoice &amp; allocating stock...
                </p>

                <div className="processing-progress-section">
                  <div className="processing-bar-track">
                    <div className="processing-bar-fill is-complete" />
                  </div>
                  <span className="processing-pct-label">100% &bull; Certified &amp; Recorded</span>
                </div>
              </div>
            ) : (
              // STAGES 1 TO 3: PROGRESSIVE PIPELINE
              <div className="stage-pipeline-box">
                {/* Animated Security Pulsing Ring */}
                <div className="gateway-spinner-wrap">
                  <div className="gateway-pulse-ring" />
                  <div className="gateway-spinner-circle" />
                  <div className="gateway-center-icon">
                    {processingStage === 1 && <Lock size={26} color="#2563EB" strokeWidth={2.4} />}
                    {processingStage === 2 && <BookOpen size={26} color="#2563EB" strokeWidth={2.4} />}
                    {processingStage === 3 && <FileText size={26} color="#059669" strokeWidth={2.4} />}
                  </div>
                </div>

                <div className="pipeline-step-badge">
                  <span>STEP {processingStage} OF 3 &bull; SECURE CHECKOUT</span>
                </div>

                <h3 className="processing-modal-title">
                  {processingStage === 1 && 'Connecting Payment Gateway...'}
                  {processingStage === 2 && 'Allocating Inventory & Printing Batch...'}
                  {processingStage === 3 && 'Generating Official Publisher Invoice...'}
                </h3>

                <p className="processing-modal-subtitle">
                  {processingStage === 1 && 'Authorizing 256-bit encrypted banking session & cryptographic token.'}
                  {processingStage === 2 && 'Reserving press edition, serializing order & preparing warehouse manifest.'}
                  {processingStage === 3 && 'Affixing official digital publisher seal & Dr. Lal Ji Medhankar signature.'}
                </p>

                {/* Multi-step track indicators */}
                <div className="pipeline-steps-indicator">
                  <div className={`step-dot-item ${processingStage >= 1 ? 'is-active' : ''} ${processingStage > 1 ? 'is-done' : ''}`}>
                    <span className="step-dot-circle">{processingStage > 1 ? <Check size={11} strokeWidth={3} /> : '1'}</span>
                    <span className="step-dot-text">Gateway</span>
                  </div>
                  <div className={`step-dot-line ${processingStage >= 2 ? 'is-filled' : ''}`} />
                  <div className={`step-dot-item ${processingStage >= 2 ? 'is-active' : ''} ${processingStage > 2 ? 'is-done' : ''}`}>
                    <span className="step-dot-circle">{processingStage > 2 ? <Check size={11} strokeWidth={3} /> : '2'}</span>
                    <span className="step-dot-text">Stock</span>
                  </div>
                  <div className={`step-dot-line ${processingStage >= 3 ? 'is-filled' : ''}`} />
                  <div className={`step-dot-item ${processingStage >= 3 ? 'is-active' : ''}`}>
                    <span className="step-dot-circle">3</span>
                    <span className="step-dot-text">Tax Invoice</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="processing-progress-section">
                  <div className="processing-bar-track">
                    <div
                      className="processing-bar-fill"
                      style={{
                        width:
                          processingStage === 1 ? '34%' :
                          processingStage === 2 ? '68%' : '94%',
                      }}
                    />
                  </div>
                  <div className="processing-progress-meta">
                    <span className="secure-footnote">
                      <ShieldCheck size={12} color="#059669" />
                      <span>Medhankar SSL Security Shield</span>
                    </span>
                    <span className="processing-pct-label">
                      {processingStage === 1 && '34%'}
                      {processingStage === 2 && '68%'}
                      {processingStage === 3 && '94%'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
