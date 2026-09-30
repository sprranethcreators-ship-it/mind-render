import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, BookOpen, Compass } from 'lucide-react';
import { FinalCtaContent } from '../../types/homepageContent';
import { StorageService } from '../../services/storageService';

interface FinalCtaProps {
  content?: FinalCtaContent;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ content }) => {
  const data = content || StorageService.getHomepageContent().finalCta;

  return (
    <section
      style={{
        padding: '160px 0 170px',
        background: 'linear-gradient(180deg, #FAF8F3 0%, #F3F0FA 45%, #EBE5F7 100%)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--border-subtle)'
      }}
    >
      {/* Cinematic Horizon / Atmospheric Consciousness Light Curve */}
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(95vw, 1200px)',
          height: 'min(50vh, 420px)',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 100%, rgba(81, 70, 184, 0.14) 0%, rgba(200, 168, 78, 0.08) 35%, transparent 70%)',
          filter: 'blur(35px)',
          pointerEvents: 'none'
        }}
      />

      {/* Delicate Horizon Arc Line */}
      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(90vw, 900px)',
          height: 'min(35vh, 240px)',
          borderRadius: '50%',
          borderTop: '1.5px solid rgba(200, 168, 78, 0.45)',
          boxShadow: '0 -10px 30px rgba(81, 70, 184, 0.12)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#99751F',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '1.5rem'
            }}
          >
            <Sparkles size={14} /> {data.sectionTag}
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.85rem, 5.2vw, 3.6rem)',
              color: 'var(--text-primary)',
              lineHeight: 1.18,
              letterSpacing: '0.03em',
              marginBottom: '1.5rem',
              overflowWrap: 'break-word',
              wordBreak: 'break-word'
            }}
          >
            {data.headlineLine1}
            <br />
            {data.headlineLine2}
            <br />
            {data.headlineLine3}
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.15rem, 2.2vw, 1.55rem)',
              fontStyle: 'italic',
              color: '#8C6D23',
              lineHeight: 1.65,
              maxWidth: '660px',
              margin: '0 auto 2.5rem',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              fontWeight: 500
            }}
          >
            {data.italicParagraph}
          </p>

          <div className="responsive-btn-group">
            <Link
              to="/books"
              className="btn-primary"
              style={{ padding: '0.95rem 2rem', fontSize: '0.9rem', minHeight: '48px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <span>{data.primaryButtonText}</span>
              <BookOpen size={18} />
            </Link>

            <Link
              to="/tools"
              className="btn-secondary"
              style={{ padding: '0.95rem 2rem', fontSize: '0.9rem', minHeight: '48px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <span>{data.secondaryButtonText}</span>
              <Compass size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
