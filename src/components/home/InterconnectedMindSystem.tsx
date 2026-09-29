import React, { useState } from 'react';
import { ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { MindInMotionContent, MindInMotionStepContent } from '../../types/homepageContent';
import { StorageService } from '../../services/storageService';

interface InterconnectedMindSystemProps {
  content?: MindInMotionContent;
}

export const InterconnectedMindSystem: React.FC<InterconnectedMindSystemProps> = ({ content }) => {
  const data = content || StorageService.getHomepageContent().mindInMotion;
  const [selectedStepIndex, setSelectedStepIndex] = useState(1); // Default to Step 2 (Attention)

  const activeStep: MindInMotionStepContent = data.steps[selectedStepIndex] || data.steps[0];

  return (
    <section
      style={{
        padding: '130px 0 140px',
        backgroundColor: '#050609',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* Background Central Atmospheric Light */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(212, 175, 55, 0.04) 45%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <span className="section-tag" style={{ justifyContent: 'center' }}>
            <Sparkles size={14} /> {data.sectionTag}
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 3.8vw, 3.3rem)',
              color: '#F8FAFC',
              letterSpacing: '0.04em',
              marginBottom: '1rem'
            }}
          >
            {data.headline}
          </h2>
          <p
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              color: '#94A3B8',
              fontSize: '1.05rem',
              lineHeight: 1.75
            }}
          >
            {data.description}
          </p>
        </div>

        {/* Central Visual System */}
        <div
          style={{
            maxWidth: '1040px',
            margin: '0 auto',
            backgroundColor: '#0B0D15',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '48px 36px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)'
          }}
        >
          {/* The 7 Steps Interactive Rail */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              paddingBottom: '2.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
              marginBottom: '3rem'
            }}
          >
            {data.steps.map((node, idx) => {
              const isSelected = selectedStepIndex === idx;
              return (
                <React.Fragment key={node.step}>
                  <button
                    onClick={() => setSelectedStepIndex(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 18px',
                      borderRadius: '12px',
                      backgroundColor: isSelected ? `${node.accent}18` : 'rgba(255, 255, 255, 0.02)',
                      border: isSelected ? `1.5px solid ${node.accent}` : '1px solid rgba(255, 255, 255, 0.06)',
                      color: isSelected ? '#FFFFFF' : '#94A3B8',
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isSelected ? `0 0 25px ${node.accent}30` : 'none',
                      transform: isSelected ? 'scale(1.04)' : 'scale(1)'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: isSelected ? node.accent : '#64748B',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}
                    >
                      0{node.step}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.92rem',
                        fontWeight: 600,
                        letterSpacing: '0.04em'
                      }}
                    >
                      {node.label}
                    </span>
                  </button>

                  {idx < data.steps.length - 1 && (
                    <ArrowRight size={14} color="rgba(255, 255, 255, 0.2)" style={{ flexShrink: 0 }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Central Interactive Spotlight Card */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'center'
            }}
          >
            {/* Left: Ethereal Consciousness Core Visual */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                padding: '40px 20px'
              }}
            >
              {/* Outer Breathing Ring */}
              <div
                className="animate-breathe"
                style={{
                  width: '220px',
                  height: '220px',
                  borderRadius: '50%',
                  border: `1.5px solid ${activeStep.accent}50`,
                  boxShadow: `0 0 45px ${activeStep.accent}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                {/* Inner Dashed Ring */}
                <div
                  style={{
                    width: '160px',
                    height: '160px',
                    borderRadius: '50%',
                    border: `1px dashed ${activeStep.accent}70`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {/* Central Radiant Glow Orb */}
                  <div
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${activeStep.accent} 0%, rgba(13, 16, 25, 0.8) 75%)`,
                      boxShadow: `0 0 30px ${activeStep.accent}60`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#080A10',
                      textAlign: 'center'
                    }}
                  >
                    <span style={{ fontFamily: 'monospace', fontSize: '1.4rem', fontWeight: 800 }}>
                      0{activeStep.step}
                    </span>
                    <span style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>
                      PHASE
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: activeStep.accent, fontWeight: 600 }}>
                  Active Focus
                </span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#F8FAFC', marginTop: '2px' }}>
                  {activeStep.label}
                </div>
              </div>
            </div>

            {/* Right: Plain English Explanations */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: activeStep.accent, fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px' }}>
                <span>Phase 0{activeStep.step} in the Chain</span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 2.5vw, 2.2rem)',
                  color: '#F8FAFC',
                  lineHeight: 1.25,
                  marginBottom: '0.4rem'
                }}
              >
                {activeStep.label}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '1.15rem',
                  color: '#D4AF37',
                  marginBottom: '1.25rem'
                }}
              >
                "{activeStep.tagline}"
              </p>

              <p style={{ color: '#E2E8F0', fontSize: '1rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
                {activeStep.simpleExplanation}
              </p>

              {/* Life Lesson & Practical Tip Boxes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '12px',
                    padding: '16px 20px'
                  }}
                >
                  <div style={{ fontSize: '0.74rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#818CF8', fontWeight: 600, marginBottom: '4px' }}>
                    Key Takeaway
                  </div>
                  <p style={{ color: '#F8FAFC', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    {activeStep.lifeLesson}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: `${activeStep.accent}10`,
                    border: `1px solid ${activeStep.accent}30`,
                    borderRadius: '12px',
                    padding: '16px 20px'
                  }}
                >
                  <div style={{ fontSize: '0.74rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: activeStep.accent, fontWeight: 600, marginBottom: '4px' }}>
                    Daily Practice
                  </div>
                  <p style={{ color: '#F8FAFC', fontSize: '0.92rem', lineHeight: 1.6 }}>
                    {activeStep.dailyPractice}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Continuous Loop Clarification */}
          <div
            style={{
              marginTop: '3rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              color: '#94A3B8',
              fontSize: '0.86rem',
              textAlign: 'center'
            }}
          >
            <RefreshCw size={15} color="#D4AF37" />
            <span>{data.loopNotice}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
