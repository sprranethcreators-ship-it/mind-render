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
        return <BookOpen size={24} color="#D4AF37" />;
      case 1:
        return <Sparkles size={24} color="#818CF8" />;
      case 2:
        return <Target size={24} color="#10B981" />;
      default:
        return <RefreshCw size={24} color="#F59E0B" />;
    }
  };

  return (
    <section
      style={{
        padding: '120px 0 130px',
        backgroundColor: '#090B10',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
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
              color: '#F8FAFC',
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
              color: '#94A3B8',
              fontSize: '1.05rem',
              lineHeight: 1.75
            }}
          >
            {data.description}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '28px'
          }}
        >
          {data.pillars.map((pillar, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#10131B',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                borderRadius: '20px',
                padding: '38px 30px',
                position: 'relative',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)'
              }}
              className="card-panel"
            >
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}
              >
                {getPillarIcon(idx)}
              </div>

              <span style={{ fontSize: '0.74rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4AF37', fontWeight: 600 }}>
                {pillar.subtitle}
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.65rem',
                  color: '#F8FAFC',
                  marginTop: '0.4rem',
                  marginBottom: '0.85rem'
                }}
              >
                {pillar.title}
              </h3>

              <p style={{ color: '#94A3B8', fontSize: '0.94rem', lineHeight: 1.7 }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
