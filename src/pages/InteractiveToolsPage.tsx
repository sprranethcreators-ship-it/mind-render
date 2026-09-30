import React, { useState } from 'react';
import { DailyAffirmationTool } from '../components/tools/DailyAffirmationTool';
import { GratitudeJournalTool } from '../components/tools/GratitudeJournalTool';
import { VisualizationSessionTool } from '../components/tools/VisualizationSessionTool';
import { FocusTimerTool } from '../components/tools/FocusTimerTool';
import { CognitiveReframerTool } from '../components/tools/CognitiveReframerTool';
import { Sparkles, BookOpen, Eye, Target, Brain } from 'lucide-react';

export const InteractiveToolsPage: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'affirmation' | 'journal' | 'visualization' | 'focus' | 'reframer'>('affirmation');

  const tools = [
    { id: 'affirmation', name: 'Affirmation Resonance', icon: <Sparkles size={16} /> },
    { id: 'journal', name: 'Awareness Journal', icon: <BookOpen size={16} /> },
    { id: 'visualization', name: 'Mental Cinema Studio', icon: <Eye size={16} /> },
    { id: 'focus', name: 'Binaural Focus Flow', icon: <Target size={16} /> },
    { id: 'reframer', name: 'Cognitive Reframer', icon: <Brain size={16} /> },
  ];

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', backgroundColor: 'var(--bg-cosmos)' }}>
      {/* Header */}
      <section
        style={{
          padding: '80px 0 50px',
          background: 'linear-gradient(180deg, #FAF8F5 0%, #F5F3FF 40%, #FFFBEB 85%, #FAF8F5 100%)',
          borderBottom: '1px solid rgba(217, 119, 6, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#92400E',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 18px',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.9) 0%, rgba(253, 230, 138, 0.6) 100%)',
                border: '1px solid rgba(217, 119, 6, 0.35)',
                boxShadow: '0 4px 14px rgba(245, 158, 11, 0.15)'
              }}
            >
              <Target size={14} color="#D97706" /> NEURAL CONDITIONING SUITE
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
              color: '#0F172A',
              marginBottom: '1.25rem',
              letterSpacing: '-0.01em',
              fontWeight: 800
            }}
          >
            Interactive Mind{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1E1B4B 0%, #4F46E5 50%, #D97706 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>
              Instruments
            </span>
          </h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', color: '#475569', fontSize: '1.12rem', lineHeight: 1.7 }}>
            Deliberate practices to train voluntary attention, rewrite subconscious cognitive distortions, and embody constructive states of consciousness.
          </p>
        </div>
      </section>

      {/* Tool Navigation Tabs */}
      <div
        style={{
          position: 'sticky',
          top: '76px',
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(217, 119, 6, 0.15)',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
          zIndex: 7000,
          padding: '16px 0'
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
          {tools.map(tool => {
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 20px',
                  borderRadius: '9999px',
                  fontSize: '0.86rem',
                  fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? '#1E1B4B' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#475569',
                  border: isActive ? '1px solid #1E1B4B' : '1px solid rgba(15, 23, 42, 0.12)',
                  boxShadow: isActive ? '0 4px 14px rgba(30, 27, 75, 0.3)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                {tool.icon}
                <span>{tool.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tool Stage */}
      <section style={{ padding: '60px 0 120px' }}>
        <div className="container">
          {activeTool === 'affirmation' && <DailyAffirmationTool />}
          {activeTool === 'journal' && <GratitudeJournalTool />}
          {activeTool === 'visualization' && <VisualizationSessionTool />}
          {activeTool === 'focus' && <FocusTimerTool />}
          {activeTool === 'reframer' && <CognitiveReframerTool />}
        </div>
      </section>
    </div>
  );
};
