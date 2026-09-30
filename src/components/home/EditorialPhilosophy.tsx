import React from 'react';
import { Eye, Brain, Compass, Sparkles } from 'lucide-react';
import { PhilosophyContent } from '../../types/homepageContent';
import { StorageService } from '../../services/storageService';

interface EditorialPhilosophyProps {
  content?: PhilosophyContent;
}

export const EditorialPhilosophy: React.FC<EditorialPhilosophyProps> = ({ content }) => {
  const data = content || StorageService.getHomepageContent().philosophy;

  const getStepIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Eye size={22} />;
      case 1:
        return <Brain size={22} />;
      default:
        return <Compass size={22} />;
    }
  };

  const getStepAccent = (index: number) => {
    switch (index) {
      case 0:
        return { 
          color: '#4F46E5', 
          border: 'rgba(99, 102, 241, 0.35)', 
          bg: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
          cardGlow: '0 12px 36px -6px rgba(99, 102, 241, 0.16)'
        };
      case 1:
        return { 
          color: '#B45309', 
          border: 'rgba(217, 119, 6, 0.35)', 
          bg: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
          cardGlow: '0 12px 36px -6px rgba(245, 158, 11, 0.18)'
        };
      default:
        return { 
          color: '#047857', 
          border: 'rgba(16, 185, 129, 0.35)', 
          bg: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
          cardGlow: '0 12px 36px -6px rgba(16, 185, 129, 0.16)'
        };
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#FAF8F5',
        padding: '130px 0 110px',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        overflow: 'hidden'
      }}
    >
      {/* Soft atmospheric gradient */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '850px',
          height: '460px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(245, 158, 11, 0.06) 40%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        {/* Narrative Progression */}
        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto 5rem',
            textAlign: 'center'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#B45309',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '1.25rem'
            }}
          >
            <Sparkles size={15} color="#D97706" /> {data.sectionTag}
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.85rem, 4.2vw, 3.4rem)',
              color: 'var(--text-primary)',
              letterSpacing: '0.04em',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
              overflowWrap: 'break-word',
              wordBreak: 'break-word'
            }}
          >
            {data.headline}
          </h2>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px 14px',
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.2rem, 2.3vw, 1.65rem)',
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              lineHeight: 1.6,
              marginBottom: '1.75rem',
              overflowWrap: 'break-word'
            }}
          >
            {data.rhythmWords.map((word, wIdx) => {
              const isGold = wIdx === 1;
              const isPurple = wIdx === 3;
              return (
                <span
                  key={wIdx}
                  style={{
                    color: isGold ? '#B45309' : isPurple ? '#4F46E5' : 'var(--text-primary)',
                    fontWeight: (isGold || isPurple) ? 700 : 400
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.96rem, 1.8vw, 1.08rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              maxWidth: '680px',
              margin: '0 auto',
              overflowWrap: 'break-word',
              wordBreak: 'break-word'
            }}
          >
            {data.narrativeParagraph}
          </p>
        </div>

        {/* The 3-Step Chain */}
        <div
          className="responsive-grid-triad"
          style={{
            marginBottom: '3.5rem'
          }}
        >
          {data.triadCards.map((card, idx) => {
            const acc = getStepAccent(idx);
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.94)',
                  border: `1.5px solid ${acc.border}`,
                  borderRadius: '20px',
                  padding: 'clamp(26px, 3.2vw, 38px) clamp(18px, 2.8vw, 30px)',
                  position: 'relative',
                  boxShadow: acc.cardGlow,
                  transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                  boxSizing: 'border-box',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)'
                }}
                className="hover-lift"
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: acc.bg,
                    border: `1px solid ${acc.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    color: acc.color,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)'
                  }}
                >
                  {getStepIcon(idx)}
                </div>

                <span style={{ fontSize: '0.74rem', color: acc.color, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 800 }}>
                  {card.step}
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    color: 'var(--text-primary)',
                    marginTop: '0.5rem',
                    marginBottom: '0.9rem',
                    lineHeight: 1.3
                  }}
                >
                  "{card.quote}"
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.75 }}>
                  {card.explanation}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
