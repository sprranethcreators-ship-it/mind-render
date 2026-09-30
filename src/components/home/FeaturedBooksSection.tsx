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
        backgroundColor: '#FAF8F5',
        position: 'relative',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '5%',
          width: '650px',
          height: '650px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, rgba(244, 63, 94, 0.04) 40%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="section-tag" style={{ justifyContent: 'center' }}>
            <Sparkles size={15} color="#D97706" /> {data.sectionTag}
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              color: 'var(--text-primary)',
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
              color: '#B45309',
              maxWidth: '680px',
              margin: '0 auto 1.25rem',
              lineHeight: 1.5,
              fontWeight: 600
            }}
          >
            "{data.italicQuote}"
          </p>
          <p
            style={{
              maxWidth: '620px',
              margin: '0 auto',
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              lineHeight: 1.75
            }}
          >
            {data.description}
          </p>
        </div>

        {/* Editorial Books Showcase: Responsive Grid */}
        <div className="responsive-grid-books">
          {books.map((book) => (
            <div
              key={book.id}
              className="card-panel card-panel-responsive"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1.5px solid rgba(217, 119, 6, 0.2)',
                boxShadow: '0 12px 35px -5px rgba(18, 20, 29, 0.06), 0 4px 14px rgba(245, 158, 11, 0.08)'
              }}
            >
              <div>
                {/* Top Badge & Details */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '6px' }}>
                  <span className="badge-gold">{book.category}</span>
                  <span style={{ fontSize: '0.82rem', color: '#6B7085', fontWeight: 600 }}>
                    {book.pagesCount} Pages • {book.format}
                  </span>
                </div>

                {/* Center 3D Book Presentation */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '0.75rem 0 1.75rem', overflow: 'hidden', maxWidth: '100%' }}>
                  <Book3DCover book={book} size="md" />
                </div>

                {/* Title & Author */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)',
                    color: 'var(--text-primary)',
                    lineHeight: 1.3,
                    marginBottom: '0.5rem',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',
                    fontWeight: 700
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
                    color: '#B45309',
                    fontSize: 'clamp(0.98rem, 1.8vw, 1.08rem)',
                    marginBottom: '0.85rem',
                    lineHeight: 1.45,
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',
                    fontWeight: 600
                  }}
                >
                  {book.subtitle}
                </p>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.65, marginBottom: '1.5rem', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                  {book.description}
                </p>

                {/* What you will learn */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <div style={{ fontSize: '0.74rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#454859', marginBottom: '8px', fontWeight: 800 }}>
                    Inside This Book:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {book.learningOutcomes.slice(0, 2).map((outcome, oidx) => (
                      <li key={oidx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--text-primary)', fontSize: '0.88rem', lineHeight: 1.5, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
                        <span style={{ color: '#D97706', marginTop: '2px', flexShrink: 0, fontWeight: 800 }}>•</span>
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
                    flexWrap: 'wrap',
                    gap: '8px',
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '14px',
                    marginBottom: '1.25rem'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)', fontWeight: 800, color: '#B45309' }}>
                      ${book.price}
                    </span>
                    <span style={{ fontSize: '0.92rem', color: '#8E9BAE', textDecoration: 'line-through', marginLeft: '8px', fontWeight: 500 }}>
                      ${book.originalPrice} USD
                    </span>
                  </div>

                  <span style={{ fontSize: '0.78rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                    <ShieldCheck size={14} /> Instant Digital Delivery
                  </span>
                </div>

                <div className="book-card-actions" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                  <button
                    onClick={() => setPreviewBook(book)}
                    className="btn-secondary"
                    style={{ padding: '0.75rem 0.5rem', fontSize: '0.84rem', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    <Eye size={15} /> {data.sampleButtonText}
                  </button>

                  <button
                    onClick={() => setCheckoutBook(book)}
                    className="btn-gold"
                    style={{ padding: '0.75rem 0.5rem', fontSize: '0.84rem', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                  >
                    <ShoppingCart size={15} /> {data.buyButtonText}
                  </button>
                </div>

                <div style={{ textAlign: 'center', marginTop: '14px' }}>
                  <Link
                    to={`/books/${book.slug}`}
                    style={{ fontSize: '0.84rem', color: '#5146B8', fontWeight: 600 }}
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
