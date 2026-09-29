import React, { useState, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';
import { Target, Play, Pause, RotateCcw, Volume2, Sparkles } from 'lucide-react';

export const FocusTimerTool: React.FC = () => {
  const [selectedMinutes, setSelectedMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const { currentSound, toggleSound } = useAudio();

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const selectDuration = (mins: number) => {
    setIsRunning(false);
    setSelectedMinutes(mins);
    setSecondsLeft(mins * 60);
  };

  const toggleTimer = () => {
    if (!isRunning && currentSound === 'off') {
      toggleSound('brownNoise');
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(selectedMinutes * 60);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      style={{
        backgroundColor: '#0F121B',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '720px',
        margin: '0 auto',
        textAlign: 'center',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <span className="badge-indigo">
          <Target size={13} /> Deep Attentional Flow
        </span>
        <button
          onClick={() => toggleSound('brownNoise')}
          style={{
            fontSize: '0.78rem',
            color: currentSound === 'brownNoise' ? '#6EE7B7' : '#94A3B8',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Volume2 size={14} /> Rain Hum {currentSound === 'brownNoise' ? '(Active)' : '(Off)'}
        </button>
      </div>

      {/* Preset Pickers */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '2.5rem' }}>
        {[15, 25, 50, 90].map(mins => (
          <button
            key={mins}
            onClick={() => selectDuration(mins)}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              border: selectedMinutes === mins ? '1px solid #6366F1' : '1px solid rgba(255,255,255,0.08)',
              backgroundColor: selectedMinutes === mins ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              color: selectedMinutes === mins ? '#818CF8' : '#CBD5E1',
              fontSize: '0.86rem',
              fontWeight: 600
            }}
          >
            {mins} Minutes
          </button>
        ))}
      </div>

      {/* Timer Display */}
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: 'clamp(3.5rem, 8vw, 5.5rem)',
          fontWeight: 700,
          color: '#F8FAFC',
          marginBottom: '1rem',
          letterSpacing: '0.04em'
        }}
      >
        {formatTime(secondsLeft)}
      </div>

      <p style={{ color: '#94A3B8', fontSize: '0.92rem', maxWidth: '480px', margin: '0 auto 2.5rem' }}>
        Withdraw your sensory apparatus from all peripheral interruptions. Surrender to one single creative act.
      </p>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <button
          onClick={toggleTimer}
          className="btn-primary"
          style={{ padding: '0.85rem 2.2rem', fontSize: '0.9rem' }}
        >
          {isRunning ? <Pause size={18} /> : <Play size={18} />}
          <span>{isRunning ? 'Pause Flow' : 'Begin Deep Work'}</span>
        </button>

        <button
          onClick={resetTimer}
          className="btn-secondary"
          style={{ padding: '0.85rem 1.6rem', fontSize: '0.9rem' }}
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>
    </div>
  );
};
