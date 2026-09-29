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
        backgroundColor: '#050608',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Cinematic Horizon / Atmospheric Consciousness Light Curve */}
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '1200px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 100%, rgba(99, 102, 241, 0.22) 0%, rgba(212, 175, 55, 0.08) 35%, transparent 70%)',
          filter: 'blur(30px)',
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
          width: '900px',
          height: '240px',
          borderRadius: '50%',
          borderTop: '1px solid rgba(212, 175, 55, 0.3)',
          boxShadow: '0 -15px 35px rgba(99, 102, 241, 0.25)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: '#D4AF37',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '1.75rem'
            }}
          >
            <Sparkles size={14} /> {data.sectionTag}
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 4.6vw, 4rem)',
              color: '#F8FAFC',
              lineHeight: 1.18,
              letterSpacing: '0.04em',
              marginBottom: '1.75rem'
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
              fontSize: 'clamp(1.2rem, 2vw, 1.45rem)',
              fontStyle: 'italic',
              color: '#CBD5E1',
              lineHeight: 1.7,
              maxWidth: '640px',
              margin: '0 auto 3.25rem'
            }}
          >
            {data.italicParagraph}
          </p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '18px'
            }}
          >
            <Link
              to="/books"
              className="btn-gold"
              style={{ padding: '1.1rem 2.8rem', fontSize: '0.95rem' }}
            >
              <span>{data.primaryButtonText}</span>
              <BookOpen size={18} />
            </Link>

            <Link
              to="/tools"
              className="btn-secondary"
              style={{ padding: '1.1rem 2.4rem', fontSize: '0.95rem' }}
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
