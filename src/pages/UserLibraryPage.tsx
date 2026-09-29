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
    <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: '#07080B' }}>
      {/* Header */}
      <section style={{ padding: '60px 0 40px', backgroundColor: '#090B10', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
            <div>
              <span className="badge-gold">CRYPTOGRAPHICALLY LICENSED REPOSITORY</span>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', color: '#F8FAFC', marginTop: '8px' }}>
                My Personal Library
              </h1>
              <p style={{ color: '#94A3B8', fontSize: '1rem', marginTop: '6px' }}>
                Licensed to <strong>{currentUser?.name || 'Member'}</strong> ({currentUser?.email || 'N/A'})
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10B981', fontSize: '0.85rem' }}>
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
                backgroundColor: '#0E1119',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                maxWidth: '680px',
                margin: '0 auto'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: '#D4AF37'
                }}
              >
                <BookOpen size={30} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#F8FAFC', marginBottom: '0.75rem' }}>
                Your Library is Empty
              </h3>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 2rem' }}>
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
                      backgroundColor: '#0E1119',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '20px',
                      padding: '36px',
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr',
                      gap: '36px',
                      alignItems: 'center',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.6)'
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
                        <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#64748B' }}>
                          License: {item.licenseKey}
                        </span>
                      </div>

                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#F8FAFC', marginBottom: '4px' }}>
                        {book.title}
                      </h3>

                      <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#CBD5E1', fontSize: '1.05rem', marginBottom: '1rem' }}>
                        {book.subtitle}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#94A3B8', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
                        <span>Acquired {purchaseDate}</span>
                        <span>•</span>
                        <span>{book.format}</span>
                        <span>•</span>
                        <span>{book.pagesCount} Pages</span>
                      </div>

                      {/* Progress bar */}
                      <div style={{ marginBottom: '1.75rem', maxWidth: '420px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#CBD5E1', marginBottom: '6px' }}>
                          <span>Reading Progress</span>
                          <span style={{ color: '#D4AF37', fontWeight: 600 }}>{item.readingProgressPercent}%</span>
                        </div>
                        <div style={{ height: '6px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${item.readingProgressPercent}%`, height: '100%', backgroundColor: '#D4AF37', borderRadius: '3px' }} />
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
