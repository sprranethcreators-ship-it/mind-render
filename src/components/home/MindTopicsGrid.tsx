import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TopicsSectionContent } from '../../types/homepageContent';
import { StorageService } from '../../services/storageService';

interface MindTopicsGridProps {
  content?: TopicsSectionContent;
}

export const MindTopicsGrid: React.FC<MindTopicsGridProps> = ({ content }) => {
  const data = content || StorageService.getHomepageContent().topicsSection;

  return (
    <section
      id="explore-mind"
      style={{
        padding: '120px 0 130px',
        backgroundColor: '#FAF8F3',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background ambient illumination */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(81, 70, 184, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '24px',
            marginBottom: '4.5rem'
          }}
        >
          <div>
            <span className="section-tag">
              <Sparkles size={14} /> {data.sectionTag}
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                color: 'var(--text-primary)',
                letterSpacing: '0.04em'
              }}
            >
              {data.headline}
            </h2>
          </div>

          <p
            style={{
              maxWidth: '520px',
              color: 'var(--text-secondary)',
              fontSize: '1.08rem',
              lineHeight: 1.75
            }}
          >
            {data.description}
          </p>
        </div>

        {/* 6 Editorial Topic Cards */}
        <div className="responsive-grid-topics">
          {data.topics.map((topic, tIdx) => {
            const jewelThemes = [
              {
                bg: 'linear-gradient(155deg, #FFFFFF 0%, #FAF5FF 100%)',
                border: 'rgba(139, 92, 246, 0.3)',
                borderHover: '#8B5CF6',
                accent: '#6D28D9',
                pillBg: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
                pillBorder: 'rgba(139, 92, 246, 0.35)',
                cornerGlow: 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.18) 0%, transparent 65%)',
                hoverGlow: '0 20px 45px -8px rgba(139, 92, 246, 0.22)'
              },
              {
                bg: 'linear-gradient(155deg, #FFFFFF 0%, #FFFBEB 100%)',
                border: 'rgba(245, 158, 11, 0.35)',
                borderHover: '#F59E0B',
                accent: '#B45309',
                pillBg: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
                pillBorder: 'rgba(245, 158, 11, 0.4)',
                cornerGlow: 'radial-gradient(circle at top right, rgba(245, 158, 11, 0.2) 0%, transparent 65%)',
                hoverGlow: '0 20px 45px -8px rgba(245, 158, 11, 0.24)'
              },
              {
                bg: 'linear-gradient(155deg, #FFFFFF 0%, #EEF2FF 100%)',
                border: 'rgba(79, 70, 229, 0.3)',
                borderHover: '#6366F1',
                accent: '#4338CA',
                pillBg: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
                pillBorder: 'rgba(99, 102, 241, 0.35)',
                cornerGlow: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.18) 0%, transparent 65%)',
                hoverGlow: '0 20px 45px -8px rgba(79, 70, 229, 0.22)'
              },
              {
                bg: 'linear-gradient(155deg, #FFFFFF 0%, #ECFDF5 100%)',
                border: 'rgba(16, 185, 129, 0.3)',
                borderHover: '#10B981',
                accent: '#047857',
                pillBg: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
                pillBorder: 'rgba(16, 185, 129, 0.35)',
                cornerGlow: 'radial-gradient(circle at top right, rgba(16, 185, 129, 0.18) 0%, transparent 65%)',
                hoverGlow: '0 20px 45px -8px rgba(16, 185, 129, 0.22)'
              },
              {
                bg: 'linear-gradient(155deg, #FFFFFF 0%, #FFF1F2 100%)',
                border: 'rgba(244, 63, 94, 0.3)',
                borderHover: '#F43F5E',
                accent: '#BE123C',
                pillBg: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
                pillBorder: 'rgba(244, 63, 94, 0.35)',
                cornerGlow: 'radial-gradient(circle at top right, rgba(244, 63, 94, 0.18) 0%, transparent 65%)',
                hoverGlow: '0 20px 45px -8px rgba(244, 63, 94, 0.22)'
              },
              {
                bg: 'linear-gradient(155deg, #FFFFFF 0%, #F0F9FF 100%)',
                border: 'rgba(2, 132, 199, 0.3)',
                borderHover: '#0EA5E9',
                accent: '#0369A1',
                pillBg: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
                pillBorder: 'rgba(2, 132, 199, 0.35)',
                cornerGlow: 'radial-gradient(circle at top right, rgba(2, 132, 199, 0.18) 0%, transparent 65%)',
                hoverGlow: '0 20px 45px -8px rgba(2, 132, 199, 0.22)'
              }
            ];

            const theme = jewelThemes[tIdx % jewelThemes.length];

            return (
              <Link
                key={topic.id}
                to={`/topics/${topic.slug}`}
                className="editorial-topic-card"
                style={{
                  position: 'relative',
                  minHeight: '310px',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 'clamp(26px, 3.5vw, 38px) clamp(20px, 3vw, 30px)',
                  background: theme.bg,
                  border: `1.5px solid ${theme.border}`,
                  boxShadow: '0 10px 30px rgba(18, 20, 29, 0.05)',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxSizing: 'border-box'
                }}
              >
                {/* Corner Radiant Glow */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '180px',
                    height: '180px',
                    background: theme.cornerGlow,
                    pointerEvents: 'none',
                    zIndex: 1
                  }}
                />

                {/* Traveling light shimmer layer on hover */}
                <div
                  className="card-shimmer"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(115deg, transparent 0%, rgba(255, 255, 255, 0.4) 45%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.4) 55%, transparent 100%)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.8s ease',
                    pointerEvents: 'none',
                    zIndex: 2
                  }}
                />

                {/* Top Accent Strip */}
                <div style={{ position: 'relative', zIndex: 3 }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '5px 14px',
                      borderRadius: '20px',
                      background: theme.pillBg,
                      border: `1px solid ${theme.pillBorder}`,
                      marginBottom: '1.25rem',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)'
                    }}
                  >
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: theme.accent, boxShadow: `0 0 6px ${theme.accent}` }} />
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.74rem',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: theme.accent,
                        fontWeight: 800
                      }}
                    >
                      {topic.title}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.5rem, 2vw, 1.85rem)',
                      color: 'var(--text-primary)',
                      lineHeight: 1.25,
                      marginBottom: '0.6rem',
                      fontWeight: 700
                    }}
                  >
                    {topic.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: 'italic',
                      fontSize: '1.1rem',
                      color: theme.accent,
                      marginBottom: '1rem',
                      fontWeight: 500
                    }}
                  >
                    {topic.tagline}
                  </p>
                </div>

                {/* Bottom Description & Directional Arrow */}
                <div style={{ position: 'relative', zIndex: 3 }}>
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.96rem',
                      lineHeight: 1.7,
                      marginBottom: '1.75rem'
                    }}
                  >
                    {topic.description}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid rgba(18, 20, 29, 0.08)',
                      paddingTop: '16px',
                      color: theme.accent,
                      fontSize: '0.84rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase'
                    }}
                  >
                    <span>Explore System</span>
                    <div className="card-arrow" style={{ transition: 'transform 0.3s ease' }}>
                      <ArrowRight size={17} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: 'center', marginTop: '4.5rem' }}>
          <Link
            to="/topics"
            className="btn-secondary"
            style={{ padding: '0.95rem 2.4rem', fontSize: '0.88rem' }}
          >
            <span>{data.viewAllButtonText}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        .editorial-topic-card:hover {
          transform: translateY(-5px);
          border-color: var(--border-medium) !important;
          box-shadow: 0 16px 40px rgba(25, 25, 29, 0.08) !important;
        }
        .editorial-topic-card:hover .card-shimmer {
          transform: translateX(100%);
        }
        .editorial-topic-card:hover .card-arrow {
          transform: translateX(5px);
        }
      `}</style>
    </section>
  );
};
