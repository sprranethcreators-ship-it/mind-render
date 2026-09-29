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
    <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: '#07080B' }}>
      <section style={{ padding: '60px 0 40px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: '#090B10' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag" style={{ justifyContent: 'center' }}>EDITORIAL ARCHIVES</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', color: '#F8FAFC', marginBottom: '1rem' }}>
            Inquiries Into Consciousness
          </h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', color: '#94A3B8', fontSize: '1.1rem', lineHeight: 1.7 }}>
            Intellectual treatises exploring attentional biology, subconscious habit loops, and the mechanics of belief.
          </p>
        </div>
      </section>

      <section style={{ padding: '60px 0 120px' }}>
        <div className="container">
          <div style={{ maxWidth: '400px', margin: '0 auto 3rem' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search essays by keyword..."
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '32px' }}>
            {filtered.map(art => (
              <Link
                key={art.id}
                to={`/articles/${art.slug}`}
                style={{
                  backgroundColor: '#0E1119',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textDecoration: 'none'
                }}
                className="card-panel"
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span className="badge-indigo">{art.category}</span>
                    <span style={{ fontSize: '0.78rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} /> {art.readTimeMinutes} min
                    </span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: '#F8FAFC', lineHeight: 1.35, marginBottom: '0.75rem' }}>
                    {art.title}
                  </h3>

                  <p style={{ color: '#94A3B8', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                    {art.excerpt}
                  </p>
                </div>

                <div
                  style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    paddingTop: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.82rem',
                    color: '#CBD5E1'
                  }}
                >
                  <span style={{ color: '#64748B' }}>{art.author}</span>
                  <span style={{ color: '#D4AF37', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
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
