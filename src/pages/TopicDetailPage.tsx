import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MIND_CATEGORIES } from '../data/categories';
import { StorageService } from '../services/storageService';
import { Book3DCover } from '../components/books/Book3DCover';
import { ArrowLeft, Brain, Sparkles, BookOpen, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

export const TopicDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = MIND_CATEGORIES.find(c => c.slug === slug) || MIND_CATEGORIES[0];
  
  const allBooks = StorageService.getBooks();
  const allArticles = StorageService.getArticles();

  // Related books that touch this category
  const relatedBooks = allBooks.filter(b => 
    b.category.toLowerCase().includes(category.name.toLowerCase().split(' ')[0]) ||
    b.topics.some(t => t.toLowerCase().includes(category.name.toLowerCase().split(' ')[0]))
  );

  const relatedArticles = allArticles.filter(a => 
    a.category.toLowerCase().includes(category.name.toLowerCase().split(' ')[0]) ||
    a.tags.some(t => t.toLowerCase().includes(category.name.toLowerCase().split(' ')[0]))
  );

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: '#07080B' }}>
      {/* Breadcrumb */}
      <div style={{ padding: '24px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container">
          <Link
            to="/topics"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#94A3B8',
              fontSize: '0.85rem'
            }}
          >
            <ArrowLeft size={16} /> Back to All Domains
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section style={{ padding: '60px 0', backgroundColor: '#090B10', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container">
          <div style={{ maxWidth: '850px' }}>
            <span className="badge-gold" style={{ marginBottom: '1rem' }}>
              CURRICULUM DOMAIN
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)',
                color: '#F8FAFC',
                marginBottom: '0.5rem',
                lineHeight: 1.15
              }}
            >
              {category.name}
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '1.4rem',
                color: category.accentColor,
                marginBottom: '1.5rem'
              }}
            >
              {category.tagline}
            </p>
            <p style={{ color: '#CBD5E1', fontSize: '1.1rem', lineHeight: 1.8 }}>
              {category.description}
            </p>
          </div>
        </div>
      </section>

      {/* Comparative Rigor: Science vs Philosophy */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag" style={{ justifyContent: 'center' }}>INTELLECTUAL DIFFERENTIATION</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: '#F8FAFC' }}>
              Cognitive Science & Contemplative Philosophy
            </h2>
            <p style={{ color: '#94A3B8', fontSize: '1rem', maxWidth: '650px', margin: '0.5rem auto 0' }}>
              MIND RENDER maintains a clear boundary between biological mechanism and metaphysical contemplation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
            {/* Scientific Perspective */}
            <div
              style={{
                backgroundColor: '#0E1119',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '16px',
                padding: 'clamp(20px, 3.5vw, 36px)',
                boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
                boxSizing: 'border-box'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#818CF8', marginBottom: '1.25rem' }}>
                <Brain size={24} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#F8FAFC' }}>
                  The Neuro-Cognitive Perspective
                </h3>
              </div>
              <p style={{ color: '#CBD5E1', fontSize: '1rem', lineHeight: 1.8 }}>
                {category.scientificPerspective}
              </p>
            </div>

            {/* Philosophical Perspective */}
            <div
              style={{
                backgroundColor: '#0E1119',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '16px',
                padding: '36px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.5)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#D4AF37', marginBottom: '1.25rem' }}>
                <Sparkles size={24} />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#F8FAFC' }}>
                  The Contemplative Perspective
                </h3>
              </div>
              <p style={{ color: '#CBD5E1', fontSize: '1rem', lineHeight: 1.8 }}>
                {category.philosophicalPerspective}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Relevant Books */}
      {relatedBooks.length > 0 && (
        <section style={{ padding: '80px 0', backgroundColor: '#090B10', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
              <div>
                <span className="section-tag">PRIMARY TREATISES</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#F8FAFC' }}>
                  Foundational Books for {category.name}
                </h3>
              </div>
              <Link to="/books" style={{ color: '#D4AF37', fontSize: '0.86rem', fontWeight: 600 }}>
                View All Books →
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
              {relatedBooks.map(rb => (
                <div
                  key={rb.id}
                  style={{
                    backgroundColor: '#0F121C',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    padding: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px'
                  }}
                >
                  <div style={{ transform: 'scale(0.85)', transformOrigin: 'left center' }}>
                    <Book3DCover book={rb} size="sm" interactive={false} />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#F8FAFC', marginBottom: '6px' }}>
                      <Link to={`/books/${rb.slug}`} style={{ color: 'inherit' }}>{rb.title}</Link>
                    </h4>
                    <p style={{ color: '#94A3B8', fontSize: '0.84rem', marginBottom: '12px' }}>
                      {rb.subtitle}
                    </p>
                    <div style={{ color: '#D4AF37', fontWeight: 700, fontSize: '1.1rem', marginBottom: '14px' }}>
                      ${rb.price} USD
                    </div>
                    <Link to={`/books/${rb.slug}`} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                      Inspect Treatise
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Essays */}
      {relatedArticles.length > 0 && (
        <section style={{ padding: '80px 0 120px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div className="container">
            <span className="section-tag">COMPANION ESSAYS</span>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#F8FAFC', marginBottom: '2.5rem' }}>
              Inquiries & Articles
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
              {relatedArticles.map(art => (
                <Link
                  key={art.id}
                  to={`/articles/${art.slug}`}
                  style={{
                    backgroundColor: '#0E1119',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '14px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                  className="card-panel"
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#818CF8' }}>{art.readTimeMinutes} min read</span>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#F8FAFC', marginTop: '6px', marginBottom: '8px' }}>
                      {art.title}
                    </h4>
                    <p style={{ color: '#94A3B8', fontSize: '0.86rem', lineHeight: 1.6 }}>
                      {art.excerpt}
                    </p>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '12px', marginTop: '16px', color: '#D4AF37', fontSize: '0.82rem', fontWeight: 600 }}>
                    Read Article →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
