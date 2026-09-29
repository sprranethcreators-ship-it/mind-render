import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StorageService } from '../services/storageService';
import { Book } from '../types';
import { Book3DCover } from '../components/books/Book3DCover';
import { BookPreviewModal } from '../components/books/BookPreviewModal';
import { SecureCheckoutModal } from '../components/books/SecureCheckoutModal';
import { InAppReaderModal } from '../components/reader/InAppReaderModal';
import { Search, Eye, ShoppingCart, ShieldCheck, Sparkles, Filter, BookOpen } from 'lucide-react';

export const BooksStorePage: React.FC = () => {
  const allBooks = StorageService.getBooks().filter(b => b.isPublished);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const [previewBook, setPreviewBook] = useState<Book | null>(null);
  const [checkoutBook, setCheckoutBook] = useState<Book | null>(null);
  const [readerBook, setReaderBook] = useState<Book | null>(null);

  const categories = ['All', 'Focus & Attention', 'Law of Attraction', 'Subconscious Mind', 'Visualization'];

  const filteredBooks = allBooks.filter(book => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.topics.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: '#07080B' }}>
      {/* Page Header */}
      <section
        style={{
          padding: '60px 0 40px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: '#090B10'
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag" style={{ justifyContent: 'center' }}>
            DIGITAL MANUSCRIPT STORE
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 4vw, 3.5rem)',
              color: '#F8FAFC',
              marginBottom: '1rem'
            }}
          >
            Original Digital Treatise Collection
          </h1>
          <p
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              color: '#94A3B8',
              fontSize: '1.1rem',
              lineHeight: 1.7
            }}
          >
            Digital books and original manuscripts written by the author's father. Available for instant encrypted reading in the MIND RENDER Reader and offline PDF download.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div
        style={{
          position: 'sticky',
          top: '76px',
          backgroundColor: 'rgba(9, 11, 16, 0.9)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          zIndex: 7000,
          padding: '16px 0'
        }}
      >
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          {/* Categories Filter Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: selectedCategory === cat ? 600 : 400,
                  backgroundColor: selectedCategory === cat ? '#D4AF37' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedCategory === cat ? '#090B10' : '#CBD5E1',
                  border: selectedCategory === cat ? '1px solid #D4AF37' : '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} color="#64748B" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search treatises..."
              style={{
                width: '100%',
                paddingLeft: '36px',
                paddingTop: '8px',
                paddingBottom: '8px',
                fontSize: '0.86rem'
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Books Grid */}
      <section style={{ padding: '60px 0 120px' }}>
        <div className="container">
          {filteredBooks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#0E1119', borderRadius: '16px' }}>
              <p style={{ color: '#94A3B8', fontSize: '1.1rem' }}>No digital treatises match your criteria.</p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '36px'
              }}
            >
              {filteredBooks.map(book => (
                <div
                  key={book.id}
                  style={{
                    backgroundColor: '#0E111A',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    padding: '32px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
                    position: 'relative'
                  }}
                  className="card-panel"
                >
                  {/* Top Badges */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <span className="badge-gold">{book.category}</span>
                    {book.isNewRelease && (
                      <span className="badge-indigo">New Release</span>
                    )}
                  </div>

                  {/* 3D Book Cover Centerpiece */}
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0 2rem' }}>
                    <Book3DCover book={book} size="sm" />
                  </div>

                  {/* Metadata */}
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.4rem',
                        color: '#F8FAFC',
                        marginBottom: '0.4rem',
                        lineHeight: 1.3
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
                        fontSize: '0.98rem',
                        marginBottom: '0.85rem'
                      }}
                    >
                      {book.subtitle}
                    </p>

                    <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                      {book.description}
                    </p>
                  </div>

                  {/* Bottom Price & Action Rows */}
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                        paddingTop: '16px',
                        marginBottom: '1rem'
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '1.6rem', fontWeight: 700, color: '#D4AF37' }}>
                          ${book.price}
                        </span>
                        <span style={{ fontSize: '0.85rem', color: '#64748B', textDecoration: 'line-through', marginLeft: '6px' }}>
                          ${book.originalPrice}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                        {book.format}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <button
                        onClick={() => setPreviewBook(book)}
                        className="btn-secondary"
                        style={{ padding: '0.65rem', fontSize: '0.8rem' }}
                      >
                        <Eye size={14} /> Preview
                      </button>

                      <button
                        onClick={() => setCheckoutBook(book)}
                        className="btn-gold"
                        style={{ padding: '0.65rem', fontSize: '0.8rem' }}
                      >
                        <ShoppingCart size={14} /> Buy Now
                      </button>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                      <Link
                        to={`/books/${book.slug}`}
                        style={{ fontSize: '0.78rem', color: '#818CF8' }}
                      >
                        Read Full Details & Syllabus →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

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
    </div>
  );
};
