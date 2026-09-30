import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { StorageService } from '../services/storageService';
import { Clock, ArrowRight, BookOpen, Search } from 'lucide-react';

export const ArticlesIndexPage: React.FC = () => {
  const articles = StorageService.getArticles();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = articles.filter(a =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              EDITORIAL ARCHIVES
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
            Inquiries Into{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1E1B4B 0%, #4F46E5 50%, #D97706 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              Consciousness
            </span>
          </h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', color: '#475569', fontSize: '1.12rem', lineHeight: 1.7 }}>
            Intellectual treatises exploring attentional biology, subconscious habit loops, and the mechanics of belief.
          </p>
        </div>
      </section>

      <section style={{ padding: '60px 0 120px' }}>
        <div className="container">
          <div style={{ maxWidth: '440px', margin: '0 auto 3.5rem', position: 'relative' }}>
            <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search essays by keyword..."
              style={{
                width: '100%',
                paddingLeft: '44px',
                paddingTop: '12px',
                paddingBottom: '12px',
                backgroundColor: '#FFFFFF',
                border: '1.5px solid rgba(217, 119, 6, 0.25)',
                color: '#0F172A',
                borderRadius: '12px',
                fontSize: '0.92rem',
                outline: 'none',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)'
              }}
            />
          </div>

          <div className="responsive-grid-essays">
            {filtered.map(art => (
              <Link
                key={art.id}
                to={`/articles/${art.slug}`}
                className="card-panel card-panel-responsive"
                style={{
                  textDecoration: 'none'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span className="badge-indigo">{art.category}</span>
                    <span style={{ fontSize: '0.78rem', color: '#8A8C9E', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} /> {art.readTimeMinutes} min
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--text-primary)', lineHeight: 1.35, marginBottom: '0.75rem' }}>
                    {art.title}
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                    {art.excerpt}
                  </p>
                </div>

                <div
                  style={{
                    borderTop: '1px solid rgba(25, 25, 29, 0.08)',
                    paddingTop: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)'
                  }}
                >
                  <span style={{ color: '#8A8C9E' }}>{art.author}</span>
                  <span style={{ color: 'var(--indigo-600)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Read Essay <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
