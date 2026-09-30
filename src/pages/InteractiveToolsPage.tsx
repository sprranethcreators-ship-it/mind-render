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
      <section style={{ padding: '60px 0 30px', backgroundColor: 'var(--bg-deep)', borderBottom: '1px solid rgba(25, 25, 29, 0.08)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag" style={{ justifyContent: 'center' }}>NEURAL CONDITIONING SUITE</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Interactive Mind Tools
          </h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7 }}>
            Deliberate practices to train voluntary attention, rewrite subconscious cognitive distortions, and embody constructive states of consciousness.
          </p>
        </div>
      </section>

      {/* Tool Navigation Tabs */}
      <div
        style={{
          position: 'sticky',
          top: '76px',
          backgroundColor: 'rgba(250, 248, 243, 0.94)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(25, 25, 29, 0.08)',
          zIndex: 7000,
          padding: '14px 0'
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px' }}>
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
                  padding: '9px 18px',
                  borderRadius: '20px',
                  fontSize: '0.84rem',
                  fontWeight: isActive ? 600 : 500,
                  backgroundColor: isActive ? 'var(--indigo-600)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                  border: isActive ? '1px solid var(--indigo-600)' : '1px solid rgba(25, 25, 29, 0.1)',
                  boxShadow: isActive ? '0 2px 8px rgba(81, 70, 184, 0.25)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
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
