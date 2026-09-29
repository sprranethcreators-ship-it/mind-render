import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { StorageService } from '../services/storageService';
import { useAuth } from '../context/AuthContext';
import { Book3DCover } from '../components/books/Book3DCover';
import { BookPreviewModal } from '../components/books/BookPreviewModal';
import { SecureCheckoutModal } from '../components/books/SecureCheckoutModal';
import { InAppReaderModal } from '../components/reader/InAppReaderModal';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Eye, 
  BookOpen, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  Check, 
  Calendar, 
  FileText,
  Star
} from 'lucide-react';

export const BookDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { hasPurchased } = useAuth();
  
  const books = StorageService.getBooks();
  const book = books.find(b => b.slug === slug) || books[0];

  const [previewOpen, setPreviewOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [readerOpen, setReaderOpen] = useState(false);

  const alreadyOwned = hasPurchased(book.id);
  const relatedBooks = books.filter(b => b.id !== book.id).slice(0, 2);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: '#07080B' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ padding: '24px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container">
          <Link
            to="/books"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#94A3B8',
              fontSize: '0.85rem'
            }}
          >
            <ArrowLeft size={16} /> Back to Digital Bookstore
          </Link>
        </div>
      </div>

      {/* Main Book Hero Stage */}
      <section style={{ padding: '60px 0 80px' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '60px',
              alignItems: 'center'
            }}
          >
            {/* Left Column: 3D Cover */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Book3DCover book={book} size="lg" />
            </div>

            {/* Right Column: Title, Metadata, Pricing, Actions */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <span className="badge-gold">{book.category}</span>
                <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
                  ISBN: {book.isbn}
                </span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                  color: '#F8FAFC',
                  lineHeight: 1.15,
                  marginBottom: '0.75rem'
                }}
              >
                {book.title}
              </h1>

              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '1.35rem',
                  color: '#D4AF37',
                  marginBottom: '1.25rem',
                  lineHeight: 1.4
                }}
              >
                {book.subtitle}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.75rem', color: '#CBD5E1', fontSize: '0.9rem' }}>
                <span>By <strong>{book.author}</strong></span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#D4AF37' }}>
                  <Star size={15} fill="#D4AF37" /> {book.rating} ({book.reviewsCount} verified readers)
                </span>
              </div>

              <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                {book.aboutText}
              </p>

              {/* Pricing & Guarantee Box */}
              <div
                style={{
                  backgroundColor: '#0F121C',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  borderRadius: '16px',
                  padding: '24px 28px',
                  marginBottom: '2rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div>
                    <span style={{ fontSize: '2.3rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#D4AF37' }}>
                      ${book.price}
                    </span>
                    <span style={{ fontSize: '1.1rem', color: '#64748B', textDecoration: 'line-through', marginLeft: '8px' }}>
                      ${book.originalPrice} USD
                    </span>
                  </div>
                  <span style={{ fontSize: '0.84rem', color: '#CBD5E1' }}>
                    {book.format}
                  </span>
                </div>

                {/* Primary Buy or Read Button */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {alreadyOwned ? (
                    <button
                      onClick={() => setReaderOpen(true)}
                      className="btn-gold"
                      style={{ flex: 1, padding: '1rem', fontSize: '0.95rem' }}
                    >
                      <BookOpen size={18} /> Read in Mind Render Reader
                    </button>
                  ) : (
                    <button
                      onClick={() => setCheckoutOpen(true)}
                      className="btn-gold"
                      style={{ flex: 1, padding: '1rem', fontSize: '0.95rem' }}
                    >
                      <ShoppingCart size={18} /> Buy Digital Edition Now
                    </button>
                  )}

                  <button
                    onClick={() => setPreviewOpen(true)}
                    className="btn-secondary"
                    style={{ padding: '1rem 1.8rem', fontSize: '0.95rem' }}
                  >
                    <Eye size={18} /> Free Sample
                  </button>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.78rem',
                    color: '#94A3B8',
                    marginTop: '16px',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)'
                  }}
                >
                  <ShieldCheck size={15} color="#10B981" />
                  <span>Instant digital licensing, watermarked delivery, and uncompressed PDF access.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum & What You Will Master */}
      <section style={{ padding: '80px 0', backgroundColor: '#090B10', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
            {/* Learning Outcomes */}
            <div>
              <span className="section-tag">COGNITIVE MASTERY</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#F8FAFC', marginBottom: '1.5rem' }}>
                What You Will Internalize
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {book.learningOutcomes.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      backgroundColor: '#0E1119',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '12px',
                      padding: '18px 20px'
                    }}
                  >
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(212, 175, 55, 0.15)',
                        color: '#D4AF37',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    >
                      <Check size={14} />
                    </div>
                    <p style={{ color: '#E2E8F0', fontSize: '0.94rem', lineHeight: 1.6 }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Table of Contents */}
            <div>
              <span className="section-tag">CURRICULUM SYLLABUS</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#F8FAFC', marginBottom: '1.5rem' }}>
                Table of Contents ({book.pagesCount} Pages)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {book.tableOfContents.map((ch, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '14px 18px',
                      backgroundColor: '#0E1119',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{ color: '#F1F5F9', fontSize: '0.92rem' }}>{ch}</span>
                    <span style={{ color: '#64748B', fontSize: '0.78rem', fontFamily: 'monospace' }}>Part {idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Publications */}
      <section style={{ padding: '80px 0 120px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag" style={{ justifyContent: 'center' }}>CONTINUE THE INQUIRY</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#F8FAFC' }}>
              Companion Treatises
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {relatedBooks.map(rb => (
              <div
                key={rb.id}
                style={{
                  backgroundColor: '#0E111A',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px'
                }}
              >
                <div style={{ transform: 'scale(0.85)', transformOrigin: 'left center' }}>
                  <Book3DCover book={rb} size="sm" interactive={false} />
                </div>
                <div>
                  <span className="badge-gold" style={{ fontSize: '0.7rem' }}>{rb.category}</span>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#F8FAFC', marginTop: '6px', marginBottom: '4px' }}>
                    <Link to={`/books/${rb.slug}`} style={{ color: 'inherit' }}>{rb.title}</Link>
                  </h4>
                  <div style={{ color: '#D4AF37', fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px' }}>
                    ${rb.price} USD
                  </div>
                  <Link to={`/books/${rb.slug}`} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.78rem' }}>
                    Inspect Treatise
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modals */}
      <BookPreviewModal
        book={book}
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        onBuyNow={() => setCheckoutOpen(true)}
      />

      <SecureCheckoutModal
        book={book}
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onOpenReader={() => setReaderOpen(true)}
      />

      <InAppReaderModal
        book={book}
        isOpen={readerOpen}
        onClose={() => setReaderOpen(false)}
      />
    </div>
  );
};
