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
  const [theme, setTheme] = useState<'midnight' | 'sepia' | 'obsidian'>('midnight');
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
    midnight: { bg: '#090B10', card: '#10131B', text: '#E2E8F0', heading: '#F8FAFC', accent: '#D4AF37' },
    sepia: { bg: '#181410', card: '#211C16', text: '#EAD9C8', heading: '#F5E8D8', accent: '#E5A93C' },
    obsidian: { bg: '#000000', card: '#0A0A0A', text: '#D1D5DB', heading: '#FFFFFF', accent: '#818CF8' }
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
        backgroundColor: 'rgba(3, 4, 6, 0.95)',
        backdropFilter: 'blur(20px)',
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
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
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
              color: '#94A3B8',
              fontSize: '0.85rem'
            }}
          >
            <ChevronLeft size={18} /> Exit Reader
          </button>
          <div style={{ height: '18px', width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <span style={{ fontFamily: 'var(--font-display)', color: themeStyles.heading, fontSize: '0.95rem', fontWeight: 600 }}>
            {book.title}
          </span>
          <span
            style={{
              fontSize: '0.72rem',
              color: '#10B981',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              padding: '2px 8px',
              borderRadius: '4px'
            }}
          >
            <ShieldCheck size={13} /> Licensed to {currentUser?.name || 'Member'}
          </span>
        </div>

        {/* Center: Progress Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontFamily: 'monospace' }}>
            {progressPercent}% Complete
          </span>
          <div style={{ width: '100px', height: '4px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
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
            style={{ color: '#CBD5E1', padding: '6px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem' }}
            title="Adjust text scale"
          >
            <Type size={16} /> Text
          </button>

          {/* Theme switcher */}
          <div style={{ display: 'flex', gap: '4px', backgroundColor: 'rgba(255,255,255,0.06)', padding: '3px', borderRadius: '6px' }}>
            <button
              onClick={() => setTheme('midnight')}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                backgroundColor: '#10131B',
                border: theme === 'midnight' ? '1.5px solid #D4AF37' : '1px solid transparent'
              }}
              title="Midnight Theme"
            />
            <button
              onClick={() => setTheme('sepia')}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                backgroundColor: '#211C16',
                border: theme === 'sepia' ? '1.5px solid #D4AF37' : '1px solid transparent'
              }}
              title="Warm Sepia Theme"
            />
            <button
              onClick={() => setTheme('obsidian')}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
                backgroundColor: '#000000',
                border: theme === 'obsidian' ? '1.5px solid #818CF8' : '1px solid transparent'
              }}
              title="Pure Obsidian Theme"
            />
          </div>

          {/* Download button */}
          <button
            onClick={() => PdfSecurityService.triggerSecureDownload(book)}
            style={{ color: '#D4AF37', padding: '6px', cursor: 'pointer' }}
            title="Download Watermarked Manuscript"
          >
            <Download size={18} />
          </button>

          <button onClick={onClose} style={{ color: '#94A3B8', padding: '6px' }}>
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
