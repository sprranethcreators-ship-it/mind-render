import React, { useState } from 'react';
import { HomepageContent } from '../../types/homepageContent';
import { StorageService } from '../../services/storageService';
import { useToast } from '../../context/ToastContext';
import { 
  Sparkles, 
  Save, 
  RotateCcw, 
  ExternalLink, 
  Check, 
  Type, 
  Layers, 
  Compass, 
  BookOpen, 
  HelpCircle, 
  FileText,
  MousePointerClick
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminHomepageContentEditor: React.FC = () => {
  const { showToast } = useToast();
  const [content, setContent] = useState<HomepageContent>(() => StorageService.getHomepageContent());
  const [activeSection, setActiveSection] = useState<
    'hero' | 'philosophy' | 'topics' | 'mindInMotion' | 'books' | 'why' | 'essays' | 'finalCta'
  >('hero');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    StorageService.saveHomepageContent(content);
    setIsSaved(true);
    showToast('gold', 'Homepage Content Published', 'Every edited character, punctuation mark, and headline is now live across the homepage.');
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all homepage text and copy back to default authoritative text? Any unsaved edits will be replaced.")) {
      const reset = StorageService.resetHomepageContent();
      setContent(reset);
      showToast('info', 'Content Reset', 'All homepage copy has been restored to default.');
    }
  };

  // Helper updaters
  const updateHero = (field: keyof HomepageContent['hero'], value: string) => {
    setContent(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const updatePhilosophy = (field: keyof HomepageContent['philosophy'], value: any) => {
    setContent(prev => ({
      ...prev,
      philosophy: { ...prev.philosophy, [field]: value }
    }));
  };

  const updatePhilosophyTriad = (index: number, field: string, value: string) => {
    setContent(prev => {
      const updated = [...prev.philosophy.triadCards];
      updated[index] = { ...updated[index], [field]: value };
      return {
        ...prev,
        philosophy: { ...prev.philosophy, triadCards: updated }
      };
    });
  };

  const updateTopicsSection = (field: keyof HomepageContent['topicsSection'], value: any) => {
    setContent(prev => ({
      ...prev,
      topicsSection: { ...prev.topicsSection, [field]: value }
    }));
  };

  const updateSingleTopic = (index: number, field: string, value: string) => {
    setContent(prev => {
      const updated = [...prev.topicsSection.topics];
      updated[index] = { ...updated[index], [field]: value };
      return {
        ...prev,
        topicsSection: { ...prev.topicsSection, topics: updated }
      };
    });
  };

  const updateMindInMotion = (field: keyof HomepageContent['mindInMotion'], value: any) => {
    setContent(prev => ({
      ...prev,
      mindInMotion: { ...prev.mindInMotion, [field]: value }
    }));
  };

  const updateSingleStep = (index: number, field: string, value: string) => {
    setContent(prev => {
      const updated = [...prev.mindInMotion.steps];
      updated[index] = { ...updated[index], [field]: value };
      return {
        ...prev,
        mindInMotion: { ...prev.mindInMotion, steps: updated }
      };
    });
  };

  const updateBooksSection = (field: keyof HomepageContent['booksSection'], value: string) => {
    setContent(prev => ({
      ...prev,
      booksSection: { ...prev.booksSection, [field]: value }
    }));
  };

  const updateWhySection = (field: keyof HomepageContent['whySection'], value: any) => {
    setContent(prev => ({
      ...prev,
      whySection: { ...prev.whySection, [field]: value }
    }));
  };

  const updateSinglePillar = (index: number, field: string, value: string) => {
    setContent(prev => {
      const updated = [...prev.whySection.pillars];
      updated[index] = { ...updated[index], [field]: value };
      return {
        ...prev,
        whySection: { ...prev.whySection, pillars: updated }
      };
    });
  };

  const updateEssaysSection = (field: keyof HomepageContent['essaysSection'], value: string) => {
    setContent(prev => ({
      ...prev,
      essaysSection: { ...prev.essaysSection, [field]: value }
    }));
  };

  const updateFinalCta = (field: keyof HomepageContent['finalCta'], value: string) => {
    setContent(prev => ({
      ...prev,
      finalCta: { ...prev.finalCta, [field]: value }
    }));
  };

  const sectionTabs = [
    { id: 'hero', label: '1. Hero Masthead', icon: <Type size={16} /> },
    { id: 'philosophy', label: '2. Philosophy Triad', icon: <Layers size={16} /> },
    { id: 'topics', label: '3. 6 Topics Grid', icon: <Compass size={16} /> },
    { id: 'mindInMotion', label: '4. Mind in Motion (7 Steps)', icon: <MousePointerClick size={16} /> },
    { id: 'books', label: '5. Publishing House', icon: <BookOpen size={16} /> },
    { id: 'why', label: '6. Why Mind Render (4 Pillars)', icon: <HelpCircle size={16} /> },
    { id: 'essays', label: '7. Editorial Essays', icon: <FileText size={16} /> },
    { id: 'finalCta', label: '8. Final Horizon CTA', icon: <Sparkles size={16} /> },
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid var(--border-soft)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
      {/* Studio Header Bar */}
      <div
        style={{
          padding: '24px 28px',
          backgroundColor: 'var(--bg-deep)',
          borderBottom: '1px solid var(--border-soft)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge-gold">
              <Sparkles size={13} /> Complete Homepage Editorial Studio
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Last saved: {new Date(content.lastUpdated).toLocaleTimeString()}
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--text-primary)', marginTop: '6px' }}>
            Live Homepage CMS Editor
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '2px' }}>
            Edit every sentence, headline, quote, and full stop across the entire homepage with immediate live publication.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handleReset}
            className="btn-secondary"
            style={{ padding: '0.7rem 1.2rem', fontSize: '0.82rem' }}
            title="Restore original text"
          >
            <RotateCcw size={14} /> Restore Defaults
          </button>

          <Link
            to="/"
            target="_blank"
            className="btn-secondary"
            style={{ padding: '0.7rem 1.2rem', fontSize: '0.82rem' }}
          >
            <ExternalLink size={14} /> View Live Site
          </Link>

          <button
            onClick={handleSave}
            className="btn-gold"
            style={{ padding: '0.7rem 1.6rem', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {isSaved ? <Check size={16} /> : <Save size={16} />}
            <span>{isSaved ? 'Changes Published!' : 'Save & Publish Live'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          backgroundColor: 'var(--bg-cosmos)',
          borderBottom: '1px solid var(--border-soft)',
          padding: '8px 16px',
          gap: '6px'
        }}
      >
        {sectionTabs.map(tab => {
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '8px',
                backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                border: isActive ? '1px solid rgba(140, 109, 35, 0.35)' : '1px solid transparent',
                color: isActive ? '#8C6D23' : 'var(--text-secondary)',
                boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                fontSize: '0.82rem',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Section Form Body */}
      <div style={{ padding: '32px 28px' }}>
        {/* =========================================================================
            SECTION 1: HERO
            ========================================================================= */}
        {activeSection === 'hero' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', marginBottom: '8px' }}>Hero Section Copy</h3>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Kicker Tag (Top gold badge)
              </label>
              <input
                type="text"
                value={content.hero.kicker}
                onChange={e => updateHero('kicker', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Masthead Brand Title (Large h1)
              </label>
              <input
                type="text"
                value={content.hero.masthead}
                onChange={e => updateHero('masthead', e.target.value)}
                style={{ width: '100%', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Philosophy Quote (Italic serif subtitle)
              </label>
              <input
                type="text"
                value={content.hero.philosophyQuote}
                onChange={e => updateHero('philosophyQuote', e.target.value)}
                style={{ width: '100%', fontStyle: 'italic' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Supporting Paragraph (Simple, clear explanation)
              </label>
              <textarea
                rows={3}
                value={content.hero.supportingParagraph}
                onChange={e => updateHero('supportingParagraph', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                  Primary CTA Button Label
                </label>
                <input
                  type="text"
                  value={content.hero.primaryCtaLabel}
                  onChange={e => updateHero('primaryCtaLabel', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                  Primary CTA Target Link
                </label>
                <input
                  type="text"
                  value={content.hero.primaryCtaLink}
                  onChange={e => updateHero('primaryCtaLink', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                  Secondary CTA Button Label
                </label>
                <input
                  type="text"
                  value={content.hero.secondaryCtaLabel}
                  onChange={e => updateHero('secondaryCtaLabel', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                  Secondary CTA Target Link
                </label>
                <input
                  type="text"
                  value={content.hero.secondaryCtaLink}
                  onChange={e => updateHero('secondaryCtaLink', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Scroll Indicator Text
              </label>
              <input
                type="text"
                value={content.hero.scrollIndicatorText}
                onChange={e => updateHero('scrollIndicatorText', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 2: EDITORIAL PHILOSOPHY
            ========================================================================= */}
        {activeSection === 'philosophy' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', marginBottom: '8px' }}>Editorial Philosophy Copy</h3>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Section Tag
              </label>
              <input
                type="text"
                value={content.philosophy.sectionTag}
                onChange={e => updatePhilosophy('sectionTag', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Main Headline
              </label>
              <input
                type="text"
                value={content.philosophy.headline}
                onChange={e => updatePhilosophy('headline', e.target.value)}
                style={{ width: '100%', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Narrative Paragraph
              </label>
              <textarea
                rows={3}
                value={content.philosophy.narrativeParagraph}
                onChange={e => updatePhilosophy('narrativeParagraph', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ color: '#8C6D23', fontSize: '1rem', marginBottom: '14px' }}>
                The 3 Progression Cards (Step 1, Step 2, Step 3)
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {content.philosophy.triadCards.map((card, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'var(--bg-deep)',
                      border: '1px solid var(--border-soft)',
                      borderRadius: '12px',
                      padding: '20px'
                    }}
                  >
                    <div style={{ fontWeight: 600, color: 'var(--indigo-600)', fontSize: '0.85rem', marginBottom: '12px' }}>
                      Card 0{idx + 1}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '14px', marginBottom: '10px' }}>
                      <div>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.78rem', marginBottom: '4px' }}>
                          Step Label
                        </label>
                        <input
                          type="text"
                          value={card.step}
                          onChange={e => updatePhilosophyTriad(idx, 'step', e.target.value)}
                          style={{ width: '100%' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.78rem', marginBottom: '4px' }}>
                          Headline Quote
                        </label>
                        <input
                          type="text"
                          value={card.quote}
                          onChange={e => updatePhilosophyTriad(idx, 'quote', e.target.value)}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.78rem', marginBottom: '4px' }}>
                        Explanation
                      </label>
                      <textarea
                        rows={2}
                        value={card.explanation}
                        onChange={e => updatePhilosophyTriad(idx, 'explanation', e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 3: 6 TOPICS GRID
            ========================================================================= */}
        {activeSection === 'topics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', marginBottom: '8px' }}>Foundations of Thought (6 Editorial Topics)</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                  Section Tag
                </label>
                <input
                  type="text"
                  value={content.topicsSection.sectionTag}
                  onChange={e => updateTopicsSection('sectionTag', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                  Headline
                </label>
                <input
                  type="text"
                  value={content.topicsSection.headline}
                  onChange={e => updateTopicsSection('headline', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Section Description
              </label>
              <textarea
                rows={2}
                value={content.topicsSection.description}
                onChange={e => updateTopicsSection('description', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ color: '#8C6D23', fontSize: '1rem', marginBottom: '14px' }}>
                Individual Topic Cards (All 6 Pillars)
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '18px' }}>
                {content.topicsSection.topics.map((t, idx) => (
                  <div
                    key={t.id}
                    style={{
                      backgroundColor: 'var(--bg-deep)',
                      border: '1px solid var(--border-soft)',
                      borderRadius: '12px',
                      padding: '18px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontWeight: 600, color: t.accent, fontSize: '0.84rem' }}>
                        Pillar #{idx + 1}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                        /topics/{t.slug}
                      </span>
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                      <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.76rem', marginBottom: '3px' }}>
                        Topic Title
                      </label>
                      <input
                        type="text"
                        value={t.title}
                        onChange={e => updateSingleTopic(idx, 'title', e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                      <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.76rem', marginBottom: '3px' }}>
                        Tagline
                      </label>
                      <input
                        type="text"
                        value={t.tagline}
                        onChange={e => updateSingleTopic(idx, 'tagline', e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.76rem', marginBottom: '3px' }}>
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={t.description}
                        onChange={e => updateSingleTopic(idx, 'description', e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Bottom View All Button Text
              </label>
              <input
                type="text"
                value={content.topicsSection.viewAllButtonText}
                onChange={e => updateTopicsSection('viewAllButtonText', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 4: MIND IN MOTION (7 STEPS)
            ========================================================================= */}
        {activeSection === 'mindInMotion' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', marginBottom: '8px' }}>
              The Mind in Motion (7-Phase Thought Chain)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                  Section Tag
                </label>
                <input
                  type="text"
                  value={content.mindInMotion.sectionTag}
                  onChange={e => updateMindInMotion('sectionTag', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                  Headline
                </label>
                <input
                  type="text"
                  value={content.mindInMotion.headline}
                  onChange={e => updateMindInMotion('headline', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Section Description
              </label>
              <textarea
                rows={2}
                value={content.mindInMotion.description}
                onChange={e => updateMindInMotion('description', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Bottom Continuous Loop Notice
              </label>
              <input
                type="text"
                value={content.mindInMotion.loopNotice}
                onChange={e => updateMindInMotion('loopNotice', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ color: '#8C6D23', fontSize: '1rem', marginBottom: '14px' }}>
                The 7 Phases (Step 1 to 7)
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {content.mindInMotion.steps.map((st, idx) => (
                  <div
                    key={st.step}
                    style={{
                      backgroundColor: 'var(--bg-deep)',
                      border: '1px solid var(--border-soft)',
                      borderRadius: '12px',
                      padding: '20px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 700, color: st.accent, backgroundColor: '#FFFFFF', border: '1px solid var(--border-soft)', padding: '2px 8px', borderRadius: '4px' }}>
                        Phase 0{st.step}
                      </span>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        {st.label}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '10px' }}>
                      <div>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.76rem', marginBottom: '3px' }}>
                          Phase Label
                        </label>
                        <input
                          type="text"
                          value={st.label}
                          onChange={e => updateSingleStep(idx, 'label', e.target.value)}
                          style={{ width: '100%' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.76rem', marginBottom: '3px' }}>
                          Tagline
                        </label>
                        <input
                          type="text"
                          value={st.tagline}
                          onChange={e => updateSingleStep(idx, 'tagline', e.target.value)}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                      <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.76rem', marginBottom: '3px' }}>
                        Simple Explanation
                      </label>
                      <textarea
                        rows={2}
                        value={st.simpleExplanation}
                        onChange={e => updateSingleStep(idx, 'simpleExplanation', e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.76rem', marginBottom: '3px' }}>
                          Key Takeaway / Life Lesson
                        </label>
                        <textarea
                          rows={2}
                          value={st.lifeLesson}
                          onChange={e => updateSingleStep(idx, 'lifeLesson', e.target.value)}
                          style={{ width: '100%' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.76rem', marginBottom: '3px' }}>
                          Daily Practice
                        </label>
                        <textarea
                          rows={2}
                          value={st.dailyPractice}
                          onChange={e => updateSingleStep(idx, 'dailyPractice', e.target.value)}
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 5: PUBLISHING HOUSE / BOOKS
            ========================================================================= */}
        {activeSection === 'books' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', marginBottom: '8px' }}>
              Publishing House & Father's Treatises
            </h3>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Section Tag
              </label>
              <input
                type="text"
                value={content.booksSection.sectionTag}
                onChange={e => updateBooksSection('sectionTag', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Main Headline
              </label>
              <input
                type="text"
                value={content.booksSection.headline}
                onChange={e => updateBooksSection('headline', e.target.value)}
                style={{ width: '100%', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Italic Serif Quote
              </label>
              <input
                type="text"
                value={content.booksSection.italicQuote}
                onChange={e => updateBooksSection('italicQuote', e.target.value)}
                style={{ width: '100%', fontStyle: 'italic' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Section Description
              </label>
              <textarea
                rows={3}
                value={content.booksSection.description}
                onChange={e => updateBooksSection('description', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                  Sample Button Text
                </label>
                <input
                  type="text"
                  value={content.booksSection.sampleButtonText}
                  onChange={e => updateBooksSection('sampleButtonText', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                  Buy Now Button Text
                </label>
                <input
                  type="text"
                  value={content.booksSection.buyButtonText}
                  onChange={e => updateBooksSection('buyButtonText', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                  View Complete Store Button
                </label>
                <input
                  type="text"
                  value={content.booksSection.viewStoreButtonText}
                  onChange={e => updateBooksSection('viewStoreButtonText', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 6: WHY MIND RENDER (4 PILLARS)
            ========================================================================= */}
        {activeSection === 'why' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', marginBottom: '8px' }}>
              Why MIND RENDER (The Four Pillars)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                  Section Tag
                </label>
                <input
                  type="text"
                  value={content.whySection.sectionTag}
                  onChange={e => updateWhySection('sectionTag', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                  Headline
                </label>
                <input
                  type="text"
                  value={content.whySection.headline}
                  onChange={e => updateWhySection('headline', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Section Description
              </label>
              <textarea
                rows={3}
                value={content.whySection.description}
                onChange={e => updateWhySection('description', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ color: '#8C6D23', fontSize: '1rem', marginBottom: '14px' }}>
                The 4 Pillars (Understand, Reflect, Practice, Transform)
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                {content.whySection.pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'var(--bg-deep)',
                      border: '1px solid var(--border-soft)',
                      borderRadius: '12px',
                      padding: '18px'
                    }}
                  >
                    <div style={{ fontWeight: 600, color: '#8C6D23', fontSize: '0.82rem', marginBottom: '10px' }}>
                      Pillar 0{idx + 1}
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                      <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.76rem', marginBottom: '3px' }}>
                        Title
                      </label>
                      <input
                        type="text"
                        value={pillar.title}
                        onChange={e => updateSinglePillar(idx, 'title', e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                      <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.76rem', marginBottom: '3px' }}>
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={pillar.subtitle}
                        onChange={e => updateSinglePillar(idx, 'subtitle', e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.76rem', marginBottom: '3px' }}>
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={pillar.desc}
                        onChange={e => updateSinglePillar(idx, 'desc', e.target.value)}
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 7: EDITORIAL ESSAYS
            ========================================================================= */}
        {activeSection === 'essays' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', marginBottom: '8px' }}>
              Editorial Essays Section Copy
            </h3>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Section Tag
              </label>
              <input
                type="text"
                value={content.essaysSection.sectionTag}
                onChange={e => updateEssaysSection('sectionTag', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Main Headline
              </label>
              <input
                type="text"
                value={content.essaysSection.headline}
                onChange={e => updateEssaysSection('headline', e.target.value)}
                style={{ width: '100%', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Section Description
              </label>
              <textarea
                rows={3}
                value={content.essaysSection.description}
                onChange={e => updateEssaysSection('description', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                View All Button Text
              </label>
              <input
                type="text"
                value={content.essaysSection.viewAllButtonText}
                onChange={e => updateEssaysSection('viewAllButtonText', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION 8: FINAL HORIZON CTA
            ========================================================================= */}
        {activeSection === 'finalCta' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', marginBottom: '8px' }}>
              Final Horizon CTA Section
            </h3>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Section Tag
              </label>
              <input
                type="text"
                value={content.finalCta.sectionTag}
                onChange={e => updateFinalCta('sectionTag', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                  Headline Line 1
                </label>
                <input
                  type="text"
                  value={content.finalCta.headlineLine1}
                  onChange={e => updateFinalCta('headlineLine1', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                  Headline Line 2
                </label>
                <input
                  type="text"
                  value={content.finalCta.headlineLine2}
                  onChange={e => updateFinalCta('headlineLine2', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                  Headline Line 3
                </label>
                <input
                  type="text"
                  value={content.finalCta.headlineLine3}
                  onChange={e => updateFinalCta('headlineLine3', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                Italic Paragraph
              </label>
              <textarea
                rows={3}
                value={content.finalCta.italicParagraph}
                onChange={e => updateFinalCta('italicParagraph', e.target.value)}
                style={{ width: '100%', fontStyle: 'italic' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={content.finalCta.primaryButtonText}
                  onChange={e => updateFinalCta('primaryButtonText', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '6px' }}>
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  value={content.finalCta.secondaryButtonText}
                  onChange={e => updateFinalCta('secondaryButtonText', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Global Save Button at bottom of each section */}
        <div
          style={{
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <button
            onClick={handleReset}
            className="btn-secondary"
            style={{ padding: '0.75rem 1.4rem' }}
          >
            <RotateCcw size={15} /> Restore Defaults
          </button>

          <button
            onClick={handleSave}
            className="btn-gold"
            style={{ padding: '0.75rem 2rem', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {isSaved ? <Check size={18} /> : <Save size={18} />}
            <span>{isSaved ? 'Changes Published!' : 'Save & Publish Live'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
