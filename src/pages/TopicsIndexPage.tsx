import React from 'react';
import { Link } from 'react-router-dom';
import { MIND_CATEGORIES } from '../data/categories';
import { ArrowRight, Sparkles, Brain, Compass } from 'lucide-react';

export const TopicsIndexPage: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: 'var(--bg-cosmos)' }}>
      <section
        style={{
          padding: '80px 0 50px',
          borderBottom: '1px solid rgba(217, 119, 6, 0.15)',
          background: 'linear-gradient(180deg, #FAF8F5 0%, #F5F3FF 40%, #FFFBEB 85%, #FAF8F5 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#92400E',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 18px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.9) 0%, rgba(253, 230, 138, 0.6) 100%)',
                border: '1px solid rgba(217, 119, 6, 0.35)',
                boxShadow: '0 4px 14px rgba(245, 158, 11, 0.15)'
              }}
            >
              <Brain size={14} color="#D97706" /> CONSCIOUSNESS ARCHITECTURE
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              color: '#0F172A',
              marginBottom: '1.25rem',
              letterSpacing: '-0.01em',
              fontWeight: 800
            }}
          >
            The 11 Pillars of the{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1E1B4B 0%, #4F46E5 50%, #D97706 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              Mind
            </span>
          </h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', color: '#475569', fontSize: '1.12rem', lineHeight: 1.7 }}>
            Systematic domains bridging psychological neuroscience and contemplative metaphysics. Explore how thoughts, attention, and subconscious conditioning shape reality.
          </p>
        </div>
      </section>

      <section style={{ padding: '40px 0 100px' }}>
        <div className="container">
          <div className="responsive-grid-topics">
            {MIND_CATEGORIES.map(cat => (
              <div
                key={cat.id}
                className="card-panel card-panel-responsive"
              >
                <div>
                  <span style={{ fontSize: '0.74rem', color: 'var(--indigo-600)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
                    {cat.tagline}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--text-primary)', marginTop: '6px', marginBottom: '12px' }}>
                    <Link to={`/topics/${cat.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>{cat.name}</Link>
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                    {cat.description}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
                    {cat.topicsCovered.map((t, idx) => (
                      <span key={idx} style={{ fontSize: '0.72rem', backgroundColor: 'rgba(25, 25, 29, 0.04)', border: '1px solid rgba(25, 25, 29, 0.07)', padding: '3px 8px', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/topics/${cat.slug}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid rgba(25, 25, 29, 0.08)',
                      paddingTop: '14px',
                      color: 'var(--indigo-600)',
                      fontSize: '0.86rem',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}
                  >
                    <span>Examine Curriculum</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
