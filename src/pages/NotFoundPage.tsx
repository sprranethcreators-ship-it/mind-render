import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        paddingTop: '100px',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px'
      }}
    >
      <div style={{ maxWidth: '520px' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            color: '#D4AF37'
          }}
        >
          <Compass size={36} />
        </div>

        <span className="badge-gold" style={{ marginBottom: '1rem' }}>404 • UNMAPPED FREQUENCY</span>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: '#F8FAFC', marginBottom: '0.75rem' }}>
          Coordinate Beyond Perception
        </h1>

        <p style={{ color: '#94A3B8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
          The page or manuscript you seek does not exist within this attentional focus. Return to the center of consciousness.
        </p>

        <Link to="/" className="btn-gold" style={{ padding: '0.85rem 2rem' }}>
          <ArrowLeft size={16} /> Return to MIND RENDER
        </Link>
      </div>
    </div>
  );
};
