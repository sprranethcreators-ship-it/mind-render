import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { useToast } from '../../context/ToastContext';
import { Sparkles, RefreshCw, Volume2, Copy, Check, Heart } from 'lucide-react';

const AFFIRMATIONS = [
  {
    theme: "Sovereign Mindset",
    declaration: "I am the sovereign observer of my thoughts, not their prisoner. My voluntary attention directs the trajectory of my day.",
    contemplation: "Notice the space between a thought arising and your choice to feed it attention. In that space lies your absolute freedom."
  },
  {
    theme: "Resonance & Alignment",
    declaration: "I do not struggle to chase outcomes; I harmonize my internal frequency with the reality I choose to inhabit.",
    contemplation: "Desperate wanting broadcasts absence. Calm knowing broadcasts fulfillment. Walk as if the foundation is already laid."
  },
  {
    theme: "Subconscious Receptivity",
    declaration: "My subconscious mind is fertile ground. I release old scripts of limitation and plant seeds of courageous expansion.",
    contemplation: "Your nervous system cannot tell the difference between vivid memory and vivid anticipation. Choose what you feed it."
  },
  {
    theme: "Focus & Attentional Purity",
    declaration: "My attention is sacred currency. I withdraw my focus from noise and invest it solely in what brings life and truth.",
    contemplation: "Whatever you look at grows in your experience. Look away from that which you do not wish to multiply."
  },
  {
    theme: "Emotional Guidance",
    declaration: "My emotions are biochemical compass needles. I welcome their feedback without judgement and align myself with peace.",
    contemplation: "When friction arises, do not resist the sensation. Ask: 'What belief am I holding that makes this moment feel like a threat?'"
  }
];

export const DailyAffirmationTool: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [isCopied, setIsCopied] = useState(false);
  const { currentSound, toggleSound } = useAudio();
  const { showToast } = useToast();

  const current = AFFIRMATIONS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % AFFIRMATIONS.length);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${current.declaration}" — MIND RENDER`);
    setIsCopied(true);
    showToast('gold', 'Affirmation Copied', 'Paste into your daily notes or journal.');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(25, 25, 29, 0.08)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 16px 40px rgba(25, 25, 29, 0.05)',
        maxWidth: '720px',
        margin: '0 auto',
        textAlign: 'center'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <span className="badge-gold">
          <Sparkles size={13} /> {current.theme}
        </span>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => toggleSound('solfeggio432')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              backgroundColor: currentSound === 'solfeggio432' ? 'rgba(81, 70, 184, 0.1)' : '#FAF8F3',
              border: currentSound === 'solfeggio432' ? '1px solid var(--indigo-600)' : '1px solid rgba(25, 25, 29, 0.1)',
              color: currentSound === 'solfeggio432' ? 'var(--indigo-600)' : 'var(--text-secondary)',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              cursor: 'pointer'
            }}
          >
            <Volume2 size={14} /> 432 Hz Resonance
          </button>

          <button
            onClick={handleNext}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              backgroundColor: '#FAF8F3',
              border: '1px solid rgba(25, 25, 29, 0.1)',
              color: 'var(--text-secondary)',
              fontSize: '0.78rem',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={14} /> Next
          </button>
        </div>
      </div>

      {/* Breathing Ring */}
      <div style={{ margin: '2rem 0', position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <div
          className="animate-breathe"
          style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            border: '2px solid rgba(140, 109, 35, 0.35)',
            boxShadow: '0 0 25px rgba(140, 109, 35, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: 'rgba(81, 70, 184, 0.08)',
              border: '1px dashed rgba(81, 70, 184, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Heart size={24} color="#8C6D23" />
          </div>
        </div>
      </div>

      {/* Declaration */}
      <h3
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.4rem, 2.5vw, 1.85rem)',
          color: 'var(--text-primary)',
          lineHeight: 1.5,
          fontStyle: 'italic',
          marginBottom: '1.5rem',
          maxWidth: '620px',
          margin: '0 auto 1.5rem'
        }}
      >
        "{current.declaration}"
      </h3>

      {/* Contemplation */}
      <div
        style={{
          backgroundColor: '#FAF8F3',
          border: '1px solid rgba(25, 25, 29, 0.08)',
          borderRadius: '12px',
          padding: '18px 24px',
          marginBottom: '2rem',
          maxWidth: '580px',
          margin: '0 auto 2rem'
        }}
      >
        <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--indigo-600)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
          Deep Inquiry & Somatic Anchor
        </span>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
          {current.contemplation}
        </p>
      </div>

      {/* Copy Action */}
      <button
        onClick={handleCopy}
        className="btn-secondary"
        style={{ padding: '0.65rem 1.6rem', fontSize: '0.82rem' }}
      >
        {isCopied ? <Check size={15} color="#059669" /> : <Copy size={15} />}
        {isCopied ? 'Copied to Clipboard' : 'Copy Declaration'}
      </button>
    </div>
  );
};
