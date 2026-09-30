import React from 'react';
import { Link } from 'react-router-dom';
import { MIND_CATEGORIES } from '../data/categories';
import { ArrowRight, Sparkles, Brain, Compass } from 'lucide-react';

export const TopicsIndexPage: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: 'var(--bg-cosmos)' }}>
      <section style={{ padding: '60px 0 40px', borderBottom: '1px solid rgba(25, 25, 29, 0.08)', backgroundColor: 'var(--bg-deep)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag" style={{ justifyContent: 'center' }}>CONSCIOUSNESS ARCHITECTURE</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            The 11 Pillars of the Mind
          </h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7 }}>
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
