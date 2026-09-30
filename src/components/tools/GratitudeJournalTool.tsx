import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { useToast } from '../../context/ToastContext';
import { JournalEntry } from '../../types';
import { BookOpen, Send, Calendar, Tag, CheckCircle2 } from 'lucide-react';

export const GratitudeJournalTool: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => StorageService.getJournalEntries());
  const [title, setTitle] = useState('');
  const [reflection, setReflection] = useState('');
  const [category, setCategory] = useState('Attentional Awareness');
  const { showToast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflection.trim()) return;

    const newEntry: JournalEntry = {
      id: `jrn-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      title: title.trim() || 'Daily Observation',
      category,
      prompt: "What pattern in my consciousness did I notice today, and what foundation of gratitude does it reveal?",
      reflection,
      tags: [category]
    };

    StorageService.saveJournalEntry(newEntry);
    setEntries(StorageService.getJournalEntries());
    setTitle('');
    setReflection('');
    showToast('gold', 'Reflection Inscribed', 'Your awareness entry is saved securely.');
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(25, 25, 29, 0.08)',
        borderRadius: '20px',
        padding: '36px',
        maxWidth: '820px',
        margin: '0 auto',
        boxShadow: '0 16px 40px rgba(25, 25, 29, 0.05)'
      }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge-indigo">Consciousness Journal</span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--text-primary)', marginTop: '0.5rem', letterSpacing: '-0.01em' }}>
          Daily Inquiry & Awareness Ledger
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
          The unexamined day dissolves into unconscious habit. Inscribe your observations on thought patterns and gratitude.
        </p>
      </div>

      {/* Entry Form */}
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '12px' }}>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Focus of Contemplation (e.g., Morning Silence, Dissolving Impatience)"
            style={{ width: '100%', backgroundColor: '#FFFFFF', border: '1px solid rgba(25, 25, 29, 0.12)', color: 'var(--text-primary)', borderRadius: '8px' }}
          />

          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{ width: '100%', backgroundColor: '#FFFFFF', border: '1px solid rgba(25, 25, 29, 0.12)', color: 'var(--text-primary)', borderRadius: '8px' }}
          >
            <option value="Attentional Awareness">Attentional Awareness</option>
            <option value="Subconscious Script">Subconscious Script</option>
            <option value="Gratitude Resonance">Gratitude Resonance</option>
            <option value="Manifestation Alignment">Manifestation Alignment</option>
          </select>
        </div>

        <textarea
          rows={5}
          required
          value={reflection}
          onChange={e => setReflection(e.target.value)}
          placeholder="Inscribe your reflection... What automated reaction did you notice today? What did you choose to look at with gratitude instead of scarcity?"
          style={{ width: '100%', resize: 'vertical', lineHeight: 1.6, backgroundColor: '#FFFFFF', border: '1px solid rgba(25, 25, 29, 0.12)', color: 'var(--text-primary)', borderRadius: '8px' }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn-gold" style={{ padding: '0.75rem 1.8rem', fontSize: '0.85rem' }}>
            <Send size={15} /> Save Reflection
          </button>
        </div>
      </form>

      {/* Past Entries */}
      <div>
        <h4 style={{ fontSize: '0.82rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '1rem', fontWeight: 600 }}>
          Inscribed Reflections ({entries.length})
        </h4>

        {entries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', backgroundColor: '#FAF8F3', border: '1px solid rgba(25, 25, 29, 0.08)', borderRadius: '12px', color: 'var(--text-secondary)' }}>
            No journal entries yet. Inscribe your first observation above.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {entries.slice(0, 4).map(entry => (
              <div
                key={entry.id}
                style={{
                  backgroundColor: '#FAF8F3',
                  border: '1px solid rgba(25, 25, 29, 0.08)',
                  borderRadius: '12px',
                  padding: '18px 22px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.98rem' }}>{entry.title}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem', color: '#8A8C9E' }}>
                    <span style={{ color: '#8C6D23', fontWeight: 600 }}>{entry.category}</span>
                    <span>•</span>
                    <span>{entry.date}</span>
                  </div>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                  {entry.reflection}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
