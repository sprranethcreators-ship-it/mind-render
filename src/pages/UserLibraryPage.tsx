import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { StorageService } from '../services/storageService';
import { PdfSecurityService } from '../services/pdfSecurityService';
import { Book } from '../types';
import { Book3DCover } from '../components/books/Book3DCover';
import { InAppReaderModal } from '../components/reader/InAppReaderModal';
import { useToast } from '../context/ToastContext';
import { BookOpen, Download, ShieldCheck, Sparkles, Clock, ArrowRight } from 'lucide-react';

export const UserLibraryPage: React.FC = () => {
  const { currentUser, libraryItems } = useAuth();
  const { showToast } = useToast();
  const allBooks = StorageService.getBooks();

  const [activeReadingBook, setActiveReadingBook] = useState<Book | null>(null);

  // Map library items with book models
  const userPurchases = libraryItems.map(item => {
    const book = allBooks.find(b => b.id === item.bookId);
    return { item, book };
  }).filter(entry => Boolean(entry.book));

  const handleDownload = (book: Book) => {
    const res = PdfSecurityService.triggerSecureDownload(book);
    if (res.success) {
      showToast('gold', 'Encrypted Download Initialized', res.message);
    } else {
      showToast('error', 'Download Failed', res.message);
    }
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: 'var(--bg-cosmos)' }}>
      {/* Header */}
      <section style={{ padding: '60px 0 40px', backgroundColor: 'var(--bg-deep)', borderBottom: '1px solid rgba(25, 25, 29, 0.08)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
            <div>
              <span className="badge-gold">CRYPTOGRAPHICALLY LICENSED REPOSITORY</span>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', color: 'var(--text-primary)', marginTop: '8px', letterSpacing: '-0.02em' }}>
                My Personal Library
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '6px' }}>
                Licensed to <strong style={{ color: 'var(--text-primary)' }}>{currentUser?.name || 'Member'}</strong> ({currentUser?.email || 'N/A'})
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontSize: '0.85rem' }}>
              <ShieldCheck size={18} />
              <span>{userPurchases.length} Authenticated Treatise Licenses</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Library View */}
      <section style={{ padding: '60px 0 120px' }}>
        <div className="container">
          {userPurchases.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 20px',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(25, 25, 29, 0.08)',
                borderRadius: '20px',
                maxWidth: '680px',
                margin: '0 auto',
                boxShadow: '0 16px 40px rgba(25, 25, 29, 0.05)'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(81, 70, 184, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: 'var(--indigo-600)'
                }}
              >
                <BookOpen size={30} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>
                Your Library is Empty
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
                You have not yet acquired any digital treatises written by the author's father. Visit the bookstore to explore foundational works.
              </p>
              <Link to="/books" className="btn-gold" style={{ padding: '0.85rem 2rem' }}>
                <span>Explore The Bookstore</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {userPurchases.map(({ item, book }) => {
                if (!book) return null;
                const purchaseDate = new Date(item.purchasedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                });

                return (
                  <div
                    key={book.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(25, 25, 29, 0.08)',
                      borderRadius: '20px',
                      padding: 'clamp(20px, 3.5vw, 36px)',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                      gap: 'clamp(20px, 4vw, 36px)',
                      alignItems: 'center',
                      boxShadow: '0 12px 35px rgba(25, 25, 29, 0.05)',
                      boxSizing: 'border-box'
                    }}
                  >
                    {/* Thumbnail */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Book3DCover book={book} size="sm" interactive={false} />
                    </div>

                    {/* Information & Reading Progress */}
                    <div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <span className="badge-gold">{book.category}</span>
                        <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#8A8C9E' }}>
                          License: {item.licenseKey}
                        </span>
                      </div>

                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {book.title}
                      </h3>

                      <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#8C6D23', fontSize: '1.05rem', marginBottom: '1rem' }}>
                        {book.subtitle}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
                        <span>Acquired {purchaseDate}</span>
                        <span>•</span>
                        <span>{book.format}</span>
                        <span>•</span>
                        <span>{book.pagesCount} Pages</span>
                      </div>

                      {/* Progress bar */}
                      <div style={{ marginBottom: '1.75rem', maxWidth: '420px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                          <span>Reading Progress</span>
                          <span style={{ color: '#8C6D23', fontWeight: 600 }}>{item.readingProgressPercent}%</span>
                        </div>
                        <div style={{ height: '6px', backgroundColor: 'rgba(25, 25, 29, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${item.readingProgressPercent}%`, height: '100%', backgroundColor: '#8C6D23', borderRadius: '3px' }} />
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        <button
                          onClick={() => setActiveReadingBook(book)}
                          className="btn-gold"
                          style={{ padding: '0.75rem 1.8rem', fontSize: '0.86rem' }}
                        >
                          <BookOpen size={16} /> Open in Mind Render Reader
                        </button>

                        <button
                          onClick={() => handleDownload(book)}
                          className="btn-secondary"
                          style={{ padding: '0.75rem 1.6rem', fontSize: '0.86rem' }}
                        >
                          <Download size={16} /> Download Encrypted Manuscript
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* In-App Reader Modal */}
      <InAppReaderModal
        book={activeReadingBook}
        isOpen={Boolean(activeReadingBook)}
        onClose={() => setActiveReadingBook(null)}
      />
    </div>
  );
};
