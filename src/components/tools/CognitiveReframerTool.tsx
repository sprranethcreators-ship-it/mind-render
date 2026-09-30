import React, { useState } from 'react';
import { Brain, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

export const CognitiveReframerTool: React.FC = () => {
  const [step, setStep] = useState(1);
  const [limitingThought, setLimitingThought] = useState('');
  const [distortion, setDistortion] = useState('Catastrophizing');
  const [objectiveFact, setObjectiveFact] = useState('');
  const [empoweredReframe, setEmpoweredReframe] = useState('');

  const distortions = [
    { name: "Catastrophizing", desc: "Assuming the worst possible outcome as an inevitable certainty." },
    { name: "All-or-Nothing", desc: "Viewing reality in black-and-white absolutes (success vs utter failure)." },
    { name: "Scarcity Attractor", desc: "Fixating on what is lacking rather than what is unfolding." },
    { name: "Mind Reading", desc: "Assuming you know others' negative judgments without empirical verification." }
  ];

  const handleReset = () => {
    setStep(1);
    setLimitingThought('');
    setObjectiveFact('');
    setEmpoweredReframe('');
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(25, 25, 29, 0.08)',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '780px',
        margin: '0 auto',
        boxShadow: '0 16px 40px rgba(25, 25, 29, 0.05)'
      }}
    >
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge-gold">
          <Brain size={13} /> Cognitive Reappraisal
        </span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--text-primary)', marginTop: '0.5rem', letterSpacing: '-0.01em' }}>
          Thought Pattern Deconstructor
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
          Transmute automated cognitive distortions into sovereign constructive perspectives.
        </p>
      </div>

      {/* Step Indicators */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '2.5rem' }}>
        {[1, 2, 3, 4].map(s => (
          <div
            key={s}
            style={{
              flex: 1,
              height: '4px',
              borderRadius: '2px',
              backgroundColor: s <= step ? 'var(--indigo-600)' : 'rgba(25, 25, 29, 0.1)',
              transition: 'background-color 0.3s ease'
            }}
          />
        ))}
      </div>

      {/* Step 1: Capture */}
      {step === 1 && (
        <div>
          <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 600 }}>
            Step 1: Inscribe the Automated Negative Thought or Limiting Belief
          </label>
          <textarea
            rows={4}
            value={limitingThought}
            onChange={e => setLimitingThought(e.target.value)}
            placeholder="e.g. 'I am too late to build this project; others are far ahead and I will likely fail to manifest traction.'"
            style={{ width: '100%', marginBottom: '1.5rem', lineHeight: 1.6, backgroundColor: '#FFFFFF', border: '1px solid rgba(25, 25, 29, 0.12)', color: 'var(--text-primary)', borderRadius: '8px' }}
          />
          <button
            onClick={() => setStep(2)}
            disabled={!limitingThought.trim()}
            className="btn-gold"
            style={{ padding: '0.75rem 1.8rem', opacity: limitingThought.trim() ? 1 : 0.5 }}
          >
            Identify Pattern Distortion <ArrowRight size={15} />
          </button>
        </div>
      )}

      {/* Step 2: Classify Distortion */}
      {step === 2 && (
        <div>
          <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '12px', fontWeight: 600 }}>
            Step 2: Classify the Subconscious Bias
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '12px', marginBottom: '1.75rem' }}>
            {distortions.map(d => (
              <button
                key={d.name}
                type="button"
                onClick={() => setDistortion(d.name)}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  border: distortion === d.name ? '1.5px solid var(--indigo-600)' : '1px solid rgba(25, 25, 29, 0.08)',
                  backgroundColor: distortion === d.name ? 'rgba(81, 70, 184, 0.08)' : '#FAF8F3',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontWeight: 600, color: distortion === d.name ? 'var(--indigo-600)' : 'var(--text-primary)', fontSize: '0.92rem' }}>
                  {d.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {d.desc}
                </div>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(3)} className="btn-gold" style={{ padding: '0.75rem 1.8rem' }}>
            Examine Empirical Evidence <ArrowRight size={15} />
          </button>
        </div>
      )}

      {/* Step 3: Interrogate */}
      {step === 3 && (
        <div>
          <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 600 }}>
            Step 3: What is the Objective, Uncontested Fact (Separate from Emotion)?
          </label>
          <textarea
            rows={4}
            value={objectiveFact}
            onChange={e => setObjectiveFact(e.target.value)}
            placeholder="e.g. 'The objective fact is that I am beginning work today. The assumption that I will fail is an unproven phantom calculation.'"
            style={{ width: '100%', marginBottom: '1.5rem', lineHeight: 1.6, backgroundColor: '#FFFFFF', border: '1px solid rgba(25, 25, 29, 0.12)', color: 'var(--text-primary)', borderRadius: '8px' }}
          />
          <button
            onClick={() => setStep(4)}
            disabled={!objectiveFact.trim()}
            className="btn-gold"
            style={{ padding: '0.75rem 1.8rem', opacity: objectiveFact.trim() ? 1 : 0.5 }}
          >
            Construct Sovereign Reframe <ArrowRight size={15} />
          </button>
        </div>
      )}

      {/* Step 4: Install Sovereign Reframe */}
      {step === 4 && (
        <div>
          <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 600 }}>
            Step 4: The Sovereign Installation (New Empowered Baseline)
          </label>
          <textarea
            rows={4}
            value={empoweredReframe}
            onChange={e => setEmpoweredReframe(e.target.value)}
            placeholder="e.g. 'I operate on my own divine timing. Every hour of deliberate attention I invest now compounds into lasting mastery. I move forward with certainty.'"
            style={{ width: '100%', marginBottom: '1.5rem', lineHeight: 1.6, backgroundColor: '#FFFFFF', border: '1px solid rgba(25, 25, 29, 0.12)', color: 'var(--text-primary)', borderRadius: '8px' }}
          />

          {empoweredReframe.trim() && (
            <div
              style={{
                backgroundColor: 'rgba(5, 150, 105, 0.06)',
                border: '1px solid rgba(5, 150, 105, 0.25)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontWeight: 600, fontSize: '0.86rem', marginBottom: '6px' }}>
                <CheckCircle2 size={16} /> New Cognitive Blueprint Integrated
              </div>
              <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '1.15rem', color: 'var(--text-primary)' }}>
                "{empoweredReframe}"
              </p>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleReset} className="btn-secondary" style={{ padding: '0.75rem 1.4rem' }}>
              <RotateCcw size={15} /> Reframe Another Thought
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
