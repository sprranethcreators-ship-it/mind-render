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
        return { color: '#818CF8', border: 'rgba(99, 102, 241, 0.3)', bg: 'rgba(99, 102, 241, 0.12)' };
      case 1:
        return { color: '#D4AF37', border: 'rgba(212, 175, 55, 0.35)', bg: 'rgba(212, 175, 55, 0.12)' };
      default:
        return { color: '#10B981', border: 'rgba(16, 185, 129, 0.3)', bg: 'rgba(16, 185, 129, 0.12)' };
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#090B10',
        padding: '120px 0 100px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
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
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.09) 0%, rgba(212, 175, 55, 0.04) 40%, transparent 70%)',
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
              fontSize: '0.76rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#D4AF37',
              fontWeight: 600,
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
              fontSize: 'clamp(2rem, 4.2vw, 3.4rem)',
              color: '#F8FAFC',
              letterSpacing: '0.06em',
              lineHeight: 1.2,
              marginBottom: '1.75rem'
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
              gap: '12px',
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
              fontStyle: 'italic',
              color: '#CBD5E1',
              lineHeight: 1.6,
              marginBottom: '2rem'
            }}
          >
            {data.rhythmWords.map((word, wIdx) => {
              const isGold = wIdx === 1;
              const isPurple = wIdx === 3;
              return (
                <span
                  key={wIdx}
                  style={{
                    color: isGold ? '#D4AF37' : isPurple ? '#818CF8' : '#CBD5E1'
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
              fontSize: '1.05rem',
              color: '#94A3B8',
              lineHeight: 1.8,
              maxWidth: '660px',
              margin: '0 auto'
            }}
          >
            {data.narrativeParagraph}
          </p>
        </div>

        {/* The 3-Step Chain */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px',
            marginBottom: '4rem'
          }}
        >
          {data.triadCards.map((card, idx) => {
            const acc = getStepAccent(idx);
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#0D1018',
                  border: idx === 1 ? '1px solid rgba(212, 175, 55, 0.25)' : '1px solid rgba(255, 255, 255, 0.07)',
                  borderRadius: '16px',
                  padding: '36px 30px',
                  position: 'relative',
                  boxShadow: idx === 1 ? '0 15px 35px rgba(0,0,0,0.4), 0 0 25px rgba(212, 175, 55, 0.06)' : '0 15px 35px rgba(0,0,0,0.4)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease'
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

                <span style={{ fontSize: '0.72rem', color: acc.color, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 600 }}>
                  {card.step}
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    color: '#F8FAFC',
                    marginTop: '0.5rem',
                    marginBottom: '0.9rem',
                    lineHeight: 1.3
                  }}
                >
                  "{card.quote}"
                </h3>

                <p style={{ color: '#94A3B8', fontSize: '0.94rem', lineHeight: 1.7 }}>
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
