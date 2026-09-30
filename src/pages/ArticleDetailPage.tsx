import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { StorageService } from '../services/storageService';
import { ArrowLeft, Clock, BookOpen, Share2, Sparkles, Brain } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { showToast } = useToast();
  
  const articles = StorageService.getArticles();
  const article = articles.find(a => a.slug === slug) || articles[0];

  const books = StorageService.getBooks();
  const relatedBook = article.relatedBookSlug ? books.find(b => b.slug === article.relatedBookSlug) : null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('gold', 'Link Copied', 'Article link copied to clipboard.');
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: '#07080B' }}>
      {/* Breadcrumb & Actions */}
      <div style={{ padding: '24px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link
            to="/articles"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#94A3B8',
              fontSize: '0.85rem'
            }}
          >
            <ArrowLeft size={16} /> Back to All Essays
          </Link>

          <button
            onClick={handleShare}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#CBD5E1', fontSize: '0.82rem', padding: '6px 12px', borderRadius: '6px', backgroundColor: 'rgba(255,255,255,0.04)' }}
          >
            <Share2 size={14} /> Share
          </button>
        </div>
      </div>

      {/* Article Content Stage */}
      <article style={{ padding: '60px 0 120px' }}>
        <div className="container-narrow">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge-indigo" style={{ marginBottom: '1.25rem' }}>
              {article.category}
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
                color: '#F8FAFC',
                lineHeight: 1.2,
                marginBottom: '1rem'
              }}
            >
              {article.title}
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: '1.35rem',
                color: '#D4AF37',
                marginBottom: '2rem',
                lineHeight: 1.45
              }}
            >
              {article.subtitle}
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                color: '#64748B',
                fontSize: '0.84rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '12px 0'
              }}
            >
              <span>By <strong style={{ color: '#CBD5E1' }}>{article.author}</strong> ({article.authorRole})</span>
              <span>•</span>
              <span>{article.publishDate}</span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={13} /> {article.readTimeMinutes} min read
              </span>
            </div>
          </div>

          {/* Body Content Blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {article.blocks.map((block, idx) => {
              if (block.type === 'paragraph') {
                return (
                  <p
                    key={idx}
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      lineHeight: 1.9,
                      color: '#E2E8F0',
                      letterSpacing: '0.01em'
                    }}
                  >
                    {block.text}
                  </p>
                );
              }

              if (block.type === 'heading') {
                return (
                  <h3
                    key={idx}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.75rem',
                      color: '#F8FAFC',
                      marginTop: '1.5rem',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {block.text}
                  </h3>
                );
              }

              if (block.type === 'quote') {
                return (
                  <blockquote
                    key={idx}
                    style={{
                      borderLeft: '3px solid #D4AF37',
                      padding: '20px 28px',
                      backgroundColor: 'rgba(212, 175, 55, 0.05)',
                      borderRadius: '0 12px 12px 0',
                      margin: '1rem 0'
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontStyle: 'italic',
                        fontSize: '1.45rem',
                        color: '#F3E5AB',
                        lineHeight: 1.6
                      }}
                    >
                      "{block.text}"
                    </p>
                  </blockquote>
                );
              }

              if (block.type === 'scientific_note') {
                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'rgba(99, 102, 241, 0.08)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      borderRadius: '12px',
                      padding: '24px',
                      margin: '1rem 0'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#818CF8', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>
                      <Brain size={16} /> {block.label || 'Scientific Research Foundation'}
                    </div>
                    {block.citation && (
                      <div style={{ fontSize: '0.78rem', color: '#94A3B8', fontFamily: 'monospace', marginBottom: '8px' }}>
                        Citation: {block.citation}
                      </div>
                    )}
                    <p style={{ color: '#CBD5E1', fontSize: '0.96rem', lineHeight: 1.7 }}>
                      {block.text}
                    </p>
                  </div>
                );
              }

              if (block.type === 'callout') {
                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: '#10131B',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      padding: '24px',
                      color: '#E2E8F0',
                      fontSize: '1.05rem',
                      lineHeight: 1.75
                    }}
                  >
                    {block.text}
                  </div>
                );
              }

              if (block.type === 'list' && block.items) {
                return (
                  <ul key={idx} style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', margin: '1rem 0' }}>
                    {block.items.map((item, itemIdx) => (
                      <li key={itemIdx} style={{ display: 'flex', gap: '12px', color: '#E2E8F0', fontSize: '1.1rem', lineHeight: 1.7 }}>
                        <span style={{ color: '#D4AF37', fontWeight: 700 }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              return null;
            })}
          </div>

          {/* Related Book Callout Box */}
          {relatedBook && (
            <div
              style={{
                marginTop: '5rem',
                backgroundColor: '#0F121C',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '16px',
                padding: '32px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '24px'
              }}
            >
              <div>
                <span className="badge-gold" style={{ marginBottom: '6px' }}>Companion Reading</span>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: '#F8FAFC', marginBottom: '6px' }}>
                  Explore "{relatedBook.title}"
                </h4>
                <p style={{ color: '#94A3B8', fontSize: '0.9rem', maxWidth: '480px' }}>
                  A full digital treatise on this subject written by the author's father, complete with sample chapters and exercises.
                </p>
              </div>

              <Link
                to={`/books/${relatedBook.slug}`}
                className="btn-gold"
                style={{ padding: '0.85rem 1.8rem', fontSize: '0.88rem' }}
              >
                Inspect Treatise (${relatedBook.price})
              </Link>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};
