import React from 'react';
import { BookOpen, Sparkles, Target, RefreshCw } from 'lucide-react';
import { WhySectionContent } from '../../types/homepageContent';
import { StorageService } from '../../services/storageService';

interface WhyMindRenderProps {
  content?: WhySectionContent;
}

export const WhyMindRender: React.FC<WhyMindRenderProps> = ({ content }) => {
  const data = content || StorageService.getHomepageContent().whySection;

  const pillarThemes = [
    {
      icon: <BookOpen size={24} color="#D97706" />,
      color: '#B45309',
      iconBg: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
      border: 'rgba(245, 158, 11, 0.35)',
      cardGlow: '0 16px 40px -8px rgba(245, 158, 11, 0.15)'
    },
    {
      icon: <Sparkles size={24} color="#6366F1" />,
      color: '#4338CA',
      iconBg: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
      border: 'rgba(99, 102, 241, 0.35)',
      cardGlow: '0 16px 40px -8px rgba(99, 102, 241, 0.15)'
    },
    {
      icon: <Target size={24} color="#059669" />,
      color: '#047857',
      iconBg: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
      border: 'rgba(16, 185, 129, 0.35)',
      cardGlow: '0 16px 40px -8px rgba(16, 185, 129, 0.15)'
    },
    {
      icon: <RefreshCw size={24} color="#E11D48" />,
      color: '#BE123C',
      iconBg: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
      border: 'rgba(244, 63, 94, 0.35)',
      cardGlow: '0 16px 40px -8px rgba(244, 63, 94, 0.15)'
    }
  ];

  return (
    <section
      style={{
        padding: '130px 0 140px',
        backgroundColor: '#FAF8F5',
        position: 'relative',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <span className="section-tag" style={{ justifyContent: 'center' }}>
            <Sparkles size={15} color="#D97706" /> {data.sectionTag}
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
              color: 'var(--text-primary)',
              letterSpacing: '0.04em',
              marginBottom: '1rem',
              fontWeight: 700
            }}
          >
            {data.headline}
          </h2>
          <p
            style={{
              maxWidth: '660px',
              margin: '0 auto',
              color: 'var(--text-secondary)',
              fontSize: '1.08rem',
              lineHeight: 1.75
            }}
          >
            {data.description}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="responsive-grid-pillars">
          {data.pillars.map((pillar, idx) => {
            const theme = pillarThemes[idx % pillarThemes.length];
            return (
              <div
                key={idx}
                className="card-panel card-panel-responsive"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: `1.5px solid ${theme.border}`,
                  boxShadow: theme.cardGlow
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '14px',
                    background: theme.iconBg,
                    border: `1.5px solid ${theme.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)'
                  }}
                >
                  {theme.icon}
                </div>

                <span style={{ fontSize: '0.76rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: theme.color, fontWeight: 800 }}>
                  {pillar.subtitle}
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.3rem, 2.2vw, 1.7rem)',
                    color: 'var(--text-primary)',
                    marginTop: '0.4rem',
                    marginBottom: '0.85rem',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',
                    fontWeight: 700
                  }}
                >
                  {pillar.title}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.7 }}>
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
