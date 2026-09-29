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
        backgroundColor: '#07090F',
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
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 70%)',
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
                color: '#F8FAFC',
                letterSpacing: '0.04em'
              }}
            >
              {data.headline}
            </h2>
          </div>

          <p
            style={{
              maxWidth: '520px',
              color: '#94A3B8',
              fontSize: '1.05rem',
              lineHeight: 1.75
            }}
          >
            {data.description}
          </p>
        </div>

        {/* 6 Editorial Topic Cards */}
        <div className="responsive-grid-topics">
          {data.topics.map((topic) => (
            <Link
              key={topic.id}
              to={`/topics/${topic.slug}`}
              className="editorial-topic-card"
              style={{
                position: 'relative',
                minHeight: '290px',
                borderRadius: '18px',
                overflow: 'hidden',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 'clamp(24px, 3.5vw, 36px) clamp(18px, 3vw, 28px)',
                background: topic.gradientBackground,
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 18px 45px rgba(0, 0, 0, 0.55)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease',
                boxSizing: 'border-box'
              }}
            >
              {/* Traveling light shimmer layer on hover */}
              <div
                className="card-shimmer"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(115deg, transparent 0%, rgba(255, 255, 255, 0.05) 45%, rgba(255, 255, 255, 0.12) 50%, rgba(255, 255, 255, 0.05) 55%, transparent 100%)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.8s ease',
                  pointerEvents: 'none',
                  zIndex: 2
                }}
              />

              {/* Top Accent Strip */}
              <div style={{ position: 'relative', zIndex: 3 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: topic.accent,
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '1rem'
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: topic.accent }} />
                  {topic.title}
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 2vw, 1.85rem)',
                    color: '#F8FAFC',
                    lineHeight: 1.25,
                    marginBottom: '0.6rem'
                  }}
                >
                  {topic.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: '1.05rem',
                    color: '#CBD5E1',
                    marginBottom: '1rem'
                  }}
                >
                  {topic.tagline}
                </p>
              </div>

              {/* Bottom Description & Directional Arrow */}
              <div style={{ position: 'relative', zIndex: 3 }}>
                <p
                  style={{
                    color: '#94A3B8',
                    fontSize: '0.94rem',
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
                    borderTop: '1px solid rgba(255, 255, 255, 0.07)',
                    paddingTop: '16px',
                    color: topic.accent,
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  <span>Explore Topic</span>
                  <div className="card-arrow" style={{ transition: 'transform 0.3s ease' }}>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
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
          transform: translateY(-6px) scale(1.01);
          border-color: rgba(255, 255, 255, 0.22) !important;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.75) !important;
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
