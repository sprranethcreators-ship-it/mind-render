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
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text-primary)' }}>
            Editorial Essays & Content CMS
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
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
            backgroundColor: 'rgba(25, 25, 29, 0.6)',
            backdropFilter: 'blur(8px)',
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
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-medium)',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--text-primary)' }}>
                Edit Essay
              </h4>
              <button onClick={() => setEditingArticle(null)} style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveForm} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: 500 }}>Title</label>
                <input
                  type="text"
                  required
                  value={editingArticle.title}
                  onChange={e => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: 500 }}>Category</label>
                <input
                  type="text"
                  required
                  value={editingArticle.category}
                  onChange={e => setEditingArticle({ ...editingArticle, category: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: 500 }}>Excerpt</label>
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
      <div style={{ overflowX: 'auto', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-sm)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-soft)', backgroundColor: 'var(--bg-deep)', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '14px 18px', fontWeight: 600 }}>Title</th>
              <th style={{ padding: '14px 18px', fontWeight: 600 }}>Category</th>
              <th style={{ padding: '14px 18px', fontWeight: 600 }}>Read Time</th>
              <th style={{ padding: '14px 18px', fontWeight: 600 }}>Featured</th>
              <th style={{ padding: '14px 18px', textAlign: 'right', fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(art => (
              <tr key={art.id} style={{ borderBottom: '1px solid var(--border-soft)' }}>
                <td style={{ padding: '16px 18px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {art.title}
                </td>
                <td style={{ padding: '16px 18px', color: 'var(--text-secondary)' }}>{art.category}</td>
                <td style={{ padding: '16px 18px', color: 'var(--text-muted)' }}>{art.readTimeMinutes} min</td>
                <td style={{ padding: '16px 18px' }}>
                  <button
                    onClick={() => handleToggleFeatured(art)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: art.isFeatured ? 'rgba(140, 109, 35, 0.1)' : 'var(--bg-deep)',
                      color: art.isFeatured ? '#8C6D23' : 'var(--text-muted)',
                      border: art.isFeatured ? '1px solid rgba(140, 109, 35, 0.25)' : '1px solid var(--border-soft)',
                      cursor: 'pointer'
                    }}
                  >
                    {art.isFeatured ? 'Featured' : 'Standard'}
                  </button>
                </td>
                <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '8px' }}>
                    <button onClick={() => setEditingArticle(art)} style={{ color: 'var(--indigo-600)', padding: '6px', background: 'none', border: 'none', cursor: 'pointer' }} title="Edit Essay">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(art.id, art.title)} style={{ color: '#DC2626', padding: '6px', background: 'none', border: 'none', cursor: 'pointer' }} title="Delete Essay">
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
