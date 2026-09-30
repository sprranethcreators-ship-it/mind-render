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
        background: 'linear-gradient(180deg, #FAF8F5 0%, #F5F3FF 35%, #FFFBEB 75%, #FBF9F5 100%)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(217, 119, 6, 0.15)'
      }}
    >
      {/* Cinematic Horizon / Atmospheric Consciousness Light Aurora */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(96vw, 1300px)',
          height: 'min(55vh, 460px)',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 100%, rgba(99, 102, 241, 0.15) 0%, rgba(245, 158, 11, 0.18) 35%, rgba(244, 63, 94, 0.08) 60%, transparent 75%)',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}
      />

      {/* Delicate Shimmering Horizon Arc */}
      <div
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(90vw, 960px)',
          height: 'min(35vh, 260px)',
          borderRadius: '50%',
          borderTop: '2px solid rgba(217, 119, 6, 0.5)',
          boxShadow: '0 -12px 35px rgba(245, 158, 11, 0.22), 0 -4px 15px rgba(99, 102, 241, 0.15)',
          pointerEvents: 'none'
        }}
      />

      {/* Radiant Floating Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '12%',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.14) 0%, transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '25%',
          right: '12%',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.16) 0%, transparent 70%)',
          filter: 'blur(35px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div style={{ maxWidth: '880px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', marginBottom: '1.75rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#92400E',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 20px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.9) 0%, rgba(253, 230, 138, 0.6) 100%)',
                border: '1px solid rgba(217, 119, 6, 0.35)',
                boxShadow: '0 4px 16px rgba(245, 158, 11, 0.15)'
              }}
            >
              <Sparkles size={15} color="#D97706" /> {data.sectionTag}
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5.5vw, 3.8rem)',
              color: '#0F172A',
              lineHeight: 1.16,
              letterSpacing: '0.02em',
              marginBottom: '1.5rem',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              fontWeight: 800
            }}
          >
            {data.headlineLine1}
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #1E1B4B 0%, #4F46E5 50%, #D97706 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              {data.headlineLine2}
            </span>
            <br />
            {data.headlineLine3}
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.2rem, 2.3vw, 1.6rem)',
              fontStyle: 'italic',
              color: '#92400E',
              lineHeight: 1.65,
              maxWidth: '680px',
              margin: '0 auto 2.75rem',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              fontWeight: 600,
              textShadow: '0 1px 2px rgba(254, 243, 199, 0.8)'
            }}
          >
            {data.italicParagraph}
          </p>

          <div className="responsive-btn-group" style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              to="/books"
              className="btn-primary"
              style={{
                padding: '1.05rem 2.4rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                minHeight: '52px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #1E1B4B 0%, #4F46E5 60%, #4338CA 100%)',
                color: '#FFFFFF',
                boxShadow: '0 10px 30px rgba(79, 70, 229, 0.35), 0 0 0 1px rgba(99, 102, 241, 0.4)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <span>{data.primaryButtonText}</span>
              <BookOpen size={19} />
            </Link>

            <Link
              to="/tools"
              style={{
                padding: '1.05rem 2.4rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                minHeight: '52px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
                color: '#92400E',
                border: '1.5px solid rgba(217, 119, 6, 0.45)',
                boxShadow: '0 8px 24px rgba(245, 158, 11, 0.2)',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <span>{data.secondaryButtonText}</span>
              <Compass size={19} color="#D97706" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
