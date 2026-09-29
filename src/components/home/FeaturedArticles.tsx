import React from 'react';
import { Link } from 'react-router-dom';
import { StorageService } from '../../services/storageService';
import { EssaysSectionContent } from '../../types/homepageContent';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';

interface FeaturedArticlesProps {
  content?: EssaysSectionContent;
}

export const FeaturedArticles: React.FC<FeaturedArticlesProps> = ({ content }) => {
  const data = content || StorageService.getHomepageContent().essaysSection;
  const articles = StorageService.getArticles();

  // Subtle atmospheric gradient backgrounds for each editorial card
  const cardGradients = [
    'linear-gradient(145deg, #101422 0%, #0A0C14 100%)',
    'linear-gradient(145deg, #161224 0%, #0A0C14 100%)',
    'linear-gradient(145deg, #181510 0%, #0A0C14 100%)',
    'linear-gradient(145deg, #0F1816 0%, #0A0C14 100%)'
  ];

  return (
    <section
      style={{
        padding: '130px 0 140px',
        backgroundColor: '#080A10',
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
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

        {/* 3 Editorial Magazine Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '32px'
          }}
        >
          {articles.slice(0, 3).map((article, idx) => (
            <Link
              key={article.id}
              to={`/articles/${article.slug}`}
              className="editorial-essay-card"
              style={{
                background: cardGradients[idx % cardGradients.length],
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                padding: '40px 32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 18px 45px rgba(0, 0, 0, 0.6)',
                transition: 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease'
              }}
            >
              {/* Traveling light shimmer layer on hover */}
              <div
                className="card-shimmer"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(115deg, transparent 0%, rgba(255, 255, 255, 0.06) 45%, rgba(255, 255, 255, 0.12) 50%, rgba(255, 255, 255, 0.06) 55%, transparent 100%)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.8s ease',
                  pointerEvents: 'none'
                }}
              />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <span className="badge-indigo" style={{ fontSize: '0.72rem' }}>
                    {article.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748B', fontSize: '0.8rem' }}>
                    <Clock size={13} />
                    <span>{article.readTimeMinutes} min read</span>
                  </div>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.45rem',
                    color: '#F8FAFC',
                    lineHeight: 1.35,
                    marginBottom: '1rem'
                  }}
                >
                  {article.title}
                </h3>

                <p style={{ color: '#94A3B8', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                  {article.excerpt}
                </p>
              </div>

              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(255, 255, 255, 0.07)',
                  paddingTop: '18px',
                  color: '#CBD5E1',
                  fontSize: '0.84rem'
                }}
              >
                <span style={{ color: '#64748B' }}>{article.author}</span>
                <span
                  className="read-essay-link"
                  style={{
                    color: '#D4AF37',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    letterSpacing: '0.04em'
                  }}
                >
                  <span>Read Essay</span>
                  <div className="card-arrow" style={{ transition: 'transform 0.3s ease' }}>
                    <ArrowRight size={14} />
                  </div>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Essays Link */}
        <div style={{ textAlign: 'center', marginTop: '4.5rem' }}>
          <Link
            to="/articles"
            className="btn-secondary"
            style={{ padding: '0.95rem 2.4rem', fontSize: '0.88rem' }}
          >
            <span>{data.viewAllButtonText}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        .editorial-essay-card:hover {
          transform: translateY(-5px);
          border-color: rgba(212, 175, 55, 0.35) !important;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.75) !important;
        }
        .editorial-essay-card:hover .card-shimmer {
          transform: translateX(100%);
        }
        .editorial-essay-card:hover .card-arrow {
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
};
