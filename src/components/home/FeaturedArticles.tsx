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
              <Sparkles size={15} color="#D97706" /> {data.sectionTag}
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                color: 'var(--text-primary)',
                letterSpacing: '0.04em',
                fontWeight: 700
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

        {/* 3 Editorial Magazine Cards */}
        <div className="responsive-grid-essays">
          {articles.slice(0, 3).map((article, aIdx) => {
            const badgeClasses = ['badge-indigo', 'badge-gold', 'badge-rose'];
            const badgeClass = badgeClasses[aIdx % badgeClasses.length];
            const borderColors = ['rgba(99, 102, 241, 0.25)', 'rgba(245, 158, 11, 0.3)', 'rgba(244, 63, 94, 0.25)'];
            const glowColors = [
              '0 16px 40px -8px rgba(99, 102, 241, 0.16)',
              '0 16px 40px -8px rgba(245, 158, 11, 0.18)',
              '0 16px 40px -8px rgba(244, 63, 94, 0.16)'
            ];

            return (
              <Link
                key={article.id}
                to={`/articles/${article.slug}`}
                className="editorial-essay-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: `1.5px solid ${borderColors[aIdx % borderColors.length]}`,
                  borderRadius: '22px',
                  padding: 'clamp(26px, 3.5vw, 38px) clamp(20px, 3vw, 30px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: glowColors[aIdx % glowColors.length],
                  transition: 'all 0.35s ease',
                  boxSizing: 'border-box',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)'
                }}
              >
                {/* Traveling light shimmer layer on hover */}
                <div
                  className="card-shimmer"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(115deg, transparent 0%, rgba(255, 255, 255, 0.4) 45%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.4) 55%, transparent 100%)',
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.8s ease',
                    pointerEvents: 'none'
                  }}
                />

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <span className={badgeClass} style={{ fontSize: '0.74rem' }}>
                      {article.category}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#6B7085', fontSize: '0.82rem', fontWeight: 600 }}>
                      <Clock size={14} color="#6366F1" />
                      <span>{article.readTimeMinutes} min read</span>
                    </div>
                  </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.45rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.35,
                    marginBottom: '1rem'
                  }}
                >
                  {article.title}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.7, marginBottom: '2rem' }}>
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
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '18px',
                  color: 'var(--text-secondary)',
                  fontSize: '0.86rem'
                }}
              >
                <span style={{ color: '#747484', fontWeight: 500 }}>{article.author}</span>
                <span
                  className="read-essay-link"
                  style={{
                    color: '#5146B8',
                    fontWeight: 700,
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
          );
        })}
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
          border-color: var(--border-medium) !important;
          box-shadow: 0 16px 40px rgba(25, 25, 29, 0.08) !important;
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
