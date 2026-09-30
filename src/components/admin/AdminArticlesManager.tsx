import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { Article } from '../../types';
import { useToast } from '../../context/ToastContext';
import { Plus, Edit2, Trash2, BookOpen, Star, X } from 'lucide-react';

export const AdminArticlesManager: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(() => StorageService.getArticles());
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const { showToast } = useToast();

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete essay "${title}"?`)) {
      StorageService.deleteArticle(id);
      setArticles(StorageService.getArticles());
      showToast('error', 'Essay Removed', `"${title}" has been deleted.`);
    }
  };

  const handleToggleFeatured = (article: Article) => {
    const updated = { ...article, isFeatured: !article.isFeatured };
    StorageService.saveArticle(updated);
    setArticles(StorageService.getArticles());
    showToast('gold', updated.isFeatured ? 'Marked as Featured' : 'Unmarked from Featured');
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    StorageService.saveArticle(editingArticle);
    setArticles(StorageService.getArticles());
    showToast('gold', 'Essay Updated', `"${editingArticle.title}" saved.`);
    setEditingArticle(null);
  };

  const handleStartCreate = () => {
    const newArt: Article = {
      id: `art-${Date.now()}`,
      slug: `inquiry-${Date.now().toString().slice(-4)}`,
      title: "New Editorial Essay",
      subtitle: "A Scientific & Philosophical Investigation",
      excerpt: "Summary excerpt exploring the cognitive principles of attention and reality.",
      category: "Mindset",
      author: "MIND RENDER Editorial",
      authorRole: "Cognitive Research",
      readTimeMinutes: 5,
      publishDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      isFeatured: false,
      tags: ["Mindset", "Attention"],
      blocks: [
        {
          type: "paragraph",
          text: "Inscribe the opening analysis of the essay here."
        }
      ]
    };
    setEditingArticle(newArt);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#F8FAFC' }}>
            Editorial Essays & Content CMS
          </h3>
          <p style={{ color: '#94A3B8', fontSize: '0.88rem' }}>
            Publish essays distinguishing psychological neuroscience from metaphysical philosophies.
          </p>
        </div>

        <button onClick={handleStartCreate} className="btn-gold" style={{ padding: '0.65rem 1.4rem', fontSize: '0.82rem' }}>
          <Plus size={16} /> New Essay
        </button>
      </div>

      {editingArticle && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 6, 8, 0.88)',
            backdropFilter: 'blur(16px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '700px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#0E1119',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '16px',
              padding: '32px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#F8FAFC' }}>
                Edit Essay
              </h4>
              <button onClick={() => setEditingArticle(null)} style={{ color: '#94A3B8' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveForm} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '4px' }}>Title</label>
                <input
                  type="text"
                  required
                  value={editingArticle.title}
                  onChange={e => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '4px' }}>Category</label>
                <input
                  type="text"
                  required
                  value={editingArticle.category}
                  onChange={e => setEditingArticle({ ...editingArticle, category: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '4px' }}>Excerpt</label>
                <textarea
                  rows={3}
                  required
                  value={editingArticle.excerpt}
                  onChange={e => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1rem' }}>
                <button type="button" onClick={() => setEditingArticle(null)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-gold">Save Essay</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Articles Table */}
      <div style={{ overflowX: 'auto', backgroundColor: '#0E1119', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: '#121622', color: '#94A3B8' }}>
              <th style={{ padding: '14px 18px' }}>Title</th>
              <th style={{ padding: '14px 18px' }}>Category</th>
              <th style={{ padding: '14px 18px' }}>Read Time</th>
              <th style={{ padding: '14px 18px' }}>Featured</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(art => (
              <tr key={art.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <td style={{ padding: '16px 18px', fontWeight: 600, color: '#F8FAFC' }}>
                  {art.title}
                </td>
                <td style={{ padding: '16px 18px', color: '#CBD5E1' }}>{art.category}</td>
                <td style={{ padding: '16px 18px', color: '#94A3B8' }}>{art.readTimeMinutes} min</td>
                <td style={{ padding: '16px 18px' }}>
                  <button
                    onClick={() => handleToggleFeatured(art)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      backgroundColor: art.isFeatured ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255,255,255,0.04)',
                      color: art.isFeatured ? '#D4AF37' : '#64748B'
                    }}
                  >
                    {art.isFeatured ? 'Featured' : 'Standard'}
                  </button>
                </td>
                <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '8px' }}>
                    <button onClick={() => setEditingArticle(art)} style={{ color: '#818CF8', padding: '6px' }}>
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(art.id, art.title)} style={{ color: '#EF4444', padding: '6px' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
