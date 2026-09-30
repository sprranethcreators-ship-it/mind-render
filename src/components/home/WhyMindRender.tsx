import React from 'react';
import { BookOpen, Sparkles, Target, RefreshCw } from 'lucide-react';
import { WhySectionContent } from '../../types/homepageContent';
import { StorageService } from '../../services/storageService';

interface WhyMindRenderProps {
  content?: WhySectionContent;
}

export const WhyMindRender: React.FC<WhyMindRenderProps> = ({ content }) => {
  const data = content || StorageService.getHomepageContent().whySection;

  const getPillarIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <BookOpen size={24} color="#99751F" />;
      case 1:
        return <Sparkles size={24} color="#5146B8" />;
      case 2:
        return <Target size={24} color="#059669" />;
      default:
        return <RefreshCw size={24} color="#B45309" />;
    }
  };

  return (
    <section
      style={{
        padding: '120px 0 130px',
        backgroundColor: '#F7F4EE',
        position: 'relative',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <span className="section-tag" style={{ justifyContent: 'center' }}>
            <Sparkles size={14} /> {data.sectionTag}
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
              color: 'var(--text-primary)',
              letterSpacing: '0.04em',
              marginBottom: '1rem'
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
          {data.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="card-panel card-panel-responsive"
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                boxShadow: '0 8px 24px rgba(25, 25, 29, 0.04)'
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  backgroundColor: '#FAF8F3',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.35rem'
                }}
              >
                {getPillarIcon(idx)}
              </div>

              <span style={{ fontSize: '0.76rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: idx === 0 ? '#99751F' : idx === 1 ? '#5146B8' : idx === 2 ? '#059669' : '#B45309', fontWeight: 700 }}>
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
                  wordBreak: 'break-word'
                }}
              >
                {pillar.title}
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.7 }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
