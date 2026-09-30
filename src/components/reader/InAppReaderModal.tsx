import React, { useState } from 'react';
import { Book } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { StorageService } from '../../services/storageService';
import { PdfSecurityService } from '../../services/pdfSecurityService';
import { X, ChevronLeft, ChevronRight, Download, BookOpen, Sun, Moon, Type, ShieldCheck } from 'lucide-react';

interface InAppReaderModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InAppReaderModal: React.FC<InAppReaderModalProps> = ({
  book,
  isOpen,
  onClose
}) => {
  const { currentUser } = useAuth();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [theme, setTheme] = useState<'editorial' | 'sepia' | 'midnight'>('editorial');
  const [showToc, setShowToc] = useState(false);

  if (!isOpen || !book) return null;

  const totalPages = book.samplePages.length;
  const currentPage = book.samplePages[currentPageIndex];
  const progressPercent = Math.round(((currentPageIndex + 1) / totalPages) * 100);

  const handlePageChange = (newIndex: number) => {
    setCurrentPageIndex(newIndex);
    if (currentUser) {
      StorageService.updateReadingProgress(currentUser.id, book.id, newIndex + 1, Math.round(((newIndex + 1) / totalPages) * 100));
    }
  };

  const themeStyles = {
    editorial: { bg: '#FAF8F3', card: '#FFFFFF', text: '#282832', heading: '#19191D', accent: '#8C6D23', border: 'rgba(25, 25, 29, 0.08)', subtitle: '#8C6D23' },
    sepia: { bg: '#F4ECE1', card: '#FAF5EE', text: '#3E342B', heading: '#261F18', accent: '#9C6F19', border: 'rgba(62, 52, 43, 0.1)', subtitle: '#9C6F19' },
    midnight: { bg: '#0F121C', card: '#161A26', text: '#E2E8F0', heading: '#FAF8F3', accent: '#D4AF37', border: 'rgba(255, 255, 255, 0.08)', subtitle: '#D4AF37' }
  }[theme];

  const fontSizeMap = {
    normal: '1.15rem',
    large: '1.3rem',
    larger: '1.45rem'
  }[fontSize];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(25, 25, 29, 0.65)',
        backdropFilter: 'blur(16px)',
        zIndex: 9900,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Top Reader Controls Bar */}
      <div
        style={{
          height: '64px',
          padding: '0 24px',
          borderBottom: `1px solid ${themeStyles.border}`,
          backgroundColor: themeStyles.card,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <ChevronLeft size={18} /> Exit Reader
          </button>
          <div style={{ height: '18px', width: '1px', backgroundColor: themeStyles.border }} />
          <span style={{ fontFamily: 'var(--font-display)', color: themeStyles.heading, fontSize: '0.95rem', fontWeight: 600 }}>
            {book.title}
          </span>
          <span
            style={{
              fontSize: '0.72rem',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'rgba(5, 150, 105, 0.08)',
              padding: '2px 8px',
              borderRadius: '4px'
            }}
          >
            <ShieldCheck size={13} /> Licensed to {currentUser?.name || 'Member'}
          </span>
        </div>

        {/* Center: Progress Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
            {progressPercent}% Complete
          </span>
          <div style={{ width: '100px', height: '4px', backgroundColor: 'rgba(25, 25, 29, 0.08)', borderRadius: '2px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                backgroundColor: themeStyles.accent,
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Right: Customization controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Font Size Toggle */}
          <button
            onClick={() => setFontSize(fontSize === 'normal' ? 'large' : fontSize === 'large' ? 'larger' : 'normal')}
            style={{ color: 'var(--text-secondary)', padding: '6px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', background: 'none', border: 'none', cursor: 'pointer' }}
            title="Adjust text scale"
          >
            <Type size={16} /> Text
          </button>

          {/* Theme switcher */}
          <div style={{ display: 'flex', gap: '4px', backgroundColor: 'rgba(25, 25, 29, 0.06)', padding: '3px', borderRadius: '6px' }}>
            <button
              onClick={() => setTheme('editorial')}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                backgroundColor: '#FAF8F3',
                border: theme === 'editorial' ? '1.5px solid #8C6D23' : '1px solid rgba(25,25,29,0.1)',
                cursor: 'pointer'
              }}
              title="Editorial Light Theme"
            />
            <button
              onClick={() => setTheme('sepia')}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                backgroundColor: '#F4ECE1',
                border: theme === 'sepia' ? '1.5px solid #9C6F19' : '1px solid rgba(62,52,43,0.1)',
                cursor: 'pointer'
              }}
              title="Warm Sepia Theme"
            />
            <button
              onClick={() => setTheme('midnight')}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                backgroundColor: '#0F121C',
                border: theme === 'midnight' ? '1.5px solid #D4AF37' : '1px solid transparent',
                cursor: 'pointer'
              }}
              title="Midnight Cosmic Theme"
            />
          </div>

          {/* Download button */}
          <button
            onClick={() => PdfSecurityService.triggerSecureDownload(book)}
            style={{ color: themeStyles.accent, padding: '6px', cursor: 'pointer', background: 'none', border: 'none' }}
            title="Download Watermarked Manuscript"
          >
            <Download size={18} />
          </button>

          <button onClick={onClose} style={{ color: 'var(--text-secondary)', padding: '6px', background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Reader Main Content Area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: themeStyles.bg,
          display: 'flex',
          justifyContent: 'center',
          padding: '48px 24px'
        }}
      >
        <div style={{ maxWidth: '720px', width: '100%' }}>
          {/* Header watermark */}
          <div
            style={{
              textAlign: 'center',
              paddingBottom: '2rem',
              marginBottom: '2.5rem',
              borderBottom: '1px solid rgba(255,255,255,0.06)'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: themeStyles.accent
              }}
            >
              MIND RENDER READER • SECTION {currentPage.pageNumber} OF {totalPages}
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                color: themeStyles.heading,
                fontSize: '2rem',
                marginTop: '0.75rem',
                marginBottom: '0.4rem'
              }}
            >
              {currentPage.title}
            </h2>
            {currentPage.subtitle && (
              <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#94A3B8', fontSize: '1.2rem' }}>
                {currentPage.subtitle}
              </p>
            )}
          </div>

          {/* Book Content Paragraphs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {currentPage.paragraphs.map((para, idx) => (
              <p
                key={idx}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: fontSizeMap,
                  lineHeight: 1.9,
                  color: themeStyles.text,
                  textIndent: idx === 0 ? '0' : '1.8rem',
                  letterSpacing: '0.01em'
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Page Footer Navigation */}
          <div
            style={{
              marginTop: '4rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <button
              onClick={() => handlePageChange(Math.max(0, currentPageIndex - 1))}
              disabled={currentPageIndex === 0}
              className="btn-secondary"
              style={{
                padding: '0.65rem 1.4rem',
                fontSize: '0.82rem',
                opacity: currentPageIndex === 0 ? 0.3 : 1,
                cursor: currentPageIndex === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <ChevronLeft size={16} /> Previous Section
            </button>

            <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
              Page {currentPage.pageNumber} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(Math.min(totalPages - 1, currentPageIndex + 1))}
              disabled={currentPageIndex === totalPages - 1}
              className="btn-gold"
              style={{
                padding: '0.65rem 1.4rem',
                fontSize: '0.82rem',
                opacity: currentPageIndex === totalPages - 1 ? 0.3 : 1,
                cursor: currentPageIndex === totalPages - 1 ? 'not-allowed' : 'pointer'
              }}
            >
              Next Section <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
