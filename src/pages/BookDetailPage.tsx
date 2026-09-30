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
    <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: 'var(--bg-cosmos)' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ padding: '24px 0', borderBottom: '1px solid rgba(25, 25, 29, 0.08)' }}>
        <div className="container">
          <Link
            to="/books"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              textDecoration: 'none'
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(32px, 5vw, 60px)',
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
                <span style={{ fontSize: '0.82rem', color: '#8A8C9E' }}>
                  ISBN: {book.isbn}
                </span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                  color: 'var(--text-primary)',
                  lineHeight: 1.15,
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.02em'
                }}
              >
                {book.title}
              </h1>

              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '1.35rem',
                  color: '#8C6D23',
                  marginBottom: '1.25rem',
                  lineHeight: 1.4
                }}
              >
                {book.subtitle}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <span>By <strong style={{ color: 'var(--text-primary)' }}>{book.author}</strong></span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#8C6D23' }}>
                  <Star size={15} fill="#8C6D23" /> {book.rating} ({book.reviewsCount} verified readers)
                </span>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                {book.aboutText}
              </p>

              {/* Pricing & Guarantee Box */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(153, 117, 31, 0.25)',
                  borderRadius: '16px',
                  padding: '24px 28px',
                  marginBottom: '2rem',
                  boxShadow: '0 8px 24px rgba(25, 25, 29, 0.04)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div>
                    <span style={{ fontSize: '2.3rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#8C6D23' }}>
                      ${book.price}
                    </span>
                    <span style={{ fontSize: '1.1rem', color: '#8A8C9E', textDecoration: 'line-through', marginLeft: '8px' }}>
                      ${book.originalPrice} USD
                    </span>
                  </div>
                  <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
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
                    color: 'var(--text-secondary)',
                    marginTop: '16px',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(25, 25, 29, 0.08)'
                  }}
                >
                  <ShieldCheck size={15} color="#059669" />
                  <span>Instant digital licensing, watermarked delivery, and uncompressed PDF access.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum & What You Will Master */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-deep)', borderTop: '1px solid rgba(25, 25, 29, 0.08)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '36px' }}>
            {/* Learning Outcomes */}
            <div>
              <span className="section-tag">COGNITIVE MASTERY</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                What You Will Internalize
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {book.learningOutcomes.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(25, 25, 29, 0.08)',
                      borderRadius: '12px',
                      padding: '18px 20px',
                      boxShadow: '0 2px 8px rgba(25, 25, 29, 0.03)'
                    }}
                  >
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(81, 70, 184, 0.1)',
                        color: 'var(--indigo-600)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    >
                      <Check size={14} />
                    </div>
                    <p style={{ color: 'var(--text-primary)', fontSize: '0.94rem', lineHeight: 1.6 }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Table of Contents */}
            <div>
              <span className="section-tag">CURRICULUM SYLLABUS</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                Table of Contents ({book.pagesCount} Pages)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {book.tableOfContents.map((ch, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '14px 18px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(25, 25, 29, 0.08)',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      boxShadow: '0 2px 6px rgba(25, 25, 29, 0.02)'
                    }}
                  >
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: 500 }}>{ch}</span>
                    <span style={{ color: '#8A8C9E', fontSize: '0.78rem', fontFamily: 'monospace' }}>Part {idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Publications */}
      <section style={{ padding: '80px 0 120px', borderTop: '1px solid rgba(25, 25, 29, 0.08)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag" style={{ justifyContent: 'center' }}>CONTINUE THE INQUIRY</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--text-primary)' }}>
              Companion Treatises
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '24px' }}>
            {relatedBooks.map(rb => (
              <div
                key={rb.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(25, 25, 29, 0.08)',
                  borderRadius: '16px',
                  padding: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  boxShadow: '0 4px 16px rgba(25, 25, 29, 0.04)'
                }}
              >
                <div style={{ transform: 'scale(0.85)', transformOrigin: 'left center' }}>
                  <Book3DCover book={rb} size="sm" interactive={false} />
                </div>
                <div>
                  <span className="badge-gold" style={{ fontSize: '0.7rem' }}>{rb.category}</span>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--text-primary)', marginTop: '6px', marginBottom: '4px' }}>
                    <Link to={`/books/${rb.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>{rb.title}</Link>
                  </h4>
                  <div style={{ color: '#8C6D23', fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px' }}>
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
