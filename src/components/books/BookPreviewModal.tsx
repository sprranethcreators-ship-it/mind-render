import React, { useState } from 'react';
import { Book } from '../../types';
import { X, ChevronLeft, ChevronRight, BookOpen, List, ShieldCheck } from 'lucide-react';

interface BookPreviewModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onBuyNow: (book: Book) => void;
}

export const BookPreviewModal: React.FC<BookPreviewModalProps> = ({
  book,
  isOpen,
  onClose,
  onBuyNow
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'sample' | 'toc'>('sample');

  if (!isOpen || !book) return null;

  const totalPages = book.samplePages.length;
  const currentPage = book.samplePages[currentPageIndex];

  const handleNext = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 6, 8, 0.88)',
        backdropFilter: 'blur(16px)',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(10px, 2.5vw, 20px)',
        boxSizing: 'border-box'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: 'min(92vh, 800px)',
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(25, 25, 29, 0.12)',
          borderRadius: '16px',
          boxShadow: '0 25px 60px rgba(25, 25, 29, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Navigation */}
        <div
          style={{
            padding: '14px clamp(14px, 3vw, 24px)',
            borderBottom: '1px solid rgba(25, 25, 29, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F7F4EE',
            flexWrap: 'wrap',
            gap: '10px',
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.88rem, 2vw, 1rem)',
                color: 'var(--text-primary)',
                fontWeight: 600,
                overflowWrap: 'break-word'
              }}
            >
              {book.title}
            </span>
            <span
              style={{
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.7rem',
                backgroundColor: 'rgba(140, 109, 35, 0.1)',
                color: '#8C6D23',
                border: '1px solid rgba(140, 109, 35, 0.25)',
                fontWeight: 600
              }}
            >
              Free Manuscript Sample
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setActiveTab(activeTab === 'sample' ? 'toc' : 'sample')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                padding: '6px 12px',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(25, 25, 29, 0.1)',
                minHeight: '36px',
                cursor: 'pointer'
              }}
            >
              {activeTab === 'sample' ? <List size={15} /> : <BookOpen size={15} />}
              {activeTab === 'sample' ? 'Contents' : 'Sample Pages'}
            </button>
            <button
              onClick={onClose}
              style={{ color: 'var(--text-secondary)', padding: '6px', cursor: 'pointer', minWidth: '32px', minHeight: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none' }}
              aria-label="Close Preview"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Content Body */}
        <div
          style={{
            padding: 'clamp(20px, 3.5vw, 36px) clamp(16px, 3vw, 36px)',
            flex: 1,
            overflowY: 'auto',
            background: 'var(--bg-cosmos)',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {activeTab === 'toc' ? (
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  color: '#8C6D23',
                  fontSize: '1.25rem',
                  marginBottom: '1rem'
                }}
              >
                Table of Contents
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Full {book.pagesCount} pages digital edition curriculum:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {book.tableOfContents.map((chapter, idx) => (
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
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 500 }}>
                      {chapter}
                    </span>
                    <span style={{ color: '#8A8C9E', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                      Section {idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* Sample Page Content */}
              <div style={{ maxWidth: '640px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--indigo-600)',
                      fontWeight: 600
                    }}
                  >
                    Sample Extract • Page {currentPage.pageNumber} of {totalPages}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: 'var(--text-primary)',
                      fontSize: '1.6rem',
                      marginTop: '0.6rem',
                      marginBottom: '0.4rem',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {currentPage.title}
                  </h3>
                  {currentPage.subtitle && (
                    <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#8C6D23', fontSize: '1.1rem' }}>
                      {currentPage.subtitle}
                    </p>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                  {currentPage.paragraphs.map((p, pidx) => (
                    <p
                      key={pidx}
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.2rem',
                        lineHeight: 1.85,
                        color: '#282832',
                        textIndent: pidx === 0 ? '0' : '1.5rem'
                      }}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer / Controls */}
        <div
          style={{
            padding: '18px 24px',
            borderTop: '1px solid rgba(25, 25, 29, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F7F4EE'
          }}
        >
          {activeTab === 'sample' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={handlePrev}
                disabled={currentPageIndex === 0}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  backgroundColor: currentPageIndex === 0 ? 'rgba(25,25,29,0.03)' : '#FFFFFF',
                  border: '1px solid rgba(25, 25, 29, 0.1)',
                  color: currentPageIndex === 0 ? '#94A3B8' : 'var(--text-primary)',
                  cursor: currentPageIndex === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                <ChevronLeft size={16} /> Prev
              </button>

              <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                {currentPageIndex + 1} / {totalPages}
              </span>

              <button
                onClick={handleNext}
                disabled={currentPageIndex === totalPages - 1}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  backgroundColor: currentPageIndex === totalPages - 1 ? 'rgba(25,25,29,0.03)' : '#FFFFFF',
                  border: '1px solid rgba(25, 25, 29, 0.1)',
                  color: currentPageIndex === totalPages - 1 ? '#94A3B8' : 'var(--text-primary)',
                  cursor: currentPageIndex === totalPages - 1 ? 'not-allowed' : 'pointer'
                }}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
              <ShieldCheck size={16} color="#059669" /> Full edition contains all {book.tableOfContents.length} chapters
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.8rem', color: '#8A8C9E', textDecoration: 'line-through', marginRight: '6px' }}>
                ${book.originalPrice}
              </span>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#8C6D23' }}>
                ${book.price}
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                onBuyNow(book);
              }}
              className="btn-gold"
              style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem', minHeight: '40px' }}
            >
              Get Full Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
