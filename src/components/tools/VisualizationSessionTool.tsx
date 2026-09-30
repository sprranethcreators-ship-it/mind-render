import React, { useState, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';
import { Play, Pause, RotateCcw, Sparkles, Eye, ShieldCheck } from 'lucide-react';

const PHASES = [
  {
    name: "Phase 1: Grounding & Sensory Quieting",
    duration: 60,
    guidance: "Relax the jaw, drop the shoulders, and feel the weight of your body. Close your eyes and watch thoughts pass like distant clouds without following them.",
    accent: "#818CF8"
  },
  {
    name: "Phase 2: Mental Cinema & First-Person Immersion",
    duration: 120,
    guidance: "Step inside your desired reality through your own eyes. Feel the physical textures with your fingertips, hear the ambient voices, smell the air. Do not watch yourself on a screen; be inside the moment.",
    accent: "#D4AF37"
  },
  {
    name: "Phase 3: The Feeling of the Wish Fulfilled",
    duration: 120,
    guidance: "Rest in the quiet, grateful relief that this state is already yours. Feel the somatic release of tension. The search is over; the reality is integrated.",
    accent: "#10B981"
  }
];

export const VisualizationSessionTool: React.FC = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(PHASES[0].duration);
  const [isActive, setIsActive] = useState(false);
  const { currentSound, toggleSound } = useAudio();

  const currentPhase = PHASES[phaseIndex];

  useEffect(() => {
    let timer: any = null;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      if (phaseIndex < PHASES.length - 1) {
        setPhaseIndex(prev => prev + 1);
        setTimeLeft(PHASES[phaseIndex + 1].duration);
      } else {
        setIsActive(false);
      }
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, phaseIndex]);

  const toggleTimer = () => {
    if (!isActive && currentSound === 'off') {
      toggleSound('solfeggio528');
    }
    setIsActive(!isActive);
  };

  const resetSession = () => {
    setIsActive(false);
    setPhaseIndex(0);
    setTimeLeft(PHASES[0].duration);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(25, 25, 29, 0.08)',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '760px',
        margin: '0 auto',
        textAlign: 'center',
        boxShadow: '0 16px 40px rgba(25, 25, 29, 0.05)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <span className="badge-gold">
          <Eye size={13} /> Mental Cinema Protocol
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Step {phaseIndex + 1} of {PHASES.length}
        </span>
      </div>

      {/* Timer Display with Glowing Ring */}
      <div
        style={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          border: `2px solid ${currentPhase.accent}`,
          boxShadow: `0 0 25px ${currentPhase.accent}20`,
          backgroundColor: '#FAF8F3',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '2rem auto'
        }}
      >
        <span style={{ fontFamily: 'monospace', fontSize: '3rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          {formatTime(timeLeft)}
        </span>
        <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: currentPhase.accent, fontWeight: 600 }}>
          {isActive ? 'Active Session' : 'Paused'}
        </span>
      </div>

      {/* Phase Title */}
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          color: 'var(--text-primary)',
          marginBottom: '0.75rem'
        }}
      >
        {currentPhase.name}
      </h3>

      {/* Phase Guidance */}
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.15rem',
          fontStyle: 'italic',
          color: 'var(--text-secondary)',
          lineHeight: 1.75,
          maxWidth: '600px',
          margin: '0 auto 2.5rem'
        }}
      >
        "{currentPhase.guidance}"
      </p>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <button
          onClick={toggleTimer}
          className="btn-gold"
          style={{ padding: '0.85rem 2.2rem', fontSize: '0.9rem' }}
        >
          {isActive ? <Pause size={18} /> : <Play size={18} />}
          <span>{isActive ? 'Pause Session' : 'Begin Immersion'}</span>
        </button>

        <button
          onClick={resetSession}
          className="btn-secondary"
          style={{ padding: '0.85rem 1.6rem', fontSize: '0.9rem' }}
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>
    </div>
  );
};
