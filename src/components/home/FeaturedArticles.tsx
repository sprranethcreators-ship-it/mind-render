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
        backgroundColor: '#FAF8F3',
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

        {/* 3 Editorial Magazine Cards */}
        <div className="responsive-grid-essays">
          {articles.slice(0, 3).map((article) => (
            <Link
              key={article.id}
              to={`/articles/${article.slug}`}
              className="editorial-essay-card"
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                borderRadius: '18px',
                padding: 'clamp(24px, 3.5vw, 38px) clamp(18px, 3vw, 30px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(25, 25, 29, 0.04)',
                transition: 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
                boxSizing: 'border-box'
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
                  <span className="badge-indigo" style={{ fontSize: '0.74rem' }}>
                    {article.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#747484', fontSize: '0.82rem', fontWeight: 500 }}>
                    <Clock size={13} />
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
