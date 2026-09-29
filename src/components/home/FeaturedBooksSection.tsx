import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../../types';
import { BooksSectionContent } from '../../types/homepageContent';
import { StorageService } from '../../services/storageService';
import { Book3DCover } from '../books/Book3DCover';
import { BookPreviewModal } from '../books/BookPreviewModal';
import { SecureCheckoutModal } from '../books/SecureCheckoutModal';
import { InAppReaderModal } from '../reader/InAppReaderModal';
import { ArrowRight, Eye, ShoppingCart, Sparkles, ShieldCheck } from 'lucide-react';

interface FeaturedBooksSectionProps {
  content?: BooksSectionContent;
}

export const FeaturedBooksSection: React.FC<FeaturedBooksSectionProps> = ({ content }) => {
  const data = content || StorageService.getHomepageContent().booksSection;
  const books = StorageService.getBooks().filter(b => b.isPublished);

  const [previewBook, setPreviewBook] = useState<Book | null>(null);
  const [checkoutBook, setCheckoutBook] = useState<Book | null>(null);
  const [readerBook, setReaderBook] = useState<Book | null>(null);

  return (
    <section
      id="books"
      style={{
        padding: '130px 0 140px',
        backgroundColor: '#07080D',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="section-tag" style={{ justifyContent: 'center' }}>
            <Sparkles size={14} /> {data.sectionTag}
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              color: '#F8FAFC',
              letterSpacing: '0.04em',
              marginBottom: '1rem'
            }}
          >
            {data.headline}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.2rem, 2.2vw, 1.55rem)',
              fontStyle: 'italic',
              color: '#D4AF37',
              maxWidth: '680px',
              margin: '0 auto 1.25rem',
              lineHeight: 1.5
            }}
          >
            "{data.italicQuote}"
          </p>
          <p
            style={{
              maxWidth: '620px',
              margin: '0 auto',
              color: '#94A3B8',
              fontSize: '1rem',
              lineHeight: 1.75
            }}
          >
            {data.description}
          </p>
        </div>

        {/* Editorial Books Showcase: 2x2 grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))',
            gap: '40px'
          }}
        >
          {books.map((book) => (
            <div
              key={book.id}
              style={{
                backgroundColor: '#0D0F18',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '40px 36px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
                position: 'relative',
                overflow: 'hidden'
              }}
              className="card-panel"
            >
              <div>
                {/* Top Badge & Details */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span className="badge-gold">{book.category}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    {book.pagesCount} Pages • {book.format}
                  </span>
                </div>

                {/* Center 3D Book Presentation */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0 2rem' }}>
                  <Book3DCover book={book} size="md" />
                </div>

                {/* Title & Author */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.6rem',
                    color: '#F8FAFC',
                    lineHeight: 1.3,
                    marginBottom: '0.5rem'
                  }}
                >
                  <Link to={`/books/${book.slug}`} style={{ color: 'inherit' }}>
                    {book.title}
                  </Link>
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    color: '#D4AF37',
                    fontSize: '1.08rem',
                    marginBottom: '1rem',
                    lineHeight: 1.45
                  }}
                >
                  {book.subtitle}
                </p>

                <p style={{ color: '#94A3B8', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '1.75rem' }}>
                  {book.description}
                </p>

                {/* What you will learn */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ fontSize: '0.74rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#CBD5E1', marginBottom: '8px', fontWeight: 600 }}>
                    Inside This Book:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {book.learningOutcomes.slice(0, 2).map((outcome, oidx) => (
                      <li key={oidx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#E2E8F0', fontSize: '0.88rem', lineHeight: 1.55 }}>
                        <span style={{ color: '#D4AF37', marginTop: '2px' }}>•</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Price & Actions */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    borderTop: '1px solid rgba(255, 255, 255, 0.07)',
                    paddingTop: '18px',
                    marginBottom: '1.25rem'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '1.85rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: '#D4AF37' }}>
                      ${book.price}
                    </span>
                    <span style={{ fontSize: '0.95rem', color: '#64748B', textDecoration: 'line-through', marginLeft: '8px' }}>
                      ${book.originalPrice} USD
                    </span>
                  </div>

                  <span style={{ fontSize: '0.76rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={13} /> Instant Digital Delivery
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    onClick={() => setPreviewBook(book)}
                    className="btn-secondary"
                    style={{ padding: '0.75rem', fontSize: '0.84rem' }}
                  >
                    <Eye size={15} /> {data.sampleButtonText}
                  </button>

                  <button
                    onClick={() => setCheckoutBook(book)}
                    className="btn-gold"
                    style={{ padding: '0.75rem', fontSize: '0.84rem' }}
                  >
                    <ShoppingCart size={15} /> {data.buyButtonText}
                  </button>
                </div>

                <div style={{ textAlign: 'center', marginTop: '12px' }}>
                  <Link
                    to={`/books/${book.slug}`}
                    style={{ fontSize: '0.82rem', color: '#818CF8' }}
                  >
                    View Table of Contents & Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Store Link */}
        <div style={{ textAlign: 'center', marginTop: '4.5rem' }}>
          <Link
            to="/books"
            className="btn-secondary"
            style={{ padding: '1rem 2.6rem', fontSize: '0.92rem' }}
          >
            <span>{data.viewStoreButtonText}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Modals */}
      <BookPreviewModal
        book={previewBook}
        isOpen={Boolean(previewBook)}
        onClose={() => setPreviewBook(null)}
        onBuyNow={(b) => setCheckoutBook(b)}
      />

      <SecureCheckoutModal
        book={checkoutBook}
        isOpen={Boolean(checkoutBook)}
        onClose={() => setCheckoutBook(null)}
        onOpenReader={(b) => setReaderBook(b)}
      />

      <InAppReaderModal
        book={readerBook}
        isOpen={Boolean(readerBook)}
        onClose={() => setReaderBook(null)}
      />
    </section>
  );
};
