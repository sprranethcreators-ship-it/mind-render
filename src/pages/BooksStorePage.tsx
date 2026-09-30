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
    <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: 'var(--bg-cosmos)' }}>
      {/* Page Header */}
      <section
        style={{
          padding: '80px 0 50px',
          borderBottom: '1px solid rgba(217, 119, 6, 0.15)',
          background: 'linear-gradient(180deg, #FAF8F5 0%, #F5F3FF 40%, #FFFBEB 85%, #FAF8F5 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Ambient light glows */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '20%',
            width: '450px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            right: '15%',
            width: '400px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.14) 0%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none'
          }}
        />

        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#92400E',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 18px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.9) 0%, rgba(253, 230, 138, 0.6) 100%)',
                border: '1px solid rgba(217, 119, 6, 0.35)',
                boxShadow: '0 4px 14px rgba(245, 158, 11, 0.15)'
              }}
            >
              <Sparkles size={14} color="#D97706" /> DIGITAL MANUSCRIPT STORE
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              color: '#0F172A',
              marginBottom: '1.25rem',
              letterSpacing: '-0.01em',
              fontWeight: 800
            }}
          >
            Original Digital Treatise{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1E1B4B 0%, #4F46E5 50%, #D97706 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              Collection
            </span>
          </h1>
          <p
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              color: '#475569',
              fontSize: '1.12rem',
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
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(217, 119, 6, 0.15)',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
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
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontSize: '0.84rem',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  backgroundColor: selectedCategory === cat ? '#1E1B4B' : '#FFFFFF',
                  color: selectedCategory === cat ? '#FFFFFF' : '#475569',
                  border: selectedCategory === cat ? '1px solid #1E1B4B' : '1px solid rgba(15, 23, 42, 0.12)',
                  boxShadow: selectedCategory === cat ? '0 4px 14px rgba(30, 27, 75, 0.3)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
            <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search treatises..."
              style={{
                width: '100%',
                paddingLeft: '40px',
                paddingTop: '10px',
                paddingBottom: '10px',
                fontSize: '0.88rem',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid rgba(217, 119, 6, 0.25)',
                color: '#0F172A',
                borderRadius: '10px',
                outline: 'none',
                boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Books Grid */}
      <section style={{ padding: '40px 0 100px' }}>
        <div className="container">
          {filteredBooks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#FFFFFF', border: '1px solid rgba(217, 119, 6, 0.15)', borderRadius: '16px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>No digital treatises match your criteria.</p>
            </div>
          ) : (
            <div className="responsive-grid-books">
              {filteredBooks.map(book => (
                <div
                  key={book.id}
                  className="card-panel card-panel-responsive"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid rgba(217, 119, 6, 0.18)',
                    borderRadius: '18px',
                    boxShadow: '0 12px 35px rgba(217, 119, 6, 0.08), 0 4px 12px rgba(15, 23, 42, 0.04)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
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
                        color: '#0F172A',
                        marginBottom: '0.4rem',
                        lineHeight: 1.3,
                        fontWeight: 700
                      }}
                    >
                      <Link to={`/books/${book.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {book.title}
                      </Link>
                    </h3>

                    <p
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontStyle: 'italic',
                        color: '#92400E',
                        fontSize: '0.98rem',
                        fontWeight: 600,
                        marginBottom: '0.85rem'
                      }}
                    >
                      {book.subtitle}
                    </p>

                    <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
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
                        borderTop: '1px solid rgba(217, 119, 6, 0.15)',
                        paddingTop: '16px',
                        marginBottom: '1.25rem'
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#B45309' }}>
                          ${book.price}
                        </span>
                        <span style={{ fontSize: '0.88rem', color: '#94A3B8', textDecoration: 'line-through', marginLeft: '8px' }}>
                          ${book.originalPrice}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {book.format}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px' }}>
                      <button
                        onClick={() => setPreviewBook(book)}
                        className="btn-secondary"
                        style={{ padding: '0.75rem', fontSize: '0.82rem', fontWeight: 600 }}
                      >
                        <Eye size={14} /> Preview
                      </button>

                      <button
                        onClick={() => setCheckoutBook(book)}
                        className="btn-gold"
                        style={{ padding: '0.75rem', fontSize: '0.82rem', fontWeight: 700 }}
                      >
                        <ShoppingCart size={14} /> Buy Now
                      </button>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '12px' }}>
                      <Link
                        to={`/books/${book.slug}`}
                        style={{ fontSize: '0.82rem', color: '#4F46E5', textDecoration: 'none', fontWeight: 600 }}
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
