import React, { useState } from 'react';
import { Book, Order } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { PaymentService } from '../../services/paymentService';
import { PdfSecurityService } from '../../services/pdfSecurityService';
import { X, Lock, ShieldCheck, Download, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SecureCheckoutModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenReader?: (book: Book) => void;
}

export const SecureCheckoutModal: React.FC<SecureCheckoutModalProps> = ({
  book,
  isOpen,
  onClose,
  onOpenReader
}) => {
  const { currentUser, refreshUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [paymentMethod, setPaymentMethod] = useState<'Direct Checkout' | 'Razorpay'>('Direct Checkout');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen || !book) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail || !customerName) {
      showToast('error', 'Please provide your name and email for digital delivery.');
      return;
    }

    setIsProcessing(true);
    setProcessingStage('Connecting to secure cryptographic vault...');

    try {
      const result = await PaymentService.executeCheckout(
        {
          book: {
            id: book.id,
            title: book.title,
            author: book.author,
            price: book.price,
            currency: book.currency,
            coverGradient: {
              primary: book.coverGradient.primary,
              secondary: book.coverGradient.secondary,
              accent: book.coverGradient.accent
            }
          },
          customer: {
            name: customerName,
            email: customerEmail
          },
          preferredMethod: paymentMethod
        },
        (stage) => setProcessingStage(stage)
      );

      if (result.success && result.order) {
        setCompletedOrder(result.order);
        refreshUser();
        showToast('gold', 'Purchase Completed Successfully', `"${book.title}" added to your personal library.`);
      } else {
        showToast('error', 'Checkout failed', result.error || 'Payment was not authorized.');
      }
    } catch (err: any) {
      showToast('error', 'Payment processing error', err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadNow = () => {
    const res = PdfSecurityService.triggerSecureDownload(book);
    if (res.success) {
      showToast('success', 'Download Initiated', res.message);
    } else {
      showToast('error', 'Download Failed', res.message);
    }
  };

  const handleGoToLibrary = () => {
    onClose();
    navigate('/library');
  };

  const isRazorpayConfigured = PaymentService.isLiveGatewayConfigured();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 6, 8, 0.88)',
        backdropFilter: 'blur(16px)',
        zIndex: 9500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(12px, 2.5vw, 24px)',
        boxSizing: 'border-box'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '560px',
          maxHeight: 'min(92vh, 720px)',
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(25, 25, 29, 0.12)',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(25, 25, 29, 0.15)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: '#F7F4EE',
            borderBottom: '1px solid rgba(25, 25, 29, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={17} color="#D97706" />
            <span style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.94rem' }}>
              {completedOrder ? 'Purchase Confirmed' : 'Encrypted Digital Checkout'}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{ color: 'var(--text-secondary)', cursor: 'pointer', padding: '6px', minWidth: '32px', minHeight: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none' }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: 'clamp(16px, 3.5vw, 26px)', overflowY: 'auto', flex: 1, WebkitOverflowScrolling: 'touch', backgroundColor: '#FFFFFF' }}>
          {completedOrder ? (
            /* Purchase Success State */
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(5, 150, 105, 0.1)',
                  border: '1px solid rgba(5, 150, 105, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem'
                }}
              >
                <CheckCircle2 size={32} color="#059669" />
              </div>

              <span className="badge-gold" style={{ marginBottom: '0.75rem' }}>
                Order #{completedOrder.orderNumber}
              </span>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
                Access Granted to "{book.title}"
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
                A digital cryptographic license has been generated for <strong style={{ color: 'var(--text-primary)' }}>{completedOrder.userEmail}</strong>. You can read it immediately or download the encrypted manuscript.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={() => {
                    onClose();
                    onOpenReader?.(book);
                  }}
                  className="btn-gold"
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  <BookOpen size={18} /> Read Now in Mind Render Reader
                </button>

                <button
                  onClick={handleDownloadNow}
                  className="btn-secondary"
                  style={{ width: '100%', padding: '0.85rem' }}
                >
                  <Download size={18} /> Download Protected Manuscript
                </button>

                <button
                  onClick={handleGoToLibrary}
                  style={{
                    color: 'var(--indigo-600)',
                    fontSize: '0.88rem',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    marginTop: '0.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  View in My Library <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleCheckout}>
              {/* Book Summary Card */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  backgroundColor: '#FAF8F3',
                  border: '1px solid rgba(25, 25, 29, 0.08)',
                  borderRadius: '10px',
                  marginBottom: '1.5rem'
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '68px',
                    borderRadius: '4px',
                    background: `linear-gradient(135deg, ${book.coverGradient.primary}, ${book.coverGradient.secondary})`,
                    border: '1px solid rgba(140, 109, 35, 0.3)',
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem' }}>{book.title}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{book.author} • {book.format}</div>
                  <div style={{ color: '#B45309', fontWeight: 800, fontSize: '1.15rem', marginTop: '4px' }}>
                    ${book.price} <span style={{ fontSize: '0.75rem', color: '#8A8C9E', textDecoration: 'line-through' }}>${book.originalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Customer Inputs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-primary)', marginBottom: '6px', fontWeight: 600 }}>
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="Enter full name for certificate"
                    style={{ width: '100%', backgroundColor: '#FFFFFF', border: '1px solid rgba(25, 25, 29, 0.12)', color: 'var(--text-primary)', borderRadius: '8px' }}
                    disabled={isProcessing}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-primary)', marginBottom: '6px', fontWeight: 600 }}>
                    Delivery Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={e => setCustomerEmail(e.target.value)}
                    placeholder="name@domain.com"
                    style={{ width: '100%', backgroundColor: '#FFFFFF', border: '1px solid rgba(25, 25, 29, 0.12)', color: 'var(--text-primary)', borderRadius: '8px' }}
                    disabled={isProcessing}
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 600 }}>
                  Payment Method
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Direct Checkout')}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: paymentMethod === 'Direct Checkout' ? '1.5px solid #D97706' : '1px solid rgba(25, 25, 29, 0.1)',
                      backgroundColor: paymentMethod === 'Direct Checkout' ? 'rgba(254, 243, 199, 0.5)' : '#FAF8F3',
                      color: paymentMethod === 'Direct Checkout' ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontSize: '0.84rem',
                      fontWeight: 500,
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontWeight: 600, color: paymentMethod === 'Direct Checkout' ? '#92400E' : 'var(--text-primary)' }}>
                      Direct Instant Pay
                    </div>
                    <div style={{ fontSize: '0.72rem', marginTop: '2px', color: 'var(--text-secondary)' }}>Instant encrypted manuscript</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Razorpay')}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: paymentMethod === 'Razorpay' ? '1.5px solid var(--indigo-600)' : '1px solid rgba(25, 25, 29, 0.1)',
                      backgroundColor: paymentMethod === 'Razorpay' ? 'rgba(81, 70, 184, 0.08)' : '#FAF8F3',
                      color: paymentMethod === 'Razorpay' ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontSize: '0.84rem',
                      fontWeight: 500,
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontWeight: 600, color: paymentMethod === 'Razorpay' ? 'var(--indigo-600)' : 'var(--text-primary)' }}>
                      Razorpay Gateway
                    </div>
                    <div style={{ fontSize: '0.72rem', marginTop: '2px', color: 'var(--text-secondary)' }}>
                      {isRazorpayConfigured ? 'Live Gateway Online' : 'Card / NetBanking / UPI'}
                    </div>
                  </button>
                </div>
              </div>

              {/* Security Guarantee Notice */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '1.5rem',
                  padding: '10px 14px',
                  backgroundColor: 'rgba(5, 150, 105, 0.06)',
                  borderRadius: '6px',
                  border: '1px solid rgba(5, 150, 105, 0.2)'
                }}
              >
                <ShieldCheck size={16} color="#059669" />
                <span>256-bit TLS encrypted. Instant digital delivery & lifetime library access.</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="btn-gold"
                style={{
                  width: '100%',
                  padding: '1rem',
                  opacity: isProcessing ? 0.7 : 1,
                  cursor: isProcessing ? 'wait' : 'pointer'
                }}
              >
                {isProcessing ? (
                  <span>{processingStage || 'Processing...'}</span>
                ) : (
                  <span>Authorize & Pay ${book.price} USD</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
