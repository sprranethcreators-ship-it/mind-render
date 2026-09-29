import React, { useState } from 'react';
import { Book } from '../../types';
import { StorageService } from '../../services/storageService';
import { useToast } from '../../context/ToastContext';
import { Plus, Edit2, Trash2, Eye, Check, X, Shield, Star, DollarSign } from 'lucide-react';

export const AdminBooksManager: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(() => StorageService.getBooks());
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { showToast } = useToast();

  const handleTogglePublish = (book: Book) => {
    const updated = { ...book, isPublished: !book.isPublished };
    StorageService.saveBook(updated);
    setBooks(StorageService.getBooks());
    showToast('info', updated.isPublished ? 'Book Published' : 'Book Set to Draft');
  };

  const handleToggleFeatured = (book: Book) => {
    const updated = { ...book, isFeatured: !book.isFeatured };
    StorageService.saveBook(updated);
    setBooks(StorageService.getBooks());
    showToast('gold', updated.isFeatured ? 'Book Marked as Featured' : 'Removed from Featured');
  };

  const handleDelete = (bookId: string, title: string) => {
    if (window.confirm(`Are you certain you wish to delete "${title}"?`)) {
      StorageService.deleteBook(bookId);
      setBooks(StorageService.getBooks());
      showToast('error', 'Book Removed', `"${title}" has been deleted from catalog.`);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook) return;

    StorageService.saveBook(editingBook);
    setBooks(StorageService.getBooks());
    showToast('gold', 'Catalog Updated', `"${editingBook.title}" saved successfully.`);
    setEditingBook(null);
    setIsCreating(false);
  };

  const handleStartCreate = () => {
    const newBook: Book = {
      id: `mr-book-${Date.now()}`,
      slug: `untitled-manuscript-${Date.now().toString().slice(-4)}`,
      title: "New Digital Treatise",
      subtitle: "A Foundational Inquiry into Consciousness",
      author: "Father's Original Works",
      authorBio: "Dedicated to the mechanics of human thought. [Editable in CMS]",
      description: "Description of the digital manuscript and its transformative focus.",
      aboutText: "Detailed explanation of the text and its philosophical and practical application.",
      category: "Mindset",
      topics: ["Mindset", "Focus & Attention"],
      price: 25,
      originalPrice: 40,
      currency: "USD",
      coverGradient: {
        primary: "#1A1D2E",
        secondary: "#0B0D14",
        accent: "#D4AF37",
        pattern: "orbital"
      },
      pagesCount: 200,
      format: "Digital Edition (PDF + EPUB)",
      publishYear: new Date().getFullYear(),
      rating: 5.0,
      reviewsCount: 1,
      isFeatured: false,
      isNewRelease: true,
      isPublished: true,
      isbn: `978-0-998412-${Math.floor(10 + Math.random() * 89)}-0`,
      learningOutcomes: [
        "Core foundational principle of the manuscript.",
        "Practical cognitive method to rewire daily focus."
      ],
      tableOfContents: [
        "Prologue: The Sovereign Mind",
        "Chapter 1: The Core Mechanism",
        "Chapter 2: Application in Daily Life"
      ],
      samplePages: [
        {
          pageNumber: 1,
          title: "Prologue: The Sovereign Mind",
          paragraphs: [
            "Sample text for preview. Inscribe the opening words of the manuscript here."
          ]
        }
      ]
    };
    setEditingBook(newBook);
    setIsCreating(true);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#F8FAFC' }}>
            Father's Digital Books Catalog
          </h3>
          <p style={{ color: '#94A3B8', fontSize: '0.88rem' }}>
            Manage pricing, manuscript details, sample chapters, and published states.
          </p>
        </div>

        <button onClick={handleStartCreate} className="btn-gold" style={{ padding: '0.65rem 1.4rem', fontSize: '0.82rem' }}>
          <Plus size={16} /> Add Digital Book
        </button>
      </div>

      {/* Editor Modal / Drawer */}
      {editingBook && (
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
              maxWidth: '750px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: '#0E1119',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.9)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#F8FAFC' }}>
                {isCreating ? 'Create New Publication' : `Edit "${editingBook.title}"`}
              </h4>
              <button onClick={() => setEditingBook(null)} style={{ color: '#94A3B8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveForm} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '4px' }}>
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBook.title}
                    onChange={e => setEditingBook({ ...editingBook, title: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '4px' }}>
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBook.category}
                    onChange={e => setEditingBook({ ...editingBook, category: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '4px' }}>
                  Subtitle
                </label>
                <input
                  type="text"
                  required
                  value={editingBook.subtitle}
                  onChange={e => setEditingBook({ ...editingBook, subtitle: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '4px' }}>
                    Author Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBook.author}
                    onChange={e => setEditingBook({ ...editingBook, author: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '4px' }}>
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    required
                    value={editingBook.price}
                    onChange={e => setEditingBook({ ...editingBook, price: Number(e.target.value) })}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '4px' }}>
                    Original Price
                  </label>
                  <input
                    type="number"
                    value={editingBook.originalPrice}
                    onChange={e => setEditingBook({ ...editingBook, originalPrice: Number(e.target.value) })}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '4px' }}>
                  Short Summary
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingBook.description}
                  onChange={e => setEditingBook({ ...editingBook, description: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#CBD5E1', marginBottom: '4px' }}>
                  About the Treatise (Full Description)
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingBook.aboutText}
                  onChange={e => setEditingBook({ ...editingBook, aboutText: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '1rem' }}>
                <button type="button" onClick={() => setEditingBook(null)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-gold">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Books Table */}
      <div style={{ overflowX: 'auto', backgroundColor: '#0E1119', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', backgroundColor: '#121622', color: '#94A3B8' }}>
              <th style={{ padding: '14px 18px' }}>Title & Author</th>
              <th style={{ padding: '14px 18px' }}>Category</th>
              <th style={{ padding: '14px 18px' }}>Price</th>
              <th style={{ padding: '14px 18px' }}>Featured</th>
              <th style={{ padding: '14px 18px' }}>Status</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(b => (
              <tr key={b.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <td style={{ padding: '16px 18px' }}>
                  <div style={{ fontWeight: 600, color: '#F8FAFC' }}>{b.title}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{b.author} • {b.pagesCount}p</div>
                </td>
                <td style={{ padding: '16px 18px', color: '#CBD5E1' }}>{b.category}</td>
                <td style={{ padding: '16px 18px', fontWeight: 600, color: '#D4AF37' }}>
                  ${b.price} <span style={{ fontSize: '0.75rem', color: '#64748B', textDecoration: 'line-through' }}>${b.originalPrice}</span>
                </td>
                <td style={{ padding: '16px 18px' }}>
                  <button
                    onClick={() => handleToggleFeatured(b)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      backgroundColor: b.isFeatured ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255,255,255,0.04)',
                      color: b.isFeatured ? '#D4AF37' : '#64748B'
                    }}
                  >
                    {b.isFeatured ? 'Featured' : 'Standard'}
                  </button>
                </td>
                <td style={{ padding: '16px 18px' }}>
                  <button
                    onClick={() => handleTogglePublish(b)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      backgroundColor: b.isPublished ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: b.isPublished ? '#10B981' : '#EF4444'
                    }}
                  >
                    {b.isPublished ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '8px' }}>
                    <button
                      onClick={() => { setEditingBook(b); setIsCreating(false); }}
                      style={{ color: '#818CF8', padding: '6px', cursor: 'pointer' }}
                      title="Edit Book"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(b.id, b.title)}
                      style={{ color: '#EF4444', padding: '6px', cursor: 'pointer' }}
                      title="Delete Book"
                    >
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
