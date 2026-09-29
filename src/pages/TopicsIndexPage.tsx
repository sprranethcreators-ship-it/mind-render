import React from 'react';
import { Link } from 'react-router-dom';
import { MIND_CATEGORIES } from '../data/categories';
import { ArrowRight, Sparkles, Brain, Compass } from 'lucide-react';

export const TopicsIndexPage: React.FC = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: '#07080B' }}>
      <section style={{ padding: '60px 0 40px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: '#090B10' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag" style={{ justifyContent: 'center' }}>CONSCIOUSNESS ARCHITECTURE</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', color: '#F8FAFC', marginBottom: '1rem' }}>
            The 11 Pillars of the Mind
          </h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', color: '#94A3B8', fontSize: '1.1rem', lineHeight: 1.7 }}>
            Systematic domains bridging psychological neuroscience and contemplative metaphysics. Explore how thoughts, attention, and subconscious conditioning shape reality.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 0 120px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '28px' }}>
            {MIND_CATEGORIES.map(cat => (
              <div
                key={cat.id}
                style={{
                  backgroundColor: '#0F121C',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                className="card-panel"
              >
                <div>
                  <span style={{ fontSize: '0.74rem', color: cat.accentColor, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>
                    {cat.tagline}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#F8FAFC', marginTop: '6px', marginBottom: '12px' }}>
                    <Link to={`/topics/${cat.slug}`} style={{ color: 'inherit' }}>{cat.name}</Link>
                  </h3>
                  <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                    {cat.description}
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
                    {cat.topicsCovered.map((t, idx) => (
                      <span key={idx} style={{ fontSize: '0.72rem', backgroundColor: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: '4px', color: '#CBD5E1' }}>
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
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      paddingTop: '14px',
                      color: cat.accentColor,
                      fontSize: '0.86rem',
                      fontWeight: 600
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
