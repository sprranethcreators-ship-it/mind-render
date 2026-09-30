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
        backgroundColor: '#F1EFF8',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(81, 70, 184, 0.1)',
        borderBottom: '1px solid rgba(81, 70, 184, 0.1)'
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
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(200, 168, 78, 0.04) 45%, transparent 70%)',
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
              color: 'var(--text-primary)',
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
              color: 'var(--text-secondary)',
              fontSize: '1.08rem',
              lineHeight: 1.75
            }}
          >
            {data.description}
          </p>
        </div>

        {/* Central Visual System — Light Editorial Infographic */}
        <div
          style={{
            maxWidth: '1040px',
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            border: '1px solid rgba(81, 70, 184, 0.12)',
            padding: 'clamp(20px, 3.5vw, 44px) clamp(14px, 3vw, 36px)',
            boxShadow: '0 16px 45px rgba(81, 70, 184, 0.07)',
            boxSizing: 'border-box',
            width: '100%',
            overflow: 'hidden'
          }}
        >
          {/* The 7 Steps Interactive Rail */}
          <div
            className="mobile-step-rail"
            style={{
              paddingBottom: '1.5rem',
              borderBottom: '1px solid rgba(81, 70, 184, 0.1)',
              marginBottom: '2rem'
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
                      padding: '10px 16px',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#F1EFF8' : '#FAF8F3',
                      border: isSelected ? '1.5px solid #5146B8' : '1px solid var(--border-subtle)',
                      color: isSelected ? '#5146B8' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      flexShrink: 0,
                      whiteSpace: 'nowrap',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isSelected ? '0 4px 15px rgba(81, 70, 184, 0.15)' : 'none',
                      transform: isSelected ? 'scale(1.02)' : 'scale(1)'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        color: isSelected ? '#5146B8' : '#8C6D23',
                        backgroundColor: isSelected ? 'rgba(81, 70, 184, 0.1)' : 'rgba(200, 168, 78, 0.1)',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}
                    >
                      0{node.step}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em'
                      }}
                    >
                      {node.label}
                    </span>
                  </button>

                  {idx < data.steps.length - 1 && (
                    <ArrowRight size={14} color="rgba(81, 70, 184, 0.35)" style={{ flexShrink: 0 }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Central Interactive Spotlight Card */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(24px, 4vw, 40px)',
              alignItems: 'center'
            }}
          >
            {/* Left: Consciousness Core Visual */}
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
                  border: '1.5px solid rgba(81, 70, 184, 0.25)',
                  boxShadow: '0 0 35px rgba(81, 70, 184, 0.1)',
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
                    border: '1px dashed rgba(200, 168, 78, 0.45)',
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
                      background: 'linear-gradient(135deg, #F1EFF8 0%, #E8E4F5 100%)',
                      border: '1px solid rgba(81, 70, 184, 0.25)',
                      boxShadow: '0 4px 18px rgba(81, 70, 184, 0.12)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)',
                      textAlign: 'center'
                    }}
                  >
                    <span style={{ fontFamily: 'monospace', fontSize: '1.4rem', fontWeight: 800, color: '#5146B8' }}>
                      0{activeStep.step}
                    </span>
                    <span style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, color: '#8C6D23' }}>
                      PHASE
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#5146B8', fontWeight: 700 }}>
                  Active Focus
                </span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--text-primary)', marginTop: '2px', fontWeight: 700 }}>
                  {activeStep.label}
                </div>
              </div>
            </div>

            {/* Right: Plain English Explanations */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#5146B8', backgroundColor: 'rgba(81, 70, 184, 0.08)', padding: '4px 12px', borderRadius: '16px', fontSize: '0.76rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '12px' }}>
                <span>Phase 0{activeStep.step} in the Chain</span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 2.5vw, 2.2rem)',
                  color: 'var(--text-primary)',
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
                  fontSize: '1.18rem',
                  color: '#8C6D23',
                  marginBottom: '1.25rem',
                  fontWeight: 500
                }}
              >
                "{activeStep.tagline}"
              </p>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
                {activeStep.simpleExplanation}
              </p>

              {/* Life Lesson & Practical Tip Boxes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div
                  style={{
                    backgroundColor: '#FAF8F3',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '12px',
                    padding: '16px 20px'
                  }}
                >
                  <div style={{ fontSize: '0.74rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5146B8', fontWeight: 700, marginBottom: '4px' }}>
                    Key Takeaway
                  </div>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.94rem', lineHeight: 1.6 }}>
                    {activeStep.lifeLesson}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(200, 168, 78, 0.08)',
                    border: '1px solid rgba(200, 168, 78, 0.25)',
                    borderRadius: '12px',
                    padding: '16px 20px'
                  }}
                >
                  <div style={{ fontSize: '0.74rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8C6D23', fontWeight: 700, marginBottom: '4px' }}>
                    Daily Practice
                  </div>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.94rem', lineHeight: 1.6 }}>
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
              borderTop: '1px solid rgba(81, 70, 184, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              textAlign: 'center'
            }}
          >
            <RefreshCw size={15} color="#99751F" />
            <span>{data.loopNotice}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
