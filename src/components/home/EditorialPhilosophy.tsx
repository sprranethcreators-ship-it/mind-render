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
        return { color: '#5146B8', border: 'rgba(81, 70, 184, 0.25)', bg: 'rgba(81, 70, 184, 0.08)' };
      case 1:
        return { color: '#99751F', border: 'rgba(200, 168, 78, 0.35)', bg: 'rgba(200, 168, 78, 0.1)' };
      default:
        return { color: '#059669', border: 'rgba(5, 150, 105, 0.25)', bg: 'rgba(5, 150, 105, 0.08)' };
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#FAF8F3',
        padding: '120px 0 100px',
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
          width: '760px',
          height: '420px',
          background: 'radial-gradient(circle, rgba(81, 70, 184, 0.05) 0%, rgba(200, 168, 78, 0.04) 40%, transparent 70%)',
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
              fontSize: '0.78rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#99751F',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '1.25rem'
            }}
          >
            <Sparkles size={14} /> {data.sectionTag}
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 3.4rem)',
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
              gap: '8px 12px',
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.15rem, 2.2vw, 1.55rem)',
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
                    color: isGold ? '#99751F' : isPurple ? '#5146B8' : 'var(--text-primary)',
                    fontWeight: (isGold || isPurple) ? 600 : 400
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
                  backgroundColor: '#FFFFFF',
                  border: idx === 1 ? '1px solid rgba(200, 168, 78, 0.4)' : '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  padding: 'clamp(24px, 3vw, 36px) clamp(16px, 2.5vw, 28px)',
                  position: 'relative',
                  boxShadow: idx === 1 ? '0 12px 32px rgba(200, 168, 78, 0.08), 0 4px 14px rgba(25, 25, 29, 0.04)' : '0 8px 24px rgba(25, 25, 29, 0.04)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                  boxSizing: 'border-box'
                }}
                className="hover-lift"
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '10px',
                    backgroundColor: acc.bg,
                    border: `1px solid ${acc.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    color: acc.color
                  }}
                >
                  {getStepIcon(idx)}
                </div>

                <span style={{ fontSize: '0.74rem', color: acc.color, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700 }}>
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
