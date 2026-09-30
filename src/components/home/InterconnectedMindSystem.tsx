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
        backgroundColor: '#FBF9F5',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
      }}
    >
      {/* Background Central Atmospheric Light */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '760px',
          height: '760px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, rgba(245, 158, 11, 0.08) 45%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <span className="section-tag" style={{ justifyContent: 'center' }}>
            <Sparkles size={15} color="#D97706" /> {data.sectionTag}
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
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '24px',
            border: '1.5px solid rgba(99, 102, 241, 0.2)',
            padding: 'clamp(22px, 3.5vw, 44px) clamp(16px, 3vw, 36px)',
            boxShadow: '0 20px 50px -10px rgba(99, 102, 241, 0.12), 0 8px 24px -4px rgba(245, 158, 11, 0.08)',
            boxSizing: 'border-box',
            width: '100%',
            overflow: 'hidden',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}
        >
          {/* The 7 Steps Interactive Rail */}
          <div
            className="mobile-step-rail"
            style={{
              paddingBottom: '1.5rem',
              borderBottom: '1px solid rgba(99, 102, 241, 0.14)',
              marginBottom: '2.5rem'
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
                      padding: '10px 18px',
                      borderRadius: '12px',
                      backgroundColor: isSelected ? '#EEF2FF' : '#FFFFFF',
                      border: isSelected ? '1.5px solid #6366F1' : '1px solid rgba(18, 20, 29, 0.1)',
                      color: isSelected ? '#4338CA' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      flexShrink: 0,
                      whiteSpace: 'nowrap',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: isSelected ? '0 6px 18px rgba(99, 102, 241, 0.25)' : '0 2px 6px rgba(0, 0, 0, 0.03)',
                      transform: isSelected ? 'scale(1.02)' : 'scale(1)'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '0.74rem',
                        fontWeight: 800,
                        color: isSelected ? '#FFFFFF' : '#B45309',
                        background: isSelected ? 'linear-gradient(135deg, #4338CA, #6366F1)' : 'rgba(245, 158, 11, 0.15)',
                        padding: '3px 7px',
                        borderRadius: '6px'
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
                    <ArrowRight size={14} color="rgba(99, 102, 241, 0.45)" style={{ flexShrink: 0 }} />
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
                  width: '230px',
                  height: '230px',
                  borderRadius: '50%',
                  border: '2px solid rgba(99, 102, 241, 0.35)',
                  boxShadow: '0 0 35px rgba(99, 102, 241, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
              >
                {/* Inner Dashed Ring */}
                <div
                  style={{
                    width: '165px',
                    height: '165px',
                    borderRadius: '50%',
                    border: '1.5px dashed rgba(245, 158, 11, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {/* Central Radiant Glow Orb */}
                  <div
                    style={{
                      width: '105px',
                      height: '105px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #FFFBEB 0%, #EEF2FF 100%)',
                      border: '1.5px solid rgba(99, 102, 241, 0.3)',
                      boxShadow: '0 6px 20px rgba(99, 102, 241, 0.18)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)',
                      textAlign: 'center'
                    }}
                  >
                    <span style={{ fontFamily: 'monospace', fontSize: '1.45rem', fontWeight: 800, color: '#4338CA' }}>
                      0{activeStep.step}
                    </span>
                    <span style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 800, color: '#B45309' }}>
                      PHASE
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4F46E5', fontWeight: 800 }}>
                  Active Focus
                </span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: 'var(--text-primary)', marginTop: '2px', fontWeight: 700 }}>
                  {activeStep.label}
                </div>
              </div>
            </div>

            {/* Right: Plain English Explanations */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#4338CA', background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '5px 14px', borderRadius: '18px', fontSize: '0.76rem', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 800, marginBottom: '12px' }}>
                <span>Phase 0{activeStep.step} in the Chain</span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 2.5vw, 2.2rem)',
                  color: 'var(--text-primary)',
                  lineHeight: 1.25,
                  marginBottom: '0.4rem',
                  fontWeight: 700
                }}
              >
                {activeStep.label}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '1.18rem',
                  color: '#B45309',
                  marginBottom: '1.25rem',
                  fontWeight: 600
                }}
              >
                "{activeStep.tagline}"
              </p>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
                {activeStep.simpleExplanation}
              </p>

              {/* Life Lesson & Practical Tip Boxes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div
                  style={{
                    backgroundColor: 'rgba(238, 242, 255, 0.65)',
                    border: '1.5px solid rgba(99, 102, 241, 0.25)',
                    borderRadius: '14px',
                    padding: '16px 20px',
                    boxShadow: '0 2px 8px rgba(99, 102, 241, 0.05)'
                  }}
                >
                  <div style={{ fontSize: '0.74rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4338CA', fontWeight: 800, marginBottom: '4px' }}>
                    Key Takeaway
                  </div>
                  <p style={{ color: 'var(--text-primary)', fontSize: '0.94rem', lineHeight: 1.6 }}>
                    {activeStep.lifeLesson}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: 'rgba(254, 243, 199, 0.45)',
                    border: '1.5px solid rgba(245, 158, 11, 0.3)',
                    borderRadius: '14px',
                    padding: '16px 20px',
                    boxShadow: '0 2px 8px rgba(245, 158, 11, 0.05)'
                  }}
                >
                  <div style={{ fontSize: '0.74rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#B45309', fontWeight: 800, marginBottom: '4px' }}>
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
              borderTop: '1px solid rgba(99, 102, 241, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              textAlign: 'center'
            }}
          >
            <RefreshCw size={16} color="#D97706" />
            <span>{data.loopNotice}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
